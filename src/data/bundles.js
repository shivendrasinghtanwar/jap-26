// The final itinerary bundle: V2 — our 18-day, self-booked plan.
// (v1, the agency's 14-day proposal, was retired on 26 Nov 2026.)

import {
  DAYS as V2_DAYS,
  RATINGS as V2_RATINGS,
  FLAGS as V2_FLAGS,
  CITY_COLORS as V2_COLORS,
} from './v2/days.js'
import v2Locations from './v2/locations.json'

export const V2 = {
  key: 'v2',
  label: 'The Plan',
  dayCount: V2_DAYS.length,
  days: V2_DAYS,
  ratings: V2_RATINGS,
  flags: V2_FLAGS,
  cityColors: V2_COLORS,
  locations: v2Locations,
}
