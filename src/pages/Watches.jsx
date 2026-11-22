import './watches.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CANDIDATES } from '../data/watches.js'

/* ——— helpers ——— */
// prefix public assets with the deploy base so images work under /jap-26/
const asset = p => import.meta.env.BASE_URL + p.replace(/^\//, '')
const yen = n => '¥' + n.toLocaleString('en-US')
const byId = id => CANDIDATES.find(c => c.id === id)
const lineKey = c => c.line.split(/[(,·—–]/)[0].trim()
const calShort = c => c.movement.cal.split(' (')[0].trim()
const isOpenHeart = c =>
  c.openHeart != null ? c.openHeart : /open.heart|skeleton/i.test(`${c.line} ${c.name} ${c.dial || ''}`)
const hasSapphire = c => /sapphire/i.test(c.robust?.crystal || '')
const ltdCount = c => {
  const m = String(c.limited || '').match(/[\d,]+/)
  return m ? m[0] : null
}
const dialShort = c => {
  const d = c.dial || ''
  const parts = d.split('—')
  return (parts[parts.length - 1] || d).trim()
}
const sizeLabel = c => {
  const { dia, thick } = c.size || {}
  if (dia == null) return '—'
  return `${dia}${thick != null ? ` × ${thick}` : ''} mm`
}

const BANDS = [
  { id: 'b1', label: '≤ ¥60k', test: p => p <= 60000 },
  { id: 'b2', label: '¥60–100k', test: p => p > 60000 && p <= 100000 },
  { id: 'b3', label: '¥100–160k', test: p => p > 100000 && p <= 160000 },
  { id: 'b4', label: '¥160k+', test: p => p > 160000 },
]

/* ——— picks persistence ——— */
const STORE_KEY = 'jap26-watch-picks'
const EMPTY = { his: [], hers: [] }
function loadPicks() {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return EMPTY
    const p = JSON.parse(raw)
    const clean = side => (Array.isArray(p[side]) ? p[side].filter(id => byId(id)) : []).slice(0, 3)
    return { his: clean('his'), hers: clean('hers') }
  } catch {
    return EMPTY
  }
}

/* ——— trump card ——— */
function TrumpCard({ c, inTray, trayFull, onToggle }) {
  const open = isOpenHeart(c)
  const n = ltdCount(c)
  return (
    <article
      className={'wxc' + (c.limited ? ' ltd' : '') + (inTray ? ' in' : '')}
      role="button"
      tabIndex={0}
      aria-pressed={inTray}
      aria-label={`${c.brand} ${c.name}${inTray ? ' — in tray' : ''}`}
      onClick={() => onToggle(c)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle(c)
        }
      }}
    >
      {inTray && <span className="wxc-intray">In tray &#10003;</span>}
      {!inTray && trayFull && <span className="wxc-full">{c.side} tray full</span>}
      {c.limited && <span className="wxc-rarity">Limited{n ? ` ·${n}` : ''}</span>}

      <header className="wxc-band">
        <span className="wxc-brand">{c.brand}</span>
        <span className="wxc-linek">{lineKey(c)}</span>
      </header>

      <div className="wxc-art">
        {c.img
          ? <img src={asset(c.img)} alt={`${c.brand} ${c.name}`} loading="lazy" />
          : <span className="wxc-noimg" aria-hidden="true">{c.brand[0]}</span>}
      </div>

      <div className="wxc-name">
        <b>{c.name}</b>
        <small>{dialShort(c)}</small>
      </div>

      <dl className="wxc-stats">
        <div className="wxc-stat"><dt>Movement</dt><dd>{calShort(c)}</dd></div>
        <div className="wxc-stat"><dt>Reserve</dt><dd>{c.movement.reserveH} h</dd></div>
        <div className="wxc-stat"><dt>Size</dt><dd>{sizeLabel(c)}</dd></div>
        <div className="wxc-stat"><dt>Open heart</dt><dd>{open ? '✓' : '–'}</dd></div>
        <div className="wxc-stat"><dt>Sapphire</dt><dd>{hasSapphire(c) ? '✓' : '–'}</dd></div>
        <div className="wxc-stat wxc-pricerow">
          <dt>Price</dt>
          <dd className="wxc-price">
            {yen(c.priceJpy)}
            {c.taxFreeJpy && <small> &middot; tax-free &asymp;{yen(c.taxFreeJpy)}</small>}
          </dd>
        </div>
      </dl>

      <footer className="wxc-foot">
        <span className="wxc-ref">{c.ref}</span>
        {c.url && (
          <a
            className="wxc-official"
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            Official&thinsp;&#8599;
          </a>
        )}
        <span className={'wxc-side wxc-side-' + c.side}>{c.side}</span>
      </footer>
    </article>
  )
}

