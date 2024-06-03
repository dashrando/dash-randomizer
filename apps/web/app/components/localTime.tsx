'use client'

import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz'
import * as Tooltip from '@radix-ui/react-tooltip'
import styles from './localTime.module.css'

export const LocalTime = ({
  input,
  originZone = 'America/New_York',
  format = 'MMM d, Y h:mm a'
}: {
  input: string,
  originZone: string,
  format: string
}) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const time = zonedTimeToUtc(input, originZone)
  return (
    <span className={styles.container}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className={styles.btn}>{formatInTimeZone(time, tz, format)}</button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={styles.TooltipContent} sideOffset={5}>
              {formatInTimeZone(time, 'America/New_York', format)} EDT
              <Tooltip.Arrow className={styles.TooltipArrow} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </span>
  )
}

export default LocalTime
