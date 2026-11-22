import React, { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import MapPage from './pages/MapPage.jsx'
import Review from './pages/Review.jsx'
import Costs from './pages/Costs.jsx'
import Compare from './pages/Compare.jsx'
import Watches from './pages/Watches.jsx'

const TABS = [
  { hash: '#/', label: 'The Trip' },
  { hash: '#/map', label: 'Itinerary & Map' },
  { hash: '#/compare', label: 'V1 vs V2' },
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

export default function App() {
  const hash = useHash()
  // route matching ignores any query part ('#/map?v=v2&d=13' → '#/map')
  const path = hash.split('?')[0]
  const route = TABS.some(t => t.hash === path) ? path : '#/'

  return (
    <div className={'shell' + (route === '#/map' || route === '#/watches' ? ' shell-map' : '')}>
      <header className="hdr">
        <div className="hdr-row">
          <a className="hdr-title" href="#/">
            <span className="hinomaru" aria-hidden="true" />
            <div>
              <h1>Japan · Winter &rsquo;26&ndash;27</h1>
            </div>
          </a>
          <nav className="topnav" aria-label="Pages">
            {TABS.map(t => (
              <a key={t.hash} href={t.hash} className={'tab' + (route === t.hash ? ' on' : '')}>
                {t.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {route === '#/' && <Home />}
      {route === '#/map' && <MapPage />}
      {route === '#/compare' && <Compare />}
      {route === '#/watches' && <Watches />}
      {route === '#/review' && <Review />}
      {route === '#/costs' && <Costs />}
    </div>
  )
}
