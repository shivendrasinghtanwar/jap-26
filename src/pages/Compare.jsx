import React, { useMemo } from 'react'
import { V1, V2, CHANGES } from '../data/bundles.js'
import { scoreColor } from '../components/Timeline.jsx'
import './compare.css'

function indexStops(stops) {
  const m = new Map()
  for (const s of stops) {
    if (!m.has(s.day)) m.set(s.day, [])
    m.get(s.day).push(s)
  }
  for (const arr of m.values()) arr.sort((a, b) => a.seq - b.seq)
  return m
}

const STATUS_LABEL = { unchanged: 'unchanged', modified: 'modified', new: 'new' }

function DayCard({ version, meta, stops, rating }) {
  const first = stops[0]?.time
  const last = stops[stops.length - 1]?.time
  return (
    <a className={'cmp-card cmp-card-' + version} href={`#/map?v=${version}&d=${meta.day}`}>
      <span className="cmp-card-top">
        <b className="cmp-ver">{version.toUpperCase()}</b>
        <span className="cmp-daynum">Day {meta.day}</span>
        {rating && (
          <span className="cmp-score" style={{ background: scoreColor(rating.score) }}>
            {rating.score}/10
          </span>
        )}
      </span>
      <span className="cmp-title">{meta.title}</span>
      <span className="cmp-meta">
        {first}&ndash;{last} &middot; {stops.length} stops
      </span>
    </a>
  )
}

export default function Compare() {
  const v1Stops = useMemo(() => indexStops(V1.locations.stops), [])
  const v2Stops = useMemo(() => indexStops(V2.locations.stops), [])

  // One row per calendar date, 18 Dec → 3 Jan, with V2's days as the spine.
  // V1 day N shares the date of V2 day N for days 1–14; 1–3 Jan have no V1 day.
  const rows = V2.days.map(d => {
    const change = CHANGES[d.day] || { status: 'unchanged' }
    return {
      v2: d,
      v1: d.day <= V1.dayCount ? V1.days[d.day - 1] : null,
      status: change.status,
      text: change.text,
    }
  })

  const counts = rows.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1
    return acc
  }, {})

  return (
    <main className="page cmp-page">
      <header className="cmp-head">
        <p className="cmp-kicker">JAP-26 &middot; 18 Dec 2026 &rarr; 3 Jan 2027</p>
        <h1>What V2 changes</h1>
        <p className="cmp-sub">
          Every calendar date side by side &mdash; {counts.unchanged || 0} days unchanged,{' '}
          {counts.modified || 0} modified, {counts.new || 0} added. The full reasoning lives
          in <span className="cmp-doc">docs/JAP-26/itinerary-v2-proposal.md</span>.
        </p>
        <p className="cmp-legend" aria-hidden="true">
          <span className="cmp-chip cmp-chip-unchanged">unchanged</span>
          <span className="cmp-chip cmp-chip-modified">modified</span>
          <span className="cmp-chip cmp-chip-new">new</span>
        </p>
      </header>

      <div className="cmp-cols" aria-hidden="true">
        <span />
        <span className="cmp-colhead">{V1.label} &middot; 14 days</span>
        <span className="cmp-colhead">{V2.label} &middot; 17 days</span>
      </div>

      <ol className="cmp-rows">
        {rows.map(r => (
          <li key={r.v2.day} className={'cmp-row cmp-row-' + r.status}>
            <div className="cmp-date">
              <b>{r.v2.date}</b>
              <span className={'cmp-chip cmp-chip-' + r.status}>{STATUS_LABEL[r.status]}</span>
            </div>
            {r.v1 ? (
              <DayCard
                version="v1"
                meta={r.v1}
                stops={v1Stops.get(r.v1.day) || []}
                rating={null}
              />
            ) : (
              <div className="cmp-card cmp-card-empty" aria-label="No V1 day on this date">
                &mdash; no day &mdash; V1 is home
              </div>
            )}
            <DayCard
              version="v2"
              meta={r.v2}
              stops={v2Stops.get(r.v2.day) || []}
              rating={V2.ratings[r.v2.day]}
            />
            {r.text && <p className="cmp-change">{r.text}</p>}
          </li>
        ))}
      </ol>
    </main>
  )
}
