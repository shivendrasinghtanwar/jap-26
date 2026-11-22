import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { gmapsUrl } from './Timeline.jsx'

// Two basemaps: painterly terrain for the route overview, rich street style for day views.
// Stadia's keyless access only works on localhost — on the deployed site fall back to
// keyless Esri basemaps (English-first labels) until a Stadia API key is wired in.
const IS_LOCAL = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(window.location.hostname)
const TILES_TERRAIN = IS_LOCAL
  ? 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png'
  : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
const TILES_STREET = IS_LOCAL
  ? 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
  : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
const ATTR = IS_LOCAL
  ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; Stamen Design &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; OSM contributors'
  : 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, OSM contributors'

// Dedupe consecutive identical coords into marker groups — shared with the timeline
// so row numbers and map numbers always agree.
export function groupStops(stops) {
  const groups = []
  for (const s of stops) {
    const key = s.lat.toFixed(4) + ',' + s.lng.toFixed(4)
    const prev = groups[groups.length - 1]
    if (prev && prev.key === key) prev.items.push(s)
    else groups.push({ key, lat: s.lat, lng: s.lng, items: [s] })
  }
  return groups
}

export default function MapView({ day, stops, cities, color, days, cityColors, focus, onMarkerClick }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)
  const tilesRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    const map = L.map(elRef.current, { zoomControl: true, scrollWheelZoom: true })
    tilesRef.current = L.tileLayer(day === 0 ? TILES_TERRAIN : TILES_STREET, { attribution: ATTR, maxZoom: 19 }).addTo(map)
    map.setView([36.2, 137.5], 6)
    mapRef.current = map
    layerRef.current = L.layerGroup().addTo(map)
    return () => map.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // swap basemap between overview (terrain) and day view (streets)
  useEffect(() => {
    const t = tilesRef.current
    if (!t) return
    const want = day === 0 ? TILES_TERRAIN : TILES_STREET
    if (t._url !== want) t.setUrl(want)
  }, [day])

  useEffect(() => {
    const map = mapRef.current
    const layer = layerRef.current
    if (!map || !layer) return
    layer.clearLayers()

    const dayCity = (d) => days[d - 1]?.city || 'tokyo'

    if (day === 0) {
      // Route overview: city markers + journey line in travel order
      // (cities arrive in travel order; the trip loops back to Tokyo)
      const order = [...cities.map(c => c.id), 'tokyo']
      const byId = Object.fromEntries(cities.map(c => [c.id, c]))
      const pts = order.map(id => [byId[id].lat, byId[id].lng])
      L.polyline(pts, { color: '#1b1b1f', weight: 2, dashArray: '6 7', opacity: 0.55 }).addTo(layer)

      for (const c of cities) {
        const col = cityColors[c.id]
        const cityDays = days.filter(d => d.city === c.id).map(d => d.day)
        L.marker([c.lat, c.lng], {
          icon: L.divIcon({
            className: 'city-mkr-wrap',
            html: `<div class="city-mkr" style="--c:${col}"><b>${c.name.split(' ')[0]}</b><i>day ${compactRange(cityDays)}</i></div>`,
            iconSize: null,
          }),
        }).addTo(layer)
      }
      // light dots for every attraction
      for (const s of stops) {
        if (s.type === 'attraction' || s.type === 'experience') {
          L.circleMarker([s.lat, s.lng], { radius: 3.5, color: cityColors[dayCity(s.day)], weight: 1.5, fillOpacity: 0.55 })
            .bindTooltip(`D${s.day} · ${s.title}`)
            .addTo(layer)
        }
      }
      map.flyToBounds(L.latLngBounds(pts).pad(0.22), { duration: 0.6 })
      return
    }

    // Single day: numbered markers from the shared grouping
    const groups = groupStops(stops)

    const pts = groups.map(g => [g.lat, g.lng])
    if (pts.length > 1) {
      L.polyline(pts, { color, weight: 3, opacity: 0.75 }).addTo(layer)
    }
    markersRef.current = []
    groups.forEach((g, i) => {
      const html = `<div class="num-mkr" style="--c:${color}">${i + 1}</div>`
      const first = g.items[0]
      const gmaps = gmapsUrl(first.place, g.lat, g.lng)
      const popup = g.items
        .map(s => `<div class="pp-row"><b>${s.time}</b> ${esc(s.title)}</div>`)
        .join('')
        + `<a class="pp-gmaps" href="${esc(gmaps)}" target="_blank" rel="noopener">Open in Google Maps ↗</a>`
      const m = L.marker([g.lat, g.lng], {
        icon: L.divIcon({ className: 'num-mkr-wrap', html, iconSize: [26, 26], iconAnchor: [13, 13] }),
      })
        .bindPopup(`<div class="pp">${popup}</div>`)
        .addTo(layer)
      m.on('click', () => onMarkerClick && onMarkerClick(i))
      markersRef.current[i] = m
    })

    if (pts.length === 1) map.flyTo(pts[0], 14, { duration: 0.6 })
    else map.flyToBounds(L.latLngBounds(pts).pad(0.18), { duration: 0.6, maxZoom: 15 })
  }, [day, stops, cities, color, days, cityColors])

  // Focus a marker when a timeline row is clicked: fly in, pop it open, pulse it
  useEffect(() => {
    if (!focus) return
    const map = mapRef.current
    const m = markersRef.current[focus.idx]
    if (!map || !m) return
    map.flyTo(m.getLatLng(), Math.max(map.getZoom(), 16), { duration: 0.5 })
    m.openPopup()
    const el = m.getElement()
    if (el) {
      el.classList.add('mkr-focus')
      const t = setTimeout(() => el.classList.remove('mkr-focus'), 2600)
      return () => clearTimeout(t)
    }
  }, [focus])

  return <div className="map" ref={elRef} />
}

function compactRange(days) {
  if (days.length === 1) return String(days[0])
  // split into consecutive runs: e.g. [1,2,3,13,14] -> "1–3, 13–14"
  const runs = []
  let start = days[0], prev = days[0]
  for (const d of days.slice(1)) {
    if (d === prev + 1) { prev = d; continue }
    runs.push(start === prev ? `${start}` : `${start}–${prev}`)
    start = prev = d
  }
  runs.push(start === prev ? `${start}` : `${start}–${prev}`)
  return runs.join(', ')
}
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
