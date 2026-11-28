import './survival.css'
import React, { useState } from 'react'

/* ——— Survival · the pocket deck ———
   One fact per card. kinds: glyph (kanji), kana, romaji, app, fact.
   A tile with `back` renders as a flip card (button + aria-expanded).  */

const BANDS = [
  {
    en: 'TOILET', jp: '便所',
    tiles: [
      { kind: 'glyph', main: '流す', lab: 'FLUSH', mean: 'often a wall button / sensor', key: true },
      { kind: 'glyph', main: '大', lab: 'BIG FLUSH' },
      { kind: 'glyph', main: '小', lab: 'SMALL FLUSH' },
      { kind: 'glyph', main: '止', lab: 'STOP', mean: 'your undo button' },
      { kind: 'kana', main: 'おしり', lab: 'REAR WASH' },
      { kind: 'kana', main: 'ビデ', lab: 'FRONT WASH' },
      { kind: 'kana', main: '乾燥', lab: 'DRYER' },
      { kind: 'kana', main: '音姫', lab: 'FAKE SOUND', mean: 'privacy sound — does NOT flush' },
      { kind: 'glyph', main: '呼出', lab: 'STAFF CALL', mean: 'never the flush. it’s red.', danger: true },
      { kind: 'glyph', main: '👋', ja: false, lab: 'NO BUTTON?', mean: 'wave at the wall sensor' },
      { kind: 'app', main: 'Flush', chips: [{ t: 'iOS' }, { t: 'AND' }], lab: 'TOILET FINDER', mean: '200k+ mapped, works offline' },
    ],
  },
  {
    en: 'PHRASES', jp: '言葉',
    tiles: [
      { kind: 'romaji', main: 'Sumimasen', lab: 'EXCUSE ME · SORRY', mean: 'the word that does everything', key: true },
      { kind: 'romaji', main: 'Arigatou gozaimasu', lab: 'THANK YOU', mean: '(polite)' },
      { kind: 'romaji', main: 'Kore kudasai', lab: 'THIS ONE, PLEASE', mean: '+ point. orders anything' },
      { kind: 'romaji', main: 'Daijoubu desu', lab: 'NO THANKS', mean: 'refuses the bag, the upsell' },
      { kind: 'romaji', main: 'Toire wa doko?', lab: 'WHERE’S THE TOILET' },
      { kind: 'romaji', main: 'Oishii!', lab: 'DELICIOUS', mean: 'say it — chefs light up' },
      { kind: 'romaji', main: 'Moshi moshi', lab: 'HELLO', mean: 'PHONE only, never in person' },
    ],
  },
  {
    en: 'APPS · EVERY DAY', jp: 'アプリ', wide: true,
    tiles: [
      { kind: 'app', main: 'Google Maps', lab: 'NAVIGATION', mean: 'platforms, car positions, exact fares' },
      {
        kind: 'app', main: 'Google Translate', chips: [{ t: 'OFFLINE PACK' }], lab: 'TRANSLATE', mean: 'camera mode = live English',
        back: ['download the Japanese offline pack', 'camera mode: menus, signs, machines', 'conversation mode: hand over the phone', 'or type English, show the screen'],
      },
      {
        kind: 'app', main: 'NAVITIME', lab: 'JAPAN TRAVEL', mean: 'where Google Maps runs thin',
        back: ['tells you which car to board', 'Fuji / Kawaguchiko bus times', 'free tier is enough'],
      },
      { kind: 'app', main: 'GO', lab: 'TAXI', mean: 'English UI, foreign cards OK' },
      { kind: 'app', main: 'Flush', lab: 'TOILETS', mean: 'nearest toilet, works offline' },
      { kind: 'app', main: 'Kuli Kuli', lab: 'MENU DECODER', mean: 'handwritten signs, labels, fortune slips' },
      { kind: 'app', main: 'Tabelog', lab: 'FOOD RATINGS', mean: '3.5+ = queue-worthy' },
      { kind: 'app', main: 'Payke', lab: 'BARCODES', mean: 'scan → English at drugstores' },
    ],
  },
  {
    en: 'APPS · TICKET DAYS', jp: '指定日', wide: true,
    tiles: [
      {
        kind: 'app', main: 'Disney Resort', chips: [{ t: 'IN-PARK ONLY', park: true }], lab: 'DPA', mean: 'Premier Access sold in-app only',
        back: ['MyDisney account before the flight', 'load BOTH cards', 'foreign cards flaky — backup ready'],
      },
      {
        kind: 'app', main: 'USJ', chips: [{ t: 'APP-ONLY', park: true }], lab: 'NINTENDO WORLD', mean: 'timed entry lives in-app',
        back: ['register the pass 28 Dec morning', 'paper machines gone since Jan 2026', 'uninstall mid-day = ticket voids'],
      },
      {
        kind: 'app', main: 'teamLab', chips: [{ t: 'IN-MUSEUM' }], lab: 'QUEUE TICKETS', mean: 'skips lines for big rooms',
        back: ['entry itself = QR e-ticket', 'app issues numbered queue tickets', 'download before NYE crowds'],
      },
      {
        kind: 'app', main: 'smartEX', chips: [{ t: 'TEST AT HOME' }], lab: 'SHINKANSEN', mean: 'Tokaido seats, booked from India',
        back: ['Amex best — foreign Visa/MC flaky', 'Klook is the fallback', 'links her Wallet Suica → tap gates'],
      },
      {
        kind: 'app', main: 'Eki-net', chips: [{ t: 'WEBSITE' }], lab: 'KANAZAWA LEG', mean: 'English website, not the app',
        back: ['books the Kanazawa trains', 'the app is JP-store-only', 'use the English website'],
      },
      {
        kind: 'app', main: 'Visit Japan Web', chips: [{ t: 'WEB' }], lab: 'ARRIVAL', mean: 'immigration + customs QR',
        back: ['both of us', 'fill in before landing', 'QR at Narita counters'],
      },
    ],
  },
  {
    en: 'MONEY', jp: '金',
    tiles: [
      {
        kind: 'fact', main: '¥25–30k', lab: 'CASH TO CARRY', mean: 'small Japan is cash-only',
        back: ['shrines & omamori', 'market stalls', 'small ramen-ya', 'all cash-only'],
      },
      { kind: 'app', main: '7-Eleven ATM', lab: 'CASH REFILL', mean: 'Indian Visa/MC · 24/7' },
      {
        kind: 'fact', main: '10%', lab: 'TAX-FREE', mean: 'look for the red sign',
        back: ['passport required', '¥5,500 min · one store · same day', 'Uniqlo · Bic · Don Quijote'],
      },
      { kind: 'app', main: 'Suica tap', lab: 'PAYS AT SHOPS', mean: 'konbini, vending machines, lockers' },
      { kind: 'kana', main: 'トレー', lab: 'MONEY TRAY', mean: 'on the tray, never hands' },
      { kind: 'app', main: 'Card + Apple Pay', lab: 'EVERYTHING ELSE', mean: 'hotels, trains, Uniqlo, chains' },
    ],
  },
  {
    en: 'TRANSIT', jp: '駅',
    tiles: [
      {
        kind: 'app', main: 'Suica · her iPhone', chips: [{ t: 'PRE-FLIGHT' }], lab: 'MOBILE SUICA', mean: 'add to Wallet before flying',
        back: ['Wallet → + → Transit → Suica', 'do it before flying', 'top up with Apple Pay'],
      },
      {
        kind: 'app', main: 'Welcome Suica · him', chips: [{ t: 'NARITA T2' }], lab: 'PHYSICAL CARD', mean: 'his S23 has no FeliCa',
        back: ['machine at Narita T2 arrivals', 'no deposit', 'valid 28 days'],
      },
      { kind: 'fact', main: '4↓', lab: 'JUST TAP', mean: 'Suica it — works on JR' },
      { kind: 'fact', main: '5↑', lab: 'DAY PASS', mean: '¥1,000/24h · Metro+Toei, NOT JR' },
      { kind: 'app', main: 'GO / Uber', lab: 'TAXI', mean: '¥500–730 base · no tip · auto doors' },
      { kind: 'glyph', main: '静', lab: 'SILENT TRAINS', mean: 'manner mode, whispers, no calls' },
      { kind: 'glyph', main: '並', lab: 'PAINTED LINES', mean: 'the door stops exactly there' },
      { kind: 'kana', main: '左 / 右', lab: 'ESCALATOR — IT FLIPS', mean: 'stand LEFT Tokyo · RIGHT Osaka', key: true },
    ],
  },
  {
    en: 'EAT', jp: '食',
    tiles: [
      { kind: 'glyph', main: '食券', lab: 'TICKET MACHINE FIRST', mean: 'buy at the door, then sit' },
      { kind: 'kana', main: 'サンプル', lab: 'WINDOW FOOD', mean: 'take the staff out, point' },
      { kind: 'romaji', main: 'Osusume', lab: 'CHEF’S PICK', mean: 'ask it — get the best' },
      { kind: 'fact', main: '¥0', lab: 'NO TIPPING. EVER.', mean: 'they will chase you down', key: true },
      { kind: 'app', main: 'Pay up front', lab: 'COUNTER + TRAY', mean: 'money on the tray, never hands' },
      { kind: 'app', main: 'Tabelog', lab: 'CROSS-REF', mean: '3.5+ before you queue' },
      {
        kind: 'app', main: 'TableCheck', lab: 'RESERVATIONS', mean: 'English bookings that complete',
        back: ['TableCheck: EN reservations that complete', 'AutoReserve: its AI phone-calls', 'phone-only restaurants, in Japanese'],
      },
    ],
  },
  {
    en: 'STREET', jp: '道',
    tiles: [
      { kind: 'fact', main: '0', lab: 'TRASH BINS', mean: 'carry a konbini bag' },
      { kind: 'kana', main: '食べ歩き', lab: 'NO EAT-AND-WALK', mean: 'stand aside, finish, then move' },
      { kind: 'glyph', main: '旅券', lab: 'PASSPORT ON YOU', mean: 'the law — and the discount' },
      { kind: 'kana', main: 'コンビニ', lab: '24/7 LIFELINE', mean: 'breakfast · ATM · toilet · coffee' },
    ],
  },
  {
    en: 'KIT', jp: '荷', wide: true,
    tiles: [
      {
        kind: 'app', main: 'eSIM', chips: [{ t: 'PRE-FLIGHT' }], lab: 'DATA', mean: 'buy before flying',
        back: ['Ubigi or Airalo', '₹800–1,200 for 10 GB', 'install before the flight'],
      },
      {
        kind: 'app', main: 'Takkyubin', lab: 'BAG FORWARDING', mean: 'hotel ships your suitcase ahead',
        back: ['hotel desk → next hotel, overnight', '~¥2,500 per bag', 'ours: Tokyo → Kyoto, Day 5'],
      },
      { kind: 'fact', main: '¥400–700', lab: 'COIN LOCKERS', mean: 'at every station' },
      {
        kind: 'app', main: 'ecbo cloak', lab: 'LUGGAGE STORAGE', mean: 'book a café’s back room',
        back: ['cafés + ~380 7-Elevens', '¥500–800 per bag per day', 'for hotel-change days'],
      },
      { kind: 'app', main: 'Safety Tips', lab: 'OFFICIAL ALERTS', mean: 'EN quake push · both phones' },
      { kind: 'app', main: 'NERV', lab: 'QUAKE WARNING', mean: 'fastest early-warning in English' },
      { kind: 'app', main: 'Uber Eats', lab: 'SAFETY NET', mean: 'home account works · NYE dinner' },
      { kind: 'app', main: 'WeatherJapan', lab: 'SEE FUJI?', mean: 'pair with Windy’s cloud layer' },
    ],
  },
]

