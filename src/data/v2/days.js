// v2 day metadata + research flags (from JAP-26/itinerary-v2-proposal.md).
// Dates: Fri 18 Dec 2026 → Sun 3 Jan 2027 · 17 days · Tokyo → Fuji → Kanazawa → Kyoto → Osaka → Tokyo.

export const CITY_COLORS = {
  tokyo: '#c93a2b',        // vermillion
  kawaguchiko: '#2b6a8e',  // fuji blue
  kanazawa: '#3f7d63',     // snow pine
  kyoto: '#7a5494',        // murasaki
  osaka: '#c97a1f',        // amber
}

export const DAYS = [
  { day: 1,  city: 'tokyo',       date: 'Fri 18 Dec', title: 'Arrival',                 route: 'Haneda → Tokyo' },
  { day: 2,  city: 'tokyo',       date: 'Sat 19 Dec', title: 'Sumo · Asakusa · Skytree' },
  { day: 3,  city: 'tokyo',       date: 'Sun 20 Dec', title: 'Ginza Watches · Shibuya Sky' },
  { day: 4,  city: 'tokyo',       date: 'Mon 21 Dec', title: 'Tokyo DisneySea' },
  { day: 5,  city: 'kawaguchiko', date: 'Tue 22 Dec', title: 'Chureito Pagoda · Lake Kawaguchi', route: 'Tokyo → Fuji' },
  { day: 6,  city: 'kanazawa',    date: 'Wed 23 Dec', title: 'Oishi Park · Kenrokuen', route: 'Kawaguchiko → Kanazawa' },
  { day: 7,  city: 'kyoto',       date: 'Thu 24 Dec', title: 'Crab Breakfast · Kimono · Christmas Eve', route: 'Kanazawa → Kyoto' },
  { day: 8,  city: 'kyoto',       date: 'Fri 25 Dec', title: 'Fushimi Inari · Gion · Osaka Lights Hop' },
  { day: 9,  city: 'kyoto',       date: 'Sat 26 Dec', title: 'Kinkaku-ji · Ryoan-ji · Arashiyama' },
  { day: 10, city: 'osaka',       date: 'Sun 27 Dec', title: 'Osaka Castle · Umeda Sky · Watch Stop', route: 'Kyoto → Osaka' },
  { day: 11, city: 'osaka',       date: 'Mon 28 Dec', title: 'Universal Studios Japan' },
  { day: 12, city: 'osaka',       date: 'Tue 29 Dec', title: 'Kuromon · Dotonbori · Shinsekai' },
  { day: 13, city: 'tokyo',       date: 'Wed 30 Dec', title: 'Illuminations · Nakano (optional)', route: 'Osaka → Tokyo' },
  { day: 14, city: 'tokyo',       date: 'Thu 31 Dec', title: 'Rest Day · Zojoji Midnight' },
  { day: 15, city: 'tokyo',       date: 'Fri 1 Jan',  title: 'Hatsumode · Skytree' },
  { day: 16, city: 'tokyo',       date: 'Sat 2 Jan',  title: 'Imperial Greeting' },
  { day: 17, city: 'tokyo',       date: 'Sun 3 Jan',  title: 'Harajuku · Ginza Sales' },
  { day: 18, city: 'tokyo',       date: 'Mon 4 Jan',  title: 'Flight Home', route: 'Tokyo → Haneda' },
]

