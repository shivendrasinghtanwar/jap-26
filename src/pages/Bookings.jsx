import React, { useMemo, useState } from 'react'
import './bookings.css'

/* The parent pre-boarding checklist as a real data table.
   Every row is fully structured: date/time, from→to (or place), kind,
   booking platform (the chip IS the link), Jay-quote flag, price, deadline.
   Everything is SELF-BOOKED by us — the flag only records the FACT of whether the line was priced inside Jay's ₹11L package.
   jay:true only marks lines to ask Jay for a comparison QUOTE on
   (tickets/transport/experiences). */

const CATS = ['Hotels', 'Rail & transfers', 'Parks & attractions', 'Experiences & dining', 'Money & SIM']

const KINDS = {
  train:  ['🚃', 'Train'],
  car:    ['🚕', 'Car'],
  hotel:  ['🏨', 'Hotel'],
  ticket: ['🎟', 'Ticket'],
  dining: ['🍽', 'Dining'],
  exp:    ['⛩', 'Experience'],
  card:   ['💳', 'Card'],
}

/* d = sortable day index: Dec = day, Jan = day + 31, "before flying" = 1; fraction = time of day */
const ITEMS = [
  // ——— Hotels (all free-cancellation) ———
  { cat: 'Hotels', jay: true, kind: 'hotel', d: 18.6, date: '18 Dec', time: 'check-in',
    place: 'Higashi-Kanda, Tokyo', name: 'Comfort ERA Tokyo Higashi Kanda', sub: 'Queen · 4n',
    detail: 'Booking.com room-only · email: bed width + takkyubin',
    platform: 'trivago', price: '₹48,370', inr: 48370, by: 'NOW', rank: 0,
    link: 'https://www.trivago.in/en-IN/lm/comfort-hotel-era-tokyo-higashi-kanda?search=100-7300202%3Bdr-20261218-20261222%3Brc-1-2' },
  { cat: 'Hotels', jay: true, kind: 'hotel', d: 22.6, date: '22 Dec', time: 'check-in',
    place: 'Kawaguchiko', name: 'Mizno Hotel', sub: 'Terrace Twin NAGOMI · 1n',
    detail: 'Anniversary plan (dinner+drinks) · or Booking ₹25,422 + dinner · email for cake',
    platform: 'Jalan', price: '~₹40,000', inr: 40000, by: 'NOW', rank: 0,
    link: 'https://www.jalan.net/yad317230/plan/' },
  { cat: 'Hotels', jay: true, kind: 'hotel', d: 23.6, date: '23 Dec', time: 'check-in',
    place: 'Kanazawa', name: 'Hotel Forza Kanazawa', sub: 'Comfort/Refresh Double · 1n',
    detail: '150 cm bed — NOT the Forza(140)/Business(130) doubles',
    platform: 'trivago', price: '~₹4,500', inr: 4500, by: 'NOW', rank: 0,
    link: 'https://www.trivago.in/en-IN/lm/hotel-forza-kanazawa?search=100-15753816%3Bdr-20261223-20261224%3Brc-1-2' },
  { cat: 'Hotels', jay: true, kind: 'hotel', d: 24.6, date: '24 Dec', time: 'check-in',
    place: 'Toji, Kyoto', name: 'Comfort ERA Kyoto Toji', sub: 'Queen Economy · 3n',
    detail: 'High floor WEST · email: takkyubin + breakfast',
    platform: 'trivago', price: '₹16,628', inr: 16628, by: 'NOW', rank: 0,
    link: 'https://www.trivago.in/en-IN/lm/comfort-hotel-era-kyoto-toji?search=100-23439598%3Bdr-20261224-20261227%3Brc-1-2' },
  { cat: 'Hotels', jay: true, kind: 'hotel', d: 27.6, date: '27 Dec', time: 'check-in',
    place: 'Umeda, Osaka', name: 'DEL style Shin-Umeda', sub: 'Daiwa Roynet · 3n',
    detail: 'Klook free-canc · Booking ₹8,217/n fallback',
    platform: 'trivago', price: '₹21,752', inr: 21752, by: 'NOW', rank: 0,
    link: 'https://www.trivago.in/en-IN/lm/del-style-osaka-shin-umeda-by-daiwa-roynet-hotel?search=100-19759854%3Bdr-20261227-20261230%3Brc-1-2' },
  { cat: 'Hotels', jay: true, kind: 'hotel', d: 30.6, date: '30 Dec', time: 'check-in',
    place: 'Kanda, Tokyo', name: 'APA Kanda Ekimae', sub: 'New Year · 5n',
    detail: 'Agoda free-canc · non-smoking, high floor off the tracks',
    platform: 'trivago', price: '₹49,408', inr: 49408, by: 'NOW', rank: 0,
    link: 'https://www.trivago.in/en-IN/lm/apa-hotel-kanda-ekimae-tokyo?search=100-8486208%3Bdr-20261230-20270104%3Brc-1-2' },

  // ——— Rail & transfers ———
  { cat: 'Rail & transfers', jay: true, kind: 'train', d: 22.4, date: '22 Dec', time: '~09:30',
    from: 'Shinjuku', to: 'Shimoyoshida', name: 'Fuji Excursion',
    detail: 'All-reserved · Suica tap-through · arr ~11:15',
    platform: 'Eki-net', price: '¥4,130 pp', inr: 4870, by: 'NOW (open)', rank: 0,
    link: 'https://www.eki-net.com/en/jreast-train-reservation/Top/Index' },
  { cat: 'Rail & transfers', jay: true, kind: 'train', d: 23.4, date: '23 Dec', time: '~09:30',
    from: 'Kawaguchiko', to: 'Shinjuku', name: 'Fuji Excursion (return)',
    detail: 'Suica tap-through · arr ~11:25 · meets the ~12:20 Kagayaki',
    platform: 'Eki-net', price: '¥4,130 pp', inr: 4870, by: 'NOW (open)', rank: 0,
    link: 'https://www.eki-net.com/en/jreast-train-reservation/Top/Index' },
  { cat: 'Rail & transfers', jay: true, kind: 'train', d: 23.5, date: '23 Dec', time: '~12:20',
    from: 'Tokyo', to: 'Kanazawa', name: 'Kagayaki Shinkansen',
    detail: 'Tokudane early-bird −30% · big luggage racks · arr ~14:50',
    platform: 'Eki-net', price: '¥14,380 pp', inr: 17000, by: 'NOW (open)', rank: 0,
    link: 'https://www.eki-net.com/en/jreast-train-reservation/Top/Index' },
  { cat: 'Rail & transfers', jay: true, kind: 'train', d: 24.4, date: '24 Dec', time: '~09:50',
    from: 'Kanazawa', to: 'Kyoto', name: 'Tsurugi + Thunderbird',
    detail: '⚠ PAPER tickets — Kanazawa machine · every 30–60 min · arr ~11:50',
    platform: 'e5489', price: '~¥7,800 pp', inr: 9200, by: 'NOW (open)', rank: 0,
    link: 'https://e5489.jr-odekake.net/e5489/cspc/CBTopMenuE' },
  { cat: 'Rail & transfers', jay: true, kind: 'car', d: 18.9, date: '18 Dec', time: '21:15',
    from: 'Narita T2', to: 'Higashi-Kanda', name: 'Airport transfer (arrival)',
    detail: 'Private ¥23.8–28k/car · NearMe shared ~¥6,500 pp · name board · ~75 min',
    platform: 'NearMe', price: '¥13–27k', inr: 15500, by: 'NOW', rank: 0,
    link: 'https://app.nearme.jp/en_us/limo/airport' },
  { cat: 'Rail & transfers', jay: true, kind: 'car', d: 35.4, date: '4 Jan', time: '10:15',
    from: 'Kanda', to: 'Narita T2', name: 'Airport transfer (departure)',
    detail: 'Shared shuttle = the smart pick by day · door-to-door',
    platform: 'NearMe', price: '¥13–27k', inr: 15500, by: 'NOW', rank: 0,
    link: 'https://app.nearme.jp/en_us/limo/airport' },
  { cat: 'Rail & transfers', jay: true, kind: 'train', d: 30.4, date: '30 Dec', time: '09:15',
    from: 'Shin-Osaka', to: 'Tokyo', name: 'Nozomi Shinkansen',
    detail: 'FREE oversized-luggage seats · early-bird −¥2,500 pp · arr ~11:45',
    platform: 'SmartEX', price: '¥14,720 pp', inr: 17400, by: '30 Nov', rank: 1,
    link: 'https://smart-ex.jp/en/' },

  // ——— Parks & attractions ———
  { cat: 'Parks & attractions', jay: true, kind: 'ticket', d: 21, date: '21 Dec', time: 'all day',
    place: 'Maihama, Tokyo', name: 'Tokyo DisneySea', sub: 'dated tickets',
    detail: 'Premier Access in-app on the morning (¥8–12k)',
    platform: 'official site', price: '¥24,800/2', inr: 14600, by: 'NOW', rank: 0,
    link: 'https://www.tokyodisneyresort.jp/en/ticket/' },
  { cat: 'Parks & attractions', jay: true, kind: 'ticket', d: 28, date: '28 Dec', time: 'all day',
    place: 'Osaka', name: 'USJ + Express Pass 4', sub: 'dated ticket',
    detail: 'Express sells out for NY week — the queue lever',
    platform: 'official site', price: '~¥26,000 pp', inr: 31000, by: 'mid-Dec', rank: 3,
    link: 'https://www.usj.co.jp/web/en/us/tickets' },
  { cat: 'Parks & attractions', jay: false, kind: 'ticket', d: 31.4, date: '31 Dec', time: '09:00',
    place: 'Toyosu, Tokyo', name: 'teamLab Planets', sub: 'or 08:00 slot',
    detail: 'NYE week sells out weeks ahead · closes end-2027',
    platform: 'official site', price: '~¥4,400 pp', inr: 5100, by: 'NOW', rank: 0,
    link: 'https://teamlabplanets.dmm.com/en' },
  { cat: 'Parks & attractions', jay: false, kind: 'ticket', d: 20.7, date: '20 Dec', time: 'sunset',
    place: 'Shibuya, Tokyo', name: 'Shibuya Sky',
    detail: 'Drops 14 days ahead at 00:00 JST — gone in the hour',
    platform: 'official site', price: '¥2,600 pp', inr: 3070, by: '~6 Dec 00:00 JST', rank: 2,
    link: 'https://www.shibuya-scramble-square.com/sky/' },
  { cat: 'Parks & attractions', jay: false, kind: 'ticket', d: 31.6, date: '31 Dec', time: '~14:00',
    place: 'Ikebukuro, Tokyo', name: 'Avengers: Doomsday', sub: 'IMAX GT',
    detail: '字幕 subtitled show nearest 14:00 · Japan’s biggest screen',
    platform: 'official site', price: '~¥3,200 pp', inr: 3800, by: '28–29 Dec 00:00 JST', rank: 4,
    link: 'https://www.cinemasunshine.co.jp/theater/ikebukuro/' },
  { cat: 'Parks & attractions', jay: true, kind: 'ticket', d: 32.8, date: '1 Jan', time: 'evening',
    place: 'Oshiage, Tokyo', name: 'Skytree deck', sub: 'optional',
    detail: 'Advance ticket skips the Jan-1 queue · open to 22:00',
    platform: 'official site', price: '¥3,100 pp', inr: 3660, by: 'optional', rank: 5,
    link: 'https://www.tokyo-skytree.jp/en/ticket/' },

  // ——— Experiences & dining ———
  { cat: 'Experiences & dining', jay: true, kind: 'exp', d: 19.3, date: '19 Dec', time: 'morning',
    place: 'Ryogoku, Tokyo', name: 'Sumo morning practice',
    detail: 'Stables break from ~29 Dec · confirm venue',
    platform: 'GetYourGuide', price: '~¥13,000 pp', inr: 15900, by: 'NOW', rank: 0,
    link: 'https://www.getyourguide.com/s/?q=sumo%20morning%20practice%20tokyo' },
  { cat: 'Experiences & dining', jay: true, kind: 'exp', d: 24.45, date: '24 Dec', time: 'day',
    place: 'Gojozaka, Kyoto', name: 'Kimono rental', sub: 'Okamoto',
    detail: 'Christmas-Eve slots thin out · return by ~18:00',
    platform: 'official site', price: '~¥8,000/2', inr: 4700, by: 'NOW', rank: 0,
    link: 'https://www.okamoto-kimono.com/en/' },
  { cat: 'Experiences & dining', jay: true, kind: 'exp', d: 24.7, date: '24 Dec', time: '~16:15',
    place: 'Higashiyama, Kyoto', name: 'Tea ceremony',
    detail: 'Self-book — Jay quoted it bundled with kimono',
    platform: 'official site', price: '~¥4,000 pp', inr: 4700, by: 'NOW', rank: 0,
    link: 'https://teaceremony-kyoto.com/' },
  { cat: 'Experiences & dining', jay: false, kind: 'dining', d: 24.8, date: '24 Dec', time: '19:00',
    place: 'Kawaramachi, Kyoto', name: 'Hotel Okura “Pittoresque”', sub: 'Menu de Noël',
    detail: 'Christmas-Eve dinner · vegetarian request IN WRITING',
    platform: 'official site', price: '¥20–30k pp', inr: 29500, by: 'NOW', rank: 0,
    link: 'https://www.hotel.kyoto/okura/en/' },
  { cat: 'Experiences & dining', jay: false, kind: 'exp', d: 22.7, date: '22 Dec', time: 'dusk',
    place: 'Kawaguchiko', name: 'Mizno rooftop private bath', sub: '30-min slot',
    detail: 'Reserved at the desk — ask FIRST thing at check-in',
    platform: 'at the desk', price: '~¥1,100 pp/30 min', inr: 1300, by: 'at check-in', rank: 6,
    link: 'https://mzn.jp/' },
  { cat: 'Experiences & dining', jay: false, kind: 'dining', d: 22.8, date: '22 Dec', time: 'dinner',
    place: 'Kawaguchiko', name: 'SEIKOUKI dinner', sub: 'only if NOT taking the Jalan plan',
    detail: 'Reservation-only · nothing else walkable at Mizno',
    platform: 'official site', price: '~¥10,000 pp', inr: 11800, by: 'NOW', rank: 0,
    link: 'https://mzn.jp/' },

  // ——— Money & SIM ———
  { cat: 'Money & SIM', jay: false, kind: 'card', d: 1, date: 'before flying',
    place: 'her iPhone 17 Pro', name: 'Suica in Apple Wallet',
    detail: 'Wallet → + → Transit Card → Suica · Apple Pay top-ups',
    platform: 'official site', price: 'load ¥5–10k', inr: 5900, by: 'before flying', rank: 0,
    link: 'https://support.apple.com/en-in/108772' },
  { cat: 'Money & SIM', jay: false, kind: 'card', d: 18.95, date: '18 Dec', time: 'on landing',
    place: 'NRT T2 arrivals', name: 'Welcome Suica card', sub: 'his S23 (no FeliCa)',
    detail: 'Machine at arrivals · recharge at any station/konbini',
    platform: 'at the desk', price: 'load ¥2–5k', inr: 2360, by: 'at NRT T2', rank: 6,
    link: 'https://www.jreast.co.jp/multi/en/welcomesuica/welcomesuica.html' },
  { cat: 'Money & SIM', jay: false, kind: 'card', d: 1, date: 'before flying',
    place: 'from India', name: 'Zero-forex card + ¥ cash', sub: 'Niyo / Scapia',
    detail: '7-Eleven ATMs refill anywhere',
    platform: 'official site', price: '~¥50,000 cash', inr: 29500, by: 'before flying', rank: 0,
    link: 'https://www.goniyo.com/' },
  { cat: 'Money & SIM', jay: false, kind: 'card', d: 1, date: 'before flying',
    place: 'both phones', name: 'Japan eSIM', sub: '10–20 GB',
    detail: 'Ubigi/Airalo · activate on landing',
    platform: 'Airalo', price: '~₹1,000 each', inr: 2000, by: 'before flying', rank: 0,
    link: 'https://www.airalo.com/japan-esim' },
]

