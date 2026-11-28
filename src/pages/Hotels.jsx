import './hotels.css'

/* Hotel audit v2 — all six legs re-audited 26 Nov 2026 by six adversarial
   agents + breakfast fact-check + Google-review pass. Every leg shows its two
   bookable options as full cards; every card carries a breakfast chip.
   All trivago links are pre-dated searches: exact nights, 2 adults. */

const TRV = 'https://www.trivago.in/en-IN/lm/'
const BKG = 'https://www.booking.com/searchresults.html?ss='
const AGD = 'https://www.agoda.com/search?q='

function Chip({ kind, children }) {
  return <span className={'htl-chip' + (kind ? ' ' + kind : '')}>{children}</span>
}

function Featured({ pick, badge, name, area, score, reviews, price, total, chips, transit, near, watch, links }) {
  return (
    <article className={'htl-card' + (pick ? ' is-pick' : '')}>
      <div className="htl-top">
        <span className={'htl-badge' + (pick ? '' : ' alt')}>{badge}</span>
        <div className="htl-name">
          <h3>{name}</h3>
          <span className="htl-area">{area}</span>
        </div>
        <div className="htl-score"><b>{score}</b><small>{reviews}</small></div>
        <div className="htl-price"><b>{price}</b><small>{total}</small></div>
      </div>

      <div className="htl-chips">
        {chips.map(([kind, label]) => <Chip key={label} kind={kind}>{label}</Chip>)}
      </div>

      <div className="htl-body">
        <div className="htl-col">
          <h4>Getting around</h4>
          <ul className="htl-transit">
            {transit.map(([what, time]) => (
              <li key={what}><b>{what}</b><span>{time}</span></li>
            ))}
          </ul>
        </div>
        <div className="htl-col">
          <h4>Food &amp; nearby</h4>
          <div className="htl-near">
            {near.map(n => <span key={n}>{n}</span>)}
          </div>
        </div>
        <div className="htl-col">
          <h4>Book it right</h4>
          <ul className="htl-watch">
            {watch.map(w => <li key={w}>{w}</li>)}
          </ul>
        </div>
      </div>

      <div className="htl-book">
        {links.map(([label, href, ghost]) => (
          <a key={label} className={'htl-btn' + (ghost ? ' ghost' : '')} href={href} target="_blank" rel="noopener">
            {label}
          </a>
        ))}
      </div>
    </article>
  )
}

