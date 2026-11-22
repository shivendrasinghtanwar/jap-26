import './flights.css'
import { useEffect, useState } from 'react'
import {
  OPTIONS,
  TIERS,
  SOURCES,
  AIRLINE_CHIPS,
  DAY_CHIPS,
  SLOT_CHIPS,
  LEGEND,
} from '../data/flights.js'

const inr = (n) => `₹${n.toLocaleString('en-IN')}`
const byId = (id) => OPTIONS.find((o) => o.id === id)

/* ——— pick persistence ——— */
const STORE_KEY = 'jap26-flight-pick'
function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return { id: null, ret: 'jan4' }
    const p = JSON.parse(raw)
    return {
      id: p.id && byId(p.id) ? p.id : null,
      ret: p.ret === 'jan3' ? 'jan3' : 'jan4',
    }
  } catch {
    return { id: null, ret: 'jan4' }
  }
}

/* ——— journey timeline ——— */
function Timeline({ dir, tl }) {
  return (
    <div className="flx-tl">
      <span className="flx-tl-dir">{dir}</span>
      <div className="flx-tl-line">
        {tl.stops.map((s, i) => (
          <span key={s.code + i} className="flx-tl-item">
            {i > 0 && <span className="flx-seg" aria-hidden="true" />}
            {s.lay != null ? (
              <span className="flx-lay">
                <b>{s.code} · {s.lay}{s.note ? ` · ${s.note}` : ''}</b>
                <i>{s.times}</i>
                {s.times2 && <i className="flx-t2">{s.times2}</i>}
              </span>
            ) : (
              <span className="flx-node">
                <span className="flx-dot" aria-hidden="true" />
                <span className="flx-ntxt">
                  <b>{s.code}</b>
                  <i>{s.t} <small>{s.tz}</small></i>
                  {s.t2 && <i className="flx-t2">{s.t2}</i>}
                  <em>{s.d}</em>
                </span>
              </span>
            )}
          </span>
        ))}
      </div>
      <span className="flx-tl-total">{tl.total}</span>
    </div>
  )
}

/* ——— price for a return variant ——— */
function Price({ rv }) {
  return (
    <p className="flx-price">
      {rv.price != null ? (
        <>
          {rv.approx && <i>≈</i>}
          <span className="flx-nowrap">{inr(rv.price)}</span>
        </>
      ) : rv.priceText ? (
        <>
          <i>est.</i>
          <span className="flx-nowrap">{rv.priceText}</span>
        </>
      ) : (
        <span className="flx-quote">quote direct</span>
      )}
      <small>for 2 · RT</small>
    </p>
  )
}

/* ——— the full-width journey card ——— */
function FlightCard({ o, ret, chosen, onToggle }) {
  const rv = o.returns[ret]
  return (
    <article
      className={'flx-card' + (o.pick ? ' is-pick' : '') + (chosen ? ' is-sel' : '')}
      role="button"
      tabIndex={0}
      aria-pressed={chosen}
      aria-label={`${o.airline} — ${o.name}${chosen ? ' — chosen' : ''}`}
      onClick={() => onToggle(o.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle(o.id)
        }
      }}
    >
      {chosen && <span className="flx-chosen">Chosen ✓</span>}

      <div className="flx-body">
        <div className="flx-zone-id">
          <div className="flx-tags">
            <span className={'flx-tier flx-tier-' + o.tier}>{TIERS[o.tier]}</span>
            {o.pick && <span className="flx-pick-tag">The pick</span>}
            {o.verdict && <span className="flx-skip-tag">{o.verdict}</span>}
          </div>
          <span className="flx-airline">{o.airline}</span>
          <b className="flx-name">{o.name}</b>
          <Price rv={rv} />
          <span className="flx-source">{SOURCES[rv.source]}</span>
          {rv.priceNote && <span className="flx-pnote">{rv.priceNote}</span>}
          {rv.variant && <span className="flx-variant">{rv.variant}</span>}
        </div>

        <div className="flx-zone-journey">
          <Timeline dir="out" tl={o.out} />
          <Timeline dir="back" tl={rv.timeline} />
        </div>

        <dl className="flx-zone-stats">
          <div className="flx-stat">
            <dt>At airport · out</dt>
            <dd>{o.checkinOut}</dd>
          </div>
          <div className="flx-stat">
            <dt>At airport · back</dt>
            <dd>{rv.checkin}</dd>
          </div>
          <div className="flx-stat">
            <dt>Checked bags</dt>
            <dd>{o.bags.checked}</dd>
          </div>
          <div className="flx-stat">
            <dt>Cabin</dt>
            <dd>{o.bags.cabin}</dd>
          </div>
        </dl>
      </div>

      <footer className="flx-foot">
        {o.caveat && <span className="flx-caveat">{o.caveat}</span>}
        <span className="flx-refs">{o.flights}</span>
      </footer>
    </article>
  )
}

