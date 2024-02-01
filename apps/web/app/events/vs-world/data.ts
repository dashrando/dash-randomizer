import { zonedTimeToUtc } from 'date-fns-tz'

const START_TIME = zonedTimeToUtc('2024-02-04T15:00:00.000', 'America/New_York');
const MATCH2_TIME = new Date(START_TIME)
const MATCH3_TIME = new Date(START_TIME)
MATCH2_TIME.setHours(MATCH2_TIME.getHours() + 1)
MATCH3_TIME.setHours(MATCH3_TIME.getHours() + 2)

export const MATCHES = [START_TIME, MATCH2_TIME, MATCH3_TIME]