const LEGS = [
  {
    title: 'Tokyo · Leg 1', dates: '18–22 Dec · 4 nights · check-in ~23:00 on day 1',
    cards: [
      {
        pick: true, badge: 'BOOKED ✓',
        name: 'Comfort Hotel ERA Tokyo Higashi Kanda',
        area: 'Higashi-Kanda — JR Bakurocho 4 min, Bakuroyokoyama 5 min, Higashi-Nihombashi (Asakusa line) ~8 min',
        score: '8.9', reviews: 'Booking 4,099+ · Google 4.3/1,210',
        price: '₹53,101 · Queen', total: 'BOOKED 28 Nov · 4n room-only · free-canc',
        chips: [
          ['yes', '✅ BOOKED — Booking.com · ₹53,101 · confirmed'],
          ['stn', '🚉 JR Bakurocho — 4-min walk · Asakusa line 8 min'],
          ['bf', '🍳 Breakfast NOT included — pay ¥1,800/person · buffet 06:30–09:30'],
          ['warn', '⚠ Email hotel: confirm Queen bed width (160 vs 140 cm)'],
          ['yes', '✓ Free cancellation to 16 Dec · pay 14 Dec'],
          ['yes', '✓ Refreshed Feb 2025 — new Serta mattresses'],
          ['', '10:00 checkout — earlier than most'],
        ],
        transit: [
          ['Sumo · Ryogoku (D2)', 'JR 1 stop · 10 min'],
          ['Senso-ji / Asakusa (D2)', 'Asakusa line · 12 min'],
          ['Ginza watch day (D3)', 'direct · 13 min'],
          ['DisneySea (D4)', 'via Tokyo Stn · 40 min'],
          ['Shinjuku — Fuji train (D5)', 'Sobu direct · 28 min'],
          ['Akihabara', 'walk · 8 min'],
        ],
        near: ['Konbini ×3 in 2 min', 'Kanda coffee kissaten', 'Akihabara food streets 8 min', 'Indian: GANGA/Bole Baba at Asakusabashi ~10 min', 'Pure-veg: Vege Herb Saga, 5-min JR hop', 'Chain gyudon/soba 24h'],
        watch: [
          'One email before booking final: confirm the Queen bed is 160 cm and that they accept a pre-arrival takkyubin parcel — if the bed is 140 cm, book their TWIN (20–28 m², 2×120 cm) instead.',
          'Book the QUEEN room-only free-canc rate (live ₹48,370/4n Booking); the with-breakfast rate adds ~₹15.7k — add breakfast à la carte (¥1,800) only on the days you want it.',
          'Rebranded ERA in Feb 2025 with a real refresh (Serta 7-zone mattresses, nano-bubble showers) — pre-2025 reviews describe the old hotel.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'comfort-hotel-era-tokyo-higashi-kanda?search=100-7300202%3Bdr-20261218-20261222%3Brc-1-2'],
          ['Chain site (Choice Hotels JP)', 'https://www.choice-hotels.jp/en/hotel/era-tokyo-higashikanda/', true],
        ],
      },
      {
        badge: '#2 backup',
        name: 'HOTEL MYSTAYS Asakusabashi',
        area: 'Asakusabashi — JR Sobu 30 seconds, Toei Asakusa line 4 min',
        score: '8.4', reviews: '6,888 · Google 4.1/1,368',
        price: '₹8,970/n', total: '₹35,878 · 4 nights · Agoda free-canc',
        chips: [
          ['stn', '🚉 JR Asakusabashi — 30-sec walk · Toei Asakusa 4 min'],
          ['bf', '🍳 NO breakfast at this hotel — 24h Lawson in the building (1F)'],
          ['warn', '⚠ NO bed wider than 140 cm — only the 6 Twin rooms work'],
          ['yes', '✓ Free cancellation'],
          ['warn', '⚠ Oct 2026 data-breach notice — book via OTA, not direct'],
        ],
        transit: [
          ['Sumo · Ryogoku (D2)', 'JR 1 stop · 5 min'],
          ['Senso-ji / Asakusa (D2)', '2 stops · 8 min'],
          ['Ginza watch day (D3)', '5 stops direct · 11 min'],
          ['DisneySea (D4)', 'via Tokyo Stn · 35 min'],
          ['Shinjuku — Fuji train (D5)', 'Sobu one-seat · 23 min'],
          ['Skytree / Oshiage', '4 stops direct · 9 min'],
        ],
        near: ['Lawson 24h — in building', 'My Basket supermarket', 'Doutor · Tully’s', 'Sukiya 24h', 'Rail-arch ramen & yakitori', 'Indian: GANGA/Bole Baba at the station'],
        watch: [
          'The hotel itself confirmed (review reply, Nov 2026) it owns NO bed ≥150 cm — so for a couple, only the TWIN (18–20 m², 2×120 cm) works, and just 6 exist. Book early or not at all.',
          'Reviews flag small rooms (14–15 m²), a wall-facing window type, and a "strange smell" filter on Trip.com — ask for high floor away from the JR tracks.',
          'Don’t confuse with MYSTAYS Asakusa (different hotel, Sumida).',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'hotel-mystays-asakusabashi-tokyo?search=100-1321068%3Bdr-20261218-20261222%3Brc-1-2'],
          ['Booking.com page', 'https://www.booking.com/hotel/jp/mystays-inn-asakusabashi.html', true],
        ],
      },
      {
        badge: '#3 · her theory',
        name: 'APA Hotel Kanda Ekimae',
        area: 'Kanda — 1 JR stop from Tokyo Stn: the Kyobashi/Nihombashi-side option',
        score: '8.0', reviews: '4,140',
        price: '₹9,078/n', total: '₹36,312 · 4 nights · Agoda free-canc',
        chips: [
          ['stn', '🚉 JR Kanda — ~3-min walk · Tokyo Stn 1 stop · Ginza line direct'],
          ['bf', '🍳 Breakfast NOT included — APA add-on ~¥1,500'],
          ['yes', '✓ Agoda free-cancellation rate'],
          ['warn', '⚠ APA formula: ~11 m², 140 cm double (ERA’s Queen is bigger)'],
          ['', 'Luggage to Kyoto = same Yamato takkyubin as every hotel (~¥2,500/bag)'],
        ],
        transit: [
          ['Tokyo Stn', 'JR · 1 stop · 2 min'],
          ['Shinjuku — Fuji train (D5)', 'Chuo Rapid direct · ~15 min (fastest of the three!)'],
          ['Ginza watch day (D3)', 'Ginza line direct · ~8 min'],
          ['Senso-ji / Asakusa (D2)', 'Ginza line direct · ~15 min'],
          ['Sumo · Ryogoku (D2)', 'via Akihabara + Sobu · ~15 min'],
          ['DisneySea (D4)', 'via Tokyo Stn · ~35 min'],
        ],
        near: ['Kanda izakaya alleys under the tracks', 'Coffee kissaten everywhere', 'Akihabara 1 stop', 'Konbini ×many'],
        watch: [
          'Her-theory verdict: connectivity genuinely great (Chuo Rapid to Shinjuku is the best Fuji-train access of all three options) — but no Toei Asakusa line, so the Asakusa/Ginza-line days gain transfers, and the bed drops to 140 cm.',
          'Luggage myth-check: APA has NO private hotel-to-hotel transport — it’s the same Yamato takkyubin every hotel (incl. our ERA) books at the desk, ~¥2,500/bag, next-day.',
          'Take it if the ERA Queen turns out to be 140 cm anyway and being 2 min from Tokyo Stn matters more than the Asakusa line.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'apa-hotel-kanda-ekimae-tokyo?search=100-8486208%3Bdr-20261218-20261222%3Brc-1-2'],
          ['Agoda — free-canc rate', AGD + 'APA%20Hotel%20Kanda%20Ekimae', true],
        ],
      },
    ],
  },
  {
    title: 'Fuji · Kawaguchiko', dates: '22–23 Dec · 1 night · the anniversary night',
    cards: [
      {
        pick: true, badge: 'BOOKED ✓',
        name: 'Mizno Hotel (湖のホテル)',
        area: 'Hillside above Asakawa, north-east shore — EVERY room faces Fuji over the lake',
        score: '9.5', reviews: '5,337 · Google 4.7/1,214',
        price: '₹28,380', total: 'BOOKED 28 Nov · room-only · free-canc',
        chips: [
          ['yes', '✅ BOOKED — Booking.com · ₹28,380 · now book SEIKOUKI dinner + cake email'],
          ['stn', '🚉 Kawaguchiko Stn — NOT walkable · pickup/taxi 5–10 min'],
          ['bf', '🍳 Breakfast NOT in room-only rate — pick the breakfast plan (Western egg+fruit, Fuji-view terrace, 07:00)'],
          ['yes', '✓ Every room has the Fuji-over-lake view (official)'],
          ['yes', '✓ PRIVATE rooftop onsen for two — reserved slot'],
          ['yes', '✓ Anniversary plan: dinner course + drinks ¥70,200/2'],
          ['warn', '⚠ Rooftop closes in rain (Dec = driest month)'],
        ],
        transit: [
          ['Kawaguchiko Stn (arrive D5)', 'call for pickup · 5–10 min'],
          ['Dep to Kanazawa (D6 morning)', 'free shuttle every 30 min, 08:00–11:00 — no booking'],
          ['Oishi Park sunrise (D6)', 'taxi · ~10 min'],
          ['Lake shore stroll', 'down the hill'],
        ],
        near: ['SEIKOUKI French dinner — in-house, Paris-trained chef', 'Library bar "Authors" 16:00–23:00', 'Nothing walkable — dine in-house', 'Konbini: 5-min taxi to town'],
        watch: [
          'Book the ANNIVERSARY PLAN on Jalan — Terrace Twin "NAGOMI" + French course + drinks, ¥70,200 for two (~₹40k). Or the Booking ₹25,422 room-only + a SEIKOUKI dinner reservation at minimum: dinner is reservation-only and nothing else is walkable.',
          'At check-in, immediately book the rooftop private bath’s post-sunset slot (~¥1,100/person/30 min) — and email ahead (info@mzn.co.jp) for a cake.',
          'Check in by ~17:30 if dining; when booking, confirm the rooftop’s winter hours and that the Jun-2026 closure notice is history (OTAs are selling the night).',
        ],
        links: [
          ['Booking.com — ₹25,422 free-canc', 'https://www.booking.com/hotel/jp/mizuno.html'],
          ['Jalan — anniversary plan ¥70,200', 'https://www.jalan.net/yad317230/plan/', true],
        ],
      },
      {
        badge: '#2 alternate',
        name: 'La Vista Fuji-Kawaguchiko',
        area: 'Kawaguchiko hillside — Fuji-view onsen baths (2nd floor) + 4 free private baths',
        score: '8.9', reviews: '5,126 · Google 4.4/1,932',
        price: '₹34,404', total: 'room-only free-canc · anniv cake plan ~₹62k',
        chips: [
          ['stn', '🚉 Kawaguchiko Stn — NOT walkable · reserve-only shuttle / taxi 10 min'],
          ['bf', '🍳 Breakfast NOT in room-only rate — included only in 2-meal plans (60+ dish buffet)'],
          ['yes', '✓ 4 FREE private baths — first-come, no booking'],
          ['yes', '✓ Rooms with private Fuji-view tub exist'],
          ['yes', '✓ Weatherproof — indoor private baths'],
          ['warn', '⚠ Anniversary cake plan ¥109,120 — 2 rooms left'],
        ],
        transit: [
          ['Kawaguchiko Stn', 'reserve-only shuttle / taxi · 10 min'],
          ['Chureito Pagoda (D5)', 'Fujikyu from Shimoyoshida · ~12 min'],
          ['Oishi Park', 'taxi · ~15 min'],
          ['Dep to Kanazawa (D6)', 'taxi to station — book the night before'],
        ],
        near: ['Petit Poche French dinner — in-house, 8 courses', 'Houtou noodle houses in town (taxi)', 'Fuji-view Lawson (famous one)', 'Konbini near the station'],
        watch: [
          'The weatherproof pick: if gambling the once-only night on a rooftop that shuts in rain bothers you, La Vista’s indoor private baths + in-room view tub can’t be rained off.',
          'Book the FUJI-VIEW room category with the 2-meal or anniversary-cake plan (¥105–109k/2 on Jalan; inventory already thin — 1–2 rooms left). Dinner is reservation-mandatory, nothing walkable.',
          'Reality check from reviews: baths are 2nd-floor hillside (not rooftop), private baths queue on sold-out nights, rooms "cosy but not modern".',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'resort-la-vista-fuji-kawaguchiko-fujikawaguchiko?search=100-6225322%3Bdr-20261222-20261223%3Brc-1-2'],
          ['Jalan — plans for 22 Dec', 'https://www.jalan.net/yad343640/plan/', true],
        ],
      },
    ],
  },
  {
    title: 'Kanazawa', dates: '23–24 Dec · 1 night',
    cards: [
      {
        pick: true, badge: 'BOOKED ✓',
        name: 'Hotel Forza Kanazawa',
        area: 'Yasue-cho — beside Omicho Market (3 min), 9–10 min walk to Kanazawa Stn',
        score: '9.0', reviews: 'Booking 6,760 · Google 4.5/1,352',
        price: '₹4,027 all-in', total: 'BOOKED 28 Nov · Agoda #2071512374 · Comfort Double',
        chips: [
          ['yes', '✅ BOOKED — Agoda · ₹4,027 · 2 adults · free canc to 11 Dec · charged 9 Dec'],
          ['stn', '🚉 Kanazawa Stn — 9–10-min walk · Omicho Market 3 min'],
          ['bf', '🍳 Breakfast NOT included — ¥2,300 extra; skip it, Omicho opens 07:00'],
          ['warn', '⚠ Book COMFORT or REFRESH Double (150 cm) — flexible Booking rate, NOT the prepaid “Partner Offer”'],
          ['yes', '✓ REFRESH Double = bathtub + separate washing area in-room'],
          ['no', '✗ 140/130 cm trap doubles exist (not listed for our night)'],
          ['no', '✗ No public bath — Super Hotel/Dormy win on onsen'],
        ],
        transit: [
          ['Omicho Market (D7 breakfast)', 'walk · 3 min'],
          ['Kanazawa Stn (arr D6 / dep D7)', 'walk · 9–10 min'],
          ['Higashi Chaya district', 'walk · ~15 min'],
          ['Kenroku-en + castle', 'walk ~20 min or loop bus'],
          ['21st Century Museum', 'loop bus · ~10 min'],
        ],
        near: ['Omicho Market — next door', 'Kanazawa oden izakayas', 'Station Rinto/Anto malls', 'Konbini in 1 min'],
        watch: [
          '28 Nov re-audit: price flat (no Dec surcharge yet), Comfort + Refresh Doubles both open for our night, 9.0/6,760 holds. Official site SSL is DEAD — confirm 150 cm by phone 076-222-7411 if it matters.',
          'Skip the ¥2,300 buffet — Omicho stalls at 07:00, three minutes away, ARE the breakfast plan.',
          'One night: arrive 14:50, drop bags, Higashi Chaya lit by evening.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'hotel-forza-kanazawa?search=100-15753816%3Bdr-20261223-20261224%3Brc-1-2'],
          ['Booking.com — flexible rate', BKG + 'Hotel+Forza+Kanazawa', true],
        ],
      },
      {
        badge: '#2 · logistics king',
        name: 'HOTEL TORIFITO KANAZAWA',
        area: 'Honmachi 2-12-1 — 3–4-min walk from the Kenrokuen (East) exit · opened 2021',
        score: '8.9', reviews: 'trivago 5,540 · Google 4.4/906 · Trip 9.2/647',
        price: '₹5,363/n Trip.com', total: '₹6,121 Booking · both free-canc · queen rooms price higher',
        chips: [
          ['stn', '🚉 Kanazawa Stn — 3–4-min walk (best for the 09:00 Tsurugi dash)'],
          ['bf', '🍳 Breakfast NOT included — ¥2,750 buffet 06:30 (sushi/Kanazawa curry) · 15-min queues'],
          ['warn', '⚠ Book COMFORT or SUPERIOR Double (QUEEN ~160 cm) — Standard Double is the 140 cm trap'],
          ['yes', '✓ Newest rooms of the four · deep soaking tub in every room'],
          ['yes', '✓ Big gender-separated bath incl. 05:00–10:00 morning session (not onsen, no sauna)'],
          ['yes', '✓ Checkout 11:00 — a full hour more than Super Hotel'],
        ],
        transit: [
          ['Kanazawa Stn (arr D6 / dep D7)', 'walk · 3–4 min'],
          ['Omicho Market (D7 breakfast)', 'walk · ~10–11 min'],
          ['Higashi Chaya district', 'loop bus · ~12 min'],
          ['Kenroku-en + castle', 'loop bus · ~15 min'],
        ],
        near: ['Station Rinto/Anto malls + Hyakubangai', 'Kanazawa Forus dining', 'Konbini en route', 'Tsuzumi-mon gate photo op'],
        watch: [
          'The logistics pick for THIS itinerary: 14:50 arrival (15:00 check-in — drop bags), 3–4-min sprint to the 09:00 Tsurugi, 11:00 checkout. Worth ~₹1,600 over Forza ONLY in a queen room.',
          'Breakfast is pricey (¥2,750) and queues — eat 06:30 sharp, or use station Hyakubangai; Omicho is 10 min the WRONG direction on this timetable.',
          'In-room TV shows live bath-crowding status; bath is busiest ~21:00.',
        ],
        links: [
          ['Trip.com — cheapest free-canc', 'https://www.trip.com/hotels/kanazawa-hotel-detail-70655931/', true],
          ['Check live rates — trivago', TRV + 'hotel-torifito-kanazawa'],
        ],
      },
      {
        badge: '#3 · onsen on a budget',
        name: 'Super Hotel Premier Kanazawa-Eki Higashiguchi',
        area: 'Honmachi 2-5-15 — 7-min walk from the East exit · natural onsen 鼓門の湯 in-house',
        score: '8.9', reviews: 'Booking 8.9 · Google 4.3/736 · trivago 8.7/1,479',
        price: '₹4,940/n', total: 'Booking free-canc, no prepay · avoid ₹4,109 Trip non-refundable',
        chips: [
          ['stn', '🚉 Kanazawa Stn — 7-min walk (10 with bags)'],
          ['bf', '🍳 Breakfast NOT free here — the famous Super Hotel free breakfast does NOT apply at Premier: ¥1,200, 06:30–09:00'],
          ['yes', '✓ Real onsen bath 15:00–09:30 — gender-separate (water trucked from Kaga Onsen)'],
          ['warn', '⚠ Doubles are 12 m² tiny — take the 18 m² TWIN · bed cm unpublished'],
          ['warn', '⚠ Women’s bath needs a PIN from reception — ask at check-in'],
          ['no', '✗ Checkout 10:00 · front desk closes 24:00 · smoking rooms exist — book 禁煙'],
        ],
        transit: [
          ['Kanazawa Stn (arr D6 / dep D7)', 'walk · 7 min'],
          ['Omicho Market (D7 breakfast)', 'walk · ~8 min'],
          ['Higashi Chaya district', 'loop bus · ~12 min'],
          ['Kenroku-en + castle', 'loop bus · ~15 min'],
        ],
        near: ['Station malls 7 min', 'Omicho Market 8 min', 'Konbini nearby', 'Onsen downstairs — the whole point'],
        watch: [
          'Pick this over Forza only if the onsen soak matters more than a confirmed 150 cm bed and Omicho at the door — at nearly the same money.',
          'Onsen is real but trucked-in Kaga water; reviews call the room small and the bath ambience dim.',
          'Morning bath runs to 09:30 — tight but doable before the ~09:45 walk to the Tsurugi.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'super-hotel-premier-kanazawa-eki-higashiguchi'],
          ['Booking.com — free-canc rate', BKG + 'Super+Hotel+Premier+Kanazawa+Higashiguchi', true],
        ],
      },
      {
        badge: '#4 · rooftop rotenburo',
        name: 'Dormy Inn Kanazawa',
        area: 'Horikawashinmachi — 2-min walk from the East exit · natural hot spring on 14F',
        score: '8.5', reviews: 'Booking 2,856 · Google 4.2/2,769 · Trip 9.3/335',
        price: '₹6,246/n', total: '¥12,012 Booking free-canc · re-audited 28 Nov',
        chips: [
          ['stn', '🚉 Kanazawa Stn — 2-min walk (closest of the four)'],
          ['bf', '🍳 Breakfast NOT included — ~¥2,500; kaisen-don seafood spread (weak for veg)'],
          ['yes', '✓ REAL natural onsen from 1,200 m underground — rooftop open-air bath + sauna'],
          ['warn', '⚠ Double bed = 140×203 cm — snug for 2 · avoid “small double”'],
          ['warn', '⚠ 2026 notices: bath hours changed Nov, AC repairs on some floors — re-check before booking'],
          ['warn', '⚠ Free 21:30 ramen is PORK broth — not veg'],
        ],
        transit: [
          ['Kanazawa Stn', 'walk · 2 min'],
          ['Omicho Market (D7 breakfast)', 'walk · ~12 min'],
          ['Kenroku-en + castle', 'loop bus · ~15 min'],
          ['Higashi Chaya district', 'loop bus · ~12 min'],
        ],
        near: ['Station Rinto & Anto malls', 'Kanazawa Forus dining floors', 'Konbini at the station', 'Free 21:30 ramen (pork) — in-house'],
        watch: [
          'The best BATH of the four — true rooftop rotenburo + sauna — but ~75% pricier than Forza for a 140 cm bed.',
          'Google 4.2 is dragged by old reviews; 2025–26 guests still praise onsen + breakfast, complain about queues and night-time bath crowds.',
          'Choose it only if open-air onsen is the memory you want from the one Kanazawa night.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'hotel-dormy-inn-kanazawa-natural-hot-spring?search=100-1344588%3Bdr-20261223-20261224%3Brc-1-2'],
          ['Booking.com — search', BKG + 'Dormy+Inn+Kanazawa', true],
        ],
      },
    ],
  },
  {
    title: 'Kyoto (Christmas)', dates: '24–27 Dec · 3 nights',
    cards: [
      {
        pick: true, badge: '#1 pick',
        name: 'Comfort Hotel ERA Kyoto Toji',
        area: 'Minami-ku — Kintetsu Toji 1 min, Kyoto Stn a flat 14-min walk (or 1 train stop)',
        score: '9.1', reviews: '5,950 · Google 4.5/735',
        price: '₹5,543/n', total: '3 nights · Booking free-canc ₹16,628',
        chips: [
          ['stn', '🚉 Kintetsu Toji — 1-min walk · Kyoto Stn 14-min flat walk'],
          ['bf', '🍳 Breakfast NOT included — pay ¥1,800/person · veg-friendly buffet 06:30'],
          ['yes', '✓ 160 cm "QUEEN ECONOMY" room — book this'],
          ['no', '✗ Standard Double is only 140 cm'],
          ['warn', '⚠ Queen Economy may have a frosted no-view window'],
          ['yes', '✓ Free cancellation · 24h desk'],
        ],
        transit: [
          ['Kyoto Stn — all 4 mornings', 'flat walk 14 min · Kintetsu 1 stop'],
          ['Fushimi Inari sunrise (D8)', 'via Kyoto Stn · JR 2 stops'],
          ['Arashiyama (D9)', 'JR Sagano line · ~16 min'],
          ['Gion / Kiyomizu-dera', 'bus 206 · ~20 min'],
          ['Toji pagoda (World Heritage)', 'walk · 5 min'],
        ],
        near: ['Kyoto Stn Ramen Koji (10F)', 'Kyoto Tower Sando food hall', 'AEON Mall Kyoto', 'Konbini beside the hotel'],
        watch: [
          'Book the QUEEN ECONOMY (160 cm, 16–18 m², 28 rooms exist) — and request HIGH FLOOR, WEST-FACING: the real noise is the Kintetsu tracks east of the hotel (trains ~05:30–24:00), not just Kujo-dori. East/south rooms have fixed frosted windows — quiet, but no view.',
          'Breakfast is NOT included: ¥1,800/adult "vegetable-forward" buffet from 06:30 — the most veg-friendly cheap buffet of the trip, and it works for sunrise mornings if you eat at opening.',
          'One email before you fly (+81 75-662-0311): confirm they’ll hold the takkyubin bags from Tokyo (label: フロント気付 + name + check-in 24 Dec) — the policy isn’t published, so don’t ship blind. Checkout is 10:00.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'comfort-hotel-era-kyoto-toji?search=100-23439598%3Bdr-20261224-20261227%3Brc-1-2'],
          ['Booking.com — search', BKG + 'Comfort+Hotel+ERA+Kyoto+Toji', true],
        ],
      },
      {
        badge: '#2 alternate',
        name: 'Hotel Vischio Kyoto by GRANVIA',
        area: 'Kyoto Stn, south/Hachijo exit — 2-min walk; perfect side for the D10 Osaka departure',
        score: '9.1', reviews: '9,330 · Google 4.5/1,601',
        price: '₹8,489/n', total: '3 nights · Agoda free-canc ₹25,467',
        chips: [
          ['stn', '🚉 Kyoto Stn (Hachijo exit) — 2-min walk'],
          ['bf', '🍳 Breakfast NOT included — ¥4,500/person extra (famous 100+ dish buffet)'],
          ['yes', '✓ Moderate Double = 180 cm KING, 21.5 m²'],
          ['yes', '✓ Guest-only big bath + sauna (not onsen)'],
          ['yes', '✓ Agoda free-cancellation rate'],
          ['warn', '⚠ Hachijo side: +5–8 min station crossing for JR mornings'],
        ],
        transit: [
          ['Kyoto Stn (Hachijo exit)', 'walk · 2 min'],
          ['JR platforms (Fushimi/Arashiyama)', '+5–8 min through the station'],
          ['Gion / Kiyomizu-dera', 'bus 206 from the station · ~20 min'],
          ['Dep to Osaka (D10)', 'same side as Shinkansen/Hachijo gates'],
        ],
        near: ['Vischio Garden buffet — Kyoto obanzai spread', 'Porta underground mall', 'Kyoto Stn Ramen Koji (10F)', 'Konbini in the station'],
        watch: [
          'The comfort upgrade: same 9.1 score as ERA, a real 180 cm king, 2019 hardware, big bath + sauna, 11:00 checkout — for ~₹8.8k more over 3 nights.',
          'Its famous buffet is now ¥4,500/head (¥9,000/day for two) — do it ONCE as the Christmas-morning treat, konbini the other days.',
          'Recent gripes to know: compact rooms for the class, a few "hard bed/dusty corners" reviews — ask high floor; opened 2019.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'hotel-vischio-kyoto-by-granvia?search=100-11217144%3Bdr-20261224-20261227%3Brc-1-2'],
          ['Agoda — free-canc rate', AGD + 'Hotel%20Vischio%20Kyoto', true],
        ],
      },
    ],
  },
  {
    title: 'Osaka', dates: '27–30 Dec · 3 nights',
    cards: [
      {
        pick: true, badge: '#1 pick',
        name: 'DEL style Osaka Shin-Umeda by Daiwa Roynet',
        area: 'Shin-Umeda — ~7-min walk north-west of Osaka Stn; 2019 building, 4★',
        score: '8.4', reviews: '4,947',
        price: '₹7,251/n', total: '3 nights · Klook free-canc ₹21,752',
        chips: [
          ['stn', '🚉 Osaka Stn — ~7-min walk · Yodobashi 9 min'],
          ['bf', '🍳 Breakfast NOT included — ¥2,200 extra (fixed set); skip it, Umeda feeds you better'],
          ['yes', '✓ Free-canc ₹7,251/n (Klook) · ₹8,217 Booking'],
          ['yes', '✓ 2019 build — the newest option in Umeda'],
          ['yes', '✓ Daiwa Roynet standard: 24h desk + bag storage'],
        ],
        transit: [
          ['Osaka Stn / Umeda', 'walk · ~7 min'],
          ['USJ (D11)', 'JR Loop → Universal City · ~20 min'],
          ['Dotonbori / Namba', 'Midosuji from Umeda · ~10 min'],
          ['Yodobashi Umeda — watch run', 'walk · ~9 min'],
          ['Shin-Osaka (D13 Nozomi)', 'JR 1 stop from Osaka Stn · 4 min'],
        ],
        near: ['Shin-Umeda Shokudogai izakaya alley', 'Hanshin/Hankyu depachika', 'Kiji okonomiyaki (Sky Bldg ~10 min)', 'Konbini everywhere'],
        watch: [
          'Lock the Klook free-canc rate (₹7,251/n); Booking’s ₹8,217 is the easier-support fallback at ₹2.9k more for the stay.',
          'D10: you land at Osaka Stn ~09:50 — Daiwa Roynet desks store bags before check-in; drop and go straight out.',
          'Confirm bed width at booking — pick the Double/Queen category over the smallest room class for 3 nights with luggage.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'del-style-osaka-shin-umeda-by-daiwa-roynet-hotel?search=100-19759854%3Bdr-20261227-20261230%3Brc-1-2'],
          ['Booking.com — search', BKG + 'DEL+style+Osaka+Shin-Umeda', true],
        ],
      },
      {
        badge: '#2 alternate',
        name: 'APA Midosuji Honmachi Ekihigashi',
        area: 'Honmachi — east of the Midosuji line (6–8 min walk to its platforms)',
        score: '8.2', reviews: '3,323 · skyticket 4.2/1,694',
        price: '₹4,988/n', total: '3 nights · Booking free-canc ₹14,965',
        chips: [
          ['stn', '🚉 Sakaisuji-Honmachi — beside it · Midosuji platforms 6–8-min walk'],
          ['bf', '🍳 Breakfast NOT included — ¥1,500 extra (small buffet); skip it'],
          ['yes', '✓ Cheapest Osaka option — free-canc confirmed'],
          ['no', '✗ Double is 11 m² with a 140 cm bed'],
          ['warn', '⚠ If choosing this, book the 21 m² Deluxe Twin (2×120)'],
          ['warn', '⚠ Google Maps pin reportedly misplaced — navigate by address'],
        ],
        transit: [
          ['Midosuji line platforms', 'walk · 6–8 min (it’s beside Sakaisuji-Honmachi)'],
          ['Umeda / Osaka Stn', 'Midosuji · 2 stops'],
          ['Namba / Dotonbori', 'Midosuji · 2 stops'],
          ['USJ (D11)', 'via Nishikujo · ~30 min'],
          ['Shin-Osaka (D13)', 'Midosuji direct · ~15 min'],
        ],
        near: ['Honmachi office-lunch spots', 'Utsubo Park cafes', 'Konbini in 1 min', 'Quiet business-district evenings'],
        watch: [
          'The price edge is real only in the 11 m² double — the Deluxe Twin lands at DEL-style money, so DEL style wins unless every rupee counts.',
          'D10 09:50 arrival means a subway hop with all the bags before drop-off; USJ and the station runs are all clumsier from Honmachi.',
          'Don’t confuse it with the near-identical "APA Midosuji Hommachi EKIMAE Tower" — different, bigger property.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'apa-hotel-midosuji-honmachi-ekihigashi-osaka?search=100-8155980%3Bdr-20261227-20261230%3Brc-1-2'],
          ['Booking.com — search', BKG + 'APA+Hotel+Midosuji+Honmachi+Ekihigashi', true],
        ],
      },
    ],
  },
  {
    title: 'Tokyo · New Year', dates: '30 Dec–4 Jan · 5 nights · LAST FEW ROOMS',
    cards: [
      {
        badge: '#2 alternate',
        name: 'APA Nihombashi Bakuroyokoyama Ekimae',
        area: 'Higashi-Nihombashi — stations linked by underground passage: Bakuroyokoyama 1 min, Asakusa line 2 min, JR Bakurocho 5 min',
        score: '8.7', reviews: 'Agoda 12,121 · Google 4.2/783',
        price: '₹8,811/n', total: '5 nights · Agoda free-canc to 29 Dec',
        chips: [
          ['stn', '🚉 Bakuroyokoyama — 1-min walk · Asakusa line 2 min · JR Bakurocho 5 min'],
          ['bf', '🍳 Breakfast NOT included — ¥1,600 extra (poke/pancake plates); confirm 1–3 Jan opening'],
          ['', 'Was our pick — the Asakusa-line-side option'],
          ['yes', '✓ Agoda ₹8,811/n free-canc (Booking ₹9,648 incl. taxes)'],
          ['warn', '⚠ Standard Double = 11 m², 140 cm (Deluxe Twin sold out)'],
          ['', 'A/C centrally managed — rooms run warm (official notice)'],
        ],
        transit: [
          ['Zojoji NYE (31 Dec)', 'Asakusa line to Daimon · ~13 min'],
          ['NYE 01:00 return', 'last Daimon train ~00:20 · else JR from Hamamatsucho (all-night Yamanote) or taxi ¥3–4.5k'],
          ['Doomsday IMAX · Ikebukuro (D14)', 'JR + metro · ~30 min'],
          ['Senso-ji hatsumode (1 Jan)', 'Asakusa line direct · ~10 min'],
          ['Tokyo Stn', 'Sobu rapid from Bakurocho · 1 stop'],
          ['Narita (D18)', 'booked car · 10:15 pickup'],
        ],
        near: ['Same block as Leg 1 — you know it', 'Konbini ×3 in 2 min', 'Kanda kissaten morning sets', 'Nihombashi Takashimaya depachika'],
        watch: [
          'Alternate now: pick it over Kanda only if the Asakusa-line side matters more (Senso-ji one-seat ride, Narita Access Express backup) — knowing the NYE return is the ~00:20 last train or a taxi.',
          'If booking: Agoda free-canc rate, NON-SMOKING locked explicitly — inventory is "last few".',
          'Rooms run warm (central heating, no in-room control — official) and 11 m² is tight.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'apa-hotel-nihombashi-bakuroyokoyama-ekimae-tokyo?search=100-22860700%3Bdr-20261230-20270104%3Brc-1-2'],
          ['Agoda — free-canc rate', AGD + 'APA%20Hotel%20Nihombashi%20Bakuroyokoyama', true],
        ],
      },
      {
        badge: '#3 alternate',
        name: 'APA Hotel Asakusabashi Ekikita',
        area: 'Asakusabashi — north of the JR station, Toei Asakusa line close by',
        score: '8.2', reviews: 'Booking 2,588',
        price: '₹9,568/n', total: '5 nights · ₹47,838 incl. taxes · free-canc',
        chips: [
          ['stn', '🚉 JR Asakusabashi — ~4-min walk · Toei Asakusa line close by'],
          ['bf', '🍳 Breakfast NOT included — paid APA add-on; konbini instead'],
          ['yes', '✓ AVAILABLE for all 5 NY nights (checked live)'],
          ['warn', '⚠ Same APA formula: 11 m², 140 cm double'],
        ],
        transit: [
          ['Zojoji NYE (31 Dec)', 'Asakusa line · ~15 min'],
          ['Senso-ji hatsumode (1 Jan)', 'Asakusa line · ~8 min'],
          ['Akihabara', 'JR Sobu · 1 stop'],
          ['Tokyo Stn', 'JR via Akihabara · ~12 min'],
        ],
        near: ['Lawson/konbini cluster', 'Rail-arch ramen & yakitori', 'Kuramae cafes 10 min', 'Akihabara eats 1 stop away'],
        watch: [
          'Backup only if the Bakuroyokoyama APA’s last rooms vanish before you book — same chain, same room formula, ~₹750/n more.',
          'Over-budget fallback worth knowing: Comfort Hotel Tokyo Higashi Nihombashi (our ERA’s sister, 8.4/3,502) at ₹13,570/n, right at Higashi-Nihombashi station.',
          'MYSTAYS Asakusabashi and Sotetsu Fresa Ningyocho are already SOLD OUT for these dates — the NY corridor is clearing in real time.',
        ],
        links: [
          ['Booking.com — ₹9,568/n', BKG + 'APA+Hotel+Asakusabashi+Ekikita'],
          ['Agoda — search', AGD + 'APA%20Hotel%20Asakusabashi%20Ekikita', true],
        ],
      },
    ],
  },
]

