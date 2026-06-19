// English copy. Single source of truth for every visible string on the EN page.
// Held to the brand gates: customer-obsessed (no competitor stabs), not a
// women-only practice (women's health = one neutral service-line only), three
// co-equal services, "weight care" (never "weight loss").
export const en = {
  meta: {
    title: 'Primary Care and Beyond | Telehealth Primary Care in Florida',
    description:
      'Membership based primary care, functional medicine, and weight care from Elizabeth Hanke, APRN, FNP-BC. Telehealth across Florida. Clear pricing. Now accepting new patients.',
  },
  nav: {
    links: [
      { href: '#care', label: 'Care' },
      { href: '#how', label: 'How it works' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#about', label: 'Provider' },
      { href: '#faq', label: 'FAQ' },
    ],
    cta: 'Call Liz',
    toggle: 'Español',
    toggleAria: 'Ver este sitio en español',
  },
  hero: {
    kicker: 'Telehealth care for adults in Florida',
    headlineLines: ['Primary care with time', 'to go <em>beyond the basics.</em>'],
    sub: 'Work with one Florida nurse practitioner who has the time to listen, learn your history, and understand what your symptoms may be telling you.',
    call: 'Call 941.250.6561',
    email: 'Email Liz',
  },
  empathy: {
    heading: 'You know when something feels off.',
    body1:
      'Maybe your labs looked normal, but you still felt tired, foggy, uncomfortable, or unlike yourself. Maybe you were told to wait, manage stress, lose weight, or try one more prescription.',
    body2:
      'At Primary Care and Beyond, you get time to talk through the full picture and decide what kind of care makes sense next.',
    strong: 'You are here to be heard, and to look for what is actually going on.',
    link: 'See how care works',
    frame: 'Things patients often hear before they find deeper care',
    lines: [
      'Your labs are normal.',
      'It is probably stress.',
      'It is probably your age.',
      'Try eating less and moving more.',
      'Let’s just see how you feel.',
    ],
  },
  care: {
    heading: 'Primary care, functional medicine, and weight care.',
    lead: 'You can come to Primary Care and Beyond for ongoing primary care, a deeper functional medicine visit, or medical weight care. Weight care is included for primary care members and is also available as a standalone service.',
    cards: [
      {
        label: 'Primary care membership',
        title: 'Primary care',
        body: 'Ongoing telehealth primary care for adults in Florida. This includes preventive care, chronic condition support, women’s health, prescriptions and refills for non-controlled medications, lab orders when medically indicated, and medical weight care including GLP-1 medication management when appropriate.',
        note: '$150 per month.',
        tags: ['Preventive care', 'Chronic condition support', 'Non-controlled refills', 'Labs when indicated', 'Weight care included', 'GLP-1 when appropriate'],
      },
      {
        label: 'Separate service',
        title: 'Functional medicine',
        body: 'A deeper look at symptoms that have not been explained or have not improved. This may include hormone concerns, thyroid symptoms, gut health, autoimmune issues, chronic fatigue, and detailed lab review.',
        note: 'Available without a primary care membership. Quoted before care begins.',
        tags: ['Hormones', 'Thyroid', 'Gut health', 'Autoimmune concerns', 'Fatigue', 'Lab review'],
      },
      {
        label: 'Included or standalone',
        title: 'Weight care',
        body: 'Medical weight care for people who want clinical support, not one-size-fits-all advice. Care may include lab review, health history, medication review, lifestyle planning, and GLP-1 medication management when appropriate.',
        note: 'Included for primary care members. Also available as a standalone service without a primary care membership.',
        tags: ['Medical weight care', 'GLP-1 when appropriate', 'Health history', 'Lab review', 'Lifestyle planning', 'Follow-up support'],
      },
    ],
  },
  how: {
    heading: 'Starting care is a&nbsp;conversation.',
    foot: 'Telehealth is available for adults 18 and older who are located in Florida at the time of each visit. Sarasota and Lakewood Ranch in-person care is planned.',
    steps: [
      { title: 'Reach out', body: 'Call or email Liz. You can ask questions, share what you are looking for, and find out whether primary care, functional medicine, or weight care is the right fit.' },
      { title: 'Talk it through', body: 'You will talk through your health history, current concerns, goals, and care options. If a service has a separate cost, you will know the price before care begins.' },
      { title: 'Begin care', body: 'Start with the service that fits your needs. You may choose ongoing primary care membership, a functional medicine visit, or standalone weight care.' },
    ],
  },
  pricing: {
    label: 'Clear pricing',
    headingHtml: 'Know the price <em>before</em> you start.',
    lead: 'Primary care membership is $150 per month and includes primary care plus weight care when appropriate. Functional medicine and standalone weight care are also available without a primary care membership, with clear pricing or a written estimate before care begins.',
    membershipLabel: 'Primary care membership',
    price: '$150',
    per: 'per month',
    tag: 'Telehealth direct primary care',
    included: [
      'One telehealth primary care visit per week when needed',
      'Preventive and chronic disease care',
      'Women’s health care',
      'Prescriptions and refills for non-controlled medications',
      'Lab orders when medically indicated',
      'Medical weight care',
      'GLP-1 medication management when appropriate',
      'Care coordination',
      'Messaging between visits',
    ],
    membershipFoot: 'No copays. No surprise bills. Cancel with 30 days notice. Medication costs, lab fees, imaging fees, and pharmacy fees are not included.',
    cta: 'Call to join',
    fmTitle: 'Functional medicine',
    fmIntro: 'Available without a primary care membership. Visits are billed per visit, and you will know the cost before care begins.',
    rates: [
      { name: 'Initial consultation', detail: '90 minutes', price: '$375' },
      { name: 'Follow-up', detail: '30 minutes', price: '$200' },
      { name: 'Extended follow-up', detail: '60 minutes', price: '$300' },
      { name: 'Lab review', detail: 'results and plan', price: '$150' },
    ],
    weightTitle: 'Standalone weight care',
    weightIntro: 'Weight care is included for primary care members when appropriate. It is also available as a standalone service for patients who do not need a primary care membership.',
    weightNote: 'Standalone weight care pricing depends on the care plan, medication needs, labs, and follow-up schedule. You will receive a written estimate before care begins.',
    promiseHtml: '<strong>No surprise billing.</strong> You will know the cost before care begins.',
  },
  about: {
    heading: 'Meet your provider.',
    lead: 'Direct care means you work with one provider who knows your history, your goals, and what has already been tried.',
    credentials: 'APRN, FNP-BC',
    name: 'Elizabeth Hanke',
    meta: ['Autonomous Florida APRN', 'Functional medicine', 'Weight care'],
    bio: [
      'Liz is an autonomous Florida nurse practitioner and the founder of Primary Care and Beyond. She created the practice to offer care that feels personal, thoughtful, and honest about cost.',
      'She built Primary Care and Beyond on a simple belief: when symptoms do not fit a simple answer, they deserve a closer look, not just another prescription. Here there is time to take your whole history seriously and keep looking until things make sense.',
    ],
    quote: 'The same provider, with time to understand the full picture.',
  },
  faq: {
    heading: 'The honest answers.',
    lead: 'What most people want to know before they call.',
    items: [
      { q: 'Is this insurance?', a: 'No. Primary Care and Beyond is a direct health care membership under Florida Statute 624.27. It is not insurance and does not replace major medical coverage. Keep insurance for emergencies, hospital care, specialists, imaging, pharmacy costs, and services outside the membership.' },
      { q: 'Do I have to join primary care to get functional medicine or weight care?', a: 'No. Functional medicine and standalone weight care are available without a primary care membership. You can join for ongoing primary care, schedule a functional medicine visit, or start with standalone weight care.' },
      { q: 'What is included in the $150 primary care membership?', a: 'The $150 monthly membership covers telehealth primary care, including preventive care, chronic condition support, women’s health, medication management and refills for non-controlled medications, lab orders when indicated, medical weight care, GLP-1 medication management when appropriate, care coordination, and messaging. Medication costs, lab fees, imaging fees, pharmacy fees, and outside services are not included.' },
      { q: 'Can I do weight care without joining primary care?', a: 'Yes. Weight care is included for primary care members and is also available as a standalone service. Standalone weight care has its own pricing, based on the care plan, medication needs, labs, and follow-up schedule. You will know the cost before care begins.' },
      { q: 'Is GLP-1 care included?', a: 'GLP-1 medication management may be included when appropriate for primary care members. It may also be part of standalone weight care. Medication costs, lab fees, pharmacy fees, and insurance coverage are separate.' },
      { q: 'Why pay for primary care membership if I already have insurance?', a: 'Insurance covers your major medical needs. The membership adds something different: longer visits, direct access to one provider, and the time to look at your full picture. Most members keep their insurance and use the membership alongside it.' },
      { q: 'Is a nurse practitioner enough, or do I need a doctor?', a: 'Liz is an autonomous Florida APRN and board-certified family nurse practitioner. She can diagnose, treat, order labs, and prescribe within her scope of practice. If your care requires a specialist or physician, she will help guide that next step.' },
      { q: 'Where do you practice, and who can join?', a: 'Care is available by telehealth for adults 18 and older across Florida. You must be located in Florida during each visit. Sarasota and Lakewood Ranch in-person care is planned.' },
      { q: 'What is not included?', a: 'The primary care membership does not include emergency care, urgent care, hospital care, specialist fees, lab fees, imaging fees, pharmacy costs, controlled substances, hormone therapy at this time, in-person procedures, or disability, employment, or legal forms. Functional medicine and standalone weight care may have separate costs and are quoted before care begins.' },
      { q: 'How do I get started?', a: 'Call 941.250.6561 or email Elizabeth@primarycareandbeyond.com. You can ask questions, talk through your options, and choose the care path that fits your needs.' },
    ],
  },
  contact: {
    heading: 'Start with a&nbsp;conversation.',
    sub: 'No checkout. No pressure. Call or email Liz, ask your questions, and find out whether Primary Care and Beyond is the right fit.',
    phone: '941.250.6561',
    email: 'Elizabeth@primarycareandbeyond.com',
  },
  footer: {
    tagline: 'Primary care with time to go beyond the basics.',
    pillars: 'Primary Care &middot; Functional Medicine &middot; Weight Care',
    getInTouch: 'Get in touch',
    labels: { tel: 'Tel', fax: 'Fax', email: 'Email', web: 'Web' },
    legal: 'Primary Care and Beyond LLC. This membership is a direct health care agreement under Fla. Stat. 624.27 and is not insurance, and not minimum essential coverage under the ACA. Telehealth services are for adults 18 and older who are physically located in Florida. Functional medicine and standalone weight care services are quoted before care.',
    rights: 'All rights reserved.',
  },
};
