import React from 'react'
import { TypeIcon, AlertIcon, InfoIcon, PinIcon } from './icons.jsx'

// Prefer a place-name search when the stop has a distinctive place; fall back to coords.
export function gmapsUrl(place, lat, lng) {
  const usable = place && !/tbd|placeholder/i.test(place)
  const query = usable ? encodeURIComponent(place + ' Japan') : `${lat},${lng}`
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
import './daymeters.css'

export function scoreColor(score) {
  if (score >= 8) return '#3f7d63'
  if (score >= 6) return '#c97a1f'
  return 'var(--shu)'
}

function RatingDial({ score }) {
  const size = 44
  const r = 18
  const c = 2 * Math.PI * r
  const frac = Math.max(0, Math.min(score / 10, 1))
  const color = scoreColor(score)
  return (
    <svg
      className="dm-dial"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Day rating ${score} out of 10`}
    >
      <circle className="dm-dial-track" cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="4" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${c * frac} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill={color}
        fontSize="13"
        fontWeight="700"
        fontFamily="var(--sans)"
      >
        {score}
      </text>
    </svg>
  )
}

function DayMeters({ rating }) {
  const r = rating
  if (!r) return null
  const color = scoreColor(r.score)
  return (
    <div className="dm-grid">
      <div className="dm-card">
        <span className="dm-label">Day rating</span>
        <div className="dm-rate-top">
          <RatingDial score={r.score} />
          <div className="dm-rate-body">
            <div className="dm-score">{r.score}<small>/10</small></div>
            <strong className="dm-word" style={{ color }}>{r.word}</strong>
          </div>
        </div>
        <p className="dm-note">{r.note}</p>
      </div>
      <div className="dm-card">
        <span className="dm-label">Est. self-paid · 2 adults</span>
        <div className="dm-cost">
          ¥{r.cost[0].toLocaleString('en-US')}–{r.cost[1].toLocaleString('en-US')}
        </div>
        <p className="dm-costnote">{r.costNote}</p>
      </div>
    </div>
  )
}

export default function Timeline({ meta, stops, flags, color, rating, dayCount, seqToMarker = {}, seqToVia = {}, focusIdx = null, onFocusStop, onFocusVia, onPrev, onNext }) {
  const listRef = React.useRef(null)

  // when a map marker is clicked, bring its first timeline row into view
  React.useEffect(() => {
    if (focusIdx == null || !listRef.current) return
    const row = listRef.current.querySelector(`[data-mkr="${focusIdx}"]`)
    row?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [focusIdx])

  return (
    <div className="tl">
      <div className="tl-head" style={{ '--c': color }}>
        <div className="tl-head-top">
          <span className="tl-daynum">Day {meta.day}</span>
          {meta.date && <span className="tl-date">{meta.date} ·</span>}
          <span className="tl-city">{meta.route || cityName(meta.city)}</span>
          <span className="tl-nav">
            <button onClick={onPrev} disabled={meta.day === 1} aria-label="Previous day">←</button>
            <button onClick={onNext} disabled={meta.day === dayCount} aria-label="Next day">→</button>
          </span>
        </div>
        <h2>{meta.title}</h2>
      </div>

      <DayMeters rating={rating} />

      {flags.map((f, i) => (
        <div key={i} className={'flag flag-' + f.level}>
          <span className="flag-icn">{f.level === 'alert' ? <AlertIcon /> : <InfoIcon />}</span>
          <p>{f.text}</p>
        </div>
      ))}

      <ol className="tl-list" style={{ '--c': color }} ref={listRef}>
        {stops.map(s => {
          const mkr = seqToMarker[s.seq]
          return (
          <React.Fragment key={s.seq}>
          {s.transit && (
            <li
              className="tl-row tl-row-transit"
              aria-label="Getting there"
              onClick={() => seqToVia[s.seq] && onFocusVia && onFocusVia(seqToVia[s.seq].idx)}
              title={seqToVia[s.seq] ? 'Show the boarding point on the map' : undefined}
            >
              <span className="tl-time" aria-hidden="true" />
              {seqToVia[s.seq]
                ? <span className="tl-num tl-num-via" aria-label={`boarding point ${seqToVia[s.seq].label}`}>{seqToVia[s.seq].label}</span>
                : <span className="tl-dot tl-dot-transit" aria-hidden="true" />}
              <div className="tl-card tl-card-transit">
                {(() => {
                  const steps = transitSteps(s.transit)
                  return steps ? (
                    <>
                      <p className="tl-transit-body">
                        <span className="tl-transit-icn" aria-hidden="true">🚇</span>
                        <span><b>Getting there</b></span>
                      </p>
                      <ul className="tl-transit-steps">
                        {steps.map((st, i) => <li key={i}>{st}</li>)}
                      </ul>
                    </>
                  ) : (
                    <p className="tl-transit-body">
                      <span className="tl-transit-icn" aria-hidden="true">🚇</span>
                      <span><b>Getting there</b> — {s.transit}</span>
                    </p>
                  )
                })()}
                {s.via && seqToVia[s.seq] && (
                  <p className="tl-transit-via">
                    📍 Board at <b>{s.via.name}</b> — blue <span className="tl-via-chipnum">{seqToVia[s.seq].label}</span> on the map
                  </p>
                )}
              </div>
            </li>
          )}
          <li
            className={'tl-row' + (mkr != null && mkr === focusIdx ? ' on' : '')}
            data-mkr={mkr}
            onClick={() => mkr != null && onFocusStop && onFocusStop(mkr)}
            title={mkr != null ? `Show marker ${mkr + 1} on the map` : undefined}
          >
            <span className="tl-time">{s.time}</span>
            {mkr != null
              ? <span className="tl-num" aria-label={`map marker ${mkr + 1}`}>{mkr + 1}</span>
              : <span className={'tl-dot tl-dot-' + s.type} aria-hidden="true" />}
            <div className="tl-card">
              <div className="tl-card-top">
                <span className="tl-icn"><TypeIcon type={s.type} /></span>
                <span className="tl-title">{s.title}</span>
                {s.costIncluded === true && <span className="pill pill-in">included</span>}
                {s.costIncluded === false && <span className="pill pill-ex">not included</span>}
                <a
                  className="tl-pin"
                  href={gmapsUrl(s.place, s.lat, s.lng)}
                  target="_blank"
                  rel="noopener"
                  aria-label="Open in Google Maps"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PinIcon />
                </a>
              </div>
              {s.blurb && <p className="tl-blurb">{s.blurb}</p>}
              {s.place && s.place !== s.title && <p className="tl-place">{s.place}</p>}
              {s.notes && <p className="tl-note">{s.notes}</p>}
            </div>
          </li>
          </React.Fragment>
          )
        })}
      </ol>
    </div>
  )
}

// Long transit prose → short readable steps: split on '; ' and, for still-long
// chunks, on sentence breaks. Short directions stay a single line.
function transitSteps(text) {
  if (!text || text.length < 90) return null
  let parts = text.split(/;\s+/)
  parts = parts.flatMap(p => p.length > 150 ? p.split(/\.\s+(?=[A-Z¥(])/) : [p])
  parts = parts.map(p => {
    p = p.trim().replace(/\.$/, '')
    return p.charAt(0).toUpperCase() + p.slice(1)
  }).filter(Boolean)
  return parts.length > 1 ? parts : null
}

function cityName(id) {
  return { tokyo: 'Tokyo', kawaguchiko: 'Kawaguchiko', toyama: 'Toyama', kanazawa: 'Kanazawa', kyoto: 'Kyoto', osaka: 'Osaka' }[id] || id
}
