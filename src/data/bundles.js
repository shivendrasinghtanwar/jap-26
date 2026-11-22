// Itinerary version bundles: V1 (travel agent's 14-day plan) and
// V2 (our 17-day counter-proposal). Same shapes, swappable everywhere.

import {
  DAYS as V1_DAYS,
  RATINGS as V1_RATINGS,
  FLAGS as V1_FLAGS,
  CITY_COLORS as V1_COLORS,
} from './days.js'
import v1Locations from './locations.json'

import {
  DAYS as V2_DAYS,
  RATINGS as V2_RATINGS,
  FLAGS as V2_FLAGS,
  CITY_COLORS as V2_COLORS,
} from './v2/days.js'
import v2Locations from './v2/locations.json'

export const V1 = {
  key: 'v1',
  label: 'V1 · GuavaTrips',
  dayCount: V1_DAYS.length,
  days: V1_DAYS,
  ratings: V1_RATINGS,
  flags: V1_FLAGS,
  cityColors: V1_COLORS,
  locations: v1Locations,
}

export const V2 = {
  key: 'v2',
  label: 'V2 · Our plan',
  dayCount: V2_DAYS.length,
  days: V2_DAYS,
  ratings: V2_RATINGS,
  flags: V2_FLAGS,
  cityColors: V2_COLORS,
  locations: v2Locations,
}

export const BUNDLES = { v1: V1, v2: V2 }

// What V2 changes, keyed by V2 day number (for the compare page).
export const CHANGES = {
  1: { status: 'unchanged' },
  2: { status: 'unchanged' },
  3: { status: 'modified', text: 'V1 spent the worst Sunday of the season at DisneySea. V2: the anniversary-watch run in Ginza (Dream Square + Bic) and Shibuya Sky at sunset; DisneySea moves to Monday.' },
  4: { status: 'modified', text: 'DisneySea on a school-day Monday instead of the Christmas-event Sunday.' },
  5: { status: 'modified', text: 'Tokyo → Fuji moves here: Chureito Pagoda + the lake boat in one day.' },
  6: { status: 'modified', text: 'Sunrise at Oishi Park, then Toyama → Kanazawa swap: Kenrokuen + Higashi Chaya (Music Forest and Iyashi-no-Sato dropped).' },
  7: { status: 'modified', text: 'Adds the Omicho crab breakfast, a booked 19:00 Christmas-Eve dinner and Kyoto Station’s lights after the kimono afternoon.' },
  8: { status: 'modified', text: 'Adds the 29-minute evening hop to Osaka for Hikari Renaissance’s final night + Midosuji Illumination.' },
  9: { status: 'unchanged' },
  10: { status: 'modified', text: 'Adds the Yodobashi Umeda Seiko/Orient Star watch stop — 5 minutes from the hotel.' },
  11: { status: 'unchanged' },
  12: { status: 'unchanged' },
  13: { status: 'modified', text: 'Same morning train; the afternoon is illuminations + an optional Nakano vintage hunt (Shibuya moved to 20 Dec).' },
  14: { status: 'modified', text: 'V1 flew home today. V2: illuminations by day, then midnight at Zojoji Temple under Tokyo Tower.' },
  15: { status: 'new', text: 'Real hatsumode at Meiji Jingu + Skytree’s first night view.' },
  16: { status: 'new', text: 'Imperial Palace New-Year Greeting (balcony appearances) + Ginza fukubukuro.' },
  17: { status: 'new', text: 'Departure moves here — 3 Jan is counter-flow to the U-turn rush.' },
}
