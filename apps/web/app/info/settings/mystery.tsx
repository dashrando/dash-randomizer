import { cn } from '@/lib/utils'
import Spacer from '@/app/components/spacer'
import Link from 'next/link'
import styles from '../info.module.css'
import { ArrowUpRight } from 'react-feather'

type MysteryValue = {
  label: string
  value: number
}

const MysteryTable = ({ title, href, values, external = false }: { title: string, href: string, values: MysteryValue[], external: boolean }) => (
  <>
    <h4>
      {external ? (
        <Link href={href} target="_blank">
          {title} <ArrowUpRight size={12} />
        </Link>
      ) : (
        <>{title}</>
      )}
    </h4>
    <table className={cn(styles.table, styles.mysteryTable)}>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody>
        {values.map((value: MysteryValue, index: number) => (
          <tr key={index}>
            <td>{value.label}</td>
            <td>{`${(value.value * 100).toFixed(1).replace(/\.0$/, '')}%`}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Spacer y={8} />
  </>
)

const mysteryPercentages = [
  {
    title: 'Item Split',
    href: '/info/settings#item-split',
    values: [
      { label: 'Full', value: 0.333 },
      { label: 'Chozo', value: 0.333 },
      { label: 'Major/Minor', value: 0.333 },
    ]
  },
  {
    title: 'Boss Locations',
    href: '/info/settings#boss-locations',
    values: [
      { label: 'Surprise', value: 0.1 },
      { label: 'Shuffled', value: 0.3 },
      { label: 'Shifted', value: 0.3 },
      { label: 'Vanilla', value: 0.3 },
    ]
  },
  {
    title: 'Map Layout',
    href: '/info/settings#map-layout',
    values: [
      { label: 'Area Randomization', value: 0.666 },
      { label: 'Vanilla', value: 0.333 },
    ]
  },
  {
    title: 'Minor Item Distribution',
    href: '/info/settings#minors',
    values: [
      { label: 'Standard - 3:2:1', value: 0.5 },
      { label: 'DASH - 2:1:1', value: 0.5 },
    ]
  },
  {
    title: 'Charge Beam',
    href: '/info/settings#charge-beam',
    values: [
      { label: 'Vanilla', value: 0.333 },
      { label: 'Starter', value: 0.333 },
      { label: 'Starter+', value: 0.333 },
    ]
  },
  {
    title: 'Gravity Heat Reduction',
    href: '/info/settings#gravity-heat-reduction',
    values: [
      { label: 'Off', value: 0.75 },
      { label: 'On', value: 0.25 },
    ]
  },
  {
    title: 'Double Jump',
    href: '/info/settings#double-jump',
    values: [
      { label: 'Off', value: 0.5 },
      { label: 'On', value: 0.5 },
    ]
  },
  {
    title: 'Heat Shield',
    href: '/info/settings#heat-shield',
    values: [
      { label: 'Off', value: 0.75 },
      { label: 'On', value: 0.25 },
    ]
  },
]

const mysteryPercentages2026 = [
  {
    title: 'Item Split',
    href: '/info/settings#item-split',
    values: [
      { label: 'Full', value: 0.2 },
      { label: 'Chozo', value: 0.4 },
      { label: 'Major/Minor', value: 0.4 },
    ]
  },
  {
    title: 'Boss Locations',
    href: '/info/settings#boss-locations',
    values: [
      { label: 'Surprise', value: 0.25 },
      { label: 'Shuffled', value: 0.25 },
      { label: 'Shifted', value: 0.25 },
      { label: 'Scrambled', value: 0.25 },
    ]
  },
  {
    title: 'Map Layout',
    href: '/info/settings#map-layout',
    values: [
      { label: 'Area Randomization', value: 1.0 },
      { label: 'Vanilla', value: 0.0 },
    ]
  },
  {
    title: 'Minor Item Distribution',
    href: '/info/settings#minors',
    values: [
      { label: 'Standard - 3:2:1', value: 0.7 },
      { label: 'DASH - 2:1:1', value: 0.3 },
    ]
  },
  {
    title: 'Charge Beam',
    href: '/info/settings#charge-beam',
    values: [
      { label: 'Vanilla', value: 0.6 },
      { label: 'Starter', value: 0.2 },
      { label: 'Starter+', value: 0.2 },
    ]
  },
  {
    title: 'Gravity Heat Reduction',
    href: '/info/settings#gravity-heat-reduction',
    values: [
      { label: 'Off', value: 0.5 },
      { label: 'On', value: 0.5 },
    ]
  },
  {
    title: 'Bosses Known',
    href: '/info/settings#bosses-known',
    values: [
      { label: 'Off', value: 0.5 },
      { label: 'On', value: 0.5 },
    ]
  },
  {
    title: 'Double Jump',
    href: '/info/settings#double-jump',
    values: [
      { label: 'Off', value: 0.5 },
      { label: 'On', value: 0.5 },
    ]
  },
  {
    title: 'Heat Shield',
    href: '/info/settings#heat-shield',
    values: [
      { label: 'Off', value: 0.5 },
      { label: 'On', value: 0.5 },
    ]
  },
  {
    title: 'Pressure Valve',
    href: '/info/settings#pressure-valve',
    values: [
      { label: 'Off', value: 0.5 },
      { label: 'On', value: 0.5 },
    ]
  },
]

export function MysterySettings({ defaultOpen = false, external = false }: { defaultOpen?: boolean, external?: boolean }) {
  return (
    <details open={defaultOpen}>
      <summary>Mystery percentages</summary>
      {mysteryPercentages.map((mystery, index) =>
        <MysteryTable
          key={index}
          external={external}
          href={mystery.href}
          title={mystery.title}
          values={mystery.values}
        />
      )}
      <p>
        <em>Note: All Mystery seeds will use Standard Logic, Standard Environment Updates and have Item Fanfare enabled. Pressure Valve is not available in Mystery.</em>
      </p>
    </details>
  )
}

export function MysterySettings2026({ defaultOpen = false, external = false }: { defaultOpen?: boolean, external?: boolean }) {
  return (
    <details open={defaultOpen}>
      <summary>Mystery Vol II percentages</summary>
      {mysteryPercentages2026.map((mystery, index) =>
        <MysteryTable
          key={index}
          external={external}
          href={mystery.href}
          title={mystery.title}
          values={mystery.values}
        />
      )}
      <p>
        <em>Note: All Mystery seeds will use Standard Logic, Standard Environment Updates and have Item Fanfare enabled. Pressure Valve is not available in Mystery.</em>
      </p>
    </details>
  )
}