import { Wrapper } from '../components/wrapper'

export default function Page() {
  return (
    <Wrapper>
      {/* <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Coming Soon</p> */}
      <h2>Vanilla</h2>
      <p>Vanilla refers to the original and unmodified Super Metroid game. The vanilla game will either be NTSC or PAL and will also be headered or unheadered. DASH uses an unheadered NTSC vanilla file in order to generate a seed.</p>
      <p>The header is the first 512 bytes of data in many .sfc and .smc files. This contains miscellaneous data that is unused. If you upload a headered file, DASH will attempt to remove the header automatically.</p>
      <p>NTSC and PAL are video standards. NTSC is most commonly used today as it runs at 60Hz whereas PAL runs at 50Hz.</p>
    </Wrapper>
  )
}
