import './bookings.css'

/* The parent pre-boarding checklist: everything that must be arranged before
   18 Dec. Each row is badged by scope:
   - JAY = was inside Jay's package quote → ask him to price exactly these
   - OURS = extra we added / self-booked regardless of Jay
   Deadlines in trip-critical order inside each group. */

const GROUPS = [
  {
    title: 'Hotels — reserve now, all free-cancellation',
    items: [
      { jay: true,  by: 'NOW',        name: 'Comfort ERA Tokyo Higashi Kanda · Queen, 4n', price: '₹48,370', note: 'Booking.com room-only; email: bed width + takkyubin' },
      { jay: true,  by: 'NOW',        name: 'Mizno Hotel · anniversary plan, 22 Dec', price: '~₹40,000', note: 'Jalan Terrace Twin NAGOMI (dinner+drinks) — or Booking ₹25,422 + dinner resv; email for cake' },
      { jay: true,  by: 'NOW',        name: 'Hotel Forza Kanazawa · Comfort/Refresh Double', price: '~₹4,500', note: '150 cm bed — NOT the Forza(140)/Business(130) doubles' },
      { jay: true,  by: 'NOW',        name: 'Comfort ERA Kyoto Toji · Queen Economy, 3n', price: '₹16,628', note: 'high floor WEST; email: takkyubin + breakfast' },
      { jay: true,  by: 'NOW',        name: 'DEL style Shin-Umeda (Daiwa Roynet), 3n', price: '₹21,752', note: 'Klook free-canc; Booking ₹8,217/n fallback' },
      { jay: true,  by: 'NOW',        name: 'APA Kanda Ekimae · New Year, 5n', price: '₹49,408', note: 'Agoda free-canc; non-smoking, high floor off the tracks' },
    ],
  },
  {
    title: 'Rail & transfers',
    items: [
      { jay: true,  by: 'NOW (open)', name: 'Fuji Excursion · Shinjuku → Shimoyoshida, 22 Dec', price: '¥4,130 pp', note: 'Eki-net, reserved seats — window already open' },
      { jay: true,  by: 'NOW (open)', name: 'Fuji Excursion return + Kagayaki Tokyo → Kanazawa, 23 Dec', price: '~¥18,500 pp', note: 'Eki-net — Tokudane early-bird cuts up to 30%' },
      { jay: true,  by: 'NOW (open)', name: 'Tsurugi + Thunderbird · Kanazawa → Kyoto, 24 Dec', price: '~¥7,800 pp', note: 'JR-West e5489, one through-booking' },
      { jay: true,  by: '30 Nov',     name: 'Nozomi · Shin-Osaka → Tokyo, 30 Dec', price: '¥14,720 pp', note: 'SmartEX — book the FREE oversized-luggage seats' },
      { jay: true,  by: 'NOW',        name: 'Private car · Narita T2 → hotel, 18 Dec 21:15', price: '~¥25–30k', note: 'NearMe / Klook airport transfer; name board' },
      { jay: true,  by: 'NOW',        name: 'Private car · hotel → Narita T2, 4 Jan 10:15', price: '~¥25–30k', note: 'same provider, return leg' },
    ],
  },
  {
    title: 'Park & attraction tickets',
    items: [
      { jay: true,  by: 'NOW',        name: 'Tokyo DisneySea · dated tickets, 21 Dec', price: '¥24,800/2', note: 'official app; Premier Access in-app on the morning (¥8–12k)' },
      { jay: true,  by: 'mid-Dec',    name: 'USJ dated ticket + Express Pass 4, 28 Dec', price: '~¥15–20k pp + entry', note: 'Express sells out for NY week — the queue lever' },
      { jay: false, by: 'NOW',        name: 'teamLab Planets · 31 Dec, 09:00 (or 08:00) slot', price: '~¥3,800–4,900 pp', note: 'teamlabplanets.dmm.com — NYE week sells out weeks ahead' },
      { jay: true,  by: '~6 Dec 00:00 JST', name: 'Shibuya Sky · sunset slot, 20 Dec', price: '¥2,600 pp', note: 'drops 14 days ahead at midnight JST, gone in the hour' },
      { jay: false, by: '28–29 Dec 00:00 JST', name: 'Avengers: Doomsday · IMAX GT, 31 Dec ~14:00', price: '~¥2,900–3,600 pp', note: 'cinemasunshine.co.jp — 字幕 subtitled show nearest 14:00' },
      { jay: false, by: 'optional',   name: 'Skytree deck · 1 Jan evening', price: '¥3,100 pp adv', note: 'advance ticket skips the Jan-1 queue; open to 22:00' },
    ],
  },
  {
    title: 'Experiences & restaurant reservations',
    items: [
      { jay: true,  by: 'NOW',        name: 'Sumo morning practice · 19 Dec', price: '~¥12–15k pp', note: 'Klook/GetYourGuide — stables break from ~29 Dec; confirm venue' },
      { jay: true,  by: 'NOW',        name: 'Kimono rental · Gojozaka, 24 Dec', price: '~¥6–10k/2', note: 'Christmas-Eve slots thin out; return by ~18:00' },
      { jay: true,  by: 'NOW',        name: 'Tea ceremony · Higashiyama, 24 Dec ~16:15', price: '~¥3–5k pp', note: 'self-book (Jay only quoted it bundled with kimono)' },
      { jay: false, by: 'NOW',        name: 'Hotel Okura "Pittoresque" · Christmas-Eve dinner 19:00', price: '¥20–30k pp', note: 'Menu de Noël — book + vegetarian request IN WRITING' },
      { jay: false, by: 'at check-in', name: 'Mizno rooftop private bath · dusk slot, 22 Dec', price: '~¥1,100 pp/30 min', note: 'reserved at the desk — ask FIRST thing at check-in' },
      { jay: false, by: 'NOW',        name: 'SEIKOUKI dinner (only if NOT taking the Jalan plan)', price: 'course ~¥8–12k pp', note: 'reservation-only; nothing else walkable at Mizno' },
    ],
  },
  {
    title: 'Money, SIM & cards',
    items: [
      { jay: false, by: 'before flying', name: 'Suica in Apple Wallet — her iPhone 17 Pro', price: 'top-up ¥5–10k each', note: 'Wallet → + → Transit Card → Suica; Apple Pay top-ups' },
      { jay: false, by: 'at NRT T2',     name: 'Welcome Suica card — his S23 has no FeliCa', price: '¥2–5k load', note: 'machine at arrivals; 28-day card, no deposit; recharge at any station/konbini' },
      { jay: false, by: 'before flying', name: 'Zero-forex card + ¥ cash', price: '~¥50,000 cash', note: 'Niyo/Scapia etc.; 7-Eleven ATMs refill anywhere' },
      { jay: false, by: 'before flying', name: 'Japan eSIM — both phones', price: '~₹800–1,200 each', note: 'Ubigi/Airalo 10–20GB; activate on landing' },
      { jay: false, by: 'D3 Ginza day',  name: 'iPhone 18 Pro 512 — Bic Camera Yurakucho, tax-free', price: '¥254,800 → ~₹1.37L', note: 'passport + card for the ~¥23,200 refund; NOT at Apple Ginza' },
    ],
  },
  {
    title: 'Zero booking needed — just show up',
    free: true,
    items: [
      { name: 'Zojoji NYE bell + midnight service (arrive 22:00–22:30)' },
      { name: 'Meiji Jingu hatsumode · 1 Jan' },
      { name: 'Imperial Palace Ippan Sanga · 2 Jan (IDs, in line by 08:15)' },
      { name: 'Senso-ji, Fushimi Inari, Chureito, Arashiyama grove' },
      { name: 'Kenroku-en (¥640 at the gate) · Osaka Castle (¥600) · Kiyomizu (¥400) · Toji' },
    ],
  },
]

