// JAP-26 · flight selector data.
// Source of truth: ~/mine/docs/JAP-26/research/flights.md, flights-toolkit.md,
// flights-live-prices.md, flights-cx-quote.md — captured 22 Nov 2026.
// All prices are INR TOTALS FOR 2 ADULTS, economy.
// Times marked ~ are derived (from leg totals / standard check-in rules), not published schedules.
// Zones: IST base · JST = IST +3:30 · HKT / SGT / MYT = IST +2:30 · ICT = IST +1:30.

export const CAPTURED = '22 Nov 2026'

export const SOURCES = {
  kiwi: 'Kiwi + Skiplagged · 22 Nov · one-way sum, ceiling',
  google: 'Google Flights live · 22 Nov',
  googleq: 'Google Flights live · 22 Nov 12:50 IST · bookable direct with CX',
  estq: 'estimate · not yet quoted direct',
  direct: 'no search price · quote direct',
}

export const TIERS = {
  cheapest: 'Cheapest',
  balance: 'Best balance',
  timefit: 'Best time-fit',
  comfort: 'Comfort',
}

export const AIRLINE_CHIPS = ['Cathay', 'Air India', 'Thai', 'Singapore', 'AirAsia']
export const DAY_CHIPS = [
  ['fri', 'Fri 18 Dec'],
  ['thu', 'Thu 17 Dec'],
]
export const SLOT_CHIPS = [
  ['morning', 'Morning'],
  ['afternoon', 'Afternoon'],
  ['evening', 'Evening'],
]

export const LEGEND =
  '~ = derived: at airport 3 h before departure, counters close 60 min before; segment times without a published schedule are derived from totals · JST = IST +3:30 · HKT / SGT / MYT = IST +2:30 · ICT = IST +1:30 · prices captured 22 Nov 2026, totals for 2'

