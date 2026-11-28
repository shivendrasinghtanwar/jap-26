import './costs.css'

// Exchange rate used everywhere on this page (approx, Nov 2026 rate)
const JPY_TO_INR = 0.59

const fmtYen = (n) => `¥${n.toLocaleString('en-US')}`
const fmtInr = (n) =>
  `₹${Math.round(n * JPY_TO_INR).toLocaleString('en-IN')}`
const inr = (n) => `₹${n.toLocaleString('en-IN')}`

/* ——— The self-booked budget (Jay retired 26 Nov 2026). All INR, 2 adults. ——— */
const BUDGET = [
  {
    label: 'Flights — PAID',
    basis: 'All-Cathay via HKG, Narita both ways · PNR ECPN6Z · Goibibo 24 Nov',
    low: 134635,
    high: 134635,
    done: true,
  },
  {
    label: 'Hotels · 17 nights — ALL 6 LEGS BOOKED',
    basis: '₹2,04,202 locked 28 Nov (ERA Tokyo 53.1k · Mizno 28.4k · Forza 4.0k · ERA Kyoto 21.7k · DEL style 25.4k · ERA NY 71.6k) · all pay-later, ₹0 charged yet · high end = city taxes at desks + Agoda forex',
    low: 204202,
    high: 210000,
    done: true,
    doneTag: 'booked ✓',
  },
  {
    label: 'Airport cars · D1 + D18',
    basis: 'Narita ⇄ hotel private transfers (~90 min each way)',
    low: 32000,
    high: 38000,
  },
  {
    label: 'Rail + city transit',
    basis: 'Hokuriku + Thunderbird + Nozomi point-to-point (no JR Pass), Fuji Excursion, Suica top-ups',
    low: 72000,
    high: 82000,
  },
  {
    label: 'Theme parks',
    basis: 'DisneySea ¥21.8k + DPA ~¥15k; USJ ¥23.8k + Express 7 ~¥56–66k; teamLab, Shibuya Sky, Skytree, IMAX (audited 26 Nov, peak tiers)',
    low: 80000,
    high: 95000,
  },
  {
    label: 'Experiences & entries',
    basis: 'Sumo, kimono + tea ceremony, Skytree, Shibuya Sky, boat, temples & castles',
    low: 38000,
    high: 50000,
  },
  {
    label: 'Fuji-day guide (optional)',
    basis: 'Only if we still want one for D5–6 — the app replaces the rest',
    low: 0,
    high: 25000,
  },
]

/* ——— On-ground daily spend (¥, totals for 2 adults, 18 days) ——— */
const LINE_ITEMS = [
  {
    label: 'Lunches',
    basis: '16 days × 2 pax × ¥1,000–2,000',
    low: 16 * 2 * 1000,
    high: 16 * 2 * 2000,
    tag: null,
  },
  {
    label: 'Dinners',
    basis: '16 nights × 2 pax × ¥1,500–3,500 (Christmas Eve dinner separate)',
    low: 16 * 2 * 1500,
    high: 16 * 2 * 3500,
    tag: null,
  },
  {
    label: 'Christmas-Eve dinner · Okura Tokiwa',
    basis: 'Teppanyaki 17F, 24 Dec — TableCheck, courses ~¥20–35k pp (Pittoresque Eve sold out)',
    low: 40000,
    high: 70000,
    tag: 'book',
  },
  {
    label: 'Breakfasts not in hotel rate',
    basis: 'Konbini + bakeries where the 3★ has none',
    low: 10000,
    high: 20000,
    tag: null,
  },
  {
    label: 'Shrine & sundry spends',
    basis: 'Omamori, offerings, lockers, kairo heat packs',
    low: 5000,
    high: 12000,
    tag: null,
  },
  {
    label: 'Doomsday IMAX GT · 30 Dec',
    basis: '2 tickets, Grand Cinema Sunshine Ikebukuro — booking opens 27–28 Dec',
    low: 6000,
    high: 7000,
    tag: 'book',
  },
  {
    label: 'Shopping & souvenirs',
    basis: 'Nakamise, Kuromon, Dotonbori, konbini hauls — before watches/sneakers',
    low: 20000,
    high: 50000,
    tag: 'discretionary',
  },
]

const WATCH_OUTS = [
  {
    title: 'Book-now queue',
    body: 'Tokiwa 24 Dec dinner + teamLab Planets 31 Dec 09:00: NOW. Nozomi via SmartEX: 30 Nov. USJ Studio Pass + EXPRESS 7 (not 4 — no Mario Kart on 4): by 3 Dec, demand-priced. Shibuya Sky: ~6 Dec 00:00 JST. DisneySea via Klook: by ~7 Dec. Doomsday IMAX (30 Dec show): opens 27–28 Dec. Hotels: DONE — all 6 legs booked.',
  },
  {
    title: 'Dynamic park pricing',
    body: 'USJ and DisneySea prices rise by date — Christmas and New Year sit at the top tier. The budget above already assumes peak-tier tickets.',
  },
  {
    title: 'Tax-free is a refund at the airport',
    body: 'Since Nov 2026 you pay full price in store and claim the 10% back at customs before departure. Watches, boxes and receipts in hand at Narita T2 — check-in closes 13:25 on Day 18.',
  },
  {
    title: 'New Year food gets thin',
    body: 'Jan 1–2 many independents close. Konbini meals are cheap but limited — chains, hotel dining and department-store food halls are the fallback.',
  },
  {
    title: 'Cards vs cash',
    body: 'Cards + Suica cover hotels, trains, konbini, Uniqlo, Yodobashi and chain restaurants. Cash only: shrine entries & omamori, market stalls, small ramen-ya, some Kawaguchiko buses. 7-Eleven ATMs take Indian Visa/MC 24/7.',
  },
]

