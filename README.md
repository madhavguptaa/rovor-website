# Rovor Website

A modern Next.js landing page for Rovor - a platform to go live, connect worldwide, and keep it real.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
rovor-website/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page component
│   ├── page.module.css  # Landing page styles
│   └── globals.css      # Global styles
├── public/              # Static assets
│   └── images/          # Image files
├── package.json
├── tsconfig.json
└── next.config.js
```

## Features

- Modern, responsive landing page
- Red-themed design matching Rovor branding
- Hero section with overlay text
- Call-to-action buttons
- Social login options

## Adding Assets

Place your images in the `public/images/` folder:
- Hero image: `public/images/hero/`
- Logo files: `public/images/logo/`
- Icons: `public/images/icons/`

Then update the image paths in `app/page.tsx` to use Next.js Image component.

## Build for Production

```bash
npm run build
npm start
```