// Per-day rating (/10) + self-paid cost estimate for 2 adults in ¥.
export const RATINGS = {
  1:  { score: 8, word: 'Smooth landing',  note: 'Included pickup; grab Welcome Suica cards at T3; an early night beats jet lag.', cost: [6000, 12000],  costNote: 'dinner + Suica load' },
  2:  { score: 8, word: 'Strong day',      note: 'Saturday — confirm the sumo slot is actually booked; stables are active until ~28 Dec.', cost: [5000, 18000],  costNote: 'meals + optional Skytree decks' },
  3:  { score: 9, word: 'Watches & sunset', note: 'Both anniversary watches bought on a normal retail day — Seiko Museum, Dream Square, then Bic for hers — and Shibuya Sky at golden hour to end it.', cost: [11000, 20000], costNote: 'meals + Shibuya Sky ¥5,200; watch budget separate' },
  4:  { score: 8, word: 'Park on a school day', note: 'Monday inside the Christmas event — busy, but nothing like the weekend. Rope-drop at 07:50; budget ¥8–12k for Premier Access on the big three.', cost: [31000, 41000], costNote: 'tickets ¥24,800 + transfer + park food' },
  5:  { score: 9, word: 'Postcard day',    note: 'Late-December Fuji visibility is the best of the year; 398 steps to Chureito — dress for −5 °C.', cost: [5000, 11000],  costNote: 'meals' },
  6:  { score: 8, word: 'Sunrise to snow garden', note: 'Oishi Park at first light for Fuji, then the ride to Kanazawa — Kenrokuen’s yukitsuri at golden hour, Higashi Chaya after dark.', cost: [6000, 13000],  costNote: 'meals + Kenrokuen ¥640' },
  7:  { score: 9, word: 'Christmas Eve, done right', note: 'Crab breakfast at Omicho, Kiyomizu in kimono before the 16:48 sunset, tea at dusk, dinner above the city, midnight mass. Zero slack, all of it earned.', cost: [46000, 75000], costNote: 'crab for two (¥5–12k) + Pittoresque menu ¥20–30k pp' },
  8:  { score: 8, word: 'Two cities of light', note: 'Temples by day; a 29-minute hop buys Hikari Renaissance’s final night. Back by ~22:30.', cost: [7000, 14000],  costNote: 'meals + Osaka hop fares' },
  9:  { score: 7, word: 'Go early',        note: 'Saturday Arashiyama — the 14:30 bamboo-grove slot will be thick; flipping morning/afternoon would be calmer.', cost: [6000, 13000],  costNote: 'meals + Ryoan-ji + Sagano line' },
  10: { score: 8, word: 'Just in time',    note: 'The castle keep’s last open day before the 28 Dec–1 Jan closure — and Yodobashi Umeda’s watch floor is 5 minutes from the hotel.', cost: [6000, 13000],  costNote: 'meals; watch budget separate' },
  11: { score: 7, word: 'Full park',       note: 'New-Year-week crowds but no countdown trap on the 28th. The 7:55 rope-drop is right; Express Pass is the lever if budget allows.', cost: [6000, 16000],  costNote: 'park food; Express Pass extra' },
  12: { score: 9, word: 'Peak Osaka',      note: '29 Dec is Kuromon’s spectacular year-end buying frenzy — the best version of this day.', cost: [8000, 20000],  costNote: 'market grazing + shopping' },
  13: { score: 8, word: 'Soft landing', note: 'Reserve the 09:15 Nozomi on 30 Nov. Illuminations in the afternoon, Nakano optional — the evening stays light before tomorrow’s midnight.', cost: [5000, 12000], costNote: 'meals; vintage watch budget separate' },
  14: { score: 9, word: 'The midnight you came for', note: 'Zojoji’s bell with Tokyo Tower lit behind it; arrive 22:00–22:30. JR runs all night.', cost: [5000, 11000],  costNote: 'meals; Zojoji is free' },
  15: { score: 8, word: 'First day of 2027', note: 'Hatsumode at Meiji Jingu ~15:00 through the forest approach; Skytree for the first night view.', cost: [11000, 18000], costNote: 'meals + Skytree ¥6,200' },
  16: { score: 8, word: 'Once-a-year doors', note: 'The palace’s inner grounds open and the Imperial family appears on the balcony; free afternoon to recover before the farewell dinner.', cost: [5000, 11000],  costNote: 'meals' },
  17: { score: 8, word: 'Bought back',      note: 'The day the 10:10 flight paid for — Harajuku morning for the Converse flagship (Made-in-Japan · Addict lines), Cat Street lunch, then the Ginza Line straight to the NY sales. Nothing to haul — you fly tomorrow.', cost: [10000, 30000], costNote: 'meals + sneakers (¥7–18k a pair); fukubukuro separate' },
  18: { score: 7, word: 'Fly home',        note: 'Early counter-flow start: leave 06:15, Haneda by 07:10, customs tax refund with the watches in hand before the 10:10 CX departure.', cost: [2000, 4000],   costNote: 'breakfast boxes; snacks' },
}

