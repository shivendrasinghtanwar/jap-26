import './home.css'
import React from 'react'
import { V2 } from '../data/bundles.js'
import MapView from '../components/MapView.jsx'

// The Pair is a local-only secret — its TOC entry never renders on the deployed site.
const IS_LOCAL = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(window.location.hostname)

const ROUTE = [
  { name: 'Tokyo', days: '1–3', city: 'tokyo' },
  { name: 'Fuji · Kawaguchiko', days: '4–5', city: 'kawaguchiko' },
  { name: 'Kanazawa', days: '6', city: 'kanazawa' },
  { name: 'Kyoto', days: '7–9', city: 'kyoto' },
  { name: 'Osaka', days: '10–12', city: 'osaka' },
  { name: 'Tokyo', days: '13–18', city: 'tokyo' },
]

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <FujiScene />
        <div className="hero-copy">
          <p className="cv-eyebrow">JAP<span className="cv-dot">·</span>26</p>
          <h2 className="cv-title">A Winter in Japan.</h2>
          <p className="cv-tagline">One year ends; another begins in snow.</p>
          <p className="hero-dates" aria-label="Trip dates">
            <span className="d">18 December 2026</span>&ensp;<i>→</i>&ensp;<span className="d">4 January 2027</span>
          </p>
          <nav className="cv-toc" aria-label="Contents">
            <a href="#/map"><i>I.</i><span>Itinerary &amp; Map</span><em aria-hidden="true" /><b>day by day</b></a>
            <a href="#/flights"><i>II.</i><span>Flights</span><em aria-hidden="true" /><b>ticketed</b></a>
            <a href="#/costs"><i>III.</i><span>Cost Analysis</span><em aria-hidden="true" /><b>the numbers</b></a>
            {IS_LOCAL && <a href="#/watches"><i>IV.</i><span>The Pair</span><em aria-hidden="true" /><b>two open hearts</b></a>}
          </nav>
        </div>
      </section>

      <section className="statstrip" aria-label="Trip numbers">
        <div><b>18</b><span>days</span></div>
        <div><b>5</b><span>cities</span></div>
        <div><b>128</b><span>planned stops</span></div>
        <div><b>~1,300</b><span>km on rails</span></div>
        <div><b>2</b><span>theme parks</span></div>
        <div><b>12+</b><span>temples &amp; shrines</span></div>
      </section>

      <section className="routeband" aria-label="Route">
        {ROUTE.map((r, i) => (
          <React.Fragment key={i}>
            <span className="routestop" style={{ '--c': V2.cityColors[r.city] }}>
              <i className="routedot" />
              <b>{r.name}</b>
              <small>day {r.days}</small>
            </span>
            {i < ROUTE.length - 1 && <span className="routearrow" aria-hidden="true">→</span>}
          </React.Fragment>
        ))}
      </section>

      <section className="home-kit" aria-label="Japan essentials">
        <h2 className="home-kit-title">The make-life-easy kit</h2>
        <div className="home-kit-grid">
          <div className="home-kit-card">
            <h3>Suica on the iPhone</h3>
            <p><b>Her iPhone 17 Pro:</b> add Suica to Apple Wallet <b>before flying</b> (Wallet → + → Transit Card → Suica), top up with Apple Pay. <b>His S23 (Indian model) can&rsquo;t run Mobile Suica</b> — no FeliCa chip: get a physical <b>Welcome Suica</b> from the machine at Narita T2 arrivals (no deposit, 28-day card). One tap rides every metro, JR local and bus in all five cities — and pays at konbini and vending machines.</p>
          </div>
          <div className="home-kit-card">
            <h3>Taxi apps</h3>
            <p><b>GO</b> is Japan&rsquo;s main taxi app — English UI, foreign cards accepted. Uber works in Tokyo/Kyoto/Osaka too (it dispatches regular taxis at meter rates). Base fare ¥500–730, no tipping, doors open themselves. Use for: kimono day hops, Kawaguchiko, late-night Gion.</p>
          </div>
          <div className="home-kit-card">
            <h3>Money</h3>
            <p>Carry <b>¥25–30k cash</b> — shrines, omamori, market stalls and small ramen-ya are cash-only. Refill at any <b>7-Eleven ATM</b> (takes Indian Visa/MC, 24/7, fair rate). Cards + Apple Pay cover hotels, trains, Uniqlo, Yodobashi, konbini and chain restaurants.</p>
          </div>
          <div className="home-kit-card">
            <h3>The day-pass rule</h3>
            <p>Taking <b>4 or fewer</b> metro rides in a day (most of our days): just tap Suica — it also works on JR, which passes don&rsquo;t. Taking <b>5+</b> subway-only rides: the Tokyo Subway 24-hour ticket, ¥1,000/adult, pays for itself (Metro + Toei lines only, not JR).</p>
          </div>
          <div className="home-kit-card">
            <h3>Data &amp; navigation</h3>
            <p>Buy an <b>eSIM before flying</b> (Ubigi/Airalo, ~₹800–1,200 for 10 GB). Google Maps transit directions are gospel in Japan — platform numbers, car positions, exact fares. Each stop below also carries its own &ldquo;getting there&rdquo; line on the map page.</p>
          </div>
          <div className="home-kit-card">
            <h3>Comfort tricks</h3>
            <p><b>Takkyubin</b>: any hotel desk ships a suitcase to any other hotel overnight, ~¥2,500/bag — we use it Tokyo → Kyoto on Day 5. Coin lockers at every station (¥400–700). Konbini solve breakfast, ATM and midnight snacks. Passport stays ON you — it&rsquo;s the law, and it&rsquo;s the tax-free discount.</p>
          </div>
        </div>
      </section>

      <section className="home-mapband" aria-label="Route map">
        <div className="home-mapband-head">
          <h2 className="home-map-title">The Route, on the map</h2>
          <a className="home-map-link" href="#/map">Open the full day-by-day map →</a>
        </div>
        <div className="home-mapframe">
          <MapView
            day={0}
            stops={V2.locations.stops}
            cities={V2.locations.cities}
            color="#1b1b1f"
            days={V2.days}
            cityColors={V2.cityColors}
          />
        </div>
      </section>

      <section className="home-grid">
        <a className="home-card" href="#/map">
          <h3>Itinerary &amp; Map</h3>
          <p>Every day as a timeline, synced to a map — numbered stops, route lines, and station-by-station transit directions.</p>
          <span className="home-card-go">Day by day →</span>
        </a>
        <a className="home-card" href="#/flights">
          <h3>Flights</h3>
          <p>Ticketed and paid: all-Cathay via Hong Kong, into Narita 18 Dec, home from Narita 4 Jan.</p>
          <span className="home-card-go">The booking →</span>
        </a>
        <a className="home-card" href="#/costs">
          <h3>Cost Analysis</h3>
          <p>The full self-booked budget — flights, hotels, rail, parks, meals, yen-to-rupee, and the cash to carry.</p>
          <span className="home-card-go">The numbers →</span>
        </a>
      </section>

      <p className="home-foot">
        Our own plan, self-booked · research verified Nov 2026 · flights ticketed 24 Nov 2026 ·
        128 stops across 18 days — every one of them ours.
      </p>
    </main>
  )
}