export default function Bookings() {
  const jayCount = GROUPS.flatMap(g => g.items).filter(i => i.jay).length
  const oursCount = GROUPS.flatMap(g => g.items).filter(i => i.jay === false).length
  return (
    <div className="bkg">
      <div className="bkg-wrap">
        <header className="bkg-head">
          <p className="bkg-kicker">JAP-26 · the parent list · before boarding 18 Dec</p>
          <h1>Bookings</h1>
          <p className="bkg-sub">
            Every ticket, reservation and card to arrange before the flight.{' '}
            <span className="bk-badge jay">JAY QUOTED</span> = was inside Jay&rsquo;s package —
            send him exactly these {jayCount} lines for a like-for-like quote.{' '}
            <span className="bk-badge ours">OURS</span> = the {oursCount} extras we added —
            ours to book either way.
          </p>
        </header>

        {GROUPS.map(g => (
          <section key={g.title} className="bkg-group">
            <h2>{g.title}</h2>
            {g.free ? (
              <ul className="bkg-free">
                {g.items.map(i => <li key={i.name}>{i.name}</li>)}
              </ul>
            ) : (
              <div className="bkg-rows">
                {g.items.map(i => (
                  <div key={i.name} className="bkg-row">
                    <span className={'bk-badge ' + (i.jay ? 'jay' : 'ours')}>{i.jay ? 'JAY QUOTED' : 'OURS'}</span>
                    <div className="bk-main">
                      <b>{i.name}</b>
                      <span className="bk-note">{i.note}</span>
                    </div>
                    <span className="bk-price">{i.price}</span>
                    <span className={'bk-by' + (/NOW/.test(i.by) ? ' hot' : '')}>{i.by}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        <p className="bkg-foot">
          Flights are TICKETED (PNR ECPN6Z) — not on this list. Hotel takkyubin (bags Tokyo → Kyoto, ~¥2,500/bag)
          is paid at the ERA desk on 22 Dec, no pre-booking.
        </p>
      </div>
    </div>
  )
}
