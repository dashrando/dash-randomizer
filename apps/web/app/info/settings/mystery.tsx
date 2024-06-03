import { cn } from '@/lib/utils'
import Spacer from '@/app/components/spacer'
import styles from '../info.module.css'

type MysteryValue = {
  label: string
  value: number
}

const MysteryTable = ({ title, values }: { title: string, values: MysteryValue[] }) => (
  <>
    <h4>{title}</h4>
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
            <td>{value.value * 100}%</td>
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
    values: [
      { label: 'Full', value: 0.33 },
      { label: 'Chozo', value: 0.33 },
      { label: 'Major/Minor', value: 0.34 },
    ]
  },
  {
    title: 'Boss Locations',
    values: [
      { label: 'Surprise', value: 0.25 },
      { label: 'Shuffled', value: 0.3 },
      { label: 'Shifted', value: 0.3 },
      { label: 'Vanilla', value: 0.15 },
    ]
  },
  {
    title: 'Map Layout',
    values: [
      { label: 'Area Randomization', value: 0.7 },
      { label: 'Vanilla', value: 0.3 },
    ]
  },
  {
    title: 'Minor Item Distribution',
    values: [
      { label: 'Standard - 3:2:1', value: 0.6 },
      { label: 'DASH - 2:1:1', value: 0.4 },
    ]
  },
  {
    title: 'Charge Beam',
    values: [
      { label: 'Vanilla', value: 0.5 },
      { label: 'Starter', value: 0.3 },
      { label: 'Starter+', value: 0.2 },
    ]
  },
  {
    title: 'Environment Updates',
    values: [
      { label: 'Standard', value: 0.85 },
      { label: 'DASH', value: 0.15 },
    ]
  },
  {
    title: 'Gravity Heat Reduction',
    values: [
      { label: 'Off', value: 0.7 },
      { label: 'On', value: 0.3 },
    ]
  },
  {
    title: 'Double Jump',
    values: [
      { label: 'Off', value: 0.65 },
      { label: 'On', value: 0.35 },
    ]
  },
  {
    title: 'Heat Shield',
    values: [
      { label: 'Off', value: 0.85 },
      { label: 'On', value: 0.15 },
    ]
  },
]

export default function MysterySettings() {
  return (
    <details>
      <summary>Mystery percentages</summary>
      {mysteryPercentages.map((mystery, index) =>
        <MysteryTable key={index} title={mystery.title} values={mystery.values} />
      )}
      <p>
        <em>Note: All Mystery seeds will use Standard Logic and have Item Fanfare enabled.</em>
      </p>
    </details>
  )
}
