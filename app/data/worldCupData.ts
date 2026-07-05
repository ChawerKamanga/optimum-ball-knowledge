export type FounderId = 'chawa' | 'shad' | 'vincent'

export interface FounderProfile {
  id: FounderId
  name: string
  role: string
  avatar: string
}

export interface Match {
  date: string
  stage: string
  home: string
  away: string
  score: string | null
  pens: string | null
  type: 'Full Time' | 'Penalties' | 'Upcoming'
  winner: string | null
  predictions: Record<FounderId, string>
  points: Record<FounderId, number>
}

export const founderProfiles: FounderProfile[] = [
  {
    id: 'chawa',
    name: 'Chawanangwa',
    role: 'Pirate King',
    avatar: 'https://res.cloudinary.com/dejkd5he6/image/upload/v1772186782/chawa_xwjrzw.jpg'
  },
  {
    id: 'shad',
    name: 'Shad',
    role: 'The Strategist',
    avatar: 'http://optimumsystemsmw.com/img/shad.jpeg'
  },
  {
    id: 'vincent',
    name: 'Vincent',
    role: 'The Comeback King',
    avatar: 'https://optimumsystemsmw.com/img/vin.jpeg'
  }
]

export const worldCupMatches: Match[] = [
  { date: '2026-06-28', stage: 'Round of 32', home: 'South Africa', away: 'Canada', score: '0-1', pens: null, type: 'Full Time', winner: 'Canada', predictions: { chawa: 'Canada', shad: 'Canada', vincent: 'Canada' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-06-29', stage: 'Round of 32', home: 'Germany', away: 'Paraguay', score: '1-1', pens: '3-4', type: 'Penalties', winner: 'Paraguay', predictions: { chawa: 'Germany', shad: 'Germany', vincent: 'Germany' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-06-29', stage: 'Round of 32', home: 'Netherlands', away: 'Morocco', score: '1-1', pens: '2-3', type: 'Penalties', winner: 'Morocco', predictions: { chawa: 'Morocco', shad: 'Netherlands', vincent: 'Netherlands' }, points: { chawa: 3, shad: 0, vincent: 0 } },
  { date: '2026-06-29', stage: 'Round of 32', home: 'Brazil', away: 'Japan', score: '2-1', pens: null, type: 'Full Time', winner: 'Brazil', predictions: { chawa: 'Brazil', shad: 'Brazil', vincent: 'Brazil' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-06-30', stage: 'Round of 32', home: 'France', away: 'Sweden', score: '3-0', pens: null, type: 'Full Time', winner: 'France', predictions: { chawa: 'France', shad: 'France', vincent: 'France' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-06-30', stage: 'Round of 32', home: 'Ivory Coast', away: 'Norway', score: '1-2', pens: null, type: 'Full Time', winner: 'Norway', predictions: { chawa: 'Norway', shad: 'Norway', vincent: 'Norway' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-06-30', stage: 'Round of 32', home: 'Mexico', away: 'Ecuador', score: '2-0', pens: null, type: 'Full Time', winner: 'Mexico', predictions: { chawa: 'Mexico', shad: 'Mexico', vincent: 'Mexico' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-01', stage: 'Round of 32', home: 'England', away: 'DR Congo', score: '2-1', pens: null, type: 'Full Time', winner: 'England', predictions: { chawa: 'England', shad: 'England', vincent: 'England' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-01', stage: 'Round of 32', home: 'United States', away: 'Bosnia and Herzegovina', score: '2-0', pens: null, type: 'Full Time', winner: 'United States', predictions: { chawa: 'United States', shad: 'United States', vincent: 'United States' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-01', stage: 'Round of 32', home: 'Belgium', away: 'Senegal', score: '3-2', pens: null, type: 'Full Time', winner: 'Belgium', predictions: { chawa: 'Senegal', shad: 'Belgium', vincent: 'Senegal' }, points: { chawa: 0, shad: 3, vincent: 0 } },
  { date: '2026-07-02', stage: 'Round of 32', home: 'Portugal', away: 'Croatia', score: '2-1', pens: null, type: 'Full Time', winner: 'Portugal', predictions: { chawa: 'Portugal', shad: 'Portugal', vincent: 'Croatia' }, points: { chawa: 3, shad: 3, vincent: 0 } },
  { date: '2026-07-02', stage: 'Round of 32', home: 'Spain', away: 'Austria', score: '3-0', pens: null, type: 'Full Time', winner: 'Spain', predictions: { chawa: 'Spain', shad: 'Spain', vincent: 'Spain' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-02', stage: 'Round of 32', home: 'Switzerland', away: 'Algeria', score: '2-0', pens: null, type: 'Full Time', winner: 'Switzerland', predictions: { chawa: 'Switzerland', shad: 'Switzerland', vincent: 'Algeria' }, points: { chawa: 3, shad: 3, vincent: 0 } },
  { date: '2026-07-03', stage: 'Round of 32', home: 'Australia', away: 'Egypt', score: '1-1', pens: '2-4', type: 'Penalties', winner: 'Egypt', predictions: { chawa: 'Australia', shad: 'Egypt', vincent: 'Australia' }, points: { chawa: 0, shad: 3, vincent: 0 } },
  { date: '2026-07-03', stage: 'Round of 32', home: 'Argentina', away: 'Cape Verde', score: '3-2', pens: null, type: 'Full Time', winner: 'Argentina', predictions: { chawa: 'Argentina', shad: 'Cape Verde', vincent: 'Argentina' }, points: { chawa: 3, shad: 0, vincent: 3 } },
  { date: '2026-07-03', stage: 'Round of 32', home: 'Colombia', away: 'Ghana', score: '1-0', pens: null, type: 'Full Time', winner: 'Colombia', predictions: { chawa: 'Ghana', shad: 'Ghana', vincent: 'Colombia' }, points: { chawa: 0, shad: 0, vincent: 3 } },
  { date: '2026-07-04', stage: 'Round of 16', home: 'Paraguay', away: 'France', score: '0-1', pens: null, type: 'Full Time', winner: 'France', predictions: { chawa: 'France', shad: 'France', vincent: 'France' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-04', stage: 'Round of 16', home: 'Canada', away: 'Morocco', score: '0-3', pens: null, type: 'Full Time', winner: 'Morocco', predictions: { chawa: 'Morocco', shad: 'Canada', vincent: 'Canada' }, points: { chawa: 3, shad: 0, vincent: 0 } },
  { date: '2026-07-05', stage: 'Round of 16', home: 'Brazil', away: 'Norway', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'Brazil', shad: 'Norway', vincent: 'Brazil' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-05', stage: 'Round of 16', home: 'Mexico', away: 'England', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'England', shad: 'England', vincent: 'England' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-06', stage: 'Round of 16', home: 'Portugal', away: 'Spain', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'Spain', shad: 'Portugal', vincent: 'Spain' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-06', stage: 'Round of 16', home: 'United States', away: 'Belgium', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'United States', shad: 'Belgium', vincent: 'Belgium' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-07', stage: 'Round of 16', home: 'Argentina', away: 'Egypt', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'Argentina', shad: 'Argentina', vincent: 'Argentina' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-07', stage: 'Round of 16', home: 'Switzerland', away: 'Colombia', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'Switzerland', shad: 'Switzerland', vincent: 'Colombia' }, points: { chawa: 0, shad: 0, vincent: 0 } }
]