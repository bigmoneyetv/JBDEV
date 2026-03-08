import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d0d0f;
    --paper: #f5f2ed;
    --cream: #faf8f4;
    --gold: #c9a84c;
    --gold-light: #e8c96a;
    --gold-pale: #f5ecd0;
    --slate: #3a3a4a;
    --muted: #7a7a8a;
    --border: #e0dbd0;
    --green: #1a6b4a;
    --green-bg: #eef7f2;
  }

  body { margin: 0; padding: 0; }

  .kit {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
  }

  /* NAV */
  .nav {
    background: var(--ink);
    padding: 0 32px;
    display: flex;
    align-items: center;
    gap: 0;
    border-bottom: 2px solid var(--gold);
    position: sticky;
    top: 0;
    z-index: 100;
    overflow-x: auto;
  }
  .nav-brand {
    font-family: 'Playfair Display', serif;
    color: var(--gold);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 16px 24px 16px 0;
    border-right: 1px solid rgba(201,168,76,0.3);
    margin-right: 8px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .nav-tab {
    padding: 16px 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    cursor: pointer;
    border: none;
    background: transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .nav-tab:hover { color: rgba(255,255,255,0.8); }
  .nav-tab.active { color: var(--gold-light); border-bottom-color: var(--gold); }

  /* SECTIONS */
  .section { display: none; padding: 48px 32px; max-width: 960px; margin: 0 auto; }
  .section.active { display: block; }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 900;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 16px;
  }
  .section-desc {
    font-size: 17px;
    color: var(--muted);
    font-weight: 300;
    max-width: 560px;
    line-height: 1.7;
    margin-bottom: 48px;
  }

  /* PRICING */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 2px solid var(--ink);
    border-radius: 2px;
    overflow: hidden;
  }
  @media (max-width: 700px) { .pricing-grid { grid-template-columns: 1fr; } }

  .tier {
    background: var(--paper);
    border-right: 2px solid var(--ink);
    display: flex;
    flex-direction: column;
  }
  .tier:last-child { border-right: none; }
  .tier.featured { background: var(--ink); color: white; }

  .tier-header {
    padding: 28px 28px 24px;
    border-bottom: 2px solid var(--ink);
  }
  .tier.featured .tier-header { border-bottom-color: rgba(255,255,255,0.15); }

  .tier-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .tier.featured .tier-name { color: var(--gold-light); }

  .tier-tagline {
    font-size: 12px;
    color: var(--muted);
    font-style: italic;
    margin-bottom: 20px;
  }
  .tier.featured .tier-tagline { color: rgba(255,255,255,0.5); }

  .tier-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }
  .price-setup {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .tier.featured .price-setup { color: rgba(255,255,255,0.4); }
  .price-amount {
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 900;
    line-height: 1;
  }
  .tier.featured .price-amount { color: var(--gold-light); }
  .price-suffix { font-size: 14px; color: var(--muted); font-weight: 400; }
  .tier.featured .price-suffix { color: rgba(255,255,255,0.5); }
  .price-retainer {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 500;
  }
  .tier.featured .price-retainer { color: rgba(255,255,255,0.6); }

  .tier-body { padding: 24px 28px; flex: 1; }
  .tier-features { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .tier-feature {
    font-size: 14px;
    color: var(--slate);
    display: flex;
    align-items: flex-start;
    gap: 10px;
    line-height: 1.5;
  }
  .tier.featured .tier-feature { color: rgba(255,255,255,0.85); }
  .feat-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--green-bg);
    color: var(--green);
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    font-weight: 700;
  }
  .tier.featured .feat-check { background: rgba(201,168,76,0.2); color: var(--gold-light); }
  .feat-x { background: #fef0f0; color: #c44; }
  .tier.featured .feat-x { background: rgba(255,100,100,0.1); color: rgba(255,150,150,0.8); }

  .tier-footer { padding: 20px 28px 28px; }
  .tier-cta {
    display: block;
    width: 100%;
    padding: 14px;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    border: 2px solid var(--ink);
    background: transparent;
    color: var(--ink);
    border-radius: 2px;
  }
  .tier-cta:hover { background: var(--ink); color: var(--paper); }
  .tier.featured .tier-cta {
    background: var(--gold);
    color: var(--ink);
    border-color: var(--gold);
  }
  .tier.featured .tier-cta:hover {
    background: var(--gold-light);
    border-color: var(--gold-light);
  }

  .popular-badge {
    display: inline-block;
    background: var(--gold);
    color: var(--ink);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
    margin-bottom: 12px;
    font-family: 'DM Mono', monospace;
  }

  .pricing-note {
    margin-top: 28px;
    padding: 20px 24px;
    background: var(--gold-pale);
    border-left: 4px solid var(--gold);
    border-radius: 2px;
  }
  .pricing-note p {
    font-size: 14px;
    color: var(--slate);
    line-height: 1.6;
  }
  .pricing-note strong { color: var(--ink); }

  /* EMAILS */
  .email-selector {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }
  .email-pill {
    padding: 8px 18px;
    border: 2px solid var(--border);
    border-radius: 2px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    background: transparent;
    color: var(--muted);
    transition: all 0.2s;
  }
  .email-pill:hover { border-color: var(--ink); color: var(--ink); }
  .email-pill.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }

  .email-card {
    background: white;
    border: 2px solid var(--ink);
    border-radius: 2px;
    overflow: hidden;
  }
  .email-card-header {
    background: var(--ink);
    padding: 20px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .email-meta { display: flex; flex-direction: column; gap: 4px; }
  .email-meta-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
  }
  .email-subject {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: var(--gold-light);
    font-weight: 700;
  }
  .email-badge {
    background: rgba(201,168,76,0.2);
    color: var(--gold-light);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 5px 12px;
    border-radius: 2px;
    border: 1px solid rgba(201,168,76,0.3);
    text-transform: uppercase;
    white-space: nowrap;
  }
  .email-body {
    padding: 32px 28px;
    font-size: 15px;
    line-height: 1.85;
    color: var(--slate);
    white-space: pre-line;
  }
  .copy-btn {
    display: block;
    margin: 0 28px 28px;
    padding: 12px 24px;
    background: transparent;
    border: 2px solid var(--border);
    border-radius: 2px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
    width: calc(100% - 56px);
  }
  .copy-btn:hover { border-color: var(--ink); color: var(--ink); background: var(--paper); }
  .copy-btn.copied { border-color: var(--green); color: var(--green); background: var(--green-bg); }

  /* LANDING */
  .landing-block {
    background: white;
    border: 2px solid var(--ink);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .landing-block-header {
    background: var(--paper);
    padding: 14px 24px;
    border-bottom: 2px solid var(--ink);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .block-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: var(--ink);
    color: var(--paper);
    padding: 3px 8px;
    border-radius: 2px;
  }
  .block-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--slate);
    letter-spacing: 0.5px;
  }
  .landing-block-body { padding: 24px; }
  .landing-copy {
    font-size: 15px;
    line-height: 1.8;
    color: var(--slate);
    white-space: pre-line;
  }
  .landing-copy .big {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 900;
    color: var(--ink);
    line-height: 1.2;
    display: block;
    margin-bottom: 8px;
  }
  .landing-copy .sub {
    font-size: 17px;
    color: var(--muted);
    display: block;
    margin-bottom: 24px;
  }
  .landing-copy .pain-point {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }
  .landing-copy .pain-point:last-child { border-bottom: none; }
  .pain-icon { font-size: 18px; flex-shrink: 0; }

  /* ONBOARDING */
  .onboard-steps { display: flex; flex-direction: column; gap: 0; }
  .onboard-step {
    display: flex;
    gap: 0;
    border: 2px solid var(--ink);
    border-bottom: none;
  }
  .onboard-step:last-child { border-bottom: 2px solid var(--ink); }
  .step-num {
    width: 64px;
    flex-shrink: 0;
    background: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 900;
    color: var(--gold);
    border-right: 2px solid var(--ink);
  }
  .step-body { flex: 1; padding: 24px 28px; background: white; }
  .step-phase {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 6px;
  }
  .step-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .step-desc {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 16px;
  }
  .step-checklist { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .step-checklist li {
    font-size: 13px;
    color: var(--slate);
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.5;
  }
  .step-checklist li::before {
    content: '→';
    color: var(--gold);
    font-weight: 700;
    flex-shrink: 0;
  }
  .step-timeline {
    display: inline-block;
    background: var(--gold-pale);
    color: var(--ink);
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 2px;
    margin-top: 12px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 1px;
  }
  .deliverable-tag {
    display: inline-block;
    background: var(--green-bg);
    color: var(--green);
    border: 1px solid rgba(26,107,74,0.2);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 2px;
    margin-top: 10px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 1px;
  }
`;

const tiers = [
  {
    name: "Starter",
    tagline: "Perfect for small businesses",
    setup: "One-time setup",
    price: "$499",
    retainer: "+ $79/mo maintenance",
    featured: false,
    cta: "Get Started",
    features: [
      { text: "Custom chatbot built for your business", has: true },
      { text: "Up to 3 rooms / service categories", has: true },
      { text: "FAQ & pricing knowledge base", has: true },
      { text: "Promo video embed on chat screen", has: true },
      { text: "Embedded on your existing website", has: true },
      { text: "Mobile-responsive design", has: true },
      { text: "30-day support post-launch", has: true },
      { text: "Room quiz / recommendation flow", has: false },
      { text: "Staff / admin panel", has: false },
      { text: "Custom domain deployment", has: false },
      { text: "Custom branding & color theme", has: false },
      { text: "Monthly performance report", has: false },
    ]
  },
  {
    name: "Pro",
    tagline: "Most popular — built to convert",
    setup: "One-time setup",
    price: "$899",
    retainer: "+ $129/mo maintenance",
    featured: true,
    cta: "Start Pro Build",
    badge: "MOST POPULAR",
    features: [
      { text: "Everything in Starter", has: true },
      { text: "Unlimited rooms / service categories", has: true },
      { text: "Room quiz — recommends the best room", has: true },
      { text: "Staff / admin panel with PIN login", has: true },
      { text: "Live rule editor (update AI without code)", has: true },
      { text: "Custom branding, fonts & colors", has: true },
      { text: "Custom domain OR website embed", has: true },
      { text: "Rate limiting & abuse protection", has: true },
      { text: "60-day support post-launch", has: true },
      { text: "Monthly performance report", has: true },
      { text: "Priority email support", has: true },
      { text: "Multi-location support", has: false },
    ]
  },
  {
    name: "Enterprise",
    tagline: "Multi-location & high-volume",
    setup: "One-time setup",
    price: "$1,800+",
    retainer: "+ $249/mo maintenance",
    featured: false,
    cta: "Let's Talk",
    features: [
      { text: "Everything in Pro", has: true },
      { text: "Multi-location deployment", has: true },
      { text: "Custom domain + website embed both", has: true },
      { text: "Advanced staff / admin panel", has: true },
      { text: "Custom integrations (booking, CRM)", has: true },
      { text: "White-glove onboarding call", has: true },
      { text: "Dedicated Slack support channel", has: true },
      { text: "Monthly strategy review call", has: true },
      { text: "Analytics dashboard", has: true },
      { text: "Staff training session", has: true },
      { text: "Quarterly AI prompt optimization", has: true },
      { text: "Custom contract & terms", has: true },
    ]
  }
];

const emails = [
  {
    id: "cold",
    label: "Cold Outreach",
    badge: "Email #1",
    subject: "Your website is losing customers while they wait",
    timing: "Send cold to local business owners",
    body: `Hi [First Name],

I was browsing your website and noticed something — if someone lands there at 9pm wondering about [their service], there's no one to answer them.

They're either going to Google a competitor, or forget about you by morning.

I build done-for-you AI chatbots specifically for [industry] businesses like yours. Here's what that means in practice:

• Visitors get instant answers to pricing, availability, and FAQs — 24/7
• Your staff spend less time answering the same 10 questions on the phone
• More of those late-night browsers actually turn into bookings

I just finished one for Escapology Scottsdale — their chatbot now handles hundreds of customer questions a week without a single staff member involved.

Would it be worth a 15-minute call to see if something like this makes sense for [Business Name]?

— [Your Name]
[Your Website] | [Phone]`
  },
  {
    id: "followup",
    label: "Follow-Up",
    badge: "Email #2",
    subject: "Quick follow-up — the chatbot idea",
    timing: "Send 4 days after no reply",
    body: `Hey [First Name],

Just circling back on my last note.

I know you're busy — so I'll keep this short.

The businesses I work with typically see:
✓ 40–60% fewer repetitive phone/email inquiries
✓ Customers self-booking after hours (money you were leaving behind)
✓ Staff who actually enjoy their jobs more

It's a done-for-you build. You don't touch any code. You don't need a tech person. I handle everything — design, AI training, deployment, and ongoing updates.

Starter builds begin at $499 + a small monthly retainer. Most clients break even within the first 60 days.

If the timing is off right now, totally understand. But if you'd like to see a live demo, just reply and I'll send a link.

— [Your Name]`
  },
  {
    id: "demo",
    label: "Demo Request",
    badge: "Email #3",
    subject: "Here's the live demo you asked for",
    timing: "Send after they show interest",
    body: `Hi [First Name],

Thanks for your interest — here's what I put together for you.

🔗 Live demo: [your-demo-link]

This is built on the same stack I'd use for [Business Name]. Try asking it:
• "What's the pricing?"
• "Can kids do this?"
• "How do I book a group?"

Notice it answers instantly, never gets frustrated, and always drives toward a booking.

Here's how we'd customize it for you:
→ Your branding, colors, and logo
→ Your actual services, prices, and FAQs
→ A staff-only login panel so your team can update info anytime
→ Deployed on your website within 2–3 weeks

I have [2 slots] open in [Month] for new builds.

Want to lock one in? I'll send over a simple proposal — no pressure, no hard sell.

— [Your Name]
[Calendar Link]`
  },
  {
    id: "proposal",
    label: "Proposal Send",
    badge: "Email #4",
    subject: "Your custom chatbot proposal — [Business Name]",
    timing: "Send after discovery call",
    body: `Hi [First Name],

Great talking earlier — I've put together a proposal based on what you shared.

WHAT I'LL BUILD FOR YOU
━━━━━━━━━━━━━━━━━━━━
A fully custom AI chatbot for [Business Name], trained on your services, pricing, and policies. Deployed on your website. Live within 2–3 weeks.

YOUR INVESTMENT
━━━━━━━━━━━━━━━━━━━━
[Tier Name] Plan
• One-time build fee: $[X]
• Monthly maintenance: $[X]/mo
• Includes: [list key features from their tier]

TIMELINE
━━━━━━━━━━━━━━━━━━━━
Week 1 — Discovery & content gathering
Week 2 — Build, AI training & internal review
Week 3 — Your review, revisions & launch

TO MOVE FORWARD
━━━━━━━━━━━━━━━━━━━━
Reply with "let's go" or click below to sign the simple agreement and pay the 50% deposit to hold your build slot.

[Sign & Pay Deposit → Link]

Questions? Just reply to this email. I'm fast.

— [Your Name]`
  },
  {
    id: "checkin",
    label: "90-Day Check-In",
    badge: "Retention",
    subject: "90 days in — here's what your chatbot has been up to",
    timing: "Send 90 days after launch",
    body: `Hi [First Name],

It's been 90 days since we launched your chatbot — I wanted to check in and share what I've been seeing.

[PASTE KEY STATS HERE — conversations, top questions, after-hours chats, etc.]

A few things worth noting:
• Most asked question: [X] — want me to expand that answer?
• Biggest after-hours traffic: [day/time] — your customers are active when you're closed
• I noticed [X] visitors dropped off at [Y point] — I have a fix for that

I also have a couple of small improvements I'd like to make to the AI prompts based on what I'm seeing. No extra charge — this is part of keeping your bot sharp.

Are you happy with how it's performing? Anything you'd like to change or add?

Also — if you know any other business owners who could use something like this, I'd be grateful for the introduction. I'll take care of them.

— [Your Name]`
  }
];

const landingBlocks = [
  {
    tag: "HEADLINE",
    title: "Hero — Above the Fold",
    copy: `<span class="big">Your business answers questions 24/7. Even when you're asleep.</span><span class="sub">Done-for-you AI chatbots, custom-built for your business — deployed in weeks, not months.</span>`
  },
  {
    tag: "SUBHEAD",
    title: "Pain Points — Why They Need This",
    copy: `<div class="pain-point"><span class="pain-icon">💸</span><span>Visitors land on your site after hours, can't get answers, and bounce to a competitor.</span></div><div class="pain-point"><span class="pain-icon">📞</span><span>Your staff answer the same 10 questions on the phone every single day.</span></div><div class="pain-point"><span class="pain-icon">😤</span><span>You paid for a website that doesn't actually convert — it just sits there looking pretty.</span></div><div class="pain-point"><span class="pain-icon">🤷</span><span>You've looked at chatbot software — but you don't have time to set it up and keep it updated.</span></div>`
  },
  {
    tag: "SOLUTION",
    title: "What You Do — The Offer",
    copy: `I build done-for-you AI chatbots, custom-trained on your business. Your pricing. Your services. Your policies. Your voice.

Not a template. Not a plug-in. A real, thoughtful product — built for your specific business, deployed on your website, and maintained by me so you never have to think about it.

You focus on running your business.
Your chatbot handles the questions.`
  },
  {
    tag: "PROOF",
    title: "Social Proof / Results",
    copy: `"We were getting the same pricing questions 50 times a day. Now the chatbot handles all of it — and we're actually getting more bookings from people who would've just left the site."

— Scott L., Escapology Scottsdale

→ Launched in 12 days
→ Handles 200+ customer questions per week
→ Staff report 60% fewer repetitive calls`
  },
  {
    tag: "CTA",
    title: "Call to Action",
    copy: `Ready to stop losing customers to the silence?

→ See a live demo [button]
→ Book a free 15-min call [button]
→ View pricing [button]

No contracts to start. No tech knowledge required. Done-for-you, start to finish.`
  }
];