function Main({ t }) {
  const ja = t.ja !== false
  if (t.kind === 'glyph') return <span className="sv-glyph" lang={ja ? 'ja' : undefined}>{t.main}</span>
  if (t.kind === 'kana') return <span className="sv-kana" lang={ja ? 'ja' : undefined}>{t.main}</span>
  if (t.kind === 'romaji') return <span className="sv-romaji">{t.main}</span>
  if (t.kind === 'fact') return <span className="sv-fact">{t.main}</span>
  return <span className="sv-app">{t.main}</span>
}

function Front({ t }) {
  return (
    <>
      <Main t={t} />
      {t.chips && (
        <span className="sv-chips">
          {t.chips.map(c => (
            <span key={c.t} className={'sv-mc' + (c.park ? ' sv-mc-park' : '')}>{c.t}</span>
          ))}
        </span>
      )}
      {t.lab && <span className="sv-lab">{t.lab}</span>}
      {t.mean && <span className="sv-mean">{t.mean}</span>}
    </>
  )
}

function FlipTile({ t }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="sv-cell">
      <button
        type="button"
        className={'sv-flip' + (t.key ? ' sv-key' : '')}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="sv-face sv-front"><Front t={t} /></span>
        <span className="sv-face sv-back" aria-hidden={!open}>
          {t.back.map((line, i) => <span key={i}>· {line}</span>)}
        </span>
      </button>
    </li>
  )
}

