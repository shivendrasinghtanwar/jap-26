// JAP-26 · flight research, structured for the Flights page.
// Single source of truth: ~/mine/docs/JAP-26/research/flights.md,
// flights-toolkit.md and flights-live-prices.md — all captured 22 Nov 2026.
// All prices are INR TOTALS FOR 2 ADULTS, economy, round trip unless noted.

export const CAPTURED = '22 Nov 2026'

export const BRIEF = {
  kicker: 'JAP-26 · HYD ⇄ Tokyo Haneda · 2 adults · economy',
  title: 'Flights',
  sub: 'Every Haneda-compliant way to land by Friday afternoon, 18 Dec 2026 — priced for two. No nonstop HYD–Tokyo exists; these are the real routings.',
}

// ——— verdict strip ———
export const VERDICTS = [
  {
    title: 'Return Mon 4 Jan, not Sun 3 Jan',
    stat: 'saves ₹20k–1.7L',
    body: '3 Jan is Japan’s peak New Year return day. On Cathay the Monday flight is less than half price — ₹1,53,340 vs ₹3,23,274 for two. One extra hotel night (≈₹15–25k) is trivial against that.',
  },
  {
    title: 'Book this week',
    stat: 'T−4 weeks',
    body: 'Peak fares this close out only move up. The cheap 17 Dec buckets (₹34–40k pp on AI and CX) will not survive into December. Prices on this page were captured 22 Nov 2026.',
  },
  {
    title: 'Fly from HYD itself',
    stat: 'positioning loses ₹31–79k',
    body: 'Via DEL ≈₹2.36L and via BLR ≈₹1.88L against ₹1.57L straight out of HYD — before self-transfer risk in Delhi fog season. BLR’s only Tokyo nonstop is Narita-only, dead under the Haneda rule.',
  },
]

// ——— option cards ———
// tier: cheapest | balance | timefit | comfort
// source: kiwi (one-way sums = ceilings) | google (live) | est | direct
// fit.kind: ok | near | early
export const SOURCES = {
  kiwi: 'Kiwi + Skiplagged · 22 Nov · one-way sum, ceiling',
  google: 'Google Flights live · 22 Nov',
  est: 'estimate · UNVERIFIED',
  direct: 'no Google quote · price direct',
}

export const TIERS = {
  cheapest: 'Cheapest',
  balance: 'Best balance',
  timefit: 'Best time-fit',
  comfort: 'Comfort',
}

