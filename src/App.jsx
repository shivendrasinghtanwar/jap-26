import React, { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import MapPage from './pages/MapPage.jsx'
import Review from './pages/Review.jsx'
import Costs from './pages/Costs.jsx'
import Compare from './pages/Compare.jsx'
import Watches from './pages/Watches.jsx'
import Flights from './pages/Flights.jsx'

const TABS = [
  { hash: '#/', label: 'The Trip' },
  { hash: '#/map', label: 'Itinerary & Map' },
  { hash: '#/compare', label: 'V1 vs V2' },
  { hash: '#/flights', label: 'Flights' },
  { hash: '#/watches', label: 'The Pair' },
  { hash: '#/review', label: 'Review' },
  { hash: '#/costs', label: 'Costs' },
]

function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/')
  useEffect(() => {
    const f = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return hash
}

// below this width the tab row would wrap — the sun becomes the menu
const MENU_BP = '(max-width: 1039px)'

export default function App() {
  const hash = useHash()
  // route matching ignores any query part ('#/map?v=v2&d=13' → '#/map')
  const path = hash.split('?')[0]
  const route = TABS.some(t => t.hash === path) ? path : '#/'
  const [menuOpen, setMenuOpen] = useState(false)

  // navigating closes the menu
  useEffect(() => { setMenuOpen(false) }, [hash])

  // Esc closes the menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const onSun = () => {
    if (window.matchMedia(MENU_BP).matches) setMenuOpen(o => !o)
    else window.location.hash = '#/'
  }

  return (
    <div className={'shell' + (route === '#/map' || route === '#/watches' || route === '#/flights' ? ' shell-map' : '')}>
      <header className="hdr">
        <div className="hdr-row">
          <span className="hdr-title">
            <button
              type="button"
              className="hinomaru-btn"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={onSun}
            >
              <span className="hinomaru" aria-hidden="true" />
            </button>
            <a className="hdr-home" href="#/">
              <h1>Japan · Winter &rsquo;26&ndash;27</h1>
            </a>
          </span>
          <nav className="topnav" aria-label="Pages">
            {TABS.map(t => (
              <a key={t.hash} href={t.hash} className={'tab' + (route === t.hash ? ' on' : '')}>
                {t.label}
              </a>
            ))}
          </nav>
        </div>
        {menuOpen && (
          <>
            <button
              type="button"
              className="sunmenu-scrim"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <nav className="sunmenu" aria-label="Pages">
              {TABS.map(t => (
                <a
                  key={t.hash}
                  href={t.hash}
                  className={'sunmenu-row' + (route === t.hash ? ' on' : '')}
                  onClick={() => setMenuOpen(false)}
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </>
        )}
      </header>

      {route === '#/' && <Home />}
      {route === '#/map' && <MapPage />}
      {route === '#/compare' && <Compare />}
      {route === '#/flights' && <Flights />}
      {route === '#/watches' && <Watches />}
      {route === '#/review' && <Review />}
      {route === '#/costs' && <Costs />}
    </div>
  )
}
