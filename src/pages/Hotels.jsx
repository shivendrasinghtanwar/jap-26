import './hotels.css'

/* Hotel audit — Tokyo Leg 1 decided down to two finalists (26 Nov 2026);
   other legs carry the shortlist picks from the self-booking plan.
   All trivago links are pre-dated searches: exact nights, 2 adults. */

const TRV = 'https://www.trivago.in/en-IN/lm/'

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
        <div className="htl-score"><b>{score}</b><small>{reviews} reviews</small></div>
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
    title: 'Fuji · La Vista Fuji-Kawaguchiko', dates: '22–23 Dec · 1 night',
    rows: [{
      name: 'La Vista Fuji-Kawaguchiko', sub: 'onsen resort, rooftop baths facing Fuji — the anniversary splurge, KEPT',
      score: '8.9 (5,123)', price: '₹34,664/n',
      status: 'decided — book now',
      link: TRV + 'resort-la-vista-fuji-kawaguchiko-fujikawaguchiko?search=100-6225322%3Bdr-20261222-20261223%3Brc-1-2',
    }],
  },
  {
    title: 'Kanazawa', dates: '23–24 Dec · 1 night',
    rows: [
      { name: 'Hotel Forza Kanazawa', sub: 'Yasue-cho — literally beside Omicho Market (3 min to the crab breakfast), 10 min to the station. Book the COMFORT or REFRESH DOUBLE (18 m², 150 cm bed) — the base double is 140 cm.', score: '9.0 (10,461)', price: 'from ₹3,584/n', status: 'decided — Comfort Double',
        link: TRV + 'hotel-forza-kanazawa?search=100-15753816%3Bdr-20261223-20261224%3Brc-1-2' },
      { name: 'Dormy Inn Kanazawa', sub: 'at the station — rooftop natural onsen + free 21:30 yonaki ramen; smaller 15 m² rooms. The onsen after a slushy day is its one trump card.', score: '8.6 (10,454)', price: '₹6,281/n', status: 'alternate',
        link: TRV + 'hotel-dormy-inn-kanazawa-natural-hot-spring?search=100-1344588%3Bdr-20261223-20261224%3Brc-1-2' },
    ],
  },
  {
    title: 'Kyoto (Christmas)', dates: '24–27 Dec · 3 nights',
    rows: [
      { name: 'Comfort Hotel ERA Kyoto Toji', sub: '13-min flat walk to Kyoto Stn (or Kintetsu Toji, 1 min, one stop). Book the 160 cm ECONOMY DOUBLE (16–18 m²), high floor away from Kujo-dori — the Standard Double bed is 140 cm. Breakfast is a ¥1,650 plan add-on, 06:30 open. Email to confirm pre-arrival takkyubin + breakfast-in-rate.', score: '9.1 (5,948)', price: '₹5,584/n', status: 'decided — Economy Double',
        link: TRV + 'comfort-hotel-era-kyoto-toji?search=100-23439598%3Bdr-20261224-20261227%3Brc-1-2' },
      { name: 'HOTEL TAVINOS Kyoto', sub: '“Near Kyoto Station” is marketing — it sits at Kawaramachi-Gojo, 2 km away, nearest rail Kiyomizu-Gojo (Keihan). Breaks all four station-timed mornings.', score: '8.4 (4,285)', price: '₹4,342/n', status: 'disqualified — location',
        link: TRV + 'hotel-tavinos-kyoto?search=100-24790702%3Bdr-20261224-20261227%3Brc-1-2' },
    ],
  },
  {
    title: 'Osaka', dates: '27–30 Dec · 3 nights',
    rows: [
      { name: 'Hearton Hotel Nishiumeda', sub: '5-min walk from Osaka Stn Sakurabashi (west) exit — 24h desk takes the 09:50 luggage drop, walk home from Yodobashi with the watches, 1 JR stop to Shin-Osaka. Agoda free-canc ₹6,716/n; confirm double-bed width (~140 cm typical).', score: '8.1 (12,930)', price: '₹6,716/n', status: 'decided — Double',
        link: TRV + 'hearton-hotel-nishiumeda-osaka?search=100-1033428%3Bdr-20261227-20261230%3Brc-1-2' },
      { name: 'APA Midosuji Honmachi Ekihigashi', sub: 'Honmachi — fine metro access, but the double is 11 m² with a 140 cm bed; the 21 m² Deluxe Twin erodes its price edge.', score: '8.2 (3,323)', price: '₹4,932/n', status: 'alternate',
        link: TRV + 'apa-hotel-midosuji-honmachi-ekihigashi-osaka?search=100-8155980%3Bdr-20261227-20261230%3Brc-1-2' },
      { name: 'KIRIN UMEDA by SpringRest', sub: 'Not Umeda: Honjohigashi, ~2.3 km / 25-min walk from Osaka Stn; 16:00 self check-in, no confirmed luggage desk, only 612 reviews.', score: '8.4 (612)', price: '₹4,458/n', status: 'disqualified — location + check-in',
        link: TRV + 'serviced-apartment-kirin-umeda-by-springrest-osaka?search=100-40286712%3Bdr-20261227-20261230%3Brc-1-2' },
    ],
  },
  {
    title: 'Tokyo · New Year', dates: '30 Dec–4 Jan · 5 nights · selling out NOW',
    rows: [
      { name: 'APA Nihombashi Bakuroyokoyama Ekimae', sub: '100 m from Higashi-Nihombashi (Asakusa line) — direct to Zojoji/Daimon for NYE incl. the 01:00 walk home, JR Bakurocho for Tokyo Stn. Agoda free-canc ₹8,541/n (Booking ₹9,721). Rooms: pick CORNER COZY or VIEW (140 cm double) or the 22 m² Deluxe Twin — no bigger true double exists here.', score: '8.5 (6,466)', price: '₹8,541/n', status: 'decided — book tonight',
        link: TRV + 'apa-hotel-nihombashi-bakuroyokoyama-ekimae-tokyo?search=100-22860700%3Bdr-20261230-20270104%3Brc-1-2' },
      { name: 'Comfort Hotel ERA Higashi Kanda (NY window)', sub: 'Our Leg-1 hotel is SOLD OUT for New Year — only a ₹30,643/n non-refundable residual remains. Proof the corridor clears 13 months out.', score: '8.9 (4,099)', price: '₹30,643/n', status: 'sold out for NY',
        link: TRV + 'comfort-hotel-era-tokyo-higashi-kanda?search=100-7300202%3Bdr-20261230-20270104%3Brc-1-2' },
      { name: 'HOTEL MYSTAYS Ochanomizu', sub: 'Solid rooms but off the Asakusa line — worse for the NYE Zojoji run.', score: '8.4 (4,710)', price: '₹9,665/n', status: 'alternate',
        link: TRV + 'hotel-mystays-ochanomizu-conference-center-tokyo?search=100-1277092%3Bdr-20261230-20270104%3Brc-1-2' },
    ],
  },
]