export const OPTIONS = [
  {
    id: 'ai-cx',
    tier: 'balance',
    pick: true,
    title: 'Air India out · Cathay back',
    carriers: 'AI 2618 / AI 356 + CX 549 / CX 601',
    price: 220800,
    approx: true,
    source: 'kiwi',
    out: {
      stops: [
        { c: 'HYD', m: '13:45 · Thu 17 Dec' },
        { c: 'BOM', m: '1h45' },
        { c: 'HND', m: '04:55 · Fri 18 Dec' },
      ],
      dur: '11h40',
    },
    back: {
      stops: [
        { c: 'HND', m: '16:00 · Mon 4 Jan' },
        { c: 'HKG', m: '50m' },
        { c: 'HYD', m: '00:50 · Tue 5 Jan' },
      ],
      dur: '12h20',
    },
    fit: { kind: 'ok', label: 'HND 04:55 Fri — 10 h inside the 15:00 target' },
    bags: 'AI 25–30 kg by fare family · CX 2×23 kg pp on Essential/Flex',
    caveats: [
      'AI cheap fare may exclude the checked bag — Kiwi shows ₹69.5k without vs ₹76.6k with. Confirm at booking.',
      '04:55 arrival = early hotel check-in problem — request early check-in or bag drop now.',
      'Two separate tickets (AI out, CX back), each its own PNR.',
    ],
  },
  {
    id: 'cx-rt',
    tier: 'cheapest',
    title: 'Cathay via HKG, both ways',
    carriers: 'CX 672 / CX 542 + JL/CX return',
    price: 185526,
    approx: false,
    source: 'google',
    out: {
      stops: [
        { c: 'HYD', m: '02:05 · Thu 17 Dec' },
        { c: 'HKG', m: '6h50' },
        { c: 'HND', m: '21:15 · Thu 17 Dec' },
      ],
      dur: '15h40',
    },
    back: {
      stops: [
        { c: 'HND', m: '09:35 · Sun 3 Jan' },
        { c: 'HKG', m: '7h15' },
        { c: 'HYD', m: '00:50 · Mon 4 Jan' },
      ],
      dur: '~15h',
    },
    fit: { kind: 'early', label: 'HND 21:15 Thu — evening a day early, +1 hotel night' },
    bags: 'CX ex-India, piece system: Light 1×23 kg · Essential/Flex 2×23 kg pp — best in the field',
    caveats: [
      'Volatile: the same itinerary re-quoted at ₹1,56,974 minutes later. Treat ±₹20–30k as noise and re-check.',
      'The cheapest CX variants keep a 19 h HKG overnight on the return.',
      'Hong Kong needs the free Pre-Arrival Registration before leaving the airport.',
    ],
  },
  {
    id: 'cx-hk-night',
    tier: 'timefit',
    title: 'All-Cathay, Hong Kong night',
    carriers: 'CX 672 / CX 548 + CX 549 / CX 601',
    price: 233900,
    approx: true,
    source: 'kiwi',
    priceNote: '+ one HK hotel night',
    out: {
      stops: [
        { c: 'HYD', m: '02:05 · Thu 17 Dec' },
        { c: 'HKG', m: '~23h · overnight' },
        { c: 'HND', m: '13:45 · Fri 18 Dec' },
      ],
      dur: '32h10',
    },
    back: {
      stops: [
        { c: 'HND', m: '16:00 · Mon 4 Jan' },
        { c: 'HKG', m: '50m' },
        { c: 'HYD', m: '00:50 · Tue 5 Jan' },
      ],
      dur: '12h20',
    },
    fit: { kind: 'ok', label: 'HND 13:45 Fri — 1h15 inside the 15:00 target' },
    bags: 'CX ex-India: Light 1×23 kg · Essential/Flex 2×23 kg pp',
    caveats: [
      'One carrier throughout — price it as a single CX round trip on cathaypacific.com/in; expect it at or under this sum.',
      'HK night out: hotel cost + free Pre-Arrival Registration needed.',
      'Best IRROPS cover of the cheap set if bought as one PNR.',
    ],
  },
  {
    id: 'ai-del',
    tier: 'timefit',
    title: 'Air India through-ticket via Delhi',
    carriers: 'AI 2541 / AI 358 · back AI 357 + feeder',
    price: 229206,
    approx: true,
    source: 'google',
    out: {
      stops: [
        { c: 'HYD', m: '14:55 · Thu 17 Dec' },
        { c: 'DEL', m: '2h00' },
        { c: 'HND', m: '06:00 · Fri 18 Dec' },
      ],
      dur: '11h35',
    },
    back: {
      stops: [
        { c: 'HND', m: '11:25 · 3 or 4 Jan' },
        { c: 'DEL', m: '17:05 + feeder' },
        { c: 'HYD', m: '~21:00–23:00' },
      ],
      dur: 'daily',
    },
    fit: { kind: 'ok', label: 'HND 06:00 Fri — the only clean one-PNR target fit' },
    bags: 'AI 25–30 kg by fare family · confirm at booking (ANA/JAL via DEL: 2×23 kg pp)',
    caveats: [
      'Google quoted ₹2.29L once, then “price unavailable” — quote on airindia.com directly.',
      'Single PNR: protected connection, through-tagged bags; the ANA-coded variant priced the same.',
      'AI 357 at 11:25 is the best midday return timing of every option here.',
    ],
  },
  {
    id: 'tg-bkk',
    tier: 'comfort',
    title: 'Thai, with a Bangkok day',
    carriers: 'TG 330 / TG 682 + CX 549 / CX 601',
    price: 258800,
    approx: true,
    source: 'kiwi',
    out: {
      stops: [
        { c: 'HYD', m: '01:30 · night 16/17 Dec' },
        { c: 'BKK', m: '16h45 · city day' },
        { c: 'HND', m: '06:55 · Fri 18 Dec' },
      ],
      dur: '25h55',
    },
    back: {
      stops: [
        { c: 'HND', m: '16:00 · Mon 4 Jan' },
        { c: 'HKG', m: '50m' },
        { c: 'HYD', m: '00:50 · Tue 5 Jan' },
      ],
      dur: '12h20',
    },
    fit: { kind: 'ok', label: 'HND 06:55 Fri — 8 h inside the 15:00 target' },
    bags: 'TG 2× checked out · CX 2×23 kg pp back on Essential/Flex',
    caveats: [
      '₹38k over the AI pairing — you are buying the Bangkok day, not a cheaper seat.',
      'Departs HYD the night of 16 Dec: one extra leave day.',
      'Thailand entry was visa-exempt for Indians — confirm the current stay limit.',
    ],
  },
  {
    id: 'sq-sin',
    tier: 'comfort',
    title: 'Singapore Airlines, short connection',
    carriers: 'SQ 523 + SIN–HND morning leg',
    price: null,
    source: 'direct',
    out: {
      stops: [
        { c: 'HYD', m: '23:10 · Thu 17 Dec' },
        { c: 'SIN', m: '1h50' },
        { c: 'HND', m: '15:35 · Fri 18 Dec' },
      ],
      dur: '12h55',
    },
    back: {
      stops: [
        { c: 'HND', m: 'evening · 3/4 Jan' },
        { c: 'SIN', m: 'layover' },
        { c: 'HYD', m: '21:55 next day' },
      ],
      dur: '14–26h',
    },
    fit: { kind: 'near', label: 'HND 15:35 Fri — 35 min past the 15:00 target' },
    bags: 'SQ 30 kg weight pp',
    caveats: [
      'Google shows no price for these dates — quote on singaporeair.com before ruling it in or out.',
      'The all-SQ round trip searched at ₹5,32,500 — 2.4× best balance. Skip unless the direct quote surprises.',
      'Best soft product of this set.',
    ],
  },
  {
    id: 'd7-kul',
    tier: 'cheapest',
    title: 'AI out · AirAsia X back via KUL',
    carriers: 'AI 2618 / AI 356 + D7 523 / AK 69',
    price: 202700,
    approx: true,
    source: 'kiwi',
    priceNote: '+ ₹10–12k checked bags',
    out: {
      stops: [
        { c: 'HYD', m: '13:45 · Thu 17 Dec' },
        { c: 'BOM', m: '1h45' },
        { c: 'HND', m: '04:55 · Fri 18 Dec' },
      ],
      dur: '11h40',
    },
    back: {
      stops: [
        { c: 'HND', m: '23:55 · Mon 4 Jan' },
        { c: 'KUL', m: '14h30' },
        { c: 'HYD', m: '23:15 · Tue 5 Jan' },
      ],
      dur: '26h50',
    },
    fit: { kind: 'ok', label: 'Same AI outbound — HND 04:55 Fri, inside target' },
    bags: 'AI out 25–30 kg · D7 return none — buying bags costs ₹10–12k',
    verdict: 'Not worth it',
    caveats: [
      'No checked bags on the return — add ₹10–12k and the saving over best balance shrinks to ₹6–8k.',
      '26h50 door to door and a lost Tuesday for that ₹6–8k.',
      'Leaving KUL airport in the 14.5 h layover: visa-free for Indians under the current exemption.',
    ],
  },
]

