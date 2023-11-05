import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import styles from './qr.module.css'

type SeedParams = {
  seed: string
}

export default function QRPage({ params }: { params: SeedParams }) {
  const headers = getHeaders()
  const pathname = `/seed/${params.seed}`
  const displayUrl = `${headers.get('x-forwarded-host')}${pathname}`
  const proto = headers.get('x-forwarded-proto')
  const qrURL = `${proto}://${displayUrl}/qr`
  return (
    <div className={styles.wrapper} style={{ padding: '20px' }}>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrURL} alt="QR Code for seed" />
      </div>
      <Link href={pathname}>{displayUrl}</Link>
    </div>
  )
}