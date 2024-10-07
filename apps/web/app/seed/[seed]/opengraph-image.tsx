import { ImageResponse } from 'next/og'
import { prefetchSignature } from 'core'
import { hashToParams, parseSettings } from '@/lib/settings'

export const runtime = 'edge'

export default async function Image({ params }: { params: { seed: string } }) {
  const { seed } = params
  const seedParams = hashToParams(seed)
  const settings = parseSettings(seedParams)
  const signature = prefetchSignature(seedParams.seed)

  const firstPart = settings.settingsParams.slice(0, 4);
  const secondPart = settings.settingsParams.slice(4);

  const inter = await fetch(
    new URL('../../../public/fonts/inter-latin-ext-400-normal.woff', import.meta.url),
  ).then((res) => res.arrayBuffer());
  const interBoldItalic = await fetch(
    new URL('../../../public/fonts/Inter-BoldItalic.woff', import.meta.url),
  ).then((res) => res.arrayBuffer());
  const mono = await fetch(
    new URL('../../../public/fonts/GeistMono-Regular.otf', import.meta.url),
  ).then((res) => res.arrayBuffer());
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