export const BAGS_NOTE = 'Baggage allowances checked 22 Nov 2026 — AI figures conflict by source; confirm the fare family at booking.'

export const NRT_NOTE =
  'Narita reference: the same Cathay-via-HKG itinerary lands NRT at ₹1,56,974 (3 Jan return) or ₹1,37,256 (4 Jan) — ₹20–42k under the Haneda fares. Excluded by the Haneda-only rule; listed so the cost of that rule is visible.'

// ——— 3 Jan vs 4 Jan (returns, totals for 2, Kiwi/Skiplagged one-ways) ———
export const JAN_COMPARE = {
  note: 'Return leg HND → HYD, totals for 2 · Kiwi + Skiplagged, 22 Nov · one-way prices, so ceilings — the gap is the point.',
  rows: [
    { carrier: 'Cathay Pacific', detail: 'full service · 12h20', jan3: '₹3,23,274', jan4: '₹1,53,340', saves: '₹1,69,934' },
    { carrier: 'AirAsia X via KUL', detail: 'no bags · 26h50', jan3: '₹1,58,020–1,63,194', jan4: '₹1,35,240', saves: '₹22,800–28,000' },
    { carrier: 'HK Express + Cathay', detail: 'self-transfer · 28h25', jan3: '₹1,47,084', jan4: '₹1,21,041', saves: '₹26,043' },
    { carrier: 'Singapore Airlines', detail: 'bags incl. · 14–26h', jan3: '₹3,51,319', jan4: '₹3,29,809', saves: '₹21,510' },
  ],
}

