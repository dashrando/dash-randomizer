import { ImageResponse } from 'next/og'
import { prefetchSignature } from 'core'
import { hashToParams, parseSettings } from '@/lib/settings'
import { getSeedData, SeedData } from '@/lib/seed-data'
import path from 'path'
import fs from 'fs'

export const runtime = 'nodejs'

export const getErrorImage = (key: string) => {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 40,
        padding: '32px 64px',
        width: '100%',
        height: '100%'
      }}>
        Could not find seed: {key}
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}

const loadFont = (fontFileName: string) => {
  return fs.readFileSync(path.join(process.cwd(), 'public/fonts', fontFileName));
}

export const getSeedImage = async (data: SeedData) => {
  const seedParams = hashToParams(data.hash)
  const settings = parseSettings(seedParams)
  const signature = prefetchSignature(seedParams.seed)

  const firstPart = settings.settingsParams.slice(0, 4);
  const secondPart = settings.settingsParams.slice(4);

  const inter = loadFont('inter-latin-ext-400-normal.woff')
  const interBoldItalic = loadFont('Inter-BoldItalic.woff')
  const mono = loadFont('GeistMono-Regular.otf')
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontFamily: 'Inter',
          fontSize: 40,
          color: 'white',
          background: 'black',
          width: '100%',
          height: '100%',
          padding: '32px 64px',
          textAlign: 'left',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', justifyContent: 'flex-start',
          alignItems: 'flex-start', }}>
          <h1 style={{ margin: 0, fontStyle: 'italic', fontSize: '56px' }}>DASH</h1>
          <div style={{ fontFamily: '"Geist Mono"', fontSize: '36px' }}>{signature}</div>
        </div>
        <div style={{ display: 'flex', height: '48px' }} />
        {data.mystery ? (
          <div style={{ fontSize: '28px', textTransform: 'uppercase', color: '#6a6a6a', height: '400px' }}>Mystery Seed</div>
        ) : (
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', gap: '72px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {settings.randomizeParams.map((item: any, index: number) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '28px', textTransform: 'uppercase', color: '#6a6a6a' }}>{item.label}</div>
                    <div style={{ fontSize: '28px', color: '#ffffff', marginBottom: '32px' }}>{item.value}</div>
                  </div>
                ))}
                {settings.optionsParams.filter(({ label }) => label === 'Logic').map((item: any, index: number) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '28px', textTransform: 'uppercase', color: '#6a6a6a' }}>{item.label}</div>
                    <div style={{ fontSize: '28px', color: '#ffffff', marginBottom: '32px' }}>{String(item.value)}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {firstPart.map((item: any, index: number) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '28px', textTransform: 'uppercase', color: '#6a6a6a' }}>{item.label}</div>
                    <div style={{ fontSize: '28px', color: '#ffffff', marginBottom: '32px' }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {secondPart.map((item: any, index: number) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '28px', textTransform: 'uppercase', color: '#6a6a6a' }}>{item.label}</div>
                    <div style={{ fontSize: '28px', color: '#ffffff', marginBottom: '32px' }}>{item.value}</div>
                  </div>
                ))}
                {settings.optionsParams.filter(({ label }) => label === 'Item Fanfare').map((item: any, index: number) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '28px', textTransform: 'uppercase', color: '#6a6a6a' }}>{item.label}</div>
                    <div style={{ fontSize: '28px', color: '#ffffff', marginBottom: '32px' }}>{String(item.value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: inter,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interBoldItalic,
          weight: 700,
          style: 'italic',
        },
        {
          name: 'Geist Mono',
          data: mono,
          weight: 400,
          style: 'normal',
        }
      ],
    },
  );
}

export default async function Image({ params }: { params: { seed: string } }) {
  const data = await getSeedData(params.seed)
  if (!data) {
    return getErrorImage(params.seed)
  }
  return await getSeedImage(data)
}
