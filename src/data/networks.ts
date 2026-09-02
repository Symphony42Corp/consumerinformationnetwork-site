// Consumer Information Network — the Information Networks directory.
// Adding a network = adding one object here. The directory page, the home index,
// the sitemap, and the per-network page are all generated from this list.

export type Status = 'available' | 'coming';

export interface Network {
  slug: string;            // URL: /{slug}
  brandName: string;       // "Auto Insurance Information Network"
  shortName: string;       // "Auto Insurance"
  group: 'Insurance' | 'Care' | 'Finances';
  status: Status;
  tollFree?: string;       // display, e.g. "888-610-5950"
  tollFreeTel?: string;    // tel: link, e.g. "+18886105950"
  tagline: string;
  metaDescription: string;
  heroBody: string;
  helps: string[];         // "How the AI Agent can help" — five bullets
  steps: [string, string, string];
  extended?: { heading: string; body: string; critical?: boolean }[];
  notDo: string;
  aboutUs: string;
}

export const networks: Network[] = [
  {
    slug: 'auto-insurance-information-network',
    brandName: 'Auto Insurance Information Network',
    shortName: 'Auto Insurance',
    group: 'Insurance',
    status: 'available',
    tollFree: '888-610-5950',
    tollFreeTel: '+18886105950',
    tagline: 'AI-powered auto insurance information by phone',
    metaDescription:
      'AI-powered auto insurance information by phone. Clear explanations in simple words, and an optional connection to a licensed insurance professional when you ask.',
    heroBody:
      'Auto Insurance Information Network helps you understand common auto insurance terms, prepare for quote conversations, and ask better questions before choosing coverage. The AI Agent answers instantly, listens to your situation, and, when you ask, may connect you with an independent participating licensed insurance professional, agency, or marketplace partner.',
    helps: [
      'Explain common auto insurance terms such as liability, comprehensive, collision, deductibles, and limits',
      'Walk through the information you may want on hand for a quote',
      'Talk through the questions you may want to ask a licensed agent',
      'Keep every detail you share in mind, at your pace',
      'Available 24 hours a day, 7 days a week, at no cost to consumers',
    ],
    steps: [
      'Call 888-610-5950 and tell the AI Agent you are looking for information about auto insurance.',
      'Have a conversation in your own words. Ask whatever you need to ask.',
      'If you would like to speak with a licensed insurance professional, the AI Agent may transfer you to a participating provider, with your permission.',
    ],
    notDo:
      'Consumer Information Network is not an insurance carrier or insurance agency. We do not provide insurance advice, quote prices, issue policies, bind coverage, determine eligibility, or make underwriting decisions. Connections, when available, are to participating licensed insurance professionals, agencies, or marketplace partners. Availability varies by state.',
    aboutUs:
      'Consumer Information Network, LLC is a referral service, not an insurance carrier or agency. We earn a fee from participating licensed insurance professionals only when a connection you requested meets their quality standards. Every conversation starts with you.',
  },
  {
    slug: 'home-insurance-information-network',
    brandName: 'Home Insurance Information Network',
    shortName: 'Home Insurance',
    group: 'Insurance',
    status: 'available',
    tollFree: '831-888-4242',
    tollFreeTel: '+18318884242',
    tagline: 'AI-powered homeowners insurance information by phone',
    metaDescription:
      'AI-powered homeowners insurance information by phone. Clear explanations in simple words, and an optional connection to a licensed insurance professional when you ask.',
    heroBody:
      'Home Insurance Information Network helps you understand common homeowners insurance concepts, including coverage types, deductibles, replacement cost, exclusions, and the questions to ask before speaking with an insurance professional. The AI Agent answers instantly, listens to your situation, and, when you ask, may connect you with an independent participating licensed insurance professional, agency, or marketplace partner.',
    helps: [
      'Explain common homeowners insurance terms such as dwelling coverage, personal property, liability, and replacement cost',
      'Walk through the property and coverage information you may want for a quote',
      'Talk through the questions you may want to ask a licensed agent',
      'Keep every detail you share in mind, at your pace',
      'Available 24 hours a day, 7 days a week, at no cost to consumers',
    ],
    steps: [
      'Call 831-888-4242 and tell the AI Agent you are looking for information about home insurance.',
      'Have a conversation in your own words. Ask whatever you need to ask.',
      'If you would like to speak with a licensed insurance professional, the AI Agent may transfer you to a participating provider, with your permission.',
    ],
    notDo:
      'Consumer Information Network is not an insurance carrier or insurance agency. We do not inspect properties, quote prices, issue policies, bind coverage, determine eligibility, or make underwriting decisions. Home insurance products, availability, pricing, eligibility, and coverage terms vary by state, property type, insurer, and individual circumstances. Connections, when available, are to participating licensed insurance professionals, agencies, or marketplace partners.',
    aboutUs:
      'Consumer Information Network, LLC is a referral service, not an insurance carrier or agency. We earn a fee from participating licensed insurance professionals only when a connection you requested meets their quality standards. Every conversation starts with you.',
  },
  {
    slug: 'burial-insurance-information-network',
    brandName: 'Burial Insurance Information Network',
    shortName: 'Burial Insurance',
    group: 'Insurance',
    status: 'coming',
    tagline: 'AI-powered information about final expense and burial insurance',
    metaDescription:
      'AI-powered information about final expense and burial insurance. Clear explanations in simple words, and an optional connection to a licensed insurance professional when you ask.',
    heroBody:
      'Burial Insurance Information Network helps you and your family understand common final expense insurance concepts, including policy types, coverage amounts, beneficiaries, waiting periods, age considerations, and the questions to ask before speaking with a licensed insurance professional. The AI Agent listens carefully, never rushes you, and, when you ask, may connect you with an independent participating licensed insurance professional.',
    helps: [
      'Explain common final expense and burial insurance concepts in simple words',
      'Walk through the kinds of plans people commonly consider',
      'Talk through the questions you may want to ask a licensed insurance professional',
      'Keep every detail you share in mind, at your pace',
      'Available 24 hours a day, 7 days a week, at no cost to consumers',
    ],
    steps: [
      'Call the AI Agent and tell it what you are trying to understand or plan for.',
      'Have a conversation in your own words. Ask whatever you need to ask.',
      'If you would like to speak with a licensed insurance professional, the AI Agent may offer a connection, with your permission.',
    ],
    extended: [
      {
        heading: 'What burial insurance typically covers',
        body:
          'Burial insurance, sometimes called final expense or funeral insurance, is a kind of whole life insurance designed to help loved ones pay for funeral costs and other end-of-life expenses. Plans are typically designed to help cover funeral and burial services, cremation, a casket or urn, a headstone or memorial, outstanding medical bills, and other final expenses. Specific coverage amounts, eligibility, and rates depend on the carrier, your age, your state, and your health. A licensed agent can explain the specifics for your situation.',
      },
    ],
    notDo:
      'Consumer Information Network is not an insurance carrier or insurance agency. We do not provide insurance advice, quote prices, issue policies, bind coverage, set premiums, determine eligibility, or make underwriting decisions.',
    aboutUs:
      'Consumer Information Network, LLC is a referral service, not an insurance carrier or agency. We earn a fee from participating licensed insurance professionals only when a connection you requested meets their quality standards. Every conversation starts with you.',
  },
  {
    slug: 'senior-care-information-network',
    brandName: 'Senior Care Information Network',
    shortName: 'Senior Care',
    group: 'Care',
    status: 'coming',
    tagline: 'AI-powered information for families exploring senior care',
    metaDescription:
      'AI-powered general information for families exploring senior care options. Clear explanations in simple words, and an optional connection to independent senior-care resources when you ask.',
    heroBody:
      'Senior Care Information Network helps you and your family understand common senior care categories, including independent living, assisted living, memory care, in-home care, and respite care. The AI Agent can explain common terms, organize the questions your family is asking, and talk through the considerations that come up when planning the next stage of care for someone you love. When you ask, it may offer to connect you with independent senior-care resources.',
    helps: [
      'Explain common senior care categories and terms in simple words',
      'Walk through the considerations families commonly think through',
      'Talk through the questions you may want to ask care providers, advisors, or family members',
      'Keep every detail you share in mind, at your pace',
      'Available 24 hours a day, 7 days a week, at no cost to consumers',
    ],
    steps: [
      'Call the AI Agent and describe what you are trying to figure out, for yourself or for someone you love.',
      'Have a conversation in your own words. Ask whatever you need to ask.',
      'If you would like to speak with an independent senior-care resource, the AI Agent may offer a connection, with your permission.',
    ],
    extended: [
      {
        heading: 'Important disclosure',
        critical: true,
        body:
          'Consumer Information Network does not provide medical advice, diagnosis, treatment, care planning, emergency response, or healthcare services. If you have a medical emergency, call 911 or contact a licensed healthcare professional. Our AI Agents discuss senior care at a non-medical level and do not collect protected health information.',
      },
      {
        heading: 'A note about Medicare',
        body:
          'Senior Care Information Network is not a Medicare Advantage marketing service. We do not enroll consumers in Medicare plans, sell Medicare products, or recommend Medicare plans. If you have Medicare-specific questions, contact Medicare directly at 1-800-MEDICARE or a licensed Medicare professional.',
      },
    ],
    notDo:
      'Consumer Information Network is not a healthcare provider, senior-care facility, in-home care agency, hospice provider, or licensed care advisor. We do not diagnose, treat, or provide medical or emergency services. Independent third-party providers are solely responsible for their own services, licensing, pricing, availability, and consumer relationships.',
    aboutUs:
      'Consumer Information Network, LLC is a referral service, not a healthcare provider or care agency. We may earn a fee from participating senior-care resources only when a connection you requested meets their quality standards. Every conversation starts with you.',
  },
  {
    slug: 'debt-relief-information-network',
    brandName: 'Debt Relief Information Network',
    shortName: 'Debt Relief',
    group: 'Finances',
    status: 'coming',
    tagline: 'AI-powered information about common debt-related options',
    metaDescription:
      'AI-powered information about common debt-related options. Clear explanations in simple words, and an optional connection to independent providers when you ask.',
    heroBody:
      'Debt Relief Information Network provides general information about common debt-related concepts, including budgeting, creditor hardship programs, debt management, debt settlement concepts, bankruptcy concepts, and credit counseling. The AI Agent can help you organize the questions you may want to ask before speaking with a qualified professional. When you ask, it may offer to connect you with an independent third-party provider.',
    helps: [
      'Explain common debt-related concepts in simple words',
      'Walk through the kinds of options people commonly explore',
      'Talk through the questions you may want to ask a qualified professional',
      'Keep every detail you share in mind, without judgment and at your pace',
      'Available 24 hours a day, 7 days a week, at no cost to consumers',
    ],
    steps: [
      'Call the AI Agent and describe what you are trying to understand or work through.',
      'Have a conversation in your own words. Ask whatever you need to ask.',
      'If you would like to speak with an independent third-party provider, the AI Agent may offer a connection, with your permission.',
    ],
    extended: [
      {
        heading: 'Important disclosure',
        critical: true,
        body:
          'Consumer Information Network does not provide debt settlement, debt negotiation, credit repair, loans, legal advice, financial advice, bankruptcy advice, or credit counseling. We do not reduce debts, contact creditors on your behalf, collect payments for debt services, or promise any outcome. Independent third-party providers are solely responsible for their own services, eligibility rules, fees, licensing, disclosures, and consumer relationships.',
      },
    ],
    notDo:
      'Consumer Information Network is not a debt collector, debt settlement company, credit repair company, credit counselor, law firm, lender, or financial advisor. We do not promise specific reductions, specific timelines, specific monthly payment amounts, or any particular outcome.',
    aboutUs:
      'Consumer Information Network, LLC is a referral service. We may earn a fee from participating providers only when a connection you requested meets their quality standards. Every conversation starts with you.',
  },
];

export const groupsInOrder: Network['group'][] = ['Insurance', 'Care', 'Finances'];

export function byGroup(): { group: Network['group']; items: Network[] }[] {
  return groupsInOrder.map((group) => ({ group, items: networks.filter((n) => n.group === group) }));
}