export default function Hotels() {
  return (
    <div className="htl">
      <div className="htl-wrap">
        <header className="htl-head">
          <p className="htl-kicker">JAP-26 · self-booked · audited 26 Nov 2026</p>
          <h1>Hotels</h1>
          <p className="htl-sub">
            17 nights, six legs, all audited — reviews read, geography verified, room types
            checked down to bed width. Every leg has a decided pick; every link opens the live
            search for our exact dates, 2 adults. Book the free-cancellation rates now — the
            New-Year corridor is already selling out.
          </p>
        </header>

        <div className="htl-leg">
          <h2>Tokyo · Leg 1</h2>
          <span className="htl-leg-dates">18–22 Dec · 4 nights · check-in ~23:00 on day 1</span>
        </div>

        <Featured
          pick
          badge="#1 pick"
          name="Comfort Hotel ERA Tokyo Higashi Kanda"
          area="Higashi-Kanda — JR Bakurocho 350 m, Bakuroyokoyama 450 m, Higashi-Nihombashi (Asakusa line) 8 min"
          score="8.9"
          reviews="4,099 on Booking"
          price="₹48,734 · Queen"
          total="4 nights, room-only · ₹12,183/n"
          chips={[
            ['yes', '✓ Queen = 1 large double bed'],
            ['yes', '✓ Free cancellation to 16 Dec'],
            ['yes', '✓ Pay nothing until 14 Dec'],
            ['', 'Breakfast buffet +₹1,051/person/day'],
            ['yes', '✓ 24h front desk · luggage + takkyubin'],
            ['warn', '⚠ 4 Queen rooms left — book now'],
          ]}
          transit={[
            ['Sumo · Ryogoku (D2)', 'JR 1 stop · 10 min'],
            ['Senso-ji / Asakusa (D2)', 'Asakusa line · 12 min'],
            ['Ginza watch day (D3)', 'direct · 13 min'],
            ['DisneySea (D4)', 'via Tokyo Stn · 40 min'],
            ['Shinjuku — Fuji train (D5)', 'Sobu direct · 28 min'],
            ['Akihabara', 'walk · 8 min'],
          ]}
          near={['Konbini ×3 in 2 min', 'Kanda coffee kissaten', 'Akihabara food streets 8 min', 'Bakurocho lunch spots', 'Chain gyudon/soba 24h', 'Indian restaurants in Akiba 10 min']}
          watch={[
            'Book the QUEEN room-only rate (₹48,734) — the with-breakfast rate adds ₹15.7k; buy breakfast à la carte instead.',
            'Opened Apr 2017; Booking couples score 8.8, staff 9.5, cleanliness 9.3.',
            'Small Tokyo accommodation tax (~¥200/person/night) paid at the desk.',
          ]}
          links={[
            ['Check live rates — trivago', TRV + 'comfort-hotel-era-tokyo-higashi-kanda?search=100-7300202%3Bdr-20261218-20261222%3Brc-1-2'],
            ['Chain site (Choice Hotels JP)', 'https://www.choice-hotels.jp/en/hotel/era-tokyo-higashikanda/', true],
          ]}
        />

        <Featured
          badge="#2 backup"
          name="HOTEL MYSTAYS Asakusabashi"
          area="Asakusabashi — 1–2 min to JR Sobu + Toei Asakusa line"
          score="8.4"
          reviews="6,892"
          price="₹9,368/n"
          total="₹37,470 · 4 nights"
          chips={[
            ['no', '✗ No breakfast — Lawson attached'],
            ['yes', '✓ Free cancellation'],
            ['yes', '✓ 24h Lawson in the building'],
            ['yes', '✓ 24h front desk'],
            ['yes', '✓ Luggage storage + takkyubin'],
            ['warn', '⚠ Semi-double trap — book DOUBLE'],
          ]}
          transit={[
            ['Sumo · Ryogoku (D2)', 'JR 1 stop · 5 min'],
            ['Senso-ji / Asakusa (D2)', '2 stops · 8 min'],
            ['Ginza watch day (D3)', '5 stops direct · 11 min'],
            ['DisneySea (D4)', 'via Tokyo Stn · 35 min'],
            ['Shinjuku — Fuji train (D5)', 'Sobu one-seat · 23 min'],
            ['Skytree / Oshiage', '4 stops direct · 9 min'],
          ]}
          near={['Lawson 24h — in building', 'My Basket supermarket', 'Doutor · Tully’s', 'Sukiya 24h', 'Rail-arch ramen & yakitori', 'Yakiniku Like']}
          watch={[
            'Reviews flag small beds even in doubles, smoke smell on some floors, 6 am housekeeping carts.',
            'Book SUPERIOR DOUBLE, non-smoking confirmed, high floor AWAY from the JR tracks.',
            'Don’t confuse with MYSTAYS Asakusa (different hotel, Sumida).',
          ]}
          links={[
            ['Check live rates — trivago', TRV + 'hotel-mystays-asakusabashi-tokyo?search=100-1321068%3Bdr-20261218-20261222%3Brc-1-2'],
            ['Booking.com page', 'https://www.booking.com/hotel/jp/mystays-inn-asakusabashi.html', true],
          ]}
        />

        {LEGS.map(leg => (
          <section key={leg.title}>
            <div className="htl-leg">
              <h2>{leg.title}</h2>
              <span className="htl-leg-dates">{leg.dates}</span>
            </div>
            <div className="htl-rows">
              {leg.rows.map(r => (
                <div key={r.name} className="htl-row">
                  <div><b>{r.name}</b><span className="r-sub">{r.sub}</span></div>
                  <span className="r-score">{r.score}</span>
                  <span className="r-price">{r.price}</span>
                  <span className="r-status">{r.status}</span>
                  <a href={r.link} target="_blank" rel="noopener">check live →</a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
