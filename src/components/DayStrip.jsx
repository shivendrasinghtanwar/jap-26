import React from 'react'

export default function DayStrip({ days, selected, onSelect, flags, cityColors }) {
  return (
    <nav className="daystrip" aria-label="Days">
      <button
        className={'chip chip-route' + (selected === 0 ? ' on' : '')}
        onClick={() => onSelect(0)}
      >
        Route
      </button>
      {days.map(d => {
        const c = cityColors[d.city]
        const hasAlert = (flags[d.day] || []).some(f => f.level === 'alert')
        return (
          <button
            key={d.day}
            className={'chip' + (selected === d.day ? ' on' : '')}
            style={{ '--c': c }}
            onClick={() => onSelect(d.day)}
            title={`${d.date} — ${d.title}`}
          >
            {d.day}
            {hasAlert && <i className="chip-dot" aria-label="has warning" />}
          </button>
        )
      })}
    </nav>
  )
}
