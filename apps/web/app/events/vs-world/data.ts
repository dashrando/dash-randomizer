import { zonedTimeToUtc } from 'date-fns-tz'

export const START_TIME = zonedTimeToUtc('2024-02-04T20:00:00.000', 'America/New_York');
const MATCH2_TIME = new Date(START_TIME)
const MATCH3_TIME = new Date(START_TIME)
MATCH2_TIME.setHours(MATCH2_TIME.getHours() + 1)
MATCH3_TIME.setHours(MATCH3_TIME.getHours() + 2)

export const RACES = [
  {
    id: 1,
    runners: [
      ['kupppo', 'MassHesteria'],
      ['AceZer0', 'ProfessorSchool'],
    ],
    channel: {
      name: 'SpeedGaming',
      handle: 'speedgaming',
    },
    time: START_TIME,
    description: 'Chozo Bozo, Multitroid'
  },
  {
    id: 2,
    runners: [
      ['PapaSchmo', 'derp'],
      ['bressingham', 'mm2nescartridge'],
    ],
    channel: {
      name: 'SpeedGaming',
      handle: 'speedgaming',
    },
    time: MATCH2_TIME,
    description: 'Chozo, Area Randomization, Bosses Shifted, Multitroid'
  },
  {
    id: 3,
    runners: [
      ['Kipp', 'cassidymoen'],
      ['Zeb316', 'd_webb'],
    ],
    channel: {
      name: 'SpeedGaming',
      handle: 'speedgaming',
    },
    time: MATCH3_TIME,
    description: 'Chozo, Area Randomization, Co-op'
  },
]