// ——— why not via Delhi / Bengaluru ———
export const POSITIONING = [
  {
    route: 'Straight out of HYD',
    math: '₹1,56,974 (CX via HKG)',
    note: 'The cheap Cathay fare routes via HKG from all three cities — and is cheapest from Hyderabad.',
  },
  {
    route: 'Via Delhi',
    math: '₹2,00,120 + ₹35,712 hop ≈ ₹2,35,800',
    note: '₹79k worse before any risk. AI’s own one-PNR HYD–DEL–HND priced ₹1,05,285 one-way vs ₹67,471 via BOM — AI’s cheap routing is Mumbai, not Delhi.',
  },
  {
    route: 'Via Bengaluru',
    math: '₹1,67,418 + ₹20,796 hop ≈ ₹1,88,200',
    note: '₹31k worse — and BLR’s only Tokyo nonstop (JL 754) is Narita-only. No carrier flies BLR–HND, so it is dead under the Haneda rule.',
  },
]

export const POSITIONING_RISK =
  'Separate-ticket self-transfers carry real risk on these dates: a late first hop forfeits the Tokyo ticket, Delhi sits in fog season through mid-Dec–Jan, and a walk-up replacement one-way runs ₹1–2L for two. Bags too: on a single through-ticket the international allowance covers the domestic HYD–DEL/BOM leg; a separate positioning ticket drops that leg to 15 kg domestic limits plus excess fees.'

// ——— booking checklist ———
export const CHECKLIST = [
  'Settle the 18-vs-19 Dec date-shift flag first — nothing is bookable until trip dates lock, and a slide to a 1 Jan return lands on the single worst ex-Japan day of the season.',
  'Re-quote the winner as a true round trip on the carrier’s own .in site (cathaypacific.com/in, airindia.com) — every Kiwi/Skiplagged number here is a one-way sum, a ceiling.',
  'Confirm the checked bag is inside the AI ₹33.7k pp fare — Kiwi shows a no-bag variant about ₹7k cheaper for two.',
  'Prefer Cathay Essential/Flex or AI Classic/Flex fare families for the 2×23 kg / 30 kg allowance — watch boxes plus winter luggage will exceed 20 kg pp.',
  'Decide the Mon 4 Jan return and tell Jay the hotel needs one more night (≈₹15–25k, funded several times over by the fare delta).',
  'Book within 24–48 h of deciding — at four weeks out, the cheap buckets on these dates close weekly.',
]

export const FOOTER =
  'Research captured 22 Nov 2026 · prices move daily · full sources in the research files.'
