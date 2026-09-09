// Consumer Information Network — paid-traffic call pages.
// Standing doctrine (AIIN Call Landing Page Build Plan v2, Sept 8 2026, §4):
// one call page per campaign / phone number / agent. Headline variants for
// different ad groups live INSIDE one page via the ?hl= URL parameter; a new
// object here (and a new route file) is warranted only when a new number and a
// new agent enter the picture — i.e. when a vertical gets its own live campaign.
//
// Call pages are noindex, excluded from the sitemap, and never linked from the
// indexed site. The reviewed informational page for each network is untouched.

import { networks, type Network } from './networks';

export interface AdsTracking {
  /** Google tag ID for the ads account, e.g. "AW-1234567890". Empty = render no tag at all. */
  tagId: string;
  /** Conversion label of the "Calls from a website" action (forwarding-number swap). Empty = no phone snippet. */
  callLabel: string;
  /** Optional conversion label of a "Clicks on your number" (click-to-call) action — the tap signal. Empty = no tap event. */
  tapLabel?: string;
}

export interface CallPage {
  /** Route path, e.g. "/auto-insurance/call". */
  path: string;
  /** Slug of the network in networks.ts whose disclosure copy this page reuses. */
  networkSlug: string;
  phoneDisplay: string;   // exactly as shown on the page — must equal the tracked number format
  phoneTel: string;       // E.164 for the tel: link
  /** Headline variants keyed by the ?hl= parameter value. Exact match to the serving ad's pinned headline. */
  headlines: Record<string, string>;
  defaultHeadline: string;
  subheadline: string;
  availability: string;
  trust: [string, string, string];
  steps: [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }];
  ads: AdsTracking;
}

function networkBySlug(slug: string): Network {
  const n = networks.find((x) => x.slug === slug);
  if (!n) throw new Error(`callPages: unknown network slug "${slug}"`);
  return n;
}

// ---------------------------------------------------------------------------
// Auto Insurance Information Network — Google Ads campaign "CIN Governor — Test-1 Auto Phone"
// Number ruling (plan v2 §7): 888-802-1722 on both the ad's call button and this page.
// Routing (confirmed via Retell API, Sept 8 2026): Twilio DID → Retell agent_321b → Ringba → RingbaX.
// ---------------------------------------------------------------------------
export const aiinCall: CallPage = {
  path: '/auto-insurance/call',
  networkSlug: 'auto-insurance-information-network',
  phoneDisplay: '888-802-1722',
  phoneTel: '+18888021722',
  headlines: {
    quotes: 'Auto Insurance Quotes By Phone',
    auto: 'Auto Insurance Quotes By Phone',
    car: 'Car Insurance Quotes By Phone',
  },
  defaultHeadline: 'Auto Insurance Quotes By Phone',
  subheadline:
    'An AI Agent answers instantly and, when you ask, may connect you with a participating licensed insurance professional for a quote.',
  availability: 'Available now · 24 hours a day, 7 days a week · No cost to consumers',
  trust: [
    'An AI Agent answers instantly',
    'Operated by Consumer Information Network, LLC, Baltimore, MD',
    'A referral service — not an insurance carrier or agency',
  ],
  steps: [
    { title: 'Call', body: 'Tap the button. The AI Agent picks up right away.' },
    { title: 'Talk in your own words', body: 'Describe your situation and ask whatever you need to ask.' },
    { title: 'Get connected, if you ask', body: 'With your permission, the AI Agent may transfer you to a participating licensed insurance professional.' },
  ],
  // tagId is the CIN Google Ads account's conversion ID (read live by the Governor room, Sept 9 2026).
  // callLabel / tapLabel come from the "AIIN LP Call" / "AIIN LP Tap" conversion actions once created
  // (Governor-room bootstrap write, plan reply §4.2). Gating in CallLayout: tagId alone renders only the
  // base Google tag; the forwarding-number snippet renders only when callLabel is set; the tap event only
  // when tapLabel is set.
  ads: {
    tagId: 'AW-11394874943',
    callLabel: '',
    tapLabel: '',
  },
};

export const callPages: CallPage[] = [aiinCall];

export function callPageNetwork(p: CallPage): Network {
  return networkBySlug(p.networkSlug);
}