function Tile({ t }) {
  return (
    <li className={'sv-tile' + (t.key ? ' sv-key' : '') + (t.danger ? ' sv-danger' : '')}>
      <Front t={t} />
    </li>
  )
}

export default function Survival() {
  return (
    <main className="sv">
      <p className="sv-kick">FIELD GUIDE</p>
      <h1 className="sv-h1">Survival.</h1>
      <p className="sv-sub">one fact per card · ◢ = tap for more</p>

      {BANDS.map(b => {
        const allFlip = b.tiles.every(t => t.back)
        return (
          <section className="sv-band" key={b.en} aria-label={b.en}>
            <div className="sv-bh">
              <b>{b.en}</b>
              <span className="sv-bh-jp" lang="ja">{b.jp}</span>
              <span className="sv-bh-n">{allFlip ? 'tap ◢ to flip' : `${b.tiles.length} cards`}</span>
            </div>
            <ul className={'sv-grid' + (b.wide ? ' sv-wide' : '')}>
              {b.tiles.map((t, i) => (t.back ? <FlipTile key={i} t={t} /> : <Tile key={i} t={t} />))}
            </ul>
          </section>
        )
      })}

      <p className="sv-foot">research verified Nov 2026 · screenshot nothing — it lives here</p>
    </main>
  )
}
