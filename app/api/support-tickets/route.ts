import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '@/lib/mongodb'

const REQUIRED_FIELDS = ['fullName', 'phoneNumber', 'email', 'countryCode', 'countryName', 'subject', 'category'] as const

type SupportTicketPayload = {
  fullName: string
  phoneNumber: string
  email: string
  countryCode: string
  countryName: string
  subject: string
  category: string
  description?: string
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as Partial<SupportTicketPayload>

    for (const field of REQUIRED_FIELDS) {
      const value = payload[field]
      if (!value || value.toString().trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          {
            status: 400,
          },
        )
      }
    }

    const client = await clientPromise
    const dbName = process.env.MONGODB_DB || 'rovor'
    const db = client.db(dbName)
    const ticketsCollection = db.collection('supportTickets')

    const latestTicket = await ticketsCollection.findOne<{ numericId?: number }>(
      {},
      { sort: { numericId: -1 }, projection: { numericId: 1 } },
    )

    const nextNumericId = (latestTicket?.numericId ?? 0) + 1
    const ticketNumber = nextNumericId.toString().padStart(3, '0')

    const document = {
      ...payload,
      ticketNumber,
      numericId: nextNumericId,
      createdAt: new Date(),
      status: 'open',
    }

    await ticketsCollection.insertOne(document)

    return NextResponse.json(
      {
        ticketId: ticketNumber,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[support-ticket] failed to create ticket', error)
    return NextResponse.json(
      { error: 'Unable to submit ticket. Please try again later.' },
      {
        status: 500,
      },
    )
  }
}

export function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    },
  )
}

