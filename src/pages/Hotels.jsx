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
        {badge && <span className={'htl-badge' + (pick ? '' : ' alt')}>{badge}</span>}
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
          'BOOKED at ₹53,101/4n (Queen, room-only, free-canc to 16 Dec). Add breakfast à la carte (¥1,800) only on days you want it. Still to do: email the hotel — bed width + takkyubin sending on 22 Dec.',
          'Rebranded ERA in Feb 2025 with a real refresh (Serta 7-zone mattresses, nano-bubble showers) — pre-2025 reviews describe the old hotel.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'comfort-hotel-era-tokyo-higashi-kanda?search=100-7300202%3Bdr-20261218-20261222%3Brc-1-2'],
          ['Chain site (Choice Hotels JP)', 'https://www.choice-hotels.jp/en/hotel/era-tokyo-higashikanda/', true],
        ],
      },
      {
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
          'BOOKED room-only at ₹28,380 (free-canc). NOW REQUIRED: reserve dinner — SEIKOUKI course at the hotel (reservation-only, nothing else walkable) — and email info@mzn.co.jp for the anniversary cake + rooftop-bath slot.',
          'At check-in, immediately book the rooftop private bath’s post-sunset slot (~¥1,100/person/30 min) — and email ahead (info@mzn.co.jp) for a cake.',
          'Check in by ~17:30 if dining; when booking, confirm the rooftop’s winter hours and that the Jun-2026 closure notice is history (OTAs are selling the night).',
        ],
        links: [
          ['Booking.com — our reservation', 'https://secure.booking.com/mytrips'],
          ['Jalan — anniversary plan ¥70,200', 'https://www.jalan.net/yad317230/plan/', true],
        ],
      },
      {
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
    title: 'Kanazawa', dates: '23–24 Dec · 1 night · arrive 14:50, depart ~09:45',
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
    title: 'Kyoto (Christmas)', dates: '24–27 Dec · 3 nights · check-in ~12:45 (bag drop)',
    cards: [
      {
        pick: true, badge: 'BOOKED ✓',
        name: 'Comfort Hotel ERA Kyoto Toji',
        area: 'Minami-ku — Kintetsu Toji 1 min, Kyoto Stn a flat 14-min walk (or 1 train stop)',
        score: '9.1', reviews: '5,950 · Google 4.5/735',
        price: '₹21,697 all-in', total: 'BOOKED 28 Nov · Booking #6164128105 · Queen + breakfast · 3n',
        chips: [
          ['yes', '✅ BOOKED — Booking.com · ¥37,231 · Queen + breakfast ×2 · free canc to 22 Dec'],
          ['stn', '🚉 Kintetsu Toji — 1-min walk · Kyoto Stn 14-min flat walk'],
          ['bf', '🍳 Breakfast INCLUDED in booked rate — veg-friendly buffet 06:30 (bundled ≈¥1,090 pp vs ¥1,800 walk-in)'],
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
    title: 'Osaka', dates: '27–30 Dec · 3 nights · check-in ~afternoon via Special Rapid',
    cards: [
      {
        pick: true, badge: 'BOOKED ✓',
        name: 'DEL style Osaka Shin-Umeda by Daiwa Roynet',
        area: 'Fukushima-ku — 10-min walk WEST of Osaka Stn · JR Fukushima (Loop line) 7 min',
        score: '8.4', reviews: 'Booking 4,947 · Rakuten 4.32/2,426 (re-audited 28 Nov)',
        price: '₹25,350 all-in', total: 'BOOKED 28 Nov · Agoda #2071526610 · Standard Double Non-Smoking',
        chips: [
          ['yes', '✅ BOOKED — Agoda · $283.86 · queen 160 cm · free canc to 24 Dec · charged 22 Dec'],
          ['stn', '🚉 Osaka Stn 10-min walk · JR Fukushima 7 min — the USJ-morning station'],
          ['bf', '🍳 Breakfast NOT included — ~¥2,500 buffet 06:30 (too late for USJ day; in-building 7-Eleven covers 06:00)'],
          ['warn', '⚠ Book “STANDARD DOUBLE” (160 cm, 18.4 m²) BY NAME — cheap rates map to ANNEX rooms (100 cm, separate building!) or twin traps'],
          ['warn', '⚠ NO housekeeping on a 3-night stay (2023 policy) — towel swap on request'],
          ['no', '✗ No public bath — androoms wins there'],
          ['yes', '✓ 2019-build, ReFa dryer/shower, 7-Eleven with private entrance'],
        ],
        transit: [
          ['USJ day (D11, 06:00)', 'JR Fukushima → Nishikujo → Universal City ~06:25'],
          ['Osaka Stn / Umeda', 'walk · ~10 min'],
          ['Yodobashi Umeda (D12)', 'walk · ~15 min'],
          ['Dotonbori / Namba', 'Midosuji from Umeda · ~15 min'],
          ['Shin-Osaka (D13 Nozomi)', 'Osaka Stn + JR 4 min — budget 50 min door-to-platform on 30 Dec'],
        ],
        near: ['7-Eleven in the building', 'Fukushima izakaya alley', 'Umeda underground 10 min', 'Lukua/Grand Front via Osaka Stn'],
        watch: [
          '28 Nov re-audit: KEEP, with corrections — walk is 10 min WEST (not 7 NW), Yodobashi ~15 min, no public bath, no housekeeping ≤3 nights.',
          'The room name at checkout must literally read “Standard Double” (スタンダードダブル) — ANNEX Smart rooms are 100 cm beds in a separate building.',
          'USJ 06:00 morning is this hotel’s quiet superpower: Fukushima Stn is ON the Loop line — one seat to Universal City, ~25 min.',
        ],
        links: [
          ['Klook — cheapest free-canc', 'https://www.klook.com/en-IN/hotels/10303327-del-style-osaka-shin-umeda-by-daiwa-roynet-hotel/', true],
          ['Check live rates — trivago', TRV + 'del-style-osaka-shin-umeda-by-daiwa-roynet-hotel'],
        ],
      },
      {
        name: 'hotel androoms Shin-Osaka',
        area: 'Shin-Osaka — 5-min walk to the Shinkansen station · quiet business district',
        score: '9.2', reviews: 'Booking · Jalan 4.5/315 · trivago 8.8/4,553',
        price: '₹8,375/n', total: 'Agoda free-canc · Standard Double 150 cm · 14 m²',
        chips: [
          ['stn', '🚉 Shin-Osaka Stn — 5-min walk (Midosuji + JR + Shinkansen)'],
          ['bf', '🍳 Breakfast paid — café-style; konbini at the station for the 06:00 USJ day'],
          ['yes', '✓ BIG public bath + SAUNA — rare under ₹9k on these dates'],
          ['yes', '✓ Best scores of the four: Booking 9.2 · Jalan 4.5'],
          ['warn', '⚠ Double is a compact 14 m² · evenings are quiet out here (Umeda = 1 stop)'],
          ['yes', '✓ 30 Dec Nozomi morning = walk to the platform'],
        ],
        transit: [
          ['Shin-Osaka (D13 Nozomi)', 'walk · 5 min — the stress-free departure'],
          ['Osaka Stn / Umeda', 'JR Kyoto Line 1 stop · 4 min'],
          ['USJ day (D11)', 'JR to Osaka → Loop → Universal City · ~30 min'],
          ['Dotonbori / Namba', 'Midosuji direct · ~20 min'],
        ],
        near: ['Shin-Osaka station mall + konbini', 'Business-lunch joints', 'Nothing loud — that’s the point'],
        watch: [
          'The one challenger that beats DEL style on scores, facilities AND the trip’s bookends (06:00 USJ start, 30 Dec Nozomi) at nearly the same money.',
          'Trade-off is evenings: Dotonbori/Umeda nights all end with a train hop instead of a walk home.',
          'Sauna + bath after USJ day is a genuine argument.',
        ],
        links: [
          ['Agoda — ₹8,375 free-canc', 'https://www.agoda.com/hotel-androoms-shin-osaka/hotel/osaka-jp.html', true],
          ['Check live rates — trivago', TRV + 'hotel-androoms-shin-osaka'],
        ],
      },
      {
        name: 'Daiwa Roynet Osaka Sakaisuji-Honmachi PREMIER',
        area: 'Sakaisuji-Honmachi — exit 12 is 1 min · Honmachi (Midosuji) 8-min walk · 2019 PREMIER tier',
        score: '8.8', reviews: 'trivago 1,271 · Jalan 4.5/586 · Rakuten 4.47/850',
        price: '~₹9.5–11k/n', total: 'for the RIGHT room — Moderate Double 150 cm / Superior Queen 163 cm',
        chips: [
          ['stn', '🚉 Sakaisuji-Honmachi 1 min · Honmachi (Midosuji) 8 min'],
          ['bf', '🍳 Breakfast paid — standard Daiwa buffet'],
          ['warn', '⚠ The advertised ₹8,431 rate = Standard Double 139 cm — a TRAP. Qualifying rooms: Moderate Double (150) or Superior Queen (163), 20 m², bath/toilet separate'],
          ['yes', '✓ Best room product of the four — if the queen rate lands ≤₹9.5k'],
          ['no', '✗ Weakest location for THIS itinerary — two-step to USJ and Shin-Osaka'],
        ],
        transit: [
          ['USJ day (D11)', 'Chuo line → Bentencho → Loop · ~35 min, 2 transfers'],
          ['Dotonbori / Namba', 'Midosuji from Honmachi · ~8 min'],
          ['Shin-Osaka (D13)', 'Midosuji from Honmachi · ~15 min'],
          ['Osaka Stn / Umeda', 'Midosuji · ~10 min'],
        ],
        near: ['Kitahama cafés 6 min', 'Honmachi business lunches', 'Semba fabric town'],
        watch: [
          'Only worth it if the Moderate/Queen rate prices ≤₹9.5k — check the room NAME, the cheap rate is the 139 cm trap.',
          'Jalan 4.5 + Rakuten 4.47 = genuinely elite domestic scores.',
        ],
        links: [
          ['Check live rates — trivago', TRV + 'daiwa-roynet-hotel-osaka-sakaisuji-honmachi'],
          ['Rakuten Travel — room specs', 'https://travel.rakuten.co.jp/HOTEL/183264/', true],
        ],
      },
      {
        name: 'Comfort Hotel Shin-Osaka',
        area: 'Shin-Osaka — 5-min walk to the station · same Choice chain as our two ERAs',
        score: '8.6', reviews: 'trivago 3,646 · Jalan 4.4/414',
        price: '₹7,610/n Klook', total: 'free-canc + BREAKFAST INCLUDED · book the QUEEN room type',
        chips: [
          ['stn', '🚉 Shin-Osaka Stn — 5-min walk'],
          ['bf', '🍳 Breakfast INCLUDED — the only free one on this panel'],
          ['warn', '⚠ Book the QUEEN-bed room type — the “economy double” may be ~140 cm (width unpublished)'],
          ['warn', '⚠ Track-side rooms hear trains — request away from the tracks'],
          ['yes', '✓ Cheapest qualifying package · Serta beds house-wide'],
        ],
        transit: [
          ['Shin-Osaka (D13 Nozomi)', 'walk · 5 min'],
          ['Osaka Stn / Umeda', 'JR 1 stop · 4 min'],
          ['USJ day (D11)', 'JR → Osaka → Loop · ~30 min'],
        ],
        near: ['Station mall + konbini', 'Quiet business streets'],
        watch: [
          '₹600–1,800/n under the incumbent WITH breakfast — the value play if budget tightens.',
          'Jalan 4.4 — good, a notch under androoms; and the queen-room width is the one unverified fact.',
        ],
        links: [
          ['Klook — free-canc + breakfast', 'https://www.klook.com/en-IN/hotels/comfort-hotel-shin-osaka/', true],
          ['Check live rates — trivago', TRV + 'comfort-hotel-shin-osaka'],
        ],
      },
    ],
  },
  {
    title: 'Tokyo · New Year', dates: '30 Dec–4 Jan · 5 nights · NY week selling out',
    cards: [
      {
        pick: true, name: 'APA Hotel Kanda-Ekimae',
        area: 'Kanda — 3-min walk JR Kanda · 1 stop Tokyo Stn · Ginza line direct · re-audited 28 Nov',
        score: '8.0', reviews: 'Agoda 4,140 · Jalan 4.2/287 · Rakuten 4.30/516',
        price: '₹10,204/n', total: '₹51,018 / 5n Agoda free-canc — was ₹9,882, creeping up: LOCK IT',
        chips: [
          ['stn', '🚉 JR Kanda — 3-min walk · Akihabara 1 stop · Tokyo Stn 1 stop'],
          ['bf', '🍳 Breakfast NOT included — APA add-on ~¥1,500 · PHONE hotel: is it open 1–3 Jan?'],
          ['yes', '✓ NYE superpower: all-night Yamanote home from Zojoji — door at ~00:50'],
          ['warn', '⚠ Bed ceiling = 140 cm (11 m²) — NO bigger double exists; lone 21 m² Deluxe Twin (2×122) is the only upgrade'],
          ['warn', '⚠ TRACK NOISE is real (tracks ~3 m from some windows) — request HIGH FLOOR, 線路と反対側 (away from tracks) at booking AND check-in'],
          ['yes', '✓ 24h front desk · free cancellation'],
        ],
        transit: [
          ['Zojoji NYE (D14 midnight)', 'all-night Yamanote · ~12 min · no transfer'],
          ['Tokyo Stn (Nozomi arr / Narita car)', 'JR · 1 stop · 2 min'],
          ['Akihabara (D16)', 'JR · 1 stop · 2 min'],
          ['teamLab via Yurakucho (D14)', 'Yamanote 4 stops + Yurakucho line'],
          ['Harajuku (D13)', 'Chuo Rapid → Shinjuku + Yamanote · ~25 min'],
        ],
        near: ['Kanda izakaya alleys under the tracks', 'Konbini ×many', 'Coffee kissaten', 'Akihabara 1 stop'],
        watch: [
          '28 Nov re-audit: every logistical claim verified TRUE; corridor sweep found ZERO challengers passing all rules — the wife’s pick survives on facts.',
          'The two honest asterisks: 140 cm bed is the building’s ceiling, and track-side rooms draw 1-star noise reviews — the room request is mandatory.',
          'JR confirms the NYE all-night Yamanote mid-Dec (it has run every year since 2022) — re-check then.',
        ],
        links: [
          ['Agoda — ₹51,018 free-canc', 'https://www.agoda.com/apa-hotel-kanda-ekimae/hotel/tokyo-jp.html', true],
          ['Check live rates — trivago', TRV + 'apa-hotel-kanda-ekimae'],
        ],
      },
      {
        name: 'APA Hotel Akihabara Ekihigashi',
        area: 'Akihabara — 3-min walk JR Akihabara (Showa-dori exit) · 2021 build',
        score: '8.6', reviews: 'trivago 3,219 · Jalan 4.3/30',
        price: '₹11,078/n', total: '₹55,389 / 5n Agoda free-canc · same 140 cm / 11 m² room class',
        chips: [
          ['stn', '🚉 JR Akihabara — 3-min walk · Kanda 1 stop · Electric Town at the door'],
          ['bf', '🍳 Breakfast NOT included — APA add-on'],
          ['yes', '✓ NYE all-night Yamanote direct — step-free walk home'],
          ['yes', '✓ 2021 building · +0.6 score over the pick'],
          ['warn', '⚠ Identical 140 cm / 11 m² product for +₹1,200/night (+₹6k over the stay)'],
        ],
        transit: [
          ['Zojoji NYE', 'all-night Yamanote · ~14 min'],
          ['Tokyo Stn', 'JR · 2 stops · 4 min'],
          ['Kanda izakayas', 'JR 1 stop or 12-min walk'],
        ],
        near: ['Electric Town', 'Yodobashi Akiba', 'Konbini ×many'],
        watch: [
          'Pay the +₹6k only if newness and the 8.6 matter more than 3 minutes to Kanda’s izakaya dinner routine.',
        ],
        links: [
          ['Agoda — free-canc rate', 'https://www.agoda.com/apa-hotel-akihabara-ekihigashi/hotel/tokyo-jp.html', true],
          ['Check live rates — trivago', TRV + 'apa-hotel-akihabara-ekihigashi'],
        ],
      },
      {
        name: 'HOTEL MYSTAYS Ochanomizu Conference Center',
        area: 'Ochanomizu/Akihabara border — 6-min walk JR Akihabara Electric Town · renovated Oct 2024',
        score: '8.4', reviews: 'trivago 4,712 · Jalan 4.2/2,372 · Rakuten 4.25/2,493',
        price: '₹9,214/n', total: '₹46,070 / 5n Agoda free-canc — ₹5k UNDER the pick',
        chips: [
          ['stn', '🚉 JR Akihabara — 6-min walk · JR Ochanomizu (Chuo-Sobu) 5 min'],
          ['bf', '🍳 Breakfast paid — café downstairs; konbini next door'],
          ['yes', '✓ 14.8–17.3 m² rooms — 35–57% bigger than the APAs · fully renovated Oct 2024'],
          ['yes', '✓ Cheapest survivor AND the biggest rooms · all non-smoking'],
          ['warn', '⚠ Same 140 cm bed (Standard/Superior Double) — the corridor has nothing wider this week'],
          ['warn', '⚠ NYE walk home = 6 min from Akihabara off the all-night Yamanote — fine, just darker'],
        ],
        transit: [
          ['Zojoji NYE', 'all-night Yamanote → Akihabara + 6-min walk'],
          ['Tokyo Stn', 'JR from Akihabara · 2 stops'],
          ['teamLab / Harajuku days', 'same JR patterns, +3 min walking'],
        ],
        near: ['Akihabara Electric Town 6 min', 'Ochanomizu guitar street', 'Kanda river walk', 'Konbini next door'],
        watch: [
          'The sleeper: cheaper than the pick with half-again the floor space — if 3 extra walking minutes don’t bother anyone, this is the comfort-per-rupee winner.',
          'Jalan 4.2 on 2,372 reviews = deep, credible domestic data.',
        ],
        links: [
          ['Agoda — ₹46,070 free-canc', 'https://www.agoda.com/hotel-mystays-ochanomizu/hotel/tokyo-jp.html', true],
          ['Check live rates — trivago', TRV + 'hotel-mystays-ochanomizu-conference-center'],
        ],
      },
    ],
  },
]

// Her call, now the pick: APA Kanda Ekimae leads the NY leg (spliced to the front).
LEGS[5].cards.unshift()

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
