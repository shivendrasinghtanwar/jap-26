// Day metadata + research flags (from JAP-26/research/attractions-research.md).
// Dates confirmed: Fri 18 Dec 2026 → Thu 31 Dec 2026 (home before New Year).

export const CITY_COLORS = {
  tokyo: '#c93a2b',        // vermillion
  kawaguchiko: '#2b6a8e',  // fuji blue
  toyama: '#3f7d63',       // snow pine
  kyoto: '#7a5494',        // murasaki
  osaka: '#c97a1f',        // amber
}

export const DAYS = [
  { day: 1,  city: 'tokyo',       date: 'Fri 18 Dec', title: 'Arrival',                 route: 'Haneda → Tokyo' },
  { day: 2,  city: 'tokyo',       date: 'Sat 19 Dec', title: 'Sumo · Asakusa · Skytree' },
  { day: 3,  city: 'tokyo',       date: 'Sun 20 Dec', title: 'Tokyo DisneySea' },
  { day: 4,  city: 'kawaguchiko', date: 'Mon 21 Dec', title: 'Chureito Pagoda · Lake Kawaguchi', route: 'Tokyo → Fuji' },
  { day: 5,  city: 'kawaguchiko', date: 'Tue 22 Dec', title: 'Oishi Park · Music Forest · Iyashi-no-Sato' },
  { day: 6,  city: 'toyama',      date: 'Wed 23 Dec', title: 'Kansui Park · Glass Art Museum', route: 'Kawaguchiko → Toyama' },
  { day: 7,  city: 'kyoto',       date: 'Thu 24 Dec', title: 'Kimono · Tea Ceremony · Kiyomizu-dera', route: 'Toyama → Kyoto' },
  { day: 8,  city: 'kyoto',       date: 'Fri 25 Dec', title: 'Fushimi Inari · Sanjusangendo · Gion' },
  { day: 9,  city: 'kyoto',       date: 'Sat 26 Dec', title: 'Kinkaku-ji · Ryoan-ji · Arashiyama' },
  { day: 10, city: 'osaka',       date: 'Sun 27 Dec', title: 'Osaka Castle · Umeda Sky', route: 'Kyoto → Osaka' },
  { day: 11, city: 'osaka',       date: 'Mon 28 Dec', title: 'Universal Studios Japan' },
  { day: 12, city: 'osaka',       date: 'Tue 29 Dec', title: 'Kuromon · Dotonbori · Shinsekai' },
  { day: 13, city: 'tokyo',       date: 'Wed 30 Dec', title: 'Shrine Visit · Imperial Palace', route: 'Osaka → Tokyo' },
  { day: 14, city: 'tokyo',       date: 'Thu 31 Dec', title: 'Departure', route: 'Tokyo → Haneda' },
]

// Per-day rating (/10) + self-paid cost estimate for 2 adults in ¥.
export const RATINGS = {
  1:  { score: 8, word: 'Smooth landing',  note: 'Included pickup; grab Welcome Suica cards at T3; an early night beats jet lag.', cost: [6000, 12000],  costNote: 'dinner + Suica load' },
  2:  { score: 8, word: 'Strong day',      note: 'Saturday — confirm the sumo slot is actually booked; stables are active until ~28 Dec.', cost: [5000, 18000],  costNote: 'meals + optional Skytree decks' },
  3:  { score: 5, word: 'Crowd warning',   note: 'Sunday inside the Christmas event — the season’s heaviest crowds and top ticket tier (¥12,400). Buy dated tickets immediately.', cost: [31000, 41000], costNote: 'tickets ¥24,800 + transfer + park food' },
  4:  { score: 9, word: 'Postcard day',    note: 'Late-December Fuji visibility is the best of the year; 398 steps to Chureito — dress for −5 °C.', cost: [5000, 11000],  costNote: 'meals' },
  5:  { score: 6, word: 'Verify first',    note: 'Tuesday sits squarely in Music Forest’s documented winter-closure pattern and the 2026–27 calendar is unpublished — call ahead or swap.', cost: [5000, 11000],  costNote: 'meals' },
  6:  { score: 5, word: 'Tight transfer',  note: 'Longest travel day; realistic Toyama arrival ~14:30–15:00. Glass Museum is open (4th Wednesday) — if nothing slips.', cost: [6000, 17000],  costNote: 'meals + dinner + optional takkyubin' },
  7:  { score: 7, word: 'Tightly wound',   note: 'Christmas Eve in Kyoto. Kimono 13:15 → tea 14:50 → Kiyomizu 16:15 → return 17:45 leaves zero slack, at ~5 °C.', cost: [5000, 11000],  costNote: 'meals' },
  8:  { score: 9, word: 'Clear runway',    note: 'Fushimi at 9:00 beats the worst crowds; Kennin-ji’s closure window only starts the 28th — you’re clear.', cost: [5000, 11000],  costNote: 'meals' },
  9:  { score: 7, word: 'Go early',        note: 'Saturday Arashiyama — the 14:30 bamboo-grove slot will be thick; flipping morning/afternoon would be calmer.', cost: [6000, 13000],  costNote: 'meals + Ryoan-ji + Sagano line' },
  10: { score: 8, word: 'Just in time',    note: 'The castle keep’s last open stretch — it shuts 28 Dec–1 Jan. If the trip slips one day, this breaks.', cost: [6000, 13000],  costNote: 'meals' },
  11: { score: 7, word: 'Full park',       note: 'New-Year-week crowds but no countdown trap on the 28th. The 7:55 rope-drop is right; Express Pass is the lever if budget allows.', cost: [6000, 16000],  costNote: 'park food; Express Pass extra' },
  12: { score: 9, word: 'Peak Osaka',      note: '29 Dec is Kuromon’s spectacular year-end buying frenzy — the best version of this day.', cost: [8000, 20000],  costNote: 'market grazing + shopping' },
  13: { score: 6, word: 'Book the train',  note: '30 Dec is the U-turn rush — Nozomi runs all-reserved and sells out. Reserve the moment the 1-month window opens (30 Nov, SmartEX). The shrine stop is a quiet pre-New-Year visit.', cost: [5000, 11000],  costNote: 'meals' },
  14: { score: 7, word: 'Pad the airport', note: 'New Year’s Eve departure; tax-free refunds now queue at customs — be at Haneda 3h out if you shopped.', cost: [2000, 5000],   costNote: 'breakfast included; snacks' },
}