/* ——— the selector app ——— */
export default function Flights() {
  const [store, setStore] = useState(loadStore)
  const [airlines, setAirlines] = useState(() => new Set())
  const [days, setDays] = useState(() => new Set())
  const [slots, setSlots] = useState(() => new Set())
  const [bagsOnly, setBagsOnly] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const ret = store.ret
  const pickId = store.id
  const picked = pickId ? byId(pickId) : null

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store))
    } catch {
      /* storage unavailable — selector still works */
    }
  }, [store])

  const toggleSet = (setter) => (v) =>
    setter((prev) => {
      const n = new Set(prev)
      if (n.has(v)) n.delete(v)
      else n.add(v)
      return n
    })
  const toggleAirline = toggleSet(setAirlines)
  const toggleDay = toggleSet(setDays)
  const toggleSlot = toggleSet(setSlots)

  const anyFilter = airlines.size || days.size || slots.size || bagsOnly
  const clearAll = () => {
    setAirlines(new Set())
    setDays(new Set())
    setSlots(new Set())
    setBagsOnly(false)
  }

  const visible = OPTIONS.filter(
    (o) =>
      (airlines.size === 0 || o.airlines.some((a) => airlines.has(a))) &&
      (days.size === 0 || days.has(o.arriveDay)) &&
      (slots.size === 0 || slots.has(o.arriveSlot)) &&
      (!bagsOnly || o.bags2x23)
  )

  const togglePick = (id) =>
    setStore((s) => ({ ...s, id: s.id === id ? null : id }))
  const setRet = (r) => setStore((s) => ({ ...s, ret: r }))

  const pickedRv = picked ? picked.returns[ret] : null
  const ends = (tl) => {
    const a = tl.stops[0]
    const b = tl.stops[tl.stops.length - 1]
    return `${a.code} ${a.t} ${a.tz} → ${b.code} ${b.t} ${b.tz} ${b.d}`
  }

  return (
    <div className="flx-app">
      {/* ——— filter rail ——— */}
      <aside className={'flxf' + (filtersOpen ? ' open' : '')}>
        <button
          type="button"
          className="flxf-toggle"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((v) => !v)}
        >
          Flights <b>{visible.length}</b> of {OPTIONS.length}
          <span className="flxf-caret" aria-hidden="true">{filtersOpen ? '▴' : '▾'}</span>
        </button>

        <div className="flxf-body">
          <div className="flxf-head">
            <b>Flights</b>
            <span>HYD ⇄ Haneda · 2 adults · economy</span>
          </div>

          <div className="flxf-count">
            <b>{visible.length}</b> of {OPTIONS.length} routings
            {anyFilter ? (
              <button type="button" className="flxf-clear" onClick={clearAll}>Clear</button>
            ) : null}
          </div>

          <div className="flxf-group">
            <span className="flxf-label">Return date</span>
            <div className="flx-seg2" role="radiogroup" aria-label="Return date">
              {[['jan3', 'Sun 3 Jan'], ['jan4', 'Mon 4 Jan']].map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={ret === v}
                  className={ret === v ? 'on' : ''}
                  onClick={() => setRet(v)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flxf-group">
            <span className="flxf-label">Airline</span>
            <div className="flxf-chips">
              {AIRLINE_CHIPS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={'flx-chip' + (airlines.has(a) ? ' on' : '')}
                  onClick={() => toggleAirline(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="flxf-group">
            <span className="flxf-label">Arrival day</span>
            <div className="flxf-chips">
              {DAY_CHIPS.map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  className={'flx-chip' + (days.has(v) ? ' on' : '')}
                  onClick={() => toggleDay(v)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flxf-group">
            <span className="flxf-label">Arrival time</span>
            <div className="flxf-chips">
              {SLOT_CHIPS.map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  className={'flx-chip' + (slots.has(v) ? ' on' : '')}
                  onClick={() => toggleSlot(v)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flxf-group">
            <label className="flxf-switch">
              <input
                type="checkbox"
                checked={bagsOnly}
                onChange={() => setBagsOnly((v) => !v)}
              />
              <span className="flxf-switch-pill" aria-hidden="true" />
              2×23 kg bags included
            </label>
          </div>
        </div>
      </aside>

      {/* ——— card list + pick bar ——— */}
      <section className="flx-main" aria-label="Flight options">
        <div className="flxg-wrap">
          {visible.length === 0 ? (
            <p className="flxg-empty">
              No routings match these filters.{' '}
              <button type="button" onClick={clearAll}>Clear filters</button>
            </p>
          ) : (
            visible.map((o) => (
              <FlightCard
                key={o.id}
                o={o}
                ret={ret}
                chosen={pickId === o.id}
                onToggle={togglePick}
              />
            ))
          )}
          <p className="flx-legend">{LEGEND}</p>
        </div>

        <div className="flx-pickbar">
          {picked ? (
            <>
              <span className="flx-bar-tag">This is the one ✓</span>
              <span className="flx-bar-body">
                <b>{picked.airline} · {picked.name}</b>
                <small>
                  out {ends(picked.out)} · back {ends(pickedRv.timeline)}
                </small>
              </span>
              <span className="flx-bar-price">
                {pickedRv.price != null
                  ? (pickedRv.approx ? '≈' : '') + inr(pickedRv.price)
                  : pickedRv.priceText
                    ? 'est. ' + pickedRv.priceText
                    : 'quote direct'}
              </span>
              <button
                type="button"
                className="flx-bar-clear"
                onClick={() => togglePick(picked.id)}
              >
                Clear pick
              </button>
            </>
          ) : (
            <span className="flx-bar-empty">Tap a card to choose the flight</span>
          )}
        </div>
      </section>
    </div>
  )
}