const NO_BOOKING = [
  'Zojoji NYE bell + midnight service (arrive 22:00–22:30)',
  'Meiji Jingu hatsumode · 1 Jan',
  'Imperial Palace Ippan Sanga · 2 Jan (IDs, in line by 08:15)',
  'Senso-ji, Fushimi Inari, Chureito, Arashiyama grove',
  'Kenroku-en (¥640) · Osaka Castle (¥600) · Kiyomizu (¥400) · Toji — pay at the gate',
]

const SORTS = {
  d:    (a, b) => a.d - b.d || a.rank - b.rank,
  name: (a, b) => a.name.localeCompare(b.name),
  kind: (a, b) => KINDS[a.kind][1].localeCompare(KINDS[b.kind][1]) || a.d - b.d,
  jay:  (a, b) => Number(b.jay) - Number(a.jay) || a.rank - b.rank,
  inr:  (a, b) => b.inr - a.inr,
  by:   (a, b) => a.rank - b.rank || a.inr - b.inr,
}

export default function Bookings() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [scope, setScope] = useState('all') // all | jay | ours
  const [sort, setSort] = useState('by')
  const [asc, setAsc] = useState(true)

  const rows = useMemo(() => {
    let r = ITEMS
    if (cat !== 'all') r = r.filter(i => i.cat === cat)
    if (scope === 'jay') r = r.filter(i => i.jay)
    if (scope === 'ours') r = r.filter(i => !i.jay)
    if (q.trim()) {
      const t = q.trim().toLowerCase()
      r = r.filter(i =>
        [i.name, i.sub, i.detail, i.cat, i.by, i.date, i.time, i.from, i.to, i.place, i.platform, KINDS[i.kind][1]]
          .filter(Boolean).join(' ').toLowerCase().includes(t))
    }
    r = [...r].sort(SORTS[sort])
    if (!asc) r.reverse()
    return r
  }, [q, cat, scope, sort, asc])

  const totalINR = rows.reduce((s, i) => s + i.inr, 0)
  const onSort = (key) => {
    if (sort === key) setAsc(a => !a)
    else { setSort(key); setAsc(true) }
  }
  const arrow = (key) => sort === key ? (asc ? ' ↑' : ' ↓') : ''

  return (
    <div className="bkg">
      <div className="bkg-wrap">
        <header className="bkg-head">
          <p className="bkg-kicker">JAP-26 · the parent list · before boarding 18 Dec</p>
          <h1>Bookings</h1>
        </header>

        <div className="bkg-toolbar">
          <input
            className="bk-search"
            type="search"
            placeholder="Search… (hotel, teamLab, suica, 24 Dec, Eki-net)"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <select className="bk-select" value={cat} onChange={e => setCat(e.target.value)}>
            <option value="all">All categories</option>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="bk-select" value={scope} onChange={e => setScope(e.target.value)}>
            <option value="all">All</option>
            <option value="jay">Jay quoted ✓</option>
            <option value="ours">Not quoted</option>
          </select>
          {(q || cat !== 'all' || scope !== 'all') && (
            <button className="bk-clear" onClick={() => { setQ(''); setCat('all'); setScope('all') }}>clear</button>
          )}
        </div>

        <div className="bkg-table" role="table" aria-label="Bookings">
          <div className="bkt-head" role="row">
            <button onClick={() => onSort('d')}>Date & time{arrow('d')}</button>
            <span>From → To</span>
            <button onClick={() => onSort('name')}>Item{arrow('name')}</button>
            <button onClick={() => onSort('kind')}>Type{arrow('kind')}</button>
            <span>Book via</span>
            <button onClick={() => onSort('jay')}>Jay quote?{arrow('jay')}</button>
            <button onClick={() => onSort('inr')} className="num">Price{arrow('inr')}</button>
            <button onClick={() => onSort('by')}>Book by{arrow('by')}</button>
          </div>
          {rows.map(i => (
            <div key={i.name} className="bkt-row" role="row">
              <span className="bk-when">
                {i.date}
                {i.time && <small>{i.time}</small>}
              </span>
              <span className="bk-route">
                {i.from
                  ? <>{i.from} <i>→</i> {i.to}</>
                  : <em>{i.place}</em>}
              </span>
              <div className="bk-main">
                <b>{i.name}</b>
                {i.sub && <span className="bk-sub">{i.sub}</span>}
                {i.detail && <span className="bk-note">{i.detail}</span>}
              </div>
              <span className={'bk-kind bk-k-' + i.kind}>{KINDS[i.kind][0]} {KINDS[i.kind][1]}</span>
              <a className="bk-plat" href={i.link} target="_blank" rel="noopener">{i.platform} ↗</a>
              <span className={'bk-badge ' + (i.jay ? 'jay' : 'ours')}>{i.jay ? 'QUOTED ✓' : 'NOT QUOTED'}</span>
              <span className="bk-price num">{i.price}<small>≈ ₹{i.inr.toLocaleString('en-IN')}</small></span>
              <span className={'bk-by' + (i.rank === 0 ? ' hot' : '')}>{i.by}</span>
            </div>
          ))}
          {rows.length > 0 && (
            <div className="bkt-row bkt-total" role="row">
              <span className="bk-when" />
              <span className="bk-route" />
              <div className="bk-main"><b>Total · {rows.length} item{rows.length === 1 ? '' : 's'}</b></div>
              <span className="bk-kind-cell" />
              <span className="bk-plat-cell" />
              <span className="bk-badge-cell" />
              <span className="bk-price num">≈ ₹{totalINR.toLocaleString('en-IN')}</span>
              <span className="bk-by" />
            </div>
          )}
          {rows.length === 0 && <p className="bk-empty">Nothing matches — clear the filters.</p>}
        </div>

        <section className="bkg-group">
          <h2>Zero booking needed — just show up</h2>
          <ul className="bkg-free">
            {NO_BOOKING.map(n => <li key={n}>{n}</li>)}
          </ul>
        </section>

        <p className="bkg-foot">
          Flights are TICKETED (PNR ECPN6Z) — not on this list. Hotel takkyubin (bags Tokyo → Kyoto,
          ~¥2,500/bag) is paid at the ERA desk on 22 Dec, no pre-booking. ₹ figures are for TWO people
          (approx, ¥1 ≈ ₹0.59) and are for sorting/budget feel — the booking page price wins.
        </p>
      </div>
    </div>
  )
}