// level: 'alert' = can break the day as planned · 'info' = good to know
export const FLAGS = {
  1:  [{ level: 'info',  text: 'Day 1 assumes an 18 Dec landing. If the India flight is overnight, everything shifts to 19 Dec–01 Jan — which re-breaks Osaka Castle and puts the return train on the 31st. Confirm the landing date with Jay first.' }],
  2:  [{ level: 'info',  text: 'Confirm what’s booked: a stable morning-practice visit or the staged Asakusa sumo show, and the venue. Stables are active on 19 Dec; their break starts ~29 Dec.' }],
  3:  [{ level: 'alert', text: 'Sunday 20 Dec inside the Christmas event = heaviest crowds of the season and the ¥12,400 top tier. DisneySea is NOT in the package — dated tickets sell out ~2 months ahead. Buy now.' }],
  4:  [{ level: 'info',  text: 'Best Mt. Fuji visibility of the year. Kawaguchiko overnight lows run −5 to −8 °C — pack thermals and kairo heat packs.' }],
  5:  [{ level: 'alert', text: 'Music Forest Museum’s irregular winter closures fall on Tue–Thu and 22 Dec is a Tuesday; the 2026–27 calendar is unpublished. Verify on the official site or call 0555-20-4111 before locking the day.' }],
  6:  [{ level: 'alert', text: 'No direct Kawaguchiko→Toyama route — realistic arrival ~14:30–15:00 (bus → Tokyo Stn → Hokuriku Shinkansen), not 12:00. Ask Jay for the exact priced routing and send the big bags ahead by takkyubin. Glass Museum is open on the 23rd (4th Wednesday).' }],
  8:  [{ level: 'info',  text: 'Kennin-ji’s possible closure window starts 28 Dec — on the 25th you’re clear. Kodai-ji remains the 5-minute backup.' }],
  10: [{ level: 'alert', text: 'Osaka Castle keep shuts 28 Dec–1 Jan — Sunday 27 Dec is its last open window. One day of slip anywhere upstream and this visit breaks. Entry ¥1,200 (included).' }],
  11: [{ level: 'info',  text: 'No Dec-31 countdown trap on Mon 28 Dec — but it’s New-Year-week at dynamic top-tier pricing. The ticket is package-included; make sure the dated reservation is made early.' }],
  12: [{ level: 'info',  text: '29 Dec is Kuromon Ichiba’s year-end peak — arrive hungry. (Jan 1–2 it’s shut; your date is the good one.)' }],
  13: [{ level: 'alert', text: '30 Dec = Japan’s U-turn rush; the Tokaido Nozomi runs all-reserved and sells out. Reserve Shin-Osaka→Tokyo seats on 30 Nov when the 1-month window opens (SmartEX takes foreign cards). No hatsumode this trip — the shrine stop is a quiet pre-NY visit.' }],
  14: [{ level: 'info',  text: 'NYE departure. Tax-free refunds are now claimed at airport customs with queues — reach Haneda 3h+ before the flight if you shopped tax-free.' }],
}
