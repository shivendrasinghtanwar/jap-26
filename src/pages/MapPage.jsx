import React, { useEffect, useMemo, useState } from 'react'
import { V2 } from '../data/bundles.js'
import DayStrip from '../components/DayStrip.jsx'
import Timeline from '../components/Timeline.jsx'
import Overview from '../components/Overview.jsx'
import MapView, { groupStops } from '../components/MapView.jsx'

// Deep links: '#/map?d=13' — parsed once on mount.
function parseMapQuery() {
  const hash = window.location.hash || ''
  const qi = hash.indexOf('?')
  if (qi === -1) return {}
  const params = new URLSearchParams(hash.slice(qi + 1))
  return { d: params.get('d') }
}

export default function MapPage() {
  const bundle = V2
  // 0 = route overview, 1..dayCount = a day
  const [day, setDay] = useState(() => {
    const { d } = parseMapQuery()
    const n = parseInt(d, 10)
    return Number.isInteger(n) && n >= 1 && n <= bundle.dayCount ? n : 0
  })

  // deep links keep working after mount ('#/map?d=13' from anywhere)
  useEffect(() => {
    const f = () => {
      const { d } = parseMapQuery()
      const n = parseInt(d, 10)
      if (Number.isInteger(n) && n >= 1 && n <= bundle.dayCount) setDay(n)
    }
    f()
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [bundle.dayCount])

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

  // marker focus: {kind, idx, t} — t makes re-clicks of the same row re-trigger the map
  const [focus, setFocus] = useState(null)
  const dayStops = day === 0 ? [] : stopsByDay.get(day) || []
  // same grouping as the map markers, so timeline numbers match 1:1
  const seqToMarker = useMemo(() => {
    const m = {}
    groupStops(dayStops).forEach((g, i) => g.items.forEach(s => { m[s.seq] = i }))
    return m
  }, [dayStops])
  // boarding stations ("via") get their own blue dashed marker series
  const dayVias = useMemo(
    () => dayStops.filter(s => s.via).map(s => ({ ...s.via, seq: s.seq })),
    [dayStops],
  )
  const seqToVia = useMemo(() => {
    const m = {}
    dayVias.forEach((v, i) => { m[v.seq] = i })
    return m
  }, [dayVias])
  const focusMarker = (idx) => setFocus({ kind: 'stop', idx, t: Date.now() })
  const focusVia = (idx) => setFocus({ kind: 'via', idx, t: Date.now() })

  return (
    <>
      <div className="strip-row" style={{ display: 'flex', alignItems: 'center' }}>
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
        <section className="pane-left" key={day}>
          {day === 0 ? (
            <Overview
              days={bundle.days}
              stopsByDay={stopsByDay}
              flags={bundle.flags}
              cities={bundle.locations.cities}
              ratings={bundle.ratings}
              cityColors={bundle.cityColors}
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
              seqToVia={seqToVia}
              focusIdx={focus?.kind === 'stop' ? focus.idx : null}
              onFocusStop={focusMarker}
              onFocusVia={focusVia}
              onPrev={() => setDay(d => Math.max(1, d - 1))}
              onNext={() => setDay(d => Math.min(bundle.dayCount, d + 1))}
            />
          )}
        </section>
        <section className="pane-map">
          <MapView
            day={day}
            vias={dayVias}
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
