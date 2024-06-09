import { Wrapper } from '@/app/components/wrapper'
import styles from '../../vs-world/event.module.css'
import { LocalTime } from '@/app/components/localTime'
import Link from 'next/link'
import MysterySettings from '@/app/info/settings/mystery'

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
      <div className={styles.mysteryMobileNavBg} />
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
                    <Link href={`${baseUrl}/info`} className={styles.activeNavLink}>Info</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/register`} prefetch={false}>Register</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/schedule`}>Schedule</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/discord`} prefetch={false}>Discord</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <article style={{ margin: 'var(--spacer-16x) auto var(--spacer)', maxWidth: '800px', textAlign: 'left' }} className={styles.mysteryArticle}>
              <h2>Registration</h2>
              <p>
                Sign ups for the Super Metroid Randomizer Mystery tournament is open and will close on <LocalTime input="2024-06-14T23:59:00.000" originZone="America/New_York" format={`EEEE, MMMM d 'at' h:mm a`} />. Please be sure to be officially registered before that time so we can get the matchups finalized that weekend for the official 1st week of the tournament, which will begin Wednesday, June 19.
              </p>
              <p>
                Prior to the tournament, we will be confirming your participation and getting players to join the <a href="https://discord.gg/2usVyy4" target="_blank">Discord server</a>. Discord will be the official medium used to communicate with players and schedule races. Players must join the discord server to participate.
              </p>
              <h2>Format + Seeding Procedure</h2>
              <p>
                The tournament will be swiss format with each match being 1 race. There will be one required match per week (Wednesday - Tuesday).  Seeding for match pairings for the 1st round will be based on previous tournament finishes including SGLive tournaments, the 2022 SMR Multi-Category tournament and SMR League. This will likely not be an exact ordering, of strongest to weakest players, but should be good enough to get fair matchups throughout the swiss rounds. This will be done after the sign up period ends and before the official 1st week of competition begins.
              </p>
              <p>
                There will be 6 weeks of swiss competition, which means at least 6 guaranteed matches for each runner. Note, we are starting each week midweek in the hopes that fewer players will miss entire weeks while on vacation.
              </p>
              <h2>Mode</h2>
              <p>
              The mode of this tournament is ”Mystery”. What this means is runners will not know what the mode is until the race starts and they start playing the seed. The goal will always be to kill the “G4 bosses”, defeat Mother Brain and escape to the ship. Available settings will be weighted as follows:
              </p>
              <MysterySettings external={true} />
              <p>
                <em>These percentages are subject to change before the tournament starts. We will be testing them in the weeks leading up to the tournament. All percentages will be finalized at the same time that first round match ups are announced.</em>
              </p>
              <h2>Timeline</h2>
              <ul>
                <li>June 3: Registration begins</li>
                <li><LocalTime input="2024-06-14T23:59:00.000" originZone="America/New_York" format="MMMM d" />: Registration ends at <LocalTime input="2024-06-14T23:59:00.000" originZone="America/New_York" format="h:mm a" /></li>
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
              <h2>Playoff Structure</h2>
              <ul>
                <li>Everyone with at least a 3-3 record will make the playoffs, with seeding determined by final swiss rankings</li>
                <li>Playoff matches will be best of 3 single elimination</li>
                <li>Races 1 and 2 are required to be scheduled back to back, with race 3 encouraged to follow</li>
                <li>The bracket (depending on number of participants) will most likely look like a 64 player bracket with several top records receiving byes. Match ups will be reverse seeding (i.e. 1 vs 64, 2 vs 63, etc).</li>
              </ul>
              <h2>Ties</h2>
              <ol>
                <li>The time on Racetime will be the official time for the race, unless otherwise specified.</li>
                <li>If the race is within 3 seconds, a retime via frame count will be done by admins <em>only if it is requested by the player finishing second on Racetime</em>.</li>
                <li>If a frame count is requested and confirmed to be warranted by admins, the admins will time both racers’ VoDs and determine the winner to the best of their ability.</li>
                <li>If a clear winner can be determined via a frame count, the race result will be changed (if necessary) to reflect the results of the frame count.</li>
                <li>If a clear winner cannot be determined via a frame count, the race result will fall back on the original Racetime results. If the original Racetime result was a tie, the final result will reflect that.</li>
              </ol>
              <h2>Async Races</h2>
              <p>It is the intention of this tournament that all races be run live/synchronously if reasonable. Nonetheless, we accept that due to the nature of Swiss tournament time constraints, there may be exceptions warranting use of asynchronous (async) races. All async races must be completed by the normal round deadline for the appropriate round.</p>
              <p>If an async race is needed, the player requiring the async (or an agreed upon player should the need be mutual due to schedule incompatibility) should contact an admin as soon as the need is known. Organizers reserve the right to deny async requests. The player requesting the async will generally be expected to run the seed first.</p>
              <p>This first player, referred to as “Player 1”, will follow the following procedure:</p>
              <p>Player 1 will arrange a time with an organizer for the async race to be run. Player 1 will receive a link to the race seed ~5 minutes ahead of the scheduled time, and will download/run the race seed starting no more than 10 minutes after the seed is sent. Player 1 will locally record the gameplay (and will not stream gameplay to Twitch, etc.) and report a time and an end game screenshot showing completion time and item collection rate to an organizer upon completing the seed. Player 1 will additionally upload the local recording as an unlisted Youtube video and provide a link to the organizer.</p>
              <p>The player to complete the seed second, referred to as “Player 2”, will follow the following procedure:</p>
              <p>Player 2 will arrange a time with an organizer for the async race to be run. Player 2 will receive a link to the race seed ~5 minutes ahead of the scheduled time, and will download/run the race seed starting no more than 10 minutes after the seed is sent. Player 2 may stream gameplay as normal, but is expected to archive vods as normal and/or be able to provide local recording evidence of gameplay as is typical. The only difference between this and a normal race is that gameplay stream delay is not required; other tournament rules must be followed. Upon completion of the seed, Player 2 should contact an organizer with completion time and item collection rate, and the organizer will provide the link to Player 1’s gameplay video for Player 2 to review.</p>
              <p>Organizers will inform both players of the race result once both players have completed the seed.</p>
              <p>
                <em>Please note: Asyncs are not intended to be for situations where players can&apos;t find a convenient time to schedule. The admins will only allow asyncs in situations where it is deemed that opponents absolutely cannot find a mutual time.</em>
              </p>
              <h2>Additional Race Procedures and Rules</h2>
              <ol>
                <li>Auto tracking is permitted only for item tracking. You MAY NOT use auto map-tracking.</li>
                <li>Runners will use <a href="https://racetime.gg" target="_blank">RaceTime.gg</a> to time and record their race. All runners must have a RaceTime account. The time listed on RaceTime is the official time for the match. All runners are required to stream and to follow all RaceTime rules.</li>
                <li>All races must be streamed on Twitch. Additionally, all runners must have the vod of the stream available for potential review by the organizers for at least 1 week after the race. Failure to comply with this rule could lead to a win being overturned. If you have not enabled VOD saving on Twitch <a href="https://help.twitch.tv/s/article/video-on-demand" target="_blank">please go here</a> for instructions</li>
                <li>Players may not be in a restream channel or any chat (twitch, discord etc.) during a race.</li>
                <li>Watching other racer’s streams or any restream while racing is not allowed.</li>
                <li>Runners caught or who are suspected of cheating will be automatically forfeited from further participation in the tournament. All decisions on cheating will be made by the organizers and will be final.</li>
                <li>Any form of out of bounds is banned, as is Underflow, wrong warps, and memory corruption.</li>
                <li>The tournament will use the latest stable version of the DASH Randomizer for all races.</li>
                <li>In the event that a new stable version is released, all subsequent races will move to the new version.</li>
                <li>Runners must make their audio available when restreamed and may only use default audio. Use of alternate audio is prohibited in all cases. When on restream, runners must turn off their mics and all alerts.</li>
                <li>Runners may use alternate color palettes and/or alternate sprites. All alternate sprites must have the same animation for screw attack with and without space jump. Failure to have the correct animation will result in a warning for the first infraction and a forfeit for any subsequent infraction.</li>
                <li>Exceptions to the above rule: The Samus hitbox sprite may not be used at any time.</li>
                <li>Any disputes will be handled by organizers and all decisions will be final.</li>
                <li>All swiss races that end in a tie will result in both players receiving 0.5 points for the round. Playoff races will be re-run.</li>
                <li>While not required, it is highly recommended that runners locally record all their races. If your stream goes down during a race (internet issues) you may be asked to provide proof of your finish time. Note that “filming” your screen with your phone (or other camera) is an acceptable form of proof. If you have internet or technical issues (for a moderate/significant period of time) and cannot provide a local recording then you will be forfeited from that match. There will be no rematches.</li>
              </ol>
              <h2>Stream Delay</h2>
              <p>Stream delay is required for all races. A delay of 10 minutes must be used for each race. If a racer does not delay their stream they will forfeit the race. If a racer wishes to stop stream delay after the race they must NOT discard the delay. Discarding delay will cause the end of the race to be lost and the runner will forfeit the race unless the results can be verified with a local recording.</p>
              <h2>Hardware Rules</h2>
              <ul>
                <li>Runners may use cartridge, flashcart, approved emulator, SNES classic or a docked Analogue Pocket.</li>
                <li>ZSNES and Snes9x (v1.43 and below) are banned.</li>
                <li>The run-ahead feature in RetroArch is also banned.</li>
                <li>Turbo controllers and functionality are both banned.</li>
                <li>Emulator specific functionality is banned (e.g. save states, fast forward, etc).</li>
                <li>Pressing Up+Down or Left+Right simultaneously is banned.</li>
                <li>Only one action can be mapped to any given button.</li>
                <li>Only one button can be mapped to any given action.</li>
              </ul>
            </article>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
