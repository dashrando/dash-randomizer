import Typography from '@/app/components/typography'
import Spacer from '@/app/components/spacer'
import { Headline, Heading, Body } from '@/app/components/text'

export default function Home() {
  return (
    <main style={{ padding: 'var(--spacer-8x)'}}>
      <Typography el="h1" size="xlarge">This is a X-Large</Typography>
      <Spacer y={4} />
      <Typography el="h3" size="large">This is a Large</Typography>
      <Spacer y={4} />
      <Typography el="p" size="medium">This is Medium</Typography>
      <Spacer y={4} />
      <Typography el="p" size="small">This is Small</Typography>
      <Spacer y={4} />
      <Typography el="p" size="compact">This is Compact</Typography>
      <Spacer y={12} />
      <div style={{ maxWidth: '600px', borderTop: '1px solid #333' }}>
        <Spacer y={12} />
        <Headline>DASH: Recall</Headline>
        <Spacer y={8} />
        <Body>
          The DASH Dev Team is excited to announce our newest project - DASH: Recall! This mode is a reimagining and rebalancing of vanilla map with the goal of offering up even more routing possibilities in a variety of seeds and further diversity in how seeds can be completed within a competitive racing situation. The following changes are introduced along with the existing DASH modifications:
        </Body>
        <Spacer y={12} />
        <Heading>DASH Cash Tournament on SpeedGaming</Heading>
        <Spacer y={4} />
        <Body>
          There will be a special DASH Randomizer one-day tournament on January 18, 2020 that will be featured on the SpeedGaming Twitch channel. This tournament will feature 16 players who qualify for the tournament with the top 8 finishers winning cash prizes. The tournament will begin at 12:00 p.m. ET and will continue throughout the full day until it is completed. For more information and a complete set of rules, <a href="https://dashrando.github.io/tournament">click here</a>.
        </Body>
      </div>
    </main>
  )
}