// Her call, now the pick: APA Kanda Ekimae leads the NY leg (spliced to the front).
LEGS[5].cards.unshift({
  pick: true, badge: '#1 pick · her call',
  name: 'APA Hotel Kanda Ekimae',
  area: 'Kanda — 1 JR stop from Tokyo Stn; Ginza line + Yamanote + Chuo at the door',
  score: '8.0', reviews: '4,140',
  price: '₹9,882/n', total: '₹49,408 · 5 nights · Agoda free-canc',
  chips: [
    ['stn', '🚉 JR Kanda — ~3-min walk · Tokyo Stn 1 stop · Ginza line direct'],
    ['bf', '🍳 Breakfast NOT included — APA add-on ~¥1,500; most places shut 1–2 Jan'],
    ['yes', '✓ NYE: all-night Yamanote home — no transfer, no taxi'],
    ['yes', '✓ Free cancellation (Agoda) — book now, NY is clearing'],
    ['warn', '⚠ APA formula: ~11 m², 140 cm double — ask high floor off the tracks'],
  ],
  transit: [
    ['Zojoji NYE (31 Dec)', 'JR Yamanote to Hamamatsucho · ~12 min'],
    ['NYE 00:30 return', 'ALL-NIGHT Yamanote straight back to Kanda'],
    ['Senso-ji hatsumode (1 Jan)', 'Ginza line direct · ~15 min'],
    ['Meiji Shrine (1 Jan option)', 'Chuo to Shinjuku + Yamanote · ~25 min'],
    ['Doomsday IMAX · Ikebukuro', 'JR · ~20 min'],
    ['Narita (D18)', 'booked car · 10:15 pickup'],
  ],
  near: ['Kanda izakaya alleys under the tracks', 'Akihabara 1 stop', 'Konbini ×many', 'Takashimaya Nihombashi ~12 min'],
  watch: [
    'Why it won: the only option where NYE works both ways on one line — Yamanote to Zojoji, all-night Yamanote home at 00:30 — plus Ginza line direct for hatsumode and 1 stop to Tokyo Stn for the Nozomi arrival.',
    'Book the Agoda free-canc rate now, NON-SMOKING locked, high floor away from the JR tracks; the twin gives more sleeping width than the 140 cm double.',
    'Luggage: same Yamato takkyubin as every hotel — no APA-only network; the D13 bags come 1 JR stop from Tokyo Stn.',
  ],
  links: [
    ['Check live rates — trivago', TRV + 'apa-hotel-kanda-ekimae-tokyo?search=100-8486208%3Bdr-20261230-20270104%3Brc-1-2'],
    ['Agoda — free-canc rate', AGD + 'APA%20Hotel%20Kanda%20Ekimae', true],
  ],
})

export default function Hotels() {
  return (
    <div className="htl">
      <div className="htl-wrap">
        <header className="htl-head">
          <p className="htl-kicker">JAP-26 · self-booked · re-audited 26 Nov 2026 · 6 agents + Google reviews</p>
          <h1>Hotels</h1>
        </header>

        {LEGS.map(leg => {
          const pick = leg.cards.find(c => c.pick) || leg.cards[0]
          const booked = /BOOKED/.test(pick.badge)
          return (
            <section key={leg.title}>
              <div className="htl-leg">
                <h2>{leg.title}</h2>
                <span className="htl-leg-dates">{leg.dates}</span>
                <span className="htl-leg-pick">
                  <i className={booked ? 'bk' : ''}>{booked ? 'BOOKED ✓' : '#1 PICK'}</i>
                  <b>{pick.name}</b>
                  <em>{pick.price}</em>
                </span>
              </div>
              {leg.cards.map(c => <Featured key={c.name} {...c} />)}
            </section>
          )
        })}
      </div>
    </div>
  )
}
