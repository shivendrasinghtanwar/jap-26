import './costs.css'

// Exchange rate used everywhere on this page (approx, Nov 2026 rate)
const JPY_TO_INR = 0.59

const fmtYen = (n) => `¥${n.toLocaleString('en-US')}`
const fmtInr = (n) =>
  `₹${Math.round(n * JPY_TO_INR).toLocaleString('en-IN')}`

// Self-paid line items for 2 adults, in ¥. low/high are totals for the couple.
const LINE_ITEMS = [
  {
    label: 'Tokyo DisneySea tickets',
    basis: '2 adults, dated 1-day Passport, Christmas-week tier',
    low: 2 * 10900,
    high: 2 * 12400,
    tag: null,
  },
  {
    label: 'DisneySea round-trip transfer',
    basis: 'Hotel to Maihama and back — train vs taxi',
    low: 1000,
    high: 6000,
    tag: null,
  },
  {
    label: 'Lunches',
    basis: '12 days × 2 pax × ¥1,000–2,000',
    low: 12 * 2 * 1000,
    high: 12 * 2 * 2000,
    tag: null,
  },
  {
    label: 'Dinners',
    basis: '13 nights × 2 pax × ¥1,500–3,500 (incl. Day 6)',
    low: 13 * 2 * 1500,
    high: 13 * 2 * 3500,
    tag: null,
  },
  {
    label: 'Suica top-ups & local transit',
    basis: 'Metro hops, Day 9 JR Sagano line, odd buses',
    low: 8000,
    high: 15000,
    tag: null,
  },
  {
    label: 'Tokyo Skytree decks',
    basis: '2 × ¥3,100–3,400 advance, both decks',
    low: 2 * 3100,
    high: 2 * 3400,
    tag: 'optional',
  },
  {
    label: 'Ryoan-ji entry',
    basis: '2 × ¥500–600 (unmarked in itinerary)',
    low: 2 * 500,
    high: 2 * 600,
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
    label: 'Shopping & souvenirs',
    basis: 'Nakamise, Kuromon, Dotonbori, konbini hauls',
    low: 20000,
    high: 50000,
    tag: 'discretionary',
  },
]

const PACKAGE_COVERS = [
  'Hotels, all 13 nights, with daily breakfast',
  'Private airport & intercity transfers as listed',
  'All shinkansen / express rail legs marked included',
  'Sumo experience, Lake Kawaguchi boat, kimono + tea ceremony',
  'USJ 1-day ticket',
  'Museum & temple entries marked included — Kiyomizu-dera, Sanjusangendo, Kennin-ji, Kinkaku-ji, Music Forest, Iyashi-no-Sato, Glass Art Museum, Tsutenkaku, Osaka Castle',
]

const YOU_PAY = [
  'DisneySea tickets and that day’s transfers (both excluded)',
  'All lunches & dinners (~25 meals for two), incl. Day 6 dinner',
  'Misc transit — Suica top-ups, Day 9 JR Sagano line',
  'Optional Skytree deck tickets (itinerary only says “explore area”)',
  'Ryoan-ji entry (unmarked, assume self-paid)',
  'Shopping, souvenirs, shrine offerings & omamori',
]

const WATCH_OUTS = [
  {
    title: 'Dynamic park pricing',
    body: 'USJ and DisneySea prices rise by date — Christmas and New Year sit at or near the top tier. Buy dated tickets the moment the trip dates lock.',
  },
  {
    title: 'Premier Access / Express Passes are extra',
    body: 'Skip-the-line add-ons run ¥1,500–30,000 per person if wanted. Not in this budget — decide per park on the day prices are visible.',
  },
  {
    title: 'Tax-free is now a refund at the airport',
    body: 'Since Nov 2026 you pay full price in store and claim the 10% back at customs before departure. Costs time, not money — allow 3h+ at Haneda on Day 14.',
  },
  {
    title: 'New Year food gets thin',
    body: 'Jan 1–2 many independents close. Konbini meals are cheap but limited — chains, hotel dining and department-store food halls are the fallback.',
  },
]

// V2 (17-day counter-proposal) adds three Tokyo days + a few swaps.
const V2_DELTA = [
  { label: 'Extra meals', basis: '3 extra days × 2 pax', amount: '¥15,000–33,000' },
  { label: 'Shibuya Sky', basis: '2 tickets, 30 Dec sunset slot', amount: '¥5,200–5,400' },
  { label: 'Skytree decks', basis: '2 tickets, 1 Jan first night view', amount: '¥6,200–6,800' },
  { label: 'Extra local transit', basis: 'Osaka lights hop + 3 Tokyo days', amount: '¥3,000–6,000' },
  { label: 'Watches', basis: 'Tax refund −10% at customs', amount: 'your budget' },
  { label: 'Kanazawa + 4 Tokyo extension nights & 3 Jan transfer', basis: 'Package change', amount: 'ask Jay to quote' },
]

export default function Costs() {
  const totalLow = LINE_ITEMS.reduce((sum, item) => sum + item.low, 0)
  const totalHigh = LINE_ITEMS.reduce((sum, item) => sum + item.high, 0)

  return (
    <main className="page costs-page">
      <header className="costs-head">
        <p className="costs-kicker">JAP-26 &middot; 14 days &middot; 2 adults</p>
        <h1>Cost Analysis</h1>
        <p className="costs-sub">
          What the trip will actually cost on the ground, beyond the package.
        </p>
      </header>

      <section className="notice" aria-label="Unknown costs notice">
        <span className="notice-mark" aria-hidden="true">?</span>
        <div>
          <p className="notice-title">The two biggest numbers are still unknown</p>
          <p>
            The <strong>GuavaTrips package price</strong> was not stated in
            Jay&rsquo;s email, and <strong>flights</strong> aren&rsquo;t booked
            yet. Everything below is the third bucket: on-ground, self-paid
            spend for two people.
          </p>
        </div>
      </section>

      <section className="split" aria-label="Package coverage summary">
        <div className="split-col">
          <p className="label label-in">The package covers</p>
          <ul>
            {PACKAGE_COVERS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="split-col split-col-pay">
          <p className="label label-ex">You pay</p>
          <ul>
            {YOU_PAY.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="table-wrap" aria-label="Self-paid cost estimates">
        <p className="label">Self-paid estimates &middot; 2 adults</p>
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
                  Rupee figures at {JPY_TO_INR} INR/&yen; &mdash; approx, Nov
                  2026 rate
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

      <section className="table-wrap" aria-label="V2 extension delta">
        <p className="label">
          V2 extension delta &middot; days 15&ndash;17 + changes
        </p>
        <table className="cost-table">
          <tbody>
            {V2_DELTA.map((item) => (
              <tr key={item.label}>
                <td>
                  <span className="item-label">{item.label}</span>
                  <span className="item-basis">{item.basis}</span>
                </td>
                <td className="num">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          className="item-basis"
          style={{ padding: '12px 8px 14px', fontStyle: 'italic' }}
        >
          The main table above models the original 14-day span; the delta adds
          roughly &yen;29,000&ndash;46,000 + watches for two.
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

      <section className="ask-jay" aria-label="Questions for the agent">
        <p className="label label-ex">Ask Jay</p>
        <p>
          What&rsquo;s the <strong>package price</strong>? And can USJ&rsquo;s
          dated ticket be confirmed for the right day &mdash; plus whether{' '}
          <strong>DisneySea tickets and transfer</strong> can be added to the
          package instead of self-booked?
        </p>
      </section>
    </main>
  )
}