/* ——— tray mini-card ——— */
function TrayMini({ c, onRemove }) {
  return (
    <div className="wxt-mini">
      <span className="wxt-thumb">
        {c.img && <img src={asset(c.img)} alt="" loading="lazy" />}
      </span>
      <span className="wxt-mini-body">
        <b>{c.brand} &middot; {lineKey(c)}</b>
        <small>{c.name} &middot; {yen(c.priceJpy)}</small>
      </span>
      <button type="button" className="wxt-x" onClick={() => onRemove(c)} aria-label={`Remove ${c.name}`}>
        &times;
      </button>
    </div>
  )
}

/* ——— presentation mode ——— */
function WatchSlide({ c }) {
  const n = ltdCount(c)
  return (
    <div className="wxp-card">
      <span className="wxp-eyebrow">{c.side === 'his' ? 'His' : 'Hers'}{c.limited ? ` · Limited${n ? ' ·' + n : ''}` : ''}</span>
      <h3 className="wxp-brand">{c.brand}</h3>
      <p className="wxp-line">{lineKey(c)}</p>
      <div className={'wxp-art' + (c.limited ? ' ltd' : '')}>
        {c.img && <img src={asset(c.img)} alt={`${c.brand} ${c.name}`} />}
      </div>
      <p className="wxp-name">{c.name}</p>
      <p className="wxp-dial">{dialShort(c)}</p>
      <p className="wxp-price">{yen(c.priceJpy)}{c.taxFreeJpy ? ` · tax-free ≈${yen(c.taxFreeJpy)}` : ''}</p>
      <p className="wxp-ref">{c.ref}</p>
    </div>
  )
}