function FujiScene() {
  return (
    <div className="fuji-wrap" aria-hidden="true">
      <svg className="fuji" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3e8d8" />
            <stop offset="70%" stopColor="#f0dfc8" />
            <stop offset="100%" stopColor="#ecd9c0" />
          </linearGradient>
          <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#566379" />
            <stop offset="100%" stopColor="#8d9aa9" />
          </linearGradient>
          <linearGradient id="mtnfar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b0b7bf" />
            <stop offset="100%" stopColor="#ced2d2" />
          </linearGradient>
          <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7f2e9" stopOpacity="0" />
            <stop offset="55%" stopColor="#f7f2e9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f7f2e9" />
          </linearGradient>
          <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#d14e3a" />
            <stop offset="72%" stopColor="#c93a2b" />
            <stop offset="100%" stopColor="#c93a2b" stopOpacity="0.85" />
          </radialGradient>
        </defs>
        <rect width="1200" height="460" fill="url(#sky)" />
        {/* sun — beside Fuji's shoulder, survives top-cropping */}
        <circle className="fj-sun" cx="745" cy="170" r="58" fill="url(#sun)" opacity="0.82" />
        {/* far ridge */}
        <path d="M0 330 L140 270 L260 320 L390 260 L520 330 L700 300 L1200 360 L1200 460 L0 460 Z" fill="url(#mtnfar)" opacity="0.55" />
        {/* Fuji */}
        <path className="fj" d="M330 420 C470 400 520 330 575 215 C590 184 600 170 612 170 C624 170 634 184 649 215 C704 330 754 400 894 420 Z" fill="url(#mtn)" />
        {/* snowcap */}
        <path className="fj" d="M575 215 C590 184 600 170 612 170 C624 170 634 184 649 215 C640 233 632 240 622 231 C614 224 610 238 601 240 C590 242 583 230 575 215 Z" fill="#fbf7ef" />
        {/* mist */}
        <rect x="0" y="330" width="1200" height="130" fill="url(#mist)" />
        {/* birds — clustered clear of the headline */}
        <g stroke="#55504a" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.62">
          <path className="fj-bird" d="M652 246 q9 -9 18 0 q9 -9 18 0" />
          <path className="fj-bird" d="M697 270 q7 -7 14 0 q7 -7 14 0" />
          <path className="fj-bird" d="M664 288 q6 -6 12 0 q6 -6 12 0" />
        </g>
        {/* foreground shore — after the mist so it stays visible */}
        <path d="M0 450 C 240 443 500 447 740 442 C 910 438.5 1050 438 1200 440 L1200 460 L0 460 Z" fill="#dcd0b5" />
        {/* torii standing on the shore */}
        <g fill="#b23222">
          <rect x="796" y="406" width="6" height="46" rx="2" />
          <rect x="840" y="406" width="6" height="46" rx="2" />
          <rect x="785" y="396" width="72" height="7" rx="3.5" />
          <rect x="791" y="410" width="60" height="5" rx="2.5" />
        </g>
      </svg>
    </div>
  )
}