// Timeline stops: endpoints {code, t, tz, t2, d}; layovers {code, lay, times, times2, note?}
export const OPTIONS = [
  {
    id: 'cx-fri',
    tier: 'timefit',
    pick: true,
    airline: 'Cathay Pacific',
    airlines: ['Cathay'],
    name: 'All-Cathay · Fri evening',
    arriveDay: 'fri',
    arriveSlot: 'evening',
    bags2x23: true,
    out: {
      total: '15h40',
      stops: [
        { code: 'HYD', t: '02:05', tz: 'IST', t2: '05:35 JST', d: 'Fri 18 Dec' },
        { code: 'HKG', lay: '6h50', times: '~09:40 → ~16:30 HKT', times2: '~07:10 → ~14:00 IST', note: 'airside' },
        { code: 'HND', t: '21:15', tz: 'JST', t2: '17:45 IST', d: 'Fri 18 Dec' },
      ],
    },
    checkinOut: 'at HYD by ~23:00 IST Thu 17 (02:30 JST) · counters close 01:05 IST',
    bags: {
      checked: '1 checked bag pp included · 2nd bag = Essential/Flex, confirm on CX site',
      cabin: '1 carry-on pp (7 kg)',
    },
    returns: {
      jan4: {
        price: 149658,
        source: 'googleq',
        variant: '16:00 afternoon return instead: ₹1,66,458 (+₹16,800)',
        checkin: 'at HND by ~07:10 JST Mon 4 (03:40 IST) · counters close 09:10 JST',
        timeline: {
          total: '18h10',
          stops: [
            { code: 'HND', t: '10:10', tz: 'JST', t2: '06:40 IST', d: 'Mon 4 Jan' },
            { code: 'HKG', lay: '6h40', times: '~14:05 → ~20:45 HKT', times2: '~11:35 → ~18:15 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Tue 5 Jan +1' },
          ],
        },
      },
      jan3: {
        price: 253746,
        source: 'google',
        priceNote: 'RT total with the same CX outbound · 16:00 afternoon return',
        checkin: 'at HND by ~13:00 JST Sun 3 (09:30 IST) · counters close 15:00 JST',
        timeline: {
          total: '12h20',
          stops: [
            { code: 'HND', t: '16:00', tz: 'JST', t2: '12:30 IST', d: 'Sun 3 Jan' },
            { code: 'HKG', lay: '50m', times: '20:15 → 21:05 HKT', times2: '17:45 → 18:35 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Mon 4 Jan +1' },
          ],
        },
      },
    },
    caveat: '10:10-return flight numbers confirm at booking; the 16:00 variant carries the 50-min HKG minimum connection.',
    flights: 'CX 672 / CX 542 · CX 10:10 all-day return',
  },
  {
    id: 'ai-cx',
    tier: 'balance',
    airline: 'Air India + Cathay',
    airlines: ['Air India', 'Cathay'],
    name: 'AI out · CX back',
    arriveDay: 'fri',
    arriveSlot: 'morning',
    bags2x23: false,
    out: {
      total: '11h40',
      stops: [
        { code: 'HYD', t: '13:45', tz: 'IST', t2: '17:15 JST', d: 'Thu 17 Dec' },
        { code: 'BOM', lay: '1h45', times: '~15:10 → ~16:55 IST', times2: '~18:40 → ~20:25 JST' },
        { code: 'HND', t: '04:55', tz: 'JST', t2: '01:25 IST', d: 'Fri 18 Dec +1' },
      ],
    },
    checkinOut: 'at HYD by ~10:45 IST Thu 17 (14:15 JST) · counters close 12:45 IST',
    bags: {
      checked: 'AI 25–30 kg by fare family · CX 2×23 kg pp',
      cabin: '7 kg pp cabin',
    },
    returns: {
      jan4: {
        price: 220800,
        approx: true,
        source: 'kiwi',
        checkin: 'at HND by ~13:00 JST Mon 4 (09:30 IST) · counters close 15:00 JST',
        timeline: {
          total: '12h20',
          stops: [
            { code: 'HND', t: '16:00', tz: 'JST', t2: '12:30 IST', d: 'Mon 4 Jan' },
            { code: 'HKG', lay: '50m', times: '20:15 → 21:05 HKT', times2: '17:45 → 18:35 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Tue 5 Jan +1' },
          ],
        },
      },
      jan3: {
        price: 390745,
        approx: true,
        source: 'kiwi',
        priceNote: '3 Jan CX return alone is ₹3,23,274',
        checkin: 'at HND by ~13:00 JST Sun 3 (09:30 IST) · counters close 15:00 JST',
        timeline: {
          total: '12h20',
          stops: [
            { code: 'HND', t: '16:00', tz: 'JST', t2: '12:30 IST', d: 'Sun 3 Jan' },
            { code: 'HKG', lay: '50m', times: '20:15 → 21:05 HKT', times2: '17:45 → 18:35 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Mon 4 Jan +1' },
          ],
        },
      },
    },
    caveat: 'Two separate PNRs; the cheap AI fare may exclude the checked bag — confirm.',
    flights: 'AI 2618 / AI 356 · CX 549 / CX 601',
  },
  {
    id: 'cx-rt',
    tier: 'cheapest',
    airline: 'Cathay Pacific',
    airlines: ['Cathay'],
    name: 'CX both ways · out 17 Dec',
    arriveDay: 'thu',
    arriveSlot: 'evening',
    bags2x23: true,
    out: {
      total: '15h40',
      stops: [
        { code: 'HYD', t: '02:05', tz: 'IST', t2: '05:35 JST', d: 'Thu 17 Dec' },
        { code: 'HKG', lay: '6h50', times: '~09:40 → ~16:30 HKT', times2: '~07:10 → ~14:00 IST', note: 'airside' },
        { code: 'HND', t: '21:15', tz: 'JST', t2: '17:45 IST', d: 'Thu 17 Dec' },
      ],
    },
    checkinOut: 'at HYD by ~23:00 IST Wed 16 (02:30 JST) · counters close 01:05 IST',
    bags: {
      checked: 'CX Light 1×23 · Essential/Flex 2×23 kg pp',
      cabin: '7 kg pp cabin',
    },
    returns: {
      jan4: {
        priceText: '₹1.6–1.7L',
        source: 'estq',
        priceNote: '4 Jan HND variant missing from Google top list; 4 Jan ran ~₹20k under 3 Jan',
        checkin: 'at HND by ~13:00 JST Mon 4 (09:30 IST) · counters close 15:00 JST',
        timeline: {
          total: '12h20',
          stops: [
            { code: 'HND', t: '16:00', tz: 'JST', t2: '12:30 IST', d: 'Mon 4 Jan' },
            { code: 'HKG', lay: '50m', times: '20:15 → 21:05 HKT', times2: '17:45 → 18:35 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Tue 5 Jan +1' },
          ],
        },
      },
      jan3: {
        price: 185526,
        source: 'google',
        priceNote: 're-quoted ₹1,56,974 minutes later — volatile ±₹20–30k',
        checkin: 'at HND by ~06:35 JST Sun 3 (03:05 IST) · counters close 08:35 JST',
        timeline: {
          total: '~15h',
          stops: [
            { code: 'HND', t: '09:35', tz: 'JST', t2: '06:05 IST', d: 'Sun 3 Jan' },
            { code: 'HKG', lay: '7h15', times: '~13:30 → ~20:45 HKT', times2: '~11:00 → ~18:15 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Mon 4 Jan +1' },
          ],
        },
      },
    },
    caveat: 'Lands Thursday night — one hotel night ahead of the 18 Dec itinerary start.',
    flights: 'CX 672 / CX 542 · JL/CX return',
  },
  {
    id: 'cx-hk-night',
    tier: 'comfort',
    airline: 'Cathay Pacific',
    airlines: ['Cathay'],
    name: 'Hong Kong night en route',
    arriveDay: 'fri',
    arriveSlot: 'afternoon',
    bags2x23: true,
    out: {
      total: '32h10',
      stops: [
        { code: 'HYD', t: '02:05', tz: 'IST', t2: '05:35 JST', d: 'Thu 17 Dec' },
        { code: 'HKG', lay: '~23h', times: '~09:40 → ~08:50 +1 HKT', times2: '~07:10 → ~06:20 +1 IST', note: 'overnight' },
        { code: 'HND', t: '13:45', tz: 'JST', t2: '10:15 IST', d: 'Fri 18 Dec +1' },
      ],
    },
    checkinOut: 'at HYD by ~23:00 IST Wed 16 (02:30 JST) · counters close 01:05 IST',
    bags: {
      checked: 'CX Light 1×23 · Essential/Flex 2×23 kg pp',
      cabin: '7 kg pp cabin',
    },
    returns: {
      jan4: {
        price: 233900,
        approx: true,
        source: 'kiwi',
        priceNote: '+ one HK hotel night',
        checkin: 'at HND by ~13:00 JST Mon 4 (09:30 IST) · counters close 15:00 JST',
        timeline: {
          total: '12h20',
          stops: [
            { code: 'HND', t: '16:00', tz: 'JST', t2: '12:30 IST', d: 'Mon 4 Jan' },
            { code: 'HKG', lay: '50m', times: '20:15 → 21:05 HKT', times2: '17:45 → 18:35 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Tue 5 Jan +1' },
          ],
        },
      },
      jan3: {
        price: 403900,
        approx: true,
        source: 'kiwi',
        priceNote: '3 Jan CX return alone is ₹3,23,274 · + HK hotel night',
        checkin: 'at HND by ~13:00 JST Sun 3 (09:30 IST) · counters close 15:00 JST',
        timeline: {
          total: '12h20',
          stops: [
            { code: 'HND', t: '16:00', tz: 'JST', t2: '12:30 IST', d: 'Sun 3 Jan' },
            { code: 'HKG', lay: '50m', times: '20:15 → 21:05 HKT', times2: '17:45 → 18:35 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Mon 4 Jan +1' },
          ],
        },
      },
    },
    caveat: 'Leaving the airport for the HK night needs the free Pre-Arrival Registration.',
    flights: 'CX 672 / CX 548 · CX 549 / CX 601',
  },
  {
    id: 'ai-del',
    tier: 'comfort',
    airline: 'Air India',
    airlines: ['Air India'],
    name: 'Through-ticket via Delhi',
    arriveDay: 'fri',
    arriveSlot: 'morning',
    bags2x23: false,
    out: {
      total: '11h35',
      stops: [
        { code: 'HYD', t: '14:55', tz: 'IST', t2: '18:25 JST', d: 'Thu 17 Dec' },
        { code: 'DEL', lay: '2h00', times: '~17:00 → ~19:00 IST', times2: '~20:30 → ~22:30 JST', note: 'one PNR' },
        { code: 'HND', t: '06:00', tz: 'JST', t2: '02:30 IST', d: 'Fri 18 Dec +1' },
      ],
    },
    checkinOut: 'at HYD by ~11:55 IST Thu 17 (15:25 JST) · counters close 13:55 IST',
    bags: {
      checked: 'AI 25–30 kg pp by fare family — confirm at booking',
      cabin: '7 kg pp cabin',
    },
    returns: {
      jan4: {
        source: 'direct',
        priceNote: 'AI 4 Jan did not surface in searches — airindia.com',
        checkin: 'at HND by ~08:25 JST Mon 4 (04:55 IST) · counters close 10:25 JST',
        timeline: {
          total: '~11–13h',
          stops: [
            { code: 'HND', t: '11:25', tz: 'JST', t2: '07:55 IST', d: 'Mon 4 Jan' },
            { code: 'DEL', lay: '~2–4h', times: '17:05 IST arr · evening feeder' },
            { code: 'HYD', t: '~21–23:00', tz: 'IST', d: 'Mon 4 Jan' },
          ],
        },
      },
      jan3: {
        price: 229206,
        approx: true,
        source: 'google',
        priceNote: 'quoted once, then “price unavailable” — airindia.com',
        checkin: 'at HND by ~08:25 JST Sun 3 (04:55 IST) · counters close 10:25 JST',
        timeline: {
          total: '~11–13h',
          stops: [
            { code: 'HND', t: '11:25', tz: 'JST', t2: '07:55 IST', d: 'Sun 3 Jan' },
            { code: 'DEL', lay: '~2–4h', times: '17:05 IST arr · evening feeder' },
            { code: 'HYD', t: '~21–23:00', tz: 'IST', d: 'Sun 3 Jan' },
          ],
        },
      },
    },
    caveat: 'Single PNR throughout — protected connection, through-tagged bags.',
    flights: 'AI 2541 / AI 358 · AI 357 + feeder',
  },
  {
    id: 'tg-bkk',
    tier: 'comfort',
    airline: 'Thai + Cathay',
    airlines: ['Thai', 'Cathay'],
    name: 'Bangkok day en route',
    arriveDay: 'fri',
    arriveSlot: 'morning',
    bags2x23: true,
    out: {
      total: '25h55',
      stops: [
        { code: 'HYD', t: '01:30', tz: 'IST', t2: '05:00 JST', d: 'night 16/17 Dec' },
        { code: 'BKK', lay: '16h45', times: '06:30 → 23:15 ICT', times2: '05:00 → 21:45 IST', note: 'city day' },
        { code: 'HND', t: '06:55', tz: 'JST', t2: '03:25 IST', d: 'Fri 18 Dec +1' },
      ],
    },
    checkinOut: 'at HYD by ~22:30 IST Wed 16 (02:00 JST) · counters close 00:30 IST',
    bags: {
      checked: 'TG 2× checked · CX 2×23 kg pp',
      cabin: '7 kg pp cabin',
    },
    returns: {
      jan4: {
        price: 258800,
        approx: true,
        source: 'kiwi',
        checkin: 'at HND by ~13:00 JST Mon 4 (09:30 IST) · counters close 15:00 JST',
        timeline: {
          total: '12h20',
          stops: [
            { code: 'HND', t: '16:00', tz: 'JST', t2: '12:30 IST', d: 'Mon 4 Jan' },
            { code: 'HKG', lay: '50m', times: '20:15 → 21:05 HKT', times2: '17:45 → 18:35 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Tue 5 Jan +1' },
          ],
        },
      },
      jan3: {
        price: 428700,
        approx: true,
        source: 'kiwi',
        priceNote: '3 Jan CX return alone is ₹3,23,274',
        checkin: 'at HND by ~13:00 JST Sun 3 (09:30 IST) · counters close 15:00 JST',
        timeline: {
          total: '12h20',
          stops: [
            { code: 'HND', t: '16:00', tz: 'JST', t2: '12:30 IST', d: 'Sun 3 Jan' },
            { code: 'HKG', lay: '50m', times: '20:15 → 21:05 HKT', times2: '17:45 → 18:35 IST' },
            { code: 'HYD', t: '00:50', tz: 'IST', t2: '04:20 JST', d: 'Mon 4 Jan +1' },
          ],
        },
      },
    },
    caveat: '₹38k over the AI pairing — the Bangkok day is what the premium buys.',
    flights: 'TG 330 / TG 682 · CX 549 / CX 601',
  },
  {
    id: 'sq-sin',
    tier: 'comfort',
    airline: 'Singapore Airlines',
    airlines: ['Singapore'],
    name: 'Short connection via SIN',
    arriveDay: 'fri',
    arriveSlot: 'afternoon',
    bags2x23: false,
    out: {
      total: '12h55',
      stops: [
        { code: 'HYD', t: '23:10', tz: 'IST', t2: '02:40 JST +1', d: 'Thu 17 Dec' },
        { code: 'SIN', lay: '1h50', times: '~06:05 → ~07:55 SGT', times2: '~03:35 → ~05:25 IST' },
        { code: 'HND', t: '15:35', tz: 'JST', t2: '12:05 IST', d: 'Fri 18 Dec +1' },
      ],
    },
    checkinOut: 'at HYD by ~20:10 IST Thu 17 (23:40 JST) · counters close 22:10 IST',
    bags: {
      checked: 'SQ 30 kg weight pp',
      cabin: '7 kg pp cabin',
    },
    returns: {
      jan4: {
        source: 'direct',
        priceNote: 'all-SQ one-way sum searched ₹5,32,500 — singaporeair.com',
        checkin: 'at HND by ~19:55 JST Mon 4 (16:25 IST) · counters close 21:55 JST',
        timeline: {
          total: '26h30',
          stops: [
            { code: 'HND', t: '22:55', tz: 'JST', t2: '19:25 IST', d: 'Mon 4 Jan' },
            { code: 'SIN', lay: '14h40', times: '~05:30 +1 → ~20:10 SGT', times2: '~03:00 +1 → ~17:40 IST' },
            { code: 'HYD', t: '21:55', tz: 'IST', t2: '01:25 JST +1', d: 'Tue 5 Jan +1' },
          ],
        },
      },
      jan3: {
        source: 'direct',
        priceNote: 'all-SQ one-way sum searched ₹5,54,000 — singaporeair.com',
        checkin: 'at HND by ~19:55 JST Sun 3 (16:25 IST) · counters close 21:55 JST',
        timeline: {
          total: '14h40',
          stops: [
            { code: 'HND', t: '22:55', tz: 'JST', t2: '19:25 IST', d: 'Sun 3 Jan' },
            { code: 'SIN', lay: '2h30', times: '~05:30 +1 → ~08:00 SGT', times2: '~03:00 +1 → ~05:30 IST' },
            { code: 'HYD', t: '10:05', tz: 'IST', t2: '13:35 JST', d: 'Mon 4 Jan +1' },
          ],
        },
      },
    },
    caveat: 'No search price on these dates — the searched all-SQ sums ran ~2.4× the field.',
    flights: 'SQ 523 + SIN–HND leg · SQ 635 / SQ 522',
  },
  {
    id: 'd7-kul',
    tier: 'cheapest',
    verdict: 'Not worth it',
    airline: 'Air India + AirAsia X',
    airlines: ['Air India', 'AirAsia'],
    name: 'Cheap return via KUL',
    arriveDay: 'fri',
    arriveSlot: 'morning',
    bags2x23: false,
    out: {
      total: '11h40',
      stops: [
        { code: 'HYD', t: '13:45', tz: 'IST', t2: '17:15 JST', d: 'Thu 17 Dec' },
        { code: 'BOM', lay: '1h45', times: '~15:10 → ~16:55 IST', times2: '~18:40 → ~20:25 JST' },
        { code: 'HND', t: '04:55', tz: 'JST', t2: '01:25 IST', d: 'Fri 18 Dec +1' },
      ],
    },
    checkinOut: 'at HYD by ~10:45 IST Thu 17 (14:15 JST) · counters close 12:45 IST',
    bags: {
      checked: 'AI 25–30 kg out · D7 return none (+₹10–12k to add)',
      cabin: '7 kg pp cabin',
    },
    returns: {
      jan4: {
        price: 202700,
        approx: true,
        source: 'kiwi',
        priceNote: '+ ₹10–12k checked bags on the return',
        checkin: 'at HND by ~20:55 JST Mon 4 (17:25 IST) · counters close 22:55 JST',
        timeline: {
          total: '26h50',
          stops: [
            { code: 'HND', t: '23:55', tz: 'JST', t2: '20:25 IST', d: 'Mon 4 Jan' },
            { code: 'KUL', lay: '14h30', times: '~06:25 +1 → ~20:55 MYT', times2: '~03:55 +1 → ~18:25 IST' },
            { code: 'HYD', t: '23:15', tz: 'IST', t2: '02:45 JST +1', d: 'Tue 5 Jan +1' },
          ],
        },
      },
      jan3: {
        price: 225500,
        approx: true,
        source: 'kiwi',
        priceNote: '+ ₹10–12k checked bags on the return',
        checkin: 'at HND by ~20:55 JST Sun 3 (17:25 IST) · counters close 22:55 JST',
        timeline: {
          total: '26h50',
          stops: [
            { code: 'HND', t: '23:55', tz: 'JST', t2: '20:25 IST', d: 'Sun 3 Jan' },
            { code: 'KUL', lay: '14h30', times: '~06:25 +1 → ~20:55 MYT', times2: '~03:55 +1 → ~18:25 IST' },
            { code: 'HYD', t: '23:15', tz: 'IST', t2: '02:45 JST +1', d: 'Mon 4 Jan +1' },
          ],
        },
      },
    },
    caveat: 'Once return bags are bought the gap to the AI + CX pairing is ₹6–8k.',
    flights: 'AI 2618 / AI 356 · D7 523 / AK 69',
  },
]