// level: 'alert' = can break the day as planned · 'info' = good to know
export const FLAGS = {
  1:  [{ level: 'info',  text: 'Flights not booked yet — Day 1 now follows the all-Cathay plan: CX lands HND 21:15 on 18 Dec, included transfer moves to ~22:00 (tell Jay). If booking slips to a next-day arrival, everything shifts to 19 Dec–01 Jan — which re-breaks Osaka Castle and puts the return train on the 31st.' }],
  2:  [{ level: 'info',  text: 'Confirm what’s booked: a stable morning-practice visit or the staged Asakusa sumo show, and the venue. Stables are active on 19 Dec; their break starts ~29 Dec.' }],
  3:  [{ level: 'alert', text: 'Shibuya Sky sunset tickets for 20 Dec drop ~6 Dec 00:00 JST (14-day window) and sell out in minutes — set the alarm. Seiko Museum Ginza opens 10:30 (not 10:00) — reserve the first slot online, free. Dream Square and Bic keep normal Sunday hours; call Bic ahead for the 100-piece Yukiakari.' }],
  4:  [{ level: 'alert', text: 'Dated DisneySea tickets for Mon 21 Dec are on sale NOW and Christmas week sells out — buy today. Monday is far lighter than the weekend, still a Premier Access day (¥1,500–2,500/ride).' }],
  5:  [{ level: 'info',  text: 'Best Mt. Fuji visibility of the year. Kawaguchiko overnight lows run −5 to −8 °C — pack thermals and kairo heat packs.' }],
  6:  [{ level: 'info',  text: 'Kenrokuen ¥320/person; the famous night light-up is February — daytime yukitsuri is the show. Music Forest and Iyashi-no-Sato were dropped in v2.1 (Music Forest was a Tuesday-closure risk anyway).' }],
  7:  [{ level: 'alert', text: 'Book the 19:00 Christmas-Eve dinner NOW — Hotel Okura Kyoto’s Pittoresque menu is confirmed for 19–25 Dec (Granvia/Gion as alternates). Kyoto’s couples-night tables go weeks ahead.' },
       { level: 'info',  text: 'Two logistics locks: ask Jay to REBOOK the tea ceremony from 14:50 to ~16:15 (Kiyomizu moves before it — Dec sunset is 16:48, Sanneizaka shops shut ~17:00), and wear the dinner outfit to the kimono shop — they locker your clothes, so you taxi straight to the Okura afterwards.' },
       { level: 'info',  text: 'Kawaramachi Cathedral (400 m from the Okura): 18:30 public Christmas gathering, “midnight” mass at 21:00 (ends ~22:15) — stacks perfectly after dinner. Non-Christians welcome; confirm 2026 times +81 75-231-4785.' }],
  8:  [{ level: 'info',  text: 'Nakanoshima Hikari Renaissance’s FINAL night (verified 11–25 Dec 2026, free). JR Special Rapid 29 min each way; start back ~21:45.' },
       { level: 'info',  text: 'Alternative for this evening: Kyoto Symphony’s Beethoven Ninth (daiku — Japan’s year-end ritual), 19:00 Kyoto Concert Hall, ¥3,500–6,000, ON SALE NOW (box office +81 75-711-3231) — it would replace the Osaka hop; the 26th is already sold out.' }],
  10: [{ level: 'alert', text: 'Osaka Castle keep shuts 28 Dec–1 Jan — Sunday 27 Dec is its last open window; one day of slip breaks it.' }, { level: 'info', text: 'Yodobashi Umeda (09:30–22:00): Seiko Presage/King Seiko + Orient Star at ~10–25% off + ~10% points + 10% tax refund at airport customs. 5-min covered walk from Hotel Granvia.' }],
  11: [{ level: 'info',  text: 'No Dec-31 countdown trap on Mon 28 Dec — but it’s New-Year-week at dynamic top-tier pricing. The ticket is package-included; make sure the dated reservation is made early.' }],
  12: [{ level: 'info',  text: '29 Dec is Kuromon Ichiba’s year-end peak — arrive hungry. (Jan 1–2 it’s shut; your date is the good one.)' }],
  13: [{ level: 'alert', text: 'Reserve the 30 Dec Shin-Osaka→Tokyo Nozomi on 30 Nov (SmartEX). Nakano Broadway is optional vintage hunting — the building closes Jan 1; call Jack Road 03-3386-9399 before going.' }],
  14: [{ level: 'info',  text: 'Zojoji: bell 21:45–23:00, midnight service, Tokyo Tower backdrop — arrive 22:00–22:30. Skip Shibuya Crossing tonight (countdown cancelled six years running; Hachiko fenced from 06:00). JR Yamanote runs all night.' }],
  15: [{ level: 'info',  text: 'Meiji Jingu stays open all night for hatsumode; mid-afternoon ≈ 1.5–2 h queue through the forest. Skytree open to 22:00 on Jan 1–2 (¥3,100 advance).' }],
  16: [{ level: 'info',  text: 'Ippan Sanga: arrive Nijubashi Main Gate ~08:15; 2026 pattern was entry 09:30–14:10 with balcony appearances ~10:10/11:00/11:50 — the 2027 notice lands late Dec. The palace is the headline; afternoon is deliberately free (the Ginza NY-sale stroll moved to Day 17) — you’ll have stood in crowds for ~4 hours.' }],
  17: [{ level: 'alert', text: 'The night of 3 Jan is NOT in Jay’s package yet — ask him to extend the Tokyo hotel one night (flight home is now 10:10 on Mon 4 Jan).' }],
  18: [{ level: 'info',  text: 'Tax-free refunds are claimed at customs WITH the goods — watches, boxes and receipts in hand before check-in. Counters close 09:10 for the 10:10 flight.' }],
}
