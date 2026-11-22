import React, { useMemo, useState } from 'react'
import { BUNDLES, V1, V2 } from '../data/bundles.js'
import DayStrip from '../components/DayStrip.jsx'
import Timeline from '../components/Timeline.jsx'
import Overview from '../components/Overview.jsx'
import MapView, { groupStops } from '../components/MapView.jsx'

// Deep links: '#/map?v=v2&d=13' — parsed once on mount.
function parseMapQuery() {
  const hash = window.location.hash || ''
  const qi = hash.indexOf('?')
  if (qi === -1) return {}
  const params = new URLSearchParams(hash.slice(qi + 1))
  return { v: params.get('v'), d: params.get('d') }
}

export default function MapPage() {
  const [version, setVersion] = useState(() => {
    const { v } = parseMapQuery()
    return v === 'v1' ? 'v1' : 'v2' // default v2
  })
  // 0 = route overview, 1..dayCount = a day
  const [day, setDay] = useState(() => {
    const { v, d } = parseMapQuery()
    const count = (v === 'v1' ? V1 : V2).dayCount
    const n = parseInt(d, 10)
    return Number.isInteger(n) && n >= 1 && n <= count ? n : 0
  })

  const bundle = BUNDLES[version]

  const switchVersion = (key) => {
    if (key === version) return
    setVersion(key)
    setDay(d => (d > BUNDLES[key].dayCount ? 0 : d))
  }

  const stopsByDay = useMemo(() => {
    const m = new Map()
    for (const s of bundle.locations.stops) {
      if (!m.has(s.day)) m.set(s.day, [])
      m.get(s.day).push(s)
    }
    for (const arr of m.values()) arr.sort((a, b) => a.seq - b.seq)
    return m
  }, [bundle])

  const meta = day === 0 ? null : bundle.days[day - 1]
  const color = meta ? bundle.cityColors[meta.city] : '#1b1b1f'

  // marker focus: {idx, t} — t makes re-clicks of the same row re-trigger the map
  const [focus, setFocus] = useState(null)
  const dayStops = day === 0 ? [] : stopsByDay.get(day) || []
  // same grouping as the map markers, so timeline numbers match 1:1
  const seqToMarker = useMemo(() => {
    const m = {}
    groupStops(dayStops).forEach((g, i) => g.items.forEach(s => { m[s.seq] = i }))
    return m
  }, [dayStops])
  const focusMarker = (idx) => setFocus({ idx, t: Date.now() })

  const segStyle = {
    display: 'flex',
    gap: 6,
    flex: 'none',
    padding: '12px 14px 12px 0',
    marginRight: 10,
    borderRight: '1px solid var(--line)',
  }

  return (
    <>
      <div className="strip-row" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={segStyle} role="group" aria-label="Itinerary version">
          <button
            className={'chip chip-route' + (version === 'v1' ? ' on' : '')}
            aria-pressed={version === 'v1'}
            onClick={() => switchVersion('v1')}
          >
            V1 · Jay · 14d
          </button>
          <button
            className={'chip chip-route' + (version === 'v2' ? ' on' : '')}
            aria-pressed={version === 'v2'}
            onClick={() => switchVersion('v2')}
          >
            V2 · Ours · 17d
          </button>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <DayStrip
            days={bundle.days}
            selected={day}
            onSelect={setDay}
            flags={bundle.flags}
            cityColors={bundle.cityColors}
          />
        </div>
      </div>
      <main className="main">
        <section className="pane-left" key={version + '-' + day}>
          {day === 0 ? (
            <Overview
              days={bundle.days}
              stopsByDay={stopsByDay}
              flags={bundle.flags}
              cities={bundle.locations.cities}
              ratings={bundle.ratings}
              cityColors={bundle.cityColors}
              version={version}
              onSelect={setDay}
            />
          ) : (
            <Timeline
              meta={meta}
              stops={stopsByDay.get(day) || []}
              flags={bundle.flags[day] || []}
              color={color}
              rating={bundle.ratings[day]}
              dayCount={bundle.dayCount}
              seqToMarker={seqToMarker}
              focusIdx={focus?.idx ?? null}
              onFocusStop={focusMarker}
              onPrev={() => setDay(d => Math.max(1, d - 1))}
              onNext={() => setDay(d => Math.min(bundle.dayCount, d + 1))}
            />
          )}
        </section>
        <section className="pane-map">
          <MapView
            day={day}
            stops={day === 0 ? bundle.locations.stops : stopsByDay.get(day) || []}
            cities={bundle.locations.cities}
            color={color}
            days={bundle.days}
            cityColors={bundle.cityColors}
            focus={focus}
            onMarkerClick={focusMarker}
          />
        </section>
      </main>
    </>
  )
}