function SummarySlide({ his, hers }) {
  const lead = his[0] && hers[0] ? his[0].priceJpy + hers[0].priceJpy : null
  return (
    <div className="wxp-card wxp-summary">
      <span className="wxp-eyebrow">The shortlist</span>
      <h3 className="wxp-brand">Two open hearts</h3>
      <div className="wxp-sum-cols">
        {[['His', his], ['Hers', hers]].map(([label, arr]) => (
          <div className="wxp-sum-col" key={label}>
            <h4>{label}</h4>
            {arr.length === 0 && <p className="wxp-sum-none">&mdash;</p>}
            {arr.map(c => (
              <div className="wxp-sum-row" key={c.id}>
                <span className="wxp-sum-thumb">{c.img && <img src={asset(c.img)} alt="" />}</span>
                <span>
                  <b>{c.brand} · {c.name}</b>
                  <small>{yen(c.priceJpy)} <i>{c.ref}</i></small>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {lead != null && (
        <p className="wxp-sum-total">
          Lead pair together <b>{yen(lead)}</b> <small>before the tax refund</small>
        </p>
      )}
    </div>
  )
}

function Presentation({ his, hers, onClose }) {
  const slides = useMemo(
    () => [...his.map(c => ({ t: 'w', c })), ...hers.map(c => ({ t: 'w', c })), { t: 'sum' }],
    [his, hers]
  )
  const [i, setI] = useState(0)
  const touch = useRef(null)
  const next = () => setI(x => Math.min(x + 1, slides.length - 1))
  const prev = () => setI(x => Math.max(x - 1, 0))

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') setI(x => Math.min(x + 1, slides.length - 1))
      else if (e.key === 'ArrowLeft') setI(x => Math.max(x - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slides.length, onClose])

  const s = slides[Math.min(i, slides.length - 1)]
  return (
    <div className="wxp" role="dialog" aria-modal="true" aria-label="Show Divyani — the finalists">
      <button type="button" className="wxp-x" onClick={onClose} aria-label="Close">&times;</button>
      <div
        className="wxp-stage"
        onTouchStart={e => { touch.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          if (touch.current == null) return
          const dx = e.changedTouches[0].clientX - touch.current
          if (dx < -40) next()
          else if (dx > 40) prev()
          touch.current = null
        }}
      >
        {s.t === 'w' ? <WatchSlide c={s.c} key={s.c.id} /> : <SummarySlide his={his} hers={hers} key="sum" />}
      </div>
      <div className="wxp-nav">
        <button type="button" onClick={prev} disabled={i === 0} aria-label="Previous">&larr;</button>
        <span className="wxp-dots" aria-hidden="true">
          {slides.map((_, k) => <i key={k} className={k === i ? 'on' : ''} />)}
        </span>
        <button type="button" onClick={next} disabled={i === slides.length - 1} aria-label="Next">&rarr;</button>
      </div>
    </div>
  )
}

/* ——— the selector app ——— */
export default function Watches() {
  const [side, setSide] = useState('all')
  const [brands, setBrands] = useState(() => new Set())
  const [lines, setLines] = useState(() => new Set())
  const [openOnly, setOpenOnly] = useState(false)
  const [bands, setBands] = useState(() => new Set())
  const [colors, setColors] = useState(() => new Set())
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [picks, setPicks] = useState(loadPicks)
  const [trayOpen, setTrayOpen] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(picks)) } catch { /* storage unavailable — selector still works */ }
  }, [picks])

  const allBrands = useMemo(() => [...new Set(CANDIDATES.map(c => c.brand))], [])
  const linesByBrand = useMemo(() => {
    const m = {}
    CANDIDATES.forEach(c => {
      ;(m[c.brand] = m[c.brand] || new Set()).add(lineKey(c))
    })
    return m
  }, [])
  const allColors = useMemo(() => [...new Set(CANDIDATES.map(c => c.colorFamily))], [])

  const toggleSet = (set, setter) => v =>
    setter(prev => {
      const n = new Set(prev)
      if (n.has(v)) n.delete(v)
      else n.add(v)
      return n
    })
  const toggleBrand = toggleSet(brands, setBrands)
  const toggleLine = toggleSet(lines, setLines)
  const toggleBand = toggleSet(bands, setBands)
  const toggleColor = toggleSet(colors, setColors)

  const anyFilter = side !== 'all' || brands.size || lines.size || openOnly || bands.size || colors.size
  const clearAll = () => {
    setSide('all'); setBrands(new Set()); setLines(new Set())
    setOpenOnly(false); setBands(new Set()); setColors(new Set())
  }

  const visible = CANDIDATES.filter(c =>
    (side === 'all' || c.side === side) &&
    (brands.size === 0 || brands.has(c.brand)) &&
    (lines.size === 0 || lines.has(lineKey(c))) &&
    (!openOnly || isOpenHeart(c)) &&
    (bands.size === 0 || BANDS.some(b => bands.has(b.id) && b.test(c.priceJpy))) &&
    (colors.size === 0 || colors.has(c.colorFamily))
  )

  const hisPicks = picks.his.map(byId).filter(Boolean)
  const hersPicks = picks.hers.map(byId).filter(Boolean)
  const totalPicks = hisPicks.length + hersPicks.length
  const leadPair = hisPicks[0] && hersPicks[0] ? hisPicks[0].priceJpy + hersPicks[0].priceJpy : null

  const togglePick = c =>
    setPicks(p => {
      const arr = p[c.side]
      if (arr.includes(c.id)) return { ...p, [c.side]: arr.filter(x => x !== c.id) }
      if (arr.length >= 3) return p
      return { ...p, [c.side]: [...arr, c.id] }
    })
  const remove = c => setPicks(p => ({ ...p, [c.side]: p[c.side].filter(x => x !== c.id) }))

  const trayBody = (
    <>
      <div className="wxt-head">
        <h3>Picks tray</h3>
        <span className="wxt-count">{totalPicks}/6</span>
      </div>
      {[['His', hisPicks], ['Hers', hersPicks]].map(([label, arr]) => (
        <section className="wxt-sec" key={label}>
          <h4>{label} <small>{arr.length}/3</small></h4>
          {arr.length === 0 && <p className="wxt-empty">Tap a card to add</p>}
          {arr.map(c => <TrayMini key={c.id} c={c} onRemove={remove} />)}
        </section>
      ))}
      {leadPair != null && (
        <p className="wxt-combined">Lead pair together <b>{yen(leadPair)}</b></p>
      )}
      <button
        type="button"
        className="wxt-show"
        disabled={totalPicks === 0}
        onClick={() => { setShow(true); setTrayOpen(false) }}
      >
        Show Divyani &rarr;
      </button>
    </>
  )

  return (
    <div className="wx-app">
      {/* ——— 1 · filter rail ——— */}
      <aside className={'wxf' + (filtersOpen ? ' open' : '')}>
        <button
          type="button"
          className="wxf-toggle"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen(o => !o)}
        >
          Filters <b>{visible.length}</b> of {CANDIDATES.length}
          <span className="wxf-caret" aria-hidden="true">{filtersOpen ? '▴' : '▾'}</span>
        </button>

        <div className="wxf-body">
          <div className="wxf-count">
            <b>{visible.length}</b> of {CANDIDATES.length} watches
            {anyFilter ? (
              <button type="button" className="wxf-clear" onClick={clearAll}>Clear</button>
            ) : null}
          </div>

          <div className="wxf-group">
            <span className="wxf-label">Side</span>
            <div className="wx-seg" role="radiogroup" aria-label="Side">
              {[['his', 'His'], ['hers', 'Hers'], ['all', 'All']].map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={side === v}
                  className={side === v ? 'on' : ''}
                  onClick={() => setSide(v)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="wxf-group">
            <span className="wxf-label">Brand</span>
            {allBrands.map(b => (
              <div key={b}>
                <label className="wxf-check">
                  <input
                    type="checkbox"
                    checked={brands.has(b)}
                    onChange={() => toggleBrand(b)}
                  />
                  <span>{b}</span>
                </label>
                {brands.has(b) && (
                  <div className="wxf-lines">
                    {[...linesByBrand[b]].map(l => (
                      <button
                        key={l}
                        type="button"
                        className={'wx-chip' + (lines.has(l) ? ' on' : '')}
                        onClick={() => toggleLine(l)}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="wxf-group">
            <label className="wxf-switch">
              <input type="checkbox" checked={openOnly} onChange={() => setOpenOnly(o => !o)} />
              <span className="wxf-switch-pill" aria-hidden="true" />
              Open heart only
            </label>
          </div>

          <div className="wxf-group">
            <span className="wxf-label">Price</span>
            <div className="wxf-chips">
              {BANDS.map(b => (
                <button
                  key={b.id}
                  type="button"
                  className={'wx-chip' + (bands.has(b.id) ? ' on' : '')}
                  onClick={() => toggleBand(b.id)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="wxf-group">
            <span className="wxf-label">Dial color</span>
            <div className="wxf-chips">
              {allColors.map(cf => (
                <button
                  key={cf}
                  type="button"
                  className={'wx-chip' + (colors.has(cf) ? ' on' : '')}
                  onClick={() => toggleColor(cf)}
                >
                  {cf}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ——— 2 · card grid ——— */}
      <section className="wxg-wrap" aria-label="Watch candidates">
        {visible.length === 0 ? (
          <p className="wxg-empty">No watches match these filters. <button type="button" onClick={clearAll}>Clear filters</button></p>
        ) : (
          <div className="wxg">
            {visible.map(c => (
              <TrumpCard
                key={c.id}
                c={c}
                inTray={picks[c.side].includes(c.id)}
                trayFull={picks[c.side].length >= 3}
                onToggle={togglePick}
              />
            ))}
          </div>
        )}
      </section>

      {/* ——— 3 · picks tray ——— */}
      <aside className={'wxt' + (trayOpen ? ' open' : '')}>
        <button
          type="button"
          className="wxt-bar"
          aria-expanded={trayOpen}
          onClick={() => setTrayOpen(o => !o)}
        >
          <span>Picks <b>{totalPicks}</b>{leadPair != null ? ` · lead pair ${yen(leadPair)}` : ''}</span>
          <span className="wxf-caret" aria-hidden="true">{trayOpen ? '▾' : '▴'}</span>
        </button>
        <div className="wxt-body">{trayBody}</div>
      </aside>

      {/* ——— 4 · presentation ——— */}
      {show && <Presentation his={hisPicks} hers={hersPicks} onClose={() => setShow(false)} />}
    </div>
  )
}
