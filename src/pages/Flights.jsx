import './flights.css'
import {
  BRIEF,
  VERDICTS,
  OPTIONS,
  TIERS,
  SOURCES,
  BAGS_NOTE,
  NRT_NOTE,
  JAN_COMPARE,
  POSITIONING,
  POSITIONING_RISK,
  CHECKLIST,
  FOOTER,
} from '../data/flights.js'

const inr = (n) => `₹${n.toLocaleString('en-IN')}`

function RouteLine({ dir, route }) {
  return (
    <div className="fl-route">
      <span className="fl-dir">{dir}</span>
      <div className="fl-stops">
        {route.stops.map((s, i) => (
          <span key={s.c + i} className="fl-stop-wrap">
            {i > 0 && <span className="fl-sep" aria-hidden="true">→</span>}
            <span className={'fl-stop' + (i > 0 && i < route.stops.length - 1 ? ' fl-stop-mid' : '')}>
              <b>{s.c}</b>
              <i>{s.m}</i>
            </span>
          </span>
        ))}
      </div>
      <span className="fl-dur">{route.dur}</span>
    </div>
  )
}

function OptionCard({ o }) {
  return (
    <article className={'fl-card' + (o.pick ? ' fl-card-pick' : '')}>
      <div className="fl-card-top">
        <span className={'fl-tier fl-tier-' + o.tier}>{TIERS[o.tier]}</span>
        {o.pick && <span className="fl-pick-tag">Toolkit pick</span>}
        {o.verdict && <span className="fl-skip-tag">{o.verdict}</span>}
        <span className="fl-carriers">{o.carriers}</span>
      </div>

      <h3 className="fl-title">{o.title}</h3>

      <div className="fl-price-row">
        <p className="fl-price">
          {o.price != null ? (
            <>
              {o.approx && <span className="fl-approx">≈</span>}
              {inr(o.price)}
            </>
          ) : (
            <span className="fl-price-na">price n/a</span>
          )}
          <span className="fl-price-unit">for 2 · round trip</span>
        </p>
        <span className="fl-source">{SOURCES[o.source]}</span>
        {o.priceNote && <span className="fl-price-note">{o.priceNote}</span>}
      </div>

      <p className={'fl-fit fl-fit-' + o.fit.kind}>
        <span className="fl-fit-dot" aria-hidden="true" />
        {o.fit.label}
      </p>

      <div className="fl-routes">
        <RouteLine dir="out" route={o.out} />
        <RouteLine dir="back" route={o.back} />
      </div>

      <p className="fl-bags">
        <span className="fl-bags-k">Bags</span>
        {o.bags}
      </p>

      <ul className="fl-caveats">
        {o.caveats.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Flights() {
  return (
    <main className="flights-page">
      <header className="fl-head">
        <p className="fl-kicker">{BRIEF.kicker}</p>
        <h1>{BRIEF.title}</h1>
        <p className="fl-sub">{BRIEF.sub}</p>
      </header>

      <section className="fl-verdicts" aria-label="Three verdicts">
        {VERDICTS.map((v) => (
          <div key={v.title} className="fl-verdict">
            <p className="fl-verdict-stat">{v.stat}</p>
            <h2>{v.title}</h2>
            <p className="fl-verdict-body">{v.body}</p>
          </div>
        ))}
      </section>

      <section aria-label="Flight options">
        <p className="fl-label">The options · totals for 2, economy</p>
        <div className="fl-grid">
          {OPTIONS.map((o) => (
            <OptionCard key={o.id} o={o} />
          ))}
        </div>
        <p className="fl-bags-note">{BAGS_NOTE}</p>
        <p className="fl-nrt">{NRT_NOTE}</p>
      </section>

      <section className="fl-lower">
        <div className="fl-block" aria-label="3 Jan vs 4 Jan returns">
          <p className="fl-label">Sun 3 Jan vs Mon 4 Jan · return leg</p>
          <table className="fl-table">
            <thead>
              <tr>
                <th scope="col">Carrier</th>
                <th scope="col" className="num">3 Jan</th>
                <th scope="col" className="num">4 Jan</th>
                <th scope="col" className="num">4 Jan saves</th>
              </tr>
            </thead>
            <tbody>
              {JAN_COMPARE.rows.map((r) => (
                <tr key={r.carrier}>
                  <td>
                    <span className="fl-td-main">{r.carrier}</span>
                    <span className="fl-td-sub">{r.detail}</span>
                  </td>
                  <td className="num">{r.jan3}</td>
                  <td className="num">{r.jan4}</td>
                  <td className="num saves">{r.saves}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fl-block-foot">{JAN_COMPARE.note}</p>
        </div>

        <div className="fl-block" aria-label="Why not via Delhi or Bengaluru">
          <p className="fl-label">Why not via Delhi or Bengaluru</p>
          <ul className="fl-pos">
            {POSITIONING.map((p) => (
              <li key={p.route}>
                <span className="fl-pos-head">
                  <b>{p.route}</b>
                  <em>{p.math}</em>
                </span>
                <span className="fl-pos-note">{p.note}</span>
              </li>
            ))}
          </ul>
          <p className="fl-risk">{POSITIONING_RISK}</p>
        </div>
      </section>

      <section className="fl-checklist" aria-label="Booking checklist">
        <p className="fl-label fl-label-shu">Booking checklist</p>
        <ol>
          {CHECKLIST.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ol>
      </section>

      <p className="fl-foot">{FOOTER}</p>
    </main>
  )
}