const onboardingSteps = [
  {
    num: "01",
    phase: "Pre-Sale",
    name: "Discovery Call",
    desc: "15–30 minute call to understand the business, nail down their tier, and map out exactly what gets built.",
    timeline: "Before contract",
    checks: [
      "What questions is their staff answering every single day?",
      "Do they want a room quiz / service recommender flow?",
      "Do they have a promo video to embed in the chatbot?",
      "Custom domain (standalone bot) or embed on existing website — or both?",
      "Do they need a staff/admin panel? (Pro & Enterprise only)",
      "Any existing content — menus, FAQs, pricing pages?",
      "What's their brand voice — formal, casual, fun?",
      "Who is the main point of contact post-launch?"
    ],
    deliverable: null
  },
  {
    num: "02",
    phase: "Week 1",
    name: "Content & Brand Intake",
    desc: "Send a simple intake form. Collect everything needed to train the AI, build the UI, and set up the room quiz and promo video.",
    timeline: "Days 1–5",
    checks: [
      "Send intake form (services, pricing, FAQs, hours, policies)",
      "Collect logo, brand colors, any fonts they use",
      "Get promo video URL (YouTube/Vimeo) for chatbot embed",
      "Gather room/service list for quiz — names, difficulty, group sizes, descriptions",
      "Confirm deployment method: custom domain setup OR website embed code",
      "If custom domain: get domain login access or confirm they'll add DNS record",
      "If website embed: get access to their site or send them a one-line embed snippet",
      "Gather any 'edge case' scenarios (refund policy, complaint handling)",
      "Confirm who approves the final bot before launch"
    ],
    deliverable: "Intake form template + brand brief"
  },
  {
    num: "03",
    phase: "Week 2",
    name: "Build & AI Training",
    desc: "Build the chatbot UI, room quiz flow, promo video embed, staff/admin panel, and train the AI on all their knowledge.",
    timeline: "Days 6–12",
    checks: [
      "Build UI to match their brand (colors, fonts, logo)",
      "Write custom AI system prompt with all business knowledge",
      "Build room quiz flow — recommendation logic based on group size, difficulty, age",
      "Embed promo video in welcome screen or dedicated chat card",
      "Set up staff/admin panel with PIN login (Pro & Enterprise)",
      "Configure live rule editor so staff can update AI without touching code",
      "Set up custom domain deployment OR generate website embed snippet",
      "Configure rate limiting and safety rules",
      "Run 50+ test questions across all topic areas",
      "Test room quiz with edge case inputs (large groups, kids, first-timers)",
      "Test edge cases: off-topic queries, complaints, refund requests"
    ],
    deliverable: "Internal QA checklist complete"
  },
  {
    num: "04",
    phase: "Week 3",
    name: "Client Review & Revisions",
    desc: "Send a staging link for the client to test everything — quiz, video, admin panel, and chat. Collect feedback and revise.",
    timeline: "Days 13–18",
    checks: [
      "Send staging link with test instructions",
      "Ask client to test the room quiz with 3–4 real customer scenarios",
      "Ask client to verify promo video plays and looks right on mobile",
      "Walk client through the staff/admin panel (screen share or Loom)",
      "Confirm embed snippet works on their website OR custom domain is resolving",
      "Collect all revision requests in one batch",
      "Make revisions (up to 2 rounds included)",
      "Final sign-off from client before going live"
    ],
    deliverable: "Staging link + revision request form"
  },
  {
    num: "05",
    phase: "Launch Day",
    name: "Deployment & Handoff",
    desc: "Go live. Deploy to their domain or embed on their site. Send a full handoff doc so they can run it themselves.",
    timeline: "Day 19–21",
    checks: [
      "Deploy to custom domain OR push embed snippet live on their website",
      "Test live deployment across mobile, tablet, and desktop",
      "Verify room quiz works end-to-end in production",
      "Verify promo video loads and plays on live site",
      "Confirm staff/admin panel login works for their team",
      "Send handoff document: how to use admin panel, how to update rules, how to request changes",
      "Record short Loom walkthrough of the admin panel (Pro & Enterprise)",
      "Confirm all contact info and escalation path is correct"
    ],
    deliverable: "Handoff doc + Loom video"
  },
  {
    num: "06",
    phase: "Ongoing",
    name: "Maintenance & Retention",
    desc: "Monthly retainer keeps the bot sharp. Proactive updates, performance check-ins, and upsell opportunities.",
    timeline: "Monthly",
    checks: [
      "Monthly check-in email with any notable usage patterns",
      "AI prompt updates as business info changes (new rooms, pricing, promos)",
      "Update promo video embed if client sends a new video",
      "Handle any bug reports within 48 hours",
      "Room quiz logic updates if new services are added",
      "Proactively suggest improvements based on usage",
      "Quarterly upsell review: are they ready for the next tier?"
    ],
    deliverable: "Monthly retainer active"
  }
];

