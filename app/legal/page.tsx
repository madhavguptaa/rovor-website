'use client'

import { useMemo, useState } from 'react'

import Header from '@/components/shared/Header'

import styles from './page.module.css'

type LegalSection = {
  id: string
  title: string
  summary?: string
  body: string[]
}

const sidebarLinks = [
  { id: 'terms', label: 'Terms of Use' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'partners', label: 'Partner & Broadcaster Agreement' },
  { id: 'agency', label: 'Agency Program Agreement' },
  { id: 'publisher', label: 'Publisher Terms & Conditions' },
  { id: 'community', label: 'Community Guidelines' },
  { id: 'payments', label: 'Payments & Earnings' },
  { id: 'safety', label: 'Safety & Reporting' },
  { id: 'third-party', label: 'Third-Party Licenses' },
]

const legalSections: LegalSection[] = [
  {
    id: 'terms',
    title: 'Terms of Use – Rovor',
    summary: 'Please read these Terms carefully. They govern your access to and use of every Rovor experience.',
    body: [
      `<p><strong>IMPORTANT NOTICE:</strong> THESE TERMS CONTAIN A BINDING ARBITRATION CLAUSE AND A WAIVER OF CLASS ACTIONS/JURY TRIALS (SEE <strong>SECTION 22</strong>). BY ACCESSING OR USING THE SERVICES, YOU AGREE TO THESE TERMS.</p>`,
      `<p><em>Last updated: November 10, 2025</em><br/><em>Legal entity:</em> Rovor Technologies, Inc. (and its affiliates, collectively, “Rovor,” “we,” “our,” or “us”).<br/><em>Primary contact:</em> <a href="mailto:info@rovor.com">info@rovor.com</a><br/><em>Principal place of business:</em> Address / City / Country.</p>`,
      `<h3>1. Introduction &amp; Acceptance</h3><p>These Terms of Use (the “Terms”) form a binding agreement between you (“you,” “your,” or “User”) and Rovor. They govern your access to and use of Rovor websites, applications, products, software, features, and related services (collectively, the “Services”).</p><p>By creating an account, accessing, or using any part of the Services you confirm that you have read, understood, and agree to these Terms, our Privacy Policy, Community Guidelines, Copyright Policy, and any additional program terms (together, the “Policies”). If you do not agree, do not use the Services. If you use Services provided by Rovor affiliates or subsidiaries (“Rovor Group”), additional terms may apply and are incorporated once accepted.</p>`,
      `<h3>2. Eligibility</h3><p>You must be at least eighteen (18) years old—or the age of majority where you live—and capable of forming a binding contract. By using the Services you warrant that you meet that requirement, have not been suspended or removed by Rovor, and that your use complies with law and these Terms. Rovor may suspend or terminate access if it suspects otherwise.</p>`,
      `<h3>3. Accounts &amp; Registration</h3><p>Some features require an account. You agree to (a) provide accurate and complete information, (b) keep it up to date, (c) keep your credentials secure and private, and (d) notify us of any unauthorized use. You are responsible for all activities that occur under your account.</p><p>Each natural person may maintain one account unless Rovor approves more in writing. Accounts are personal and non-transferable.</p><p><strong>Affiliated Services &amp; Data Sharing.</strong> To provide a seamless experience we may share your account information and broadcast content within the Rovor Group as described in the Privacy Policy. If you directly use an affiliated service, that service’s terms apply. You may request deletion of your account in settings, subject to our legal retention duties.</p><p>We may require identity verification (government ID, proof of address, payment method verification) and perform fraud, sanctions, and background checks where permitted. Failure to provide information can lead to suspension or termination.</p>`,
      `<h3>4. License to Use the Services</h3><p>Subject to your compliance with these Terms, Rovor grants you a limited, revocable, non-exclusive, non-transferable, non-sublicensable license to access and use the Services for lawful, intended purposes. You may not: copy or create derivatives; reverse engineer; use automated means to scrape or collect data; remove proprietary notices; or use the Services for illegal or unauthorized purposes. Third-party/open-source components remain governed by their own licenses.</p>`,
      `<h3>5. Ownership &amp; Intellectual Property</h3><p>The Services and all software, designs, text, graphics, logos, trademarks, audio, video, and other materials (“Rovor Content”) belong to Rovor or its licensors and are protected by law. Except for the limited license granted in Section 4, no rights are granted. <strong>Feedback.</strong> If you submit suggestions or ideas, you grant Rovor a perpetual, worldwide, irrevocable, royalty-free license to use them without restriction.</p>`,
      `<h3>6. Your Content &amp; License to Rovor</h3><p>You retain ownership of the content you submit, stream, or upload (“User Content”). By making User Content available you grant Rovor a worldwide, non-exclusive, transferable, sublicensable, royalty-free license to host, store, reproduce, adapt, translate, distribute, publicly perform, and display the User Content for operating, improving, promoting, and providing the Services and to meet legal obligations. This license survives closure of your account to the extent required for past sessions and compliance with law.</p><p>You represent that you have all necessary rights to your User Content, that it does not violate third-party rights or laws, and that it is free of malware. Rovor is not responsible for other users’ actions with respect to your User Content.</p>`,
      `<h3>7. Prohibited Content &amp; Moderation</h3><p>You may not post or share content that violates law, these Terms, or the Community Guidelines, including illegal activity, child exploitation (zero tolerance), harassment, hate, self-harm promotion, IP infringement, harmful misinformation, spam, scams, or malware.</p><p>Rovor uses automated tools and human review to moderate content. We may remove content, limit functionality, suspend or terminate accounts, and cooperate with law enforcement. Reporting tools are available for flagging violations.</p><p><strong>EU Digital Services Act.</strong> Where applicable, Rovor provides notice-and-action mechanisms, complaint handling, and human review of appeals. Abuse of reporting tools may result in restrictions.</p>`,
      `<h3>8. Acceptable Use &amp; User Representations</h3><p>You agree not to: use the Services if under the Age of Consent; impersonate others; scrape or harvest data without permission; upload malware or attempt to gain unauthorized access; solicit personal information or credentials; exploit bugs or disclose exploits publicly; violate sanctions/export controls; or use the Services for unapproved purposes. Rovor may investigate and refer matters to authorities.</p>`,
      `<h3>9. Third-Party Services &amp; Links</h3><p>The Services may link to or interoperate with third-party products (“Third-Party Services”). Rovor does not control and is not responsible for them. Use is at your own risk and governed by separate terms and privacy policies.</p>`,
      `<h3>10. Communications &amp; Fees</h3><p>Certain features may use SMS, voice, or data services. You are responsible for any carrier or third-party charges.</p>`,
      `<h3>11. Credits, Virtual Items &amp; Paid Features</h3><p>Rovor may offer balances, credits, in-app currencies, or virtual items (“Virtual Items”). Unless stated otherwise they have no real-world value, are non-transferable, non-refundable, and may be modified or discontinued at any time. You agree to pay all fees, taxes, and charges incurred. Self-gifting, fraud, or transferring Virtual Items outside the Services is prohibited.</p>`,
      `<h3>12. Promotions &amp; Offers</h3><p>Promotions, contests, or special offers may be subject to additional terms. In case of conflict, Promotion terms prevail.</p>`,
      `<h3>13. Updates, Changes &amp; Availability</h3><p>We may add, modify, or remove features; issue updates; or suspend Services in whole or part at any time. Some updates may install automatically. Continued use after changes constitutes acceptance.</p>`,
      `<h3>14. Storage &amp; Deletion</h3><p>Rovor is not obligated to store your User Content. We may set storage limits and remove content at our discretion. Please back up your content regularly.</p>`,
      `<h3>15. Suspension &amp; Termination</h3><p>You may stop using the Services at any time. Rovor may suspend or terminate access immediately for policy violations, legal risk, non-payment, infringement, security issues, fraud, prohibited content, or prolonged inactivity. Upon termination you must cease use; sections that logically survive termination remain in effect.</p>`,
      `<h3>16. Indemnification</h3><p>To the extent allowed by law, you will indemnify and hold harmless Rovor and its affiliates from claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from your use of the Services, your User Content, your violation of these Terms, or your violation of any third-party rights.</p>`,
      `<h3>17. Disclaimers</h3><p>YOU USE THE SERVICES AT YOUR OWN RISK. THEY ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND. ROVOR DISCLAIMS ALL EXPRESS OR IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. ROVOR DOES NOT WARRANT UNINTERRUPTED OR ERROR-FREE SERVICE AND IS NOT RESPONSIBLE FOR USER CONDUCT OR THIRD-PARTY SERVICES.</p>`,
      `<h3>18. Limitation of Liability</h3><p>TO THE MAXIMUM EXTENT PERMITTED, ROVOR AND ITS AFFILIATES ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLES, EVEN IF ADVISED OF POSSIBILITY. TOTAL LIABILITY WILL NOT EXCEED THE AMOUNT YOU PAID TO ROVOR IN THE SIX (6) MONTHS BEFORE THE CLAIM (OR USD $100 IF NONE). CLAIMS MUST BE BROUGHT WITHIN ONE YEAR.</p>`,
      `<h3>19. Export Controls &amp; Sanctions</h3><p>You must comply with all export control and sanctions laws, including U.S. regulations. You may not use the Services if you are located in or a resident of a comprehensively sanctioned region or appear on a restricted party list.</p>`,
      `<h3>20. U.S. Government Rights</h3><p>The Services and documentation are “commercial computer software” and “commercial computer software documentation.” Use by the U.S. Government is subject to these Terms.</p>`,
      `<h3>21. Governing Law</h3><p><strong>Choose the clause that applies:</strong></p><ul><li><strong>Non‑EU Users:</strong> New York law, USA.</li><li><strong>Indian Users:</strong> Laws of India, courts at New Delhi (subject to arbitration below).</li><li><strong>EU Users:</strong> Laws of the Republic of Ireland (or Cyprus).</li></ul><p>Mandatory consumer protections in your place of residence remain unaffected.</p>`,
      `<h3>22. Arbitration; Class Action &amp; Jury Trial Waiver</h3><p><strong>Informal resolution:</strong> You and Rovor will attempt to resolve disputes informally for 60 days after written notice.</p><p><strong>Binding arbitration:</strong> Unresolved disputes will be resolved by final, binding arbitration on an individual basis administered by the International Chamber of Commerce (ICC) with one arbitrator, seated in New York (or New Delhi for option B), in English. Either party may seek injunctive relief to protect IP or confidential information.</p><p><strong>Class action waiver:</strong> YOU AND ROVOR AGREE TO BRING CLAIMS ONLY IN AN INDIVIDUAL CAPACITY—NOT AS PLAINTIFF OR CLASS MEMBER IN A CLASS, COLLECTIVE, OR REPRESENTATIVE ACTION.</p><p><strong>30-day opt-out:</strong> You may opt out within 30 days of first accepting these Terms by emailing <a href="mailto:info@rovor.com">info@rovor.com</a>. If you opt out, Rovor is not bound by this clause either.</p>`,
      `<h3>23. Notices</h3><p>We may provide notices by email, in-product messages, push notifications, or postings. Notices are deemed given when sent or posted. Keep your contact information current.</p>`,
      `<h3>24. Changes to These Terms</h3><p>We may update these Terms and Policies. Material changes will be communicated as required by law. Continued use after changes means you accept them; otherwise you must stop using the Services and request deletion.</p>`,
      `<h3>25. General</h3><ul><li><strong>Entire Agreement.</strong> These Terms and Policies form the entire agreement.</li><li><strong>Severability.</strong> If any provision is invalid, the remainder stays in force.</li><li><strong>No Waiver.</strong> Failure to enforce a term is not a waiver.</li><li><strong>Assignment.</strong> You may not assign these Terms; Rovor may assign them freely.</li><li><strong>No Agency.</strong> No partnership, joint venture, or agency is created.</li><li><strong>Injunctive Relief.</strong> Rovor may seek injunctive relief without posting a bond.</li><li><strong>Headings.</strong> Headings are for convenience only.</li></ul>`,
      `<h3>26. Contact Us</h3><p>Questions? Email <a href="mailto:info@rovor.com">info@rovor.com</a> or mail us at Address / City / Country.</p>`,
      `<h3>Annex A – Copyright Complaints</h3><p>Send DMCA/ EU notices to <a href="mailto:copyright@rovor.app">copyright@rovor.app</a> including: (1) identification of the work; (2) identification of the infringing material; (3) contact information; (4) statement of good-faith belief; (5) statement under penalty of perjury that you are authorized; and (6) signature. Counter-notices must meet legal requirements.</p>`,
      `<h3>Annex B – EU Digital Services Act Point of Contact</h3><p>For EU matters under the DSA contact <a href="mailto:dsa@rovor.app">dsa@rovor.app</a> (English preferred). Additional DSA information is available in our Transparency Center.</p>`
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy – Rovor',
    summary: 'Understand how Rovor collects, uses, and protects your personal data across every touchpoint.',
    body: [
      `<p><em>Last updated: November 10, 2025</em></p>`,
      `<p>Rovor Technologies, Inc. ("Rovor," "we," "our," or "us") operates the website <a href="https://www.rovor.com/" target="_blank" rel="noopener noreferrer">https://www.rovor.com/</a>, the Rovor App, and related features and services (collectively, the "Services"). By accessing or using the Services you agree to this Privacy Policy ("Policy"). If you do not agree, discontinue use.</p>`,
      `<h3>1. Information We Collect</h3>`,
      `<h4>1.1 Account Information</h4><p>When you create an account we collect your name, email address, phone number, date of birth, username, and any profile details you choose to provide (such as a profile photo or bio). If you sign in through a third-party service like Google, we may also receive your platform user ID and any data you authorize.</p>`,
      `<h4>1.2 Payment Information</h4><p>If you purchase experiences or virtual items (such as RCoins) we collect billing details through PCI-compliant payment processors. We do not store full payment card numbers but retain transaction metadata for receipts, refunds, and fraud prevention.</p>`,
      `<h4>1.3 Identity Verification</h4><p>To keep Rovor secure we may request verification documents (for example, government-issued identification, proof of address, or a live selfie) for onboarding, compliance, or fraud reviews.</p>`,
      `<h4>1.4 Device &amp; Usage Data</h4><p>We automatically collect technical information including IP address, device identifiers, operating system, browser type, approximate location, log-ins, feature usage, and in-app interactions. This data helps us secure accounts, troubleshoot issues, and improve performance.</p>`,
      `<h4>1.5 Communication Data</h4><p>When you contact support or interact with us we collect your name, email, ticket history, and the content of your messages.</p>`,
      `<h4>1.6 Non-Personal Data</h4><p>We may collect aggregated or anonymized insights that do not directly identify you to analyze trends and enhance the Services.</p>`,
      `<h3>2. Tracking Technologies</h3><p>We use cookies, beacons, pixels, and similar technologies ("Tracking Technologies") to personalize experiences, remember preferences, analyze usage, and deliver relevant ads.</p>`,
      `<ul><li><strong>Necessary:</strong> Enable core site and app functionality.</li><li><strong>Functional:</strong> Remember preferences such as language and login sessions.</li><li><strong>Analytical:</strong> Help us understand performance and usage trends.</li><li><strong>Advertising:</strong> Support personalized offers and measure campaign effectiveness.</li></ul><p>You can manage cookies through browser or device settings, though disabling them may impact functionality.</p>`,
      `<h3>3. How We Use Personal Data</h3><p>We process personal data for the purposes outlined below.</p>`,
      `<table><thead><tr><th>Purpose</th><th>Legal Basis</th></tr></thead><tbody><tr><td>Provide and operate the Services</td><td>Performance of a contract</td></tr><tr><td>Manage accounts, security, and authentication</td><td>Legitimate interests</td></tr><tr><td>Process payments and transactions</td><td>Performance of a contract</td></tr><tr><td>Improve, develop, and test new features</td><td>Legitimate interests</td></tr><tr><td>Deliver customer support</td><td>Legitimate interests</td></tr><tr><td>Send marketing or promotional messages</td><td>Consent where required</td></tr><tr><td>Prevent fraud, enforce policies, comply with law</td><td>Legal obligations / legitimate interests</td></tr></tbody></table><p>We only process special category data (such as biometric verification) when required by law or with your explicit consent.</p>`,
      `<h3>4. Sharing Your Data</h3><p>We do not sell personal data. We may share it with affiliates in the Rovor Group, trusted service providers (hosting, analytics, payments, customer success, marketing), law enforcement where legally required, and business partners in connection with a merger, acquisition, or restructuring. Every transfer is covered by contractual and legal safeguards.</p>`,
      `<h3>5. Marketing &amp; Advertising</h3><p>We and approved partners may send promotional communications or display relevant ads based on your interactions. You can opt out at any time via the unsubscribe link or by emailing <a href="mailto:info@rovor.com">info@rovor.com</a>.</p>`,
      `<h3>6. International Data Transfers</h3><p>Your data may be stored or processed outside your home country. Where required we use safeguards such as Standard Contractual Clauses to ensure equivalent protection.</p>`,
      `<h3>7. Third-Party Links &amp; Services</h3><p>The Services may link to or integrate with third-party platforms. Their privacy practices are independent. Review their policies before sharing personal data.</p>`,
      `<h3>8. Minors</h3><p>Rovor is intended for users aged 18 and older. We do not knowingly collect personal data from minors. If you believe a minor has provided data, contact <a href="mailto:info@rovor.com">info@rovor.com</a> so we can delete it.</p>`,
      `<h3>9. Data Retention</h3><p>We retain personal data only as long as necessary for the purposes described or as required by law. When no longer needed it is securely deleted or anonymized.</p>`,
      `<h3>10. Your Privacy Rights</h3><p>Depending on your jurisdiction you may have rights to access, correct, delete, restrict, or object to processing; withdraw consent; request portability; or lodge a complaint with a supervisory authority. To exercise rights, contact <a href="mailto:info@rovor.com">info@rovor.com</a>. We may request identity verification.</p>`,
      `<h3>11. Authorized Agents</h3><p>You may appoint an authorized agent to submit privacy requests by providing written authorization. The agent must verify their identity and authority.</p>`,
      `<h3>12. Account Deletion</h3><p>You can delete your account via settings or by emailing <a href="mailto:info@rovor.com">info@rovor.com</a>. Requests are processed within 30 days, though some data may be retained to meet legal or legitimate business obligations.</p>`,
      `<h3>13. Data Security</h3><p>We use administrative, technical, and physical safeguards to protect data against unauthorized access, alteration, or loss. No security program is impenetrable, so please use caution when sharing information.</p>`,
      `<h3>14. Updates to This Policy</h3><p>We may update this Policy. Changes will appear in the Services with a new “Last Updated” date. Continued use after updates indicates acceptance.</p>`,
      `<h3>15. Controlling Language</h3><p>This Policy is provided in English. In case of discrepancy, the English version prevails.</p>`,
      `<h3>16. Contact Us</h3><p>Email <a href="mailto:info@rovor.com">info@rovor.com</a> or write to Address / City / Country with any questions about this Policy.</p>`
    ],
  },
  {
    id: 'partners',
    title: 'Partner & Broadcaster Agreement',
    summary: 'Obligations and monetization rules for Rovor broadcasters, adapted from Tango’s framework.',
    body: [
      `<p><em>Last updated: November 10, 2025</em></p>`,
      `<p>This Broadcaster Agreement (“Agreement”) governs how Rovor partners create, publish, and monetize livestream content across the Rovor Platform. It adapts core obligations from the Tango broadcaster framework for Rovor’s experience layer. Read alongside the Terms of Use, Privacy Policy, and Community Guidelines; capitalized terms not defined here have the meanings in those documents.</p>`,
      `<h3>1. Introduction</h3>`,
      `<p>By accepting this Agreement or streaming on Rovor, you agree to the policies referenced above. The Agreement details rights and responsibilities between you (“Broadcaster”) and Rovor regarding content distribution and monetization.</p>`,
      `<h3>2. Eligibility</h3>`,
      `<ul><li>You must be at least 18 and located in a jurisdiction where Rovor operates.</li><li>Eligibility is subject to Rovor review. Until we confirm, you may not stream in an official capacity.</li><li>Provide accurate onboarding information and stay current with tax, legal, and compliance requests.</li><li>We may revoke eligibility, suspend broadcasts, or withhold payments if information is incomplete or policies are violated.</li><li>Broadcast access is personal—you may not share or transfer your account.</li></ul>`,
      `<h3>3. Broadcaster Content</h3>`,
      `<ul><li>You are solely responsible for the broadcast content you create or distribute.</li><li>You must hold all necessary rights for music, video, imagery, and likenesses used within your stream.</li><li>You grant Rovor and affiliates an exclusive, worldwide, royalty-free, sublicensable license to use your content across Rovor properties (including partner channels) for delivery, promotion, analytics, and improvement.</li><li>Content appears subject to Rovor’s policies, including reuse on affiliated platforms. Check any additional terms where you log in directly.</li><li>Prohibited conduct includes nudity, explicit sexual behavior, illicit substances, violent imagery, weapons, and other material flagged in the Community Guidelines.</li><li>The license survives termination of the Agreement to the extent needed for legal and operational purposes.</li></ul>`,
      `<h3>4. Platform Use</h3>`,
      `<ul><li>Do not impersonate others, misrepresent affiliations, or share fraudulent contact details.</li><li>Respect privacy rights; do not disclose personal information without consent.</li><li>Avoid harmful, obscene, hateful, or illegal content, including self-harm or dangerous acts.</li><li>Commercial messaging is only allowed when Rovor approves.</li><li>Follow all applicable laws, including intellectual property, data protection, and advertising regulations.</li></ul>`,
      `<h3>5. Endorsements &amp; Testimonials</h3>`,
      `<p>Disclose paid or sponsored relationships in accordance with FTC guidelines and any local advertising rules. You are solely responsible for truthful, transparent endorsements.</p>`,
      `<h3>6. Diamonds Program</h3>`,
      `<ol><li>Users may gift Digital Items that convert to Diamonds in your account; Rovor sets valuation.</li><li>Diamonds do not equal cash until withdrawn and may be subject to fees, limits (e.g., 400,000 Diamonds/day), and tax obligations.</li><li>Rovor may withhold or reclaim Diamonds for inactivity, fraud, policy breaches, or unresolved appeal outcomes.</li><li>You must redeem promotional Diamonds within 45 days. Unredeemed balances may be temporarily confiscated and reinstated upon return.</li><li>You are responsible for taxes and fees associated with redemptions.</li></ol>`,
      `<h3>7. Representations &amp; Warranties</h3>`,
      `<ul><li>You meet all eligibility requirements and comply with Rovor policies and applicable law.</li><li>You have authority to enter the Agreement and your details remain accurate.</li><li>You are not a sanctioned person and are not located in a comprehensively sanctioned jurisdiction.</li></ul>`,
      `<h3>8. Modifications</h3>`,
      `<p>Rovor may update the Agreement with notice (email, in-product messaging, or website posting). Changes take effect 30 days after notice unless otherwise stated. If you disagree, discontinue broadcasting; continued use indicates acceptance.</p>`,
      `<h3>9. Disclaimers</h3>`,
      `<p>Rovor provides the Platform “as is.” We disclaim all warranties of merchantability, fitness, and non-infringement to the fullest extent permitted by law. No statement by Rovor staff creates additional warranties.</p>`,
      `<h3>10. Indemnification</h3>`,
      `<p>You will indemnify and hold harmless Rovor and affiliates from claims arising out of your broadcasts, policy breaches, unlawful conduct, or content.</p>`,
      `<h3>11. Limitation of Liability</h3>`,
      `<p>Rovor is not liable for indirect, incidental, consequential, special, exemplary, or punitive damages. Aggregate liability is limited to amounts paid to you in the previous 12 months.</p>`,
      `<h3>12. General</h3>`,
      `<ul><li>Sections on governing law and dispute resolution in the Terms of Use apply.</li><li>Notices must be in writing; Rovor sends to your registered email, and you must send to <a href="mailto:legal@rovor.com">legal@rovor.com</a>.</li><li>The parties are independent contractors with no agency or partnership created.</li><li>You may not assign this Agreement without consent; Rovor may assign to affiliates or successors.</li><li>Waivers must be written. If a term is unenforceable, remaining provisions continue in effect.</li><li>This Agreement, together with incorporated policies, is the entire agreement for broadcaster activity on Rovor.</li></ul>`
    ],
  },
  {
    id: 'agency',
    title: 'Agency Program Agreement – Rovor',
    summary: 'Terms governing agencies that recruit creators and supporters into the Rovor ecosystem.',
    body: [
      `<p><em>Last updated: November 10, 2025</em></p>`,
      `<h3>1. Introduction</h3><p>Welcome to Rovor’s Agency Program (the “Program”). This Agreement is a binding contract between Rovor Technologies, Inc. (“Rovor,” “we,” “our,” or “us”) and you (“Agent,” “you,” or “your”) governing your participation as an agency partner. Agents help recruit broadcasters/creators and supporters to Rovor’s live products and services (“Platform”) to grow content output and community engagement. This Agreement supplements the Rovor Terms of Use (“Platform Terms”); if the documents conflict, this Agreement prevails for Program matters.</p>`,
      `<h3>2. Participation in the Program</h3><ul><li><strong>Eligibility.</strong> Only registered users in good standing may join. Rovor may approve or deny participation at its discretion.</li><li><strong>Referral ID.</strong> Use your unique referral link or code (“Referral ID”) for every signup to qualify for commissions; it is personal and non-transferable.</li><li><strong>Reward Units.</strong> Commissions rely on internal Rovor metrics tied to RCoins and Digital Items. These instruments have no intrinsic cash value; cash payouts derive from Rovor’s conversion rules.</li><li><strong>Conduct.</strong> Act with integrity, comply with laws and Rovor policies (including Community Guidelines), and avoid deceptive practices or reputational harm.</li><li><strong>Compliance Review.</strong> Rovor may reject referrals, require identity or sanctions checks, and investigate fraud or risk at any time.</li><li><strong>Consequences.</strong> Violations can result in removal from the Program or Platform, clawback of commissions, and other remedies.</li></ul>`,
      `<h3>3. Commission &amp; Performance Objectives</h3><ul><li><strong>Broadcaster/Creator Commission.</strong> Earn up to 15% of net eligible creator earnings for 24 months after a referred broadcaster registers using your Referral ID. Net earnings equal redeemed RCoins-based monetization minus refunds, chargebacks, fees, taxes, and similar adjustments.</li><li><strong>Supporter Commission.</strong> Earn 5% of net eligible virtual-item purchases for six months after a referred supporter registers via your Referral ID, following the same adjustments.</li><li><strong>Role Classification.</strong> Each referral counts as either broadcaster/creator or supporter—not both—based on the onboarding flow.</li><li><strong>Program Changes.</strong> Rovor may change commission rates, objectives, payout schedules, or rules via in-app notices, Program pages, or email. Continued participation means acceptance; otherwise, stop participating.</li><li><strong>Performance Objectives.</strong> Rovor may impose targets such as minimum active creators, quality thresholds, or fraud limits. Missing objectives can reduce commissions or result in suspension.</li><li><strong>Taxes.</strong> Commissions include indirect taxes unless stated; you must handle all tax reporting and payments.</li><li><strong>Payouts &amp; Clawbacks.</strong> Payouts follow Program schedules and may require KYC/AML checks. Rovor may offset or claw back amounts for fraud, abuse, error, or ineligibility.</li></ul>`,
      `<h3>4. Non-Compete &amp; Non-Solicitation</h3><p>During the Program and for 12 months afterward you will not solicit, induce, or encourage referred broadcasters to leave Rovor or prioritize competitors, nor offer incentives to move elsewhere. Rovor may seek injunctive relief and other remedies. If any restriction is unenforceable, it will be narrowed to the minimum enforceable scope.</p>`,
      `<h3>5. Term &amp; Termination</h3><p>Rovor may suspend or terminate your Program participation at any time with or without cause. You may opt out via the designated method. Earned commissions not otherwise forfeited will be paid per schedule, but breaches forfeit unpaid amounts. Sections intended to survive—payment, non-compete, confidentiality, indemnity, limitations, dispute resolution, and general terms—remain in effect.</p>`,
      `<h3>6. Limitation of Liability; Disclaimer</h3><p>The Program and Platform are provided “as is” and “as available.” Rovor disclaims all warranties to the fullest extent permitted. Rovor’s total liability connected to the Program will not exceed USD $500, and claims must be filed within one year of accrual.</p>`,
      `<h3>7. Independent Contractor; No Authority</h3><p>You operate as an independent contractor and may not bind Rovor without express written authorization.</p>`,
      `<h3>8. Governing Law &amp; Arbitration</h3><p>The governing law and dispute resolution provisions selected in the Rovor Terms of Use (including arbitration, seat, and class-action waiver) apply here and are incorporated by reference.</p>`,
      `<h3>9. Miscellaneous</h3><ul><li>This Agreement plus the Platform Terms constitute the entire agreement for the Program.</li><li>Rovor may update these terms as stated in Section 3.4; discontinue participation if you disagree.</li><li>You may not assign this Agreement without Rovor’s consent; Rovor may assign to affiliates or successors.</li><li>If any provision is invalid, the remainder stays effective; waivers must be written and signed by Rovor.</li><li>Program notices may appear in-app, via email, or on the Program page. Contact <a href="mailto:info@rovor.com">info@rovor.com</a> for support.</li></ul>`
    ],
  },
  {
    id: 'publisher',
    title: 'Rovor Publisher Terms & Conditions',
    summary: 'Commercial terms for publishers running Rovor campaigns through insertion orders.',
    body: [
      `<p><em>Last updated: November 10, 2025</em></p>`,
      `<p>This Rovor Publisher Agreement (“Agreement”) governs how third-party publishers (“Publishers”) deliver campaigns for Rovor Technologies, Inc. (“Rovor”). Participation—whether by signing an insertion order (IO) or trafficking ads—constitutes acceptance of these terms.</p>`,
      `<h3>1. Definitions</h3><p>Key definitions include: “Action” (qualified user interaction), “Ads” (Rovor creative assets), “Approved Transactions” (validated Actions), “Campaign Conditions,” “Fraudulent Activity,” “IO,” “Media Properties,” and “Objectionable Content.”</p>`,
      `<h3>2. Scope of the Campaign</h3><p>Rovor grants a limited, revocable license to place Ads as set forth in the IO. Publishers must show Ads only in approved inventory, keep creatives intact, ensure visibility, and comply with tracking and campaign requirements. Rovor’s tracking (or designated third party) is final for billing.</p>`,
      `<h3>3. Restrictions</h3><p>Publishers may not serve Ads on unapproved properties, modify creatives, generate fraudulent traffic, position Ads near Objectionable Content, resell inventory, or harvest data without consent. Breaches can trigger termination, payment forfeiture, and legal action.</p>`,
      `<h3>4. Warranties</h3><p>Each Party warrants authority to enter this Agreement. Rovor warrants the Ads do not knowingly infringe third-party rights. Publishers warrant their properties are lawful, free of Objectionable Content, and compliant with privacy requirements.</p>`,
      `<h3>5. Intellectual Property</h3><p>Ads and campaign data remain Rovor property. Publishers receive a non-transferable license solely to run the campaign and may not use Rovor marks without consent.</p>`,
      `<h3>6. Payment</h3><p>Rovor pays based on Approved Transactions per the IO pricing model (CPC, CPI, CPA, or CPM). Reports from Rovor tracking govern invoicing. Payments are due within 30 days once invoices exceed USD $500. Rovor may withhold funds tied to fraud, invalid traffic, or disputes and can offset overpayments.</p>`,
      `<h3>7. Data Protection</h3><p>Publishers must comply with GDPR, CCPA, and other privacy laws; maintain transparent privacy notices; secure necessary consents; avoid processing data from children under 13; and coordinate with Rovor on data subject requests or incidents.</p>`,
      `<h3>8. Confidentiality</h3><p>Both Parties must protect Confidential Information and limit disclosures except as required by law. Obligations survive for three years after termination.</p>`,
      `<h3>9. Indemnification</h3><p>Each Party indemnifies the other for claims arising from its breach, misuse of data, or unlawful conduct.</p>`,
      `<h3>10. Limitation of Liability</h3><p>Neither Party is liable for indirect or consequential damages. Rovor’s aggregate liability is capped at the amounts paid to the Publisher in the prior 12 months.</p>`,
      `<h3>11. Term and Termination</h3><p>The Agreement remains in force until either Party provides 48-hour written notice. Rovor may terminate immediately for fraud, legal violations, or policy breaches. Upon termination, Publishers must stop serving Ads and delete materials; validated outstanding amounts will be settled within 60 days.</p>`,
      `<h3>12. Miscellaneous</h3><p>Force majeure applies; Rovor may reference Publishers in marketing; assignments require Rovor consent; amendments may be posted online; parties act as independent contractors; notices go to <a href="mailto:info@rovor.com">info@rovor.com</a> or IO addresses.</p>`,
      `<h3>13. Governing Law</h3><p>The Agreement is governed by Indian law with exclusive jurisdiction in New Delhi courts.</p>`,
      `<h3>Contact</h3><p>Reach Rovor Technologies, Inc. at <a href="mailto:info@rovor.com">info@rovor.com</a> for all publisher correspondence.</p>`
    ],
  },
  {
    id: 'community',
    title: 'Community Guidelines – Rovor',
    summary: 'Policies that keep the Rovor community respectful, authentic, and safe for every member.',
    body: [
      `<p><em>Last updated: November 10, 2025</em></p>`,
      `<p>Rovor empowers people to express themselves, connect, and collaborate through live streaming and interactive experiences. These Community Guidelines apply to all members (“Members”) and every surface—live broadcasts, recordings, posts, messages, and comments. By using Rovor you agree to uphold these standards, which form part of the Terms of Use.</p>`,
      `<p>We combine proactive detection with human moderation, and we rely on community reports via in-app tools or <a href="mailto:info@rovor.com">info@rovor.com</a>. Violations may lead to enforcement actions described below.</p>`,
      `<h3>1. Personal Safety</h3><p>Rovor maintains zero tolerance for content or conduct that endangers individuals or the community, including violence, self-harm, terrorism or extremism, drug abuse, or exploitation of minors. Report dangerous activity immediately to <a href="mailto:info@rovor.com">info@rovor.com</a>.</p>`,
      `<h3>2. Sexual Content and Behavior</h3><p>Sexually explicit, suggestive, or pornographic material is prohibited. Members may not engage in sexual acts, display nudity, solicit sexual services, or use sexualized gestures or emojis. Severe violations can trigger account removal and legal escalation.</p>`,
      `<h3>3. Respect and Inclusion</h3><p>Harassment, hate speech, bullying, intimidation, and discrimination—including attacks based on race, ethnicity, religion, gender, sexual orientation, nationality, or disability—are not tolerated. Healthy debate is welcome; abuse is not.</p>`,
      `<h3>4. Authenticity</h3><p>Share only original or authorized content. Impersonation, fake accounts, deceptive personas, and manipulated media intended to mislead others are prohibited.</p>`,
      `<h3>5. Privacy and Personal Information</h3><p>Do not disclose private or identifying information without consent. This includes real names, contact details, financial data, or identification documents. Misuse of personal data may result in immediate action.</p>`,
      `<h3>6. Intellectual Property</h3><p>Respect others’ copyrights, trademarks, and IP rights. Do not upload unauthorized music, video, artwork, or code. Contact <a href="mailto:info@rovor.com">info@rovor.com</a> to report infringement; see the Copyright Policy for claim procedures.</p>`,
      `<h3>7. Malicious and Deceptive Practices</h3><p>Prohibited behaviors include hacking, phishing, spamming, fake engagement, distributing malware, or using bots or unauthorized tools to manipulate the Platform.</p>`,
      `<h3>8. Compliance with Laws</h3><p>Members must follow all applicable laws concerning data protection, financial transactions, and online content. Illegal activity may be reported to authorities.</p>`,
      `<h3>9. Enforcement</h3><p>Consequences for violations can include warnings, feature restrictions, suspension, permanent account removal, loss of earnings, or reports to law enforcement. Enforcement decisions are final, and severe or repeated violations may result in global bans.</p>`,
      `<h3>10. Updates</h3><p>We may update these Guidelines; changes take effect when posted. Continued use after updates means you accept the revisions.</p>`,
      `<h3>Contact</h3><p>Email <a href="mailto:info@rovor.com">info@rovor.com</a> or write to our mailing address for questions or reports.</p>`
    ],
  },
  {
    id: 'payments',
    title: 'Payments & Earnings',
    summary: 'Learn how pricing, payouts, and refunds work across Rovor experiences.',
    body: [
      'Partners set their rates. Rovor deducts a platform fee and releases payouts weekly to verified bank accounts or payment providers.',
      'Users are charged at the time of booking or during live sessions. Refunds are handled in accordance with our dispute process.'
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Reporting',
    summary: 'We encourage you to flag issues so we can act quickly and keep the community safe.',
    body: [
      'Use the in-session menu or account dashboard to report abuse or suspicious behaviour. Our team reviews multimedia evidence, session logs, and takes immediate action when necessary.',
      'We may cooperate with law-enforcement when violations include threats, fraud, or exploitation.'
    ],
  },
  {
    id: 'third-party',
    title: 'Third-Party Software Notices & Licenses – Rovor',
    summary: 'Review open-source attributions, license texts, and vendor acknowledgments used across the Rovor stack.',
    body: [
      `<p><em>Last updated: November 10, 2025</em></p>`,
      `<p>Rovor Technologies, Inc. ("Rovor", "we", "our") uses open-source and third-party components in the Rovor mobile and web applications. This page lists required attributions and includes the corresponding license texts. For questions email <a href="mailto:info@rovor.com">info@rovor.com</a>.</p>`,
      `<blockquote><p><strong>Note:</strong> Some items reference external projects or websites for full license texts. Where possible we include the full license; otherwise, we link to the canonical source named by the original project.</p></blockquote>`,
      `<h3>Open-Source &amp; Third-Party Notices</h3>`,
      `<h4>Expat (MIT/Expat)</h4><p>Copyright (c) 1998, 1999, 2000 Thai Open Source Software Center Ltd.</p><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>`,
      `<h4>OpenSSL</h4><p>Copyright (c) 1998–2011 The OpenSSL Project. All rights reserved.</p><p>Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:</p><ol><li>Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.</li><li>Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.</li><li>All advertising materials mentioning features or use of this software must display the acknowledgment: “This product includes software developed by the OpenSSL Project for use in the OpenSSL Toolkit.” (<a href="http://www.openssl.org/" target="_blank" rel="noopener noreferrer">http://www.openssl.org/</a>)</li><li>The names “OpenSSL Toolkit” and “OpenSSL Project” must not be used to endorse or promote products derived from this software without prior written permission. For written permission, please contact <a href="mailto:openssl-core@openssl.org">openssl-core@openssl.org</a>.</li><li>Products derived from this software may not be called “OpenSSL” nor may “OpenSSL” appear in their names without prior written permission of the OpenSSL Project.</li><li>Redistributions of any form whatsoever must retain the acknowledgment: “This product includes software developed by the OpenSSL Project for use in the OpenSSL Toolkit.”</li></ol><p>THIS SOFTWARE IS PROVIDED BY THE OPENSSL PROJECT “AS IS” AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE OPENSSL PROJECT OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES. Acknowledgments: includes cryptographic software written by Eric Young (<a href="mailto:eay@cryptsoft.com">eay@cryptsoft.com</a>) and software written by Tim Hudson (<a href="mailto:tjh@cryptsoft.com">tjh@cryptsoft.com</a>).</p>`,
      `<h4>Google Protocol Buffers – Generated Code License</h4><p>Copyright 2008, Google Inc. All rights reserved.</p><p>Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:</p><ul><li>Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.</li><li>Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.</li><li>Neither the name of Google Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.</li></ul><p>THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES ARE DISCLAIMED. Code generated by the Protocol Buffer compiler is owned by the owner of the input file. It requires the Protocol Buffer runtime library, which is covered by the same license.</p>`,
      `<h4>zlib</h4><p>Copyright (C) 1995–2010 Jean-loup Gailly and Mark Adler.</p><p>This software is provided “as-is”, without warranty of any kind. Permission is granted to use, alter, and redistribute the software freely, subject to: (1) The origin must not be misrepresented; (2) Altered versions must be plainly marked; (3) This notice may not be removed.</p>`,
      `<h4>Speex / Xiph.Org Foundation</h4><p>© 2002–2003, Jean-Marc Valin / Xiph.Org Foundation.</p><p>Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:</p><ul><li>Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.</li><li>Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.</li><li>Neither the name of the Xiph.org Foundation nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.</li></ul><p>THIS SOFTWARE IS PROVIDED “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES ARE DISCLAIMED.</p>`,
      `<h4>Google WebRTC</h4><p>Copyright (c) 2011, Google Inc. All rights reserved.</p><p>Redistribution and use in source and binary forms, with or without modification, are permitted subject to standard three-clause BSD conditions. THIS SOFTWARE IS PROVIDED “AS IS” WITHOUT WARRANTIES.</p>`,
      `<h4>Cisco libSRTP</h4><p>Copyright (c) 2001–2005 Cisco Systems, Inc. All rights reserved.</p><p>Redistribution and use in source and binary forms, with or without modification, are permitted under the three-clause BSD terms. THIS SOFTWARE IS PROVIDED “AS IS” WITHOUT WARRANTIES.</p>`,
      `<h4>Google libjingle</h4><p>Copyright 2004–2007, Google Inc.</p><p>Redistribution and use in source and binary forms, with or without modification, are permitted provided standard BSD conditions are met. THIS SOFTWARE IS PROVIDED “AS IS”.</p>`,
      `<h4>C# ProtoGen (Protocol Buffers – .NET)</h4><p>Protocol Buffers – Google’s data interchange format. Copyright 2008–2010 Google Inc.</p><p>Redistribution and use in source and binary forms, with or without modification, are permitted under BSD-style terms. Original repositories: <a href="http://github.com/jskeet/dotnet-protobufs/" target="_blank" rel="noopener noreferrer">dotnet-protobufs</a>, <a href="http://code.google.com/p/protobuf/" target="_blank" rel="noopener noreferrer">protobuf</a>.</p>`,
      `<h4>Microsoft Silverlight Windows Phone Toolkit (Ms-PL)</h4><p>Licensed under the Microsoft Public License (Ms-PL). Key points: copyright and patent grants; no trademark license; patent claim termination; notice preservation; source distribution requirements; provided “AS IS”.</p>`,
      `<h4>LLVM CLANG ConvertUTF</h4><p>University of Illinois / NCSA Open Source License and Unicode, Inc. disclaimers apply. Redistribution requires preservation of copyright, conditions, and disclaimers.</p>`,
      `<h4>Apache-2.0 Components</h4><p>Includes Android PagerSlidingTabStrip, Android ViewPagerIndicator, android-support-v7-appcompat, android-switch-backport, Google Play Services, StaggeredGridView, DragSortListView, CWAC libraries, FlowLayout, Square OkHttp, Apache Commons Lang, Facebook Three20, OpenStack, and others licensed under Apache License 2.0 (<a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">http://www.apache.org/licenses/LICENSE-2.0</a>).</p>`,
      `<h4>Lua (MIT)</h4><p>MIT License © 1994–2013 Lua.org, PUC-Rio. Full text available at <a href="http://www.lua.org/license.html" target="_blank" rel="noopener noreferrer">lua.org</a>.</p>`,
      `<h4>BSD-3-Clause Components</h4><p>Includes libogg, libvorbis, Erica Sadun’s Code, Colloquy Chat Core, OpenCV, and other BSD-licensed libraries. Redistribution requires retention of copyright and disclaimer notices.</p>`,
      `<h4>SQLite (Public Domain)</h4><p>SQLite is in the public domain (<a href="http://www.sqlite.org/" target="_blank" rel="noopener noreferrer">sqlite.org</a>).</p>`,
      `<h4>uriparser (BSD-3-Clause)</h4><p>Licensed under BSD-3-Clause as provided by Weijia Song and Sebastian Pipping.</p>`,
      `<h4>Moai (CPAL-1.0)</h4><p>Common Public Attribution License v1.0 (<a href="http://opensource.org/licenses/cpal_1.0" target="_blank" rel="noopener noreferrer">CPAL-1.0</a>).</p>`,
      `<h4>Flurry (Terms of Service)</h4><p>Subject to Flurry Terms of Service (<a href="http://www.flurry.com/tos.html" target="_blank" rel="noopener noreferrer">flurry.com</a>).</p>`,
      `<h4>Custom Licensing Agreements</h4><p>Aviary, vSoft, and PJSIP integrations operate under custom agreements with Rovor. Contact <a href="mailto:info@rovor.com">info@rovor.com</a> for details.</p>`,
      `<h4>Additional Apache-2.0 Components</h4><p>Includes apache_mime4j_core, android_support_v4, and ACRA. Refer to <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">Apache License 2.0</a>.</p>`,
      `<h4>MIT-Licensed Libraries</h4><p>Includes jsoncpp, TLCommon, Lambda Alert, PayPal card.io, AgileBits 1Password App Extension, and others under the MIT License. Refer to project repositories for full text.</p>`,
      `<h4>cURL (MIT-like)</h4><p>cURL licensed under an MIT-like license. See <a href="http://curl.haxx.se/docs/copyright.html" target="_blank" rel="noopener noreferrer">curl.haxx.se</a>.</p>`,
      `<h4>Boost Software License 1.0</h4><p>Applies to Boost libraries (<a href="http://www.boost.org/users/license.html" target="_blank" rel="noopener noreferrer">boost.org</a>).</p>`,
      `<h4>rapidjson (MIT)</h4><p>rapidjson distributed under the MIT License (<a href="https://code.google.com/p/rapidjson" target="_blank" rel="noopener noreferrer">rapidjson</a>).</p>`,
      `<h4>Eigen (MPL-2.0)</h4><p>Licensed under Mozilla Public License 2.0 (<a href="http://www.mozilla.org/MPL/2.0/" target="_blank" rel="noopener noreferrer">MPL-2.0</a>). Source: <a href="https://bitbucket.org/eigen/eigen/" target="_blank" rel="noopener noreferrer">Eigen repository</a>.</p>`,
      `<h4>UIDevice-with-UniqueIdentifier-for-iOS-5 (MIT)</h4><p>Licensed under MIT.</p>`,
      `<h4>Microsoft Public License (Ms-PL) – Summary</h4><p>Full Ms-PL terms outline reproduction rights, patent grants, and “AS IS” provisions.</p>`,
      `<h4>Mersenne Twister (BSD-like)</h4><p>Copyright (C) 1997–2002, Makoto Matsumoto and Takuji Nishimura. Redistribution permitted provided notices remain and authors are acknowledged.</p>`,
      `<h4>Contact</h4><p>For license inquiries or attributions not listed here, contact <a href="mailto:info@rovor.com">info@rovor.com</a>.</p>`
    ],
  }
]

export default function LegalPage() {
  const [activeSectionId, setActiveSectionId] = useState(legalSections[0].id)
  const activeSection = useMemo(
    () => legalSections.find((section) => section.id === activeSectionId) ?? legalSections[0],
    [activeSectionId]
  )

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarHeading}>Service Info</h2>
          <nav aria-label="Legal navigation" className={styles.sidebarNav}>
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`${styles.sidebarLink} ${activeSectionId === link.id ? styles.sidebarLinkActive : ''}`}
                onClick={() => setActiveSectionId(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className={styles.contentArea}>
          <div className={styles.metaRow}>
            <span className={styles.stamp}>Last Updated · 10 November 2025</span>
            <span className={styles.languagePill}>English</span>
          </div>

          <article id={activeSection.id} className={styles.sectionBlock}>
            <h1 className={styles.sectionTitle}>{activeSection.title}</h1>
            {activeSection.summary ? (
              <p className={styles.sectionSummary}>{activeSection.summary}</p>
            ) : null}
            {activeSection.body.map((paragraph) => (
              <div
                key={paragraph}
                className={styles.sectionBody}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </article>
        </section>
      </main>
    </div>
  )
}
