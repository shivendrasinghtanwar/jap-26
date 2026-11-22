import React from 'react'
import { AlertIcon } from './icons.jsx'
import { scoreColor } from './Timeline.jsx'

function compactYen(n) {
  return Math.round(n / 1000)
}

export default function Overview({ days, stopsByDay, flags, cities, ratings, cityColors, version = 'v1', onSelect }) {
  const totalStops = [...stopsByDay.values()].reduce((n, a) => n + a.length, 0)
  const alertCount = Object.values(flags).flat().filter(f => f.level === 'alert').length

  return (
    <div className="ov">
      <div className="ov-intro">
        <h2>The Route</h2>
        <p>
          {days.length} days · {cities.length} cities · {totalStops} planned stops ·{' '}
          {version === 'v2' ? (
            <>
              18 Dec 2026 → 3 Jan 2027, New Year in Tokyo. This is our V2 counter-proposal —{' '}
            </>
          ) : (
            <>
              18 → 31 Dec 2026, home before New Year. This is Jay&rsquo;s v1 proposal —{' '}
            </>
          )}
          <strong>{alertCount} research flags</strong> need answers
          before bookings lock (open the flagged days).
        </p>
        <p className="ov-hint">
          One caveat: an overnight flight from India would shift every date by one day — confirming with Jay.
        </p>
      </div>
      <ol className="ov-list">
        {days.map(d => {
          const c = cityColors[d.city]
          const dayFlags = flags[d.day] || []
          const hasAlert = dayFlags.some(f => f.level === 'alert')
          const stops = stopsByDay.get(d.day) || []
          const first = stops[0]?.time
          const last = stops[stops.length - 1]?.time
          const r = ratings[d.day]
          return (
            <li key={d.day}>
              <button className="ov-card" style={{ '--c': c }} onClick={() => onSelect(d.day)}>
                <span className="ov-daynum">{String(d.day).padStart(2, '0')}</span>
                <span className="ov-body">
                  <span className="ov-title">
                    {d.title}
                    {hasAlert && <i className="ov-alert"><AlertIcon /></i>}
                  </span>
                  <span className="ov-meta">
                    {d.date ? d.date + ' · ' : ''}
                    {d.route ? d.route + ' · ' : ''}
                    {first}–{last} · {stops.length} stops
                  </span>
                </span>
                {r && (
                  <span className="ov-meters">
                    <span className="ov-score" style={{ background: scoreColor(r.score) }}>
                      {r.score}/10
                    </span>
                    <span className="ov-cost">
                      ¥{compactYen(r.cost[0])}–{compactYen(r.cost[1])}k
                    </span>
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