export default function SalesKit() {
  const [activeTab, setActiveTab] = useState("pricing");
  const [activeEmail, setActiveEmail] = useState("cold");
  const [copiedId, setCopiedId] = useState(null);

  const copyEmail = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const currentEmail = emails.find(e => e.id === activeEmail);

  const tabs = [
    { id: "pricing", label: "💰 Pricing Tiers" },
    { id: "emails", label: "✉️ Sales Emails" },
    { id: "landing", label: "🌐 Landing Page Copy" },
    { id: "onboarding", label: "📋 Onboarding Flow" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="kit">
        <nav className="nav">
          <div className="nav-brand">Sales Kit</div>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`nav-tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* PRICING */}
        <div className={`section ${activeTab === "pricing" ? "active" : ""}`}>
          <div className="section-label">Done-For-You Chatbot Service</div>
          <h1 className="section-title">Pricing Tiers</h1>
          <p className="section-desc">Three tiers structured around build complexity and ongoing support. One-time setup fee + monthly retainer keeps you recurring.</p>
          <div className="pricing-grid">
            {tiers.map(tier => (
              <div key={tier.name} className={`tier ${tier.featured ? "featured" : ""}`}>
                <div className="tier-header">
                  {tier.badge && <div className="popular-badge">{tier.badge}</div>}
                  <div className="tier-name">{tier.name}</div>
                  <div className="tier-tagline">{tier.tagline}</div>
                  <div className="price-setup">{tier.setup}</div>
                  <div className="tier-price">
                    <div className="price-amount">{tier.price}</div>
                  </div>
                  <div className="price-retainer">{tier.retainer}</div>
                </div>
                <div className="tier-body">
                  <ul className="tier-features">
                    {tier.features.map((f, i) => (
                      <li key={i} className="tier-feature">
                        <span className={`feat-check ${f.has ? "" : "feat-x"}`}>
                          {f.has ? "✓" : "✕"}
                        </span>
                        {f.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tier-footer">
                  <button className="tier-cta">{tier.cta}</button>
                </div>
              </div>
            ))}
          </div>
          <div className="pricing-note">
            <p><strong>Pricing philosophy:</strong> These numbers are accessible enough to close quickly while still being profitable. Starter ($499) removes all hesitation — it's an easy yes. Pro ($899) is your bread-and-butter: the room quiz, promo video embed, admin panel, and domain/embed options make it a clear upgrade. Enterprise ($1,800+) targets franchises and multi-location chains. The monthly retainer is non-negotiable — it's your recurring revenue and keeps clients from going elsewhere.</p>
          </div>
        </div>

        {/* EMAILS */}
        <div className={`section ${activeTab === "emails" ? "active" : ""}`}>
          <div className="section-label">5-Email Sequence</div>
          <h1 className="section-title">Sales Emails</h1>
          <p className="section-desc">From cold outreach to 90-day retention. Each email is written to move the prospect one step closer, not to close them on the spot.</p>
          <div className="email-selector">
            {emails.map(e => (
              <button
                key={e.id}
                className={`email-pill ${activeEmail === e.id ? "active" : ""}`}
                onClick={() => setActiveEmail(e.id)}
              >
                {e.label}
              </button>
            ))}
          </div>
          {currentEmail && (
            <div className="email-card">
              <div className="email-card-header">
                <div className="email-meta">
                  <div className="email-meta-label">Subject Line</div>
                  <div className="email-subject">{currentEmail.subject}</div>
                  <div style={{fontSize:"12px",color:"rgba(255,255,255,0.3)",marginTop:"6px",fontStyle:"italic"}}>{currentEmail.timing}</div>
                </div>
                <div className="email-badge">{currentEmail.badge}</div>
              </div>
              <div className="email-body">{currentEmail.body}</div>
              <button
                className={`copy-btn ${copiedId === currentEmail.id ? "copied" : ""}`}
                onClick={() => copyEmail(currentEmail.id, `Subject: ${currentEmail.subject}\n\n${currentEmail.body}`)}
              >
                {copiedId === currentEmail.id ? "✓ Copied to clipboard" : "Copy Email"}
              </button>
            </div>
          )}
        </div>

        {/* LANDING */}
        <div className={`section ${activeTab === "landing" ? "active" : ""}`}>
          <div className="section-label">Landing Page Copy</div>
          <h1 className="section-title">Page Copy Blocks</h1>
          <p className="section-desc">Drop these blocks into any website builder. Each section is written to move visitors from problem-aware to ready-to-buy.</p>
          {landingBlocks.map((block, i) => (
            <div key={i} className="landing-block">
              <div className="landing-block-header">
                <span className="block-tag">{block.tag}</span>
                <span className="block-title">{block.title}</span>
              </div>
              <div className="landing-block-body">
                <div className="landing-copy" dangerouslySetInnerHTML={{__html: block.copy}} />
              </div>
            </div>
          ))}
        </div>

        {/* ONBOARDING */}
        <div className={`section ${activeTab === "onboarding" ? "active" : ""}`}>
          <div className="section-label">Client Onboarding</div>
          <h1 className="section-title">Onboarding Flow</h1>
          <p className="section-desc">A repeatable 6-step process from first call to live deployment. Follow this every time and you'll deliver on time, every time.</p>
          <div className="onboard-steps">
            {onboardingSteps.map((step, i) => (
              <div key={i} className="onboard-step">
                <div className="step-num">{step.num}</div>
                <div className="step-body">
                  <div className="step-phase">{step.phase}</div>
                  <div className="step-name">{step.name}</div>
                  <div className="step-desc">{step.desc}</div>
                  <ul className="step-checklist">
                    {step.checks.map((c, j) => <li key={j}>{c}</li>)}
                  </ul>
                  <div style={{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}}>
                    <span className="step-timeline">⏱ {step.timeline}</span>
                    {step.deliverable && <span className="deliverable-tag">📦 {step.deliverable}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
