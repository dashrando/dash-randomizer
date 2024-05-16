'use client'

import { ButtonLink } from '@/app/components/button'
import { saveAs } from 'file-saver'
import { ArrowDown } from 'react-feather'

function downloadFile(data: Uint8Array, filename: string) {
  saveAs(new Blob([data!]), filename);
}

export default function DownloadButton({ data, raceKey }: { data: any, raceKey: string }) {
  const filename = `DASH_race_${raceKey}_spoiler.txt`
  const handleClick = (evt: any) => {
    evt.preventDefault()
    const spoiler = JSON.stringify(data, null, 2)
    downloadFile(new TextEncoder().encode(spoiler), filename)
  }
  return (
    <ButtonLink
      variant="outline"
      href={`/race/${raceKey}/spoiler/download`}
      download={filename}
      onClick={handleClick}
    >
      <span>Download Spoiler</span>
      <>&nbsp;</>
      <ArrowDown size={14} strokeWidth={2} />
    </ButtonLink>
  )
}
