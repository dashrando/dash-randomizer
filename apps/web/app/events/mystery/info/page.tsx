import { Wrapper } from '@/app/components/wrapper'
import styles from '../../vs-world/event.module.css'
import { ButtonLink } from '@/app/components/button'
import Link from 'next/link'

export const metadata = {
  title: 'About - DASH Mystery',
  description: 'Information and rules about the DASH Mystery tournament',
}

export default function TournamentInfoPage() {
  const baseUrl = '/events/mystery'

  return (
    <>
      <div className={styles.mysteryBackground}>
        <div className={styles.aspectRatio}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mystery-bg.png" alt="DASH Mystery" loading="eager" />
        </div>
      </div>
      <Wrapper borderless>
        <div style={{ maxWidth: '660px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              <h1 style={{ color: '#fff', fontWeight: '400', fontSize: '64px', lineHeight: '64px', margin: '0', visibility: 'hidden' }}>
                Mystery
              </h1>
              <div className={styles.mysteryLogo}>
                <Link href={`${baseUrl}`}>
                  <svg width="247" height="81" viewBox="0 0 247 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.204 80H16.512L12.696 40.144L11.742 30.392H11.53L11.636 40.144V80H0.930007V1.56H16.406L20.328 41.628L21.176 50.426H21.494L22.236 41.628L26.158 1.56H41.528V80H30.186V40.144L30.292 30.392H29.974L29.232 40.144L25.204 80ZM68.7443 53.288V80H56.2363V53.288L46.3783 1.56H58.9923L62.8083 31.452H63.1263L66.7303 1.56H78.6023L68.7443 53.288ZM111.121 16.612V31.346H99.3552V15.446C99.3552 12.266 98.5072 10.358 96.4932 10.358C94.4792 10.358 93.7372 12.266 93.7372 15.446V25.092C93.7372 29.438 95.1152 30.922 98.2952 33.996L104.337 39.508C109.531 44.49 111.333 47.67 111.333 55.62V64.948C111.333 75.23 105.503 80.848 96.1752 80.848C86.7412 80.848 81.4412 75.23 81.4412 64.948V49.896H93.3132V66.114C93.3132 69.294 94.1612 71.202 96.1752 71.202C98.1892 71.202 98.9312 69.294 98.9312 66.114V55.938C98.9312 51.592 97.9772 50.638 94.6912 47.67L88.4372 42.052C83.8792 37.812 81.4412 34.102 81.4412 26.788V16.612C81.4412 6.32999 87.1652 0.711997 96.5992 0.711997C106.033 0.711997 111.121 6.32999 111.121 16.612ZM144.175 11.948H135.801V80H123.187V11.948H114.813V1.56H144.175V11.948ZM149.674 80V1.56H174.266V11.948H162.288V35.162H172.994V45.55H162.288V69.612H174.266V80H149.674ZM198.29 71.308V50.744C198.29 47.352 197.442 45.444 195.322 45.444H192.566V80H179.846V1.56H196.382C205.392 1.56 210.904 6.85999 210.904 16.4V30.074C210.904 34.526 209.738 38.13 204.756 40.568C209.738 43.112 210.904 46.716 210.904 51.274V71.308C210.904 74.17 211.328 77.138 212.494 80H199.774C198.502 77.456 198.29 74.064 198.29 71.308ZM198.29 30.604V16.4C198.29 12.902 197.442 10.994 195.322 10.994H192.566V35.904H195.322C197.442 35.904 198.29 33.996 198.29 30.604ZM236.17 53.288V80H223.662V53.288L213.804 1.56H226.418L230.234 31.452H230.552L234.156 1.56H246.028L236.17 53.288Z" fill="white"/>
                  </svg>
                </Link>
              </div>
              <nav className={styles.mysteryNav}>
                <ul>
                  <li>
                    <Link href={`${baseUrl}/info`} className={styles.activeNavLink}>About</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/register`}>Register</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/schedule`}>Schedule</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/discord`}>Discord</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <article style={{ margin: 'var(--spacer-16x) auto var(--spacer)', maxWidth: '800px', textAlign: 'left' }}>
              <h2>Registration</h2>
              <p>
                Sign ups for the Super Metroid Multi-Category Randomizer tournament will open shortly and will close on Friday June 14  at 11:59 pm EDT. Please be sure to be officially registered before that time so we can get the matchups finalized that weekend for the official 1st week of the tournament, which will begin Wednesday, June 19.
              </p>
              <p>
                Prior to the tournament, we will be confirming your participation and getting players to join the <a href="https://discord.gg/2usVyy4" target="_blank">Discord server</a>. Discord will be the official medium used to communicate with players and schedule races. Players must join the discord server to participate.
              </p>
              <h2>Format + Seeding Procedure</h2>
              <p>
                The tournament will be swiss format with each match being 1 race. There will be one required match per week (Wednesday - Tuesday).  Seeding for match pairings for the 1st round will be based on previous tournament finishes including sglive tournaments, the 2022 SMR Multi-Category tournament and SMR League. This will likely not be an exact ordering, of strongest to weakest players, but should be good enough to get fair matchups throughout the swiss rounds. This will be done after the sign up period ends and before the official 1st week of competition begins.
              </p>
              <p>
                There will be 6 weeks of swiss competition, which means at least 6 guaranteed matches for each runner. Note, we are starting each week midweek in the hopes that fewer players will miss entire weeks while on vacation.
              </p>
              <h2>Mode</h2>
              <p>
              The mode of this tournament is ”Mystery”. What this means is runners will not know what the mode is until the race starts and they start playing the seed. The goal will always be to kill the “G4 bosses”, defeat Mother Brain and escape to the ship. Available settings will be weighted as follows:
              </p>
              <ul>
                <li>Map: Full Area vs Vanilla map: 60%/40% (note: light area will not be used)</li>
                <li>Items: Full Countdown vs Major/Minor vs Chozo: 33.33% each (note: there will be no full without countdown)</li>
                <li>Bosses: Vanilla vs Shuffled vs Shifted  33.33 % each</li>
                <li>Ammo ratio: 3/2/1 vs 2/2/1: 50% chance each</li>
                <li>DASH map changes: 50% chance that the “Classic DASH” map changes will be in play (i.e. waterway/botwoon hallway blocks destroyable with spazer, WS reserve available with bombs)</li>
                <li>Charge beam Normal vs “Starter Charge” vs “Progressive Charge” 33.33% each</li>
                <li>DASH specific items (double jump/heat shield) each will separately have a 50% chance of appearing. There will be no pressure valve</li>
                <li>Gravity Suit 25% heat protection: 50% chance this is on</li>
                <li>Item Fanfare: Always on</li>
                <li>Logic: Always Standard</li>
              </ul>
              <p>
                <em>Please note: These percentages are not finalized. We will be testing them in the weeks leading up to the tournament. All percentages will be finalized at the same time that first round match ups are announced.</em>
              </p>
              <h2>Timeline</h2>
              <ul>
                <li>May 27: Registration begins</li>
                <li>June 14: Registration ends at 11:59pm EDT</li>
                <li>June 19: Start of swiss week 1</li>
                <li>August 7: Last day of swiss weeks</li>
                <li>August 9: Bracket scheduling can begin</li>
              </ul>
              <h2>Scheduling</h2>
              <p>
                Please do your best to communicate with your scheduled opponent and get your match played before the deadline of each week. Because we are using a swiss format we can not allow races to be played after the deadline of each week (Wednesday-Tuesday). If both players are considered no-shows (worst case), both players will be forfeited. Also please try your best to schedule your matches at least 24 hours ahead of time. Do not expect a restream if a match is not scheduled at least 24 hours in advance.
              </p>
              <p>
                The first two rounds of brackets will get 3 weeks total to play (subject to actual number of bracket players). Each subsequent round will have one week to complete. Bracket scheduling can be more lenient, so long as any player needing extra time message the admins immediately upon knowing they need that time.
              </p>
              <h2>
                No Shows
              </h2>
              <ul>
                <li>There will be zero tolerance for no-shows. If a player is a no-show, that player will forfeit the match.</li>
                <li>A player will be considered a no-show if they are not in the race room by 15 minutes after the scheduled start time, and has made no effort to contact their opponent or the admins.</li>
                <li>Even if said contact is made, if a race is unable to be played at that time, or reasonably be rescheduled within the weeks deadline, the player that was the original no-show will forfeit the match.</li>
              </ul>
            </article>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
