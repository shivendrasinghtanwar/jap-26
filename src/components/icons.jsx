import React from 'react'

const P = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const TypeIcon = ({ type }) => {
  switch (type) {
    case 'airport':
      return <svg {...P}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
    case 'hotel':
      return <svg {...P}><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M2 17h20"/><path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/></svg>
    case 'transit':
      return <svg {...P}><rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16"/><circle cx="8.5" cy="14" r=".6"/><circle cx="15.5" cy="14" r=".6"/><path d="m8 21 1-2m7 2-1-2"/></svg>
    case 'food':
      return <svg {...P}><path d="M4 3v7a2 2 0 0 0 2 2v9"/><path d="M8 3v7"/><path d="M4 7h4"/><path d="M19 3c-2 2-3 4.5-3 7 0 1.5.5 2 1.5 2H19v9"/></svg>
    case 'experience':
      return <svg {...P}><path d="m12 3 2.5 5.5L20 9.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z"/></svg>
    default: // attraction — torii gate
      return <svg {...P}><path d="M3 5c3 1.2 15 1.2 18 0"/><path d="M4.5 5.3 5 9m14.5-3.7L19 9M4 9h16M7 9l-.5 12M17 9l.5 12M12 5.8V9"/></svg>
  }
}

export const PinIcon = () => (
  <svg {...P}><path d="M12 21s-7-5.1-7-11a7 7 0 0 1 14 0c0 5.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>
)

export const AlertIcon = () => (
  <svg {...P} width={16} height={16}><path d="M12 3 2.5 20h19L12 3z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".5"/></svg>
)
export const InfoIcon = () => (
  <svg {...P} width={16} height={16}><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".5"/></svg>
)