export default function Costs() {
  const budgetLow = BUDGET.reduce((s, b) => s + b.low, 0)
  const budgetHigh = BUDGET.reduce((s, b) => s + b.high, 0)
  const totalLow = LINE_ITEMS.reduce((sum, item) => sum + item.low, 0)
  const totalHigh = LINE_ITEMS.reduce((sum, item) => sum + item.high, 0)
  const grandLow = budgetLow + Math.round(totalLow * JPY_TO_INR)
  const grandHigh = budgetHigh + Math.round(totalHigh * JPY_TO_INR)

  return (
    <main className="page costs-page">
      <header className="costs-head">
        <p className="costs-kicker">JAP-26 &middot; 18 days &middot; 2 adults &middot; self-booked</p>
        <h1>Cost Analysis</h1>
        <p className="costs-sub">
          The whole trip, booked by us: fixed bookings in rupees, daily spend in yen.
        </p>
      </header>

      <section className="notice" aria-label="Budget status">
        <span className="notice-mark" aria-hidden="true">&yen;</span>
        <div>
          <p className="notice-title">Flights paid &middot; all 17 hotel nights booked (28 Nov) &mdash; rail, parks &amp; tables remain</p>
          <p>
            We dropped the agency package (quoted ~&#8377;11L) and self-book at
            market rates. Flights + hotels are now locked at{' '}
            <strong>&#8377;3.39L</strong> &mdash; same itinerary, roughly{' '}
            <strong>half the price</strong>.
          </p>
        </div>
      </section>

      <section className="table-wrap" aria-label="Booking budget">
        <p className="label">Bookings &middot; 2 adults &middot; INR</p>
        <table className="cost-table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" className="num">Low</th>
              <th scope="col" className="num">High</th>
            </tr>
          </thead>
          <tbody>
            {BUDGET.map((item) => (
              <tr key={item.label}>
                <td>
                  <span className="item-label">
                    {item.label}
                    {item.done && <span className="tag">{item.doneTag || 'paid'}</span>}
                  </span>
                  <span className="item-basis">{item.basis}</span>
                </td>
                <td className="num">{inr(item.low)}</td>
                <td className="num">{inr(item.high)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <span className="item-label">Bookings total</span>
                <span className="item-basis">flights + hotels + transport + tickets</span>
              </td>
              <td className="num">{inr(budgetLow)}</td>
              <td className="num">{inr(budgetHigh)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="table-wrap" aria-label="On-ground spend estimates">
        <p className="label">On-ground spend &middot; 2 adults &middot; &yen;</p>
        <table className="cost-table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" className="num">Low</th>
              <th scope="col" className="num">High</th>
            </tr>
          </thead>
          <tbody>
            {LINE_ITEMS.map((item) => (
              <tr key={item.label}>
                <td>
                  <span className="item-label">
                    {item.label}
                    {item.tag && <span className="tag">{item.tag}</span>}
                  </span>
                  <span className="item-basis">{item.basis}</span>
                </td>
                <td className="num">{fmtYen(item.low)}</td>
                <td className="num">{fmtYen(item.high)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <span className="item-label">Total on-ground spend</span>
                <span className="item-basis">
                  Rupee figures at {JPY_TO_INR} INR/&yen; &mdash; approx, Nov 2026 rate
                </span>
              </td>
              <td className="num">
                {fmtYen(totalLow)}
                <span className="inr">{fmtInr(totalLow)}</span>
              </td>
              <td className="num">
                {fmtYen(totalHigh)}
                <span className="inr">{fmtInr(totalHigh)}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="cash-callout" aria-label="Trip total">
        <p className="label label-cash">All-in, before watches &amp; sneakers</p>
        <p className="cash-amount">{inr(grandLow)}&ndash;{inr(grandHigh)}</p>
        <p className="cash-body">
          Flights (paid) + every booking + all on-ground spend for two, 18 days.
          Watch budget (&#8377;1.3&ndash;2.1L, 10% back at customs) and sneakers sit on top.
        </p>
      </section>

      <section className="cash-callout" aria-label="Cash to carry">
        <p className="label label-cash">Cash to carry</p>
        <p className="cash-amount">&yen;25,000&ndash;30,000</p>
        <p className="cash-body">
          Physical cash for shrines, markets and small restaurants &mdash; many
          are cash-only. Running low isn&rsquo;t a crisis: 7-Eleven ATMs take
          Indian Visa and Mastercard.
        </p>
      </section>

      <section className="watchouts" aria-label="Watch-outs">
        <p className="label">Watch-outs</p>
        <ul className="watch-list">
          {WATCH_OUTS.map((w) => (
            <li key={w.title}>
              <span className="watch-title">{w.title}</span>
              <span className="watch-body">{w.body}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
