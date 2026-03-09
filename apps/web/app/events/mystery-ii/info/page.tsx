import { Wrapper } from '@/app/components/wrapper'
import styles from '../../vs-world/event.module.css'
import { LocalTime } from '@/app/components/localTime'
import Link from 'next/link'
import Background from '../bg'
import { MysterySettings2026 } from '@/app/info/settings/mystery'

export const metadata = {
  title: 'About - DASH Mystery',
  description: 'Information and rules about the DASH Mystery tournament',
}

export default function TournamentInfoPage() {
  const baseUrl = '/events/mystery-ii'

  return (
    <>
      <div className={styles.mysteryBackground}>
        <div className={styles.aspectRatio}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <Background /> */}
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
                  <svg width="408" height="81" viewBox="0 0 408 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <title>DASH Mystery Vol II</title>
                    <path d="M394.833 79.2881V0.848145H407.553V79.2881H394.833Z" fill="white"/>
                    <path d="M375.323 79.2881V0.848145H388.043V79.2881H375.323Z" fill="white"/>
                    <path d="M334.335 79.2881V0.848145H346.949V68.9001H357.655V79.2881H334.335Z" fill="white"/>
                    <path d="M327.863 15.794V64.342C327.863 74.518 322.033 80.136 312.387 80.136C302.635 80.136 296.805 74.518 296.805 64.342V15.794C296.805 5.618 302.635 0 312.387 0C322.033 0 327.863 5.618 327.863 15.794ZM309.419 65.402C309.419 68.582 310.267 70.49 312.387 70.49C314.401 70.49 315.249 68.582 315.249 65.402V14.734C315.249 11.554 314.401 9.646 312.387 9.646C310.267 9.646 309.419 11.554 309.419 14.734V65.402Z" fill="white"/>
                    <path d="M283.605 79.2881H269.401L260.073 0.848145H273.111L276.079 42.2941L276.715 52.7881H277.033L277.669 42.2941L280.637 0.848145H293.039L283.605 79.2881Z" fill="white"/>
                    <path d="M235.241 52.5761V79.2881H222.733V52.5761L212.875 0.848145H225.488L229.305 30.7401H229.622L233.227 0.848145H245.099L235.241 52.5761Z" fill="white"/>
                    <path d="M197.361 70.5961V50.0321C197.361 46.6401 196.513 44.7321 194.393 44.7321H191.637V79.2881H178.917V0.848145H195.452C204.463 0.848145 209.975 6.14814 209.975 15.6881V29.3621C209.975 33.8141 208.809 37.4181 203.827 39.8561C208.809 42.4001 209.975 46.0041 209.975 50.5621V70.5961C209.975 73.4581 210.399 76.4261 211.565 79.2881H198.844C197.572 76.7441 197.361 73.3521 197.361 70.5961ZM197.361 29.8921V15.6881C197.361 12.1901 196.513 10.2821 194.393 10.2821H191.637V35.1921H194.393C196.513 35.1921 197.361 33.2841 197.361 29.8921Z" fill="white"/>
                    <path d="M148.744 79.2881V0.848145H173.336V11.2361H161.358V34.4501H172.064V44.8381H161.358V68.9001H173.336V79.2881H148.744Z" fill="white"/>
                    <path d="M143.245 11.2361H134.871V79.2881H122.257V11.2361H113.883V0.848145H143.245V11.2361Z" fill="white"/>
                    <path d="M110.191 15.9V30.634H98.4252V14.734C98.4252 11.554 97.5772 9.646 95.5632 9.646C93.5492 9.646 92.8072 11.554 92.8072 14.734V24.38C92.8072 28.726 94.1852 30.21 97.3652 33.284L103.407 38.796C108.601 43.778 110.403 46.958 110.403 54.908V64.236C110.403 74.518 104.573 80.136 95.2452 80.136C85.8112 80.136 80.5112 74.518 80.5112 64.236V49.184H92.3832V65.402C92.3832 68.582 93.2312 70.49 95.2452 70.49C97.2592 70.49 98.0012 68.582 98.0012 65.402V55.226C98.0012 50.88 97.0472 49.926 93.7612 46.958L87.5072 41.34C82.9492 37.1 80.5112 33.39 80.5112 26.076V15.9C80.5112 5.618 86.2352 0 95.6692 0C105.103 0 110.191 5.618 110.191 15.9Z" fill="white"/>
                    <path d="M67.8142 52.5761V79.2881H55.3062V52.5761L45.4482 0.848145H58.0622L61.8782 30.7401H62.1962L65.8002 0.848145H77.6722L67.8142 52.5761Z" fill="white"/>
                    <path d="M24.274 79.2881H15.582L11.766 39.4321L10.812 29.6801H10.6L10.706 39.4321V79.2881H0V0.848145H15.476L19.398 40.9161L20.246 49.7141H20.564L21.306 40.9161L25.228 0.848145H40.598V79.2881H29.256V39.4321L29.362 29.6801H29.044L28.302 39.4321L24.274 79.2881Z" fill="white"/>
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
                Sign ups for the Super Metroid Randomizer Mystery tournament is open and will close on <LocalTime input="2026-03-26T23:59:00.000" originZone="America/New_York" format={`EEEE, MMMM d 'at' h:mm a`} />. Please be sure to be officially registered before that time so we can get the matchups finalized that weekend for the official 1st week of the tournament, which will begin Wednesday, April 2nd.
              </p>
              <p>
                Prior to the tournament, we will be confirming your participation and getting players to join the <a href="/discord" target="_blank">Discord server</a>. Discord will be the official medium used to communicate with players and schedule races. Players must join the discord server to participate.
              </p>
              <h2>Format</h2>
              <p>
                The tournament will be swiss format with each match being 1 race. There will be one required match per week (Wednesday - Tuesday).
              </p>
              <p>
                There will be 6 weeks of swiss competition, which means at least 6 guaranteed matches for each runner. Note, we are starting each week midweek in the hopes that fewer players will miss entire weeks while on vacation.
              </p>
              <h2>Qualifying Races + Seeding Procedure</h2>
              <p>
                There will be 4 qualifying races available at different times (as to accomodate as many time zones as possible). 
                <ul>
                  <li>Saturday, March 21st 8PM Eastern: Qualifying Race 1</li>
                  <li>Sunday, March 22nd 12PM (Noon) Eastern: Qualifying Race 2</li>
                  <li>Saturday, March 28th 8PM Eastern: Qualifying Race 3</li>
                  <li>Sunday, March 29th 12PM (Noon)  Eastern: Qualifying Race 4</li>
                </ul>
              </p>
              <p>
                Seeding for match pairings for the 1st round of Swiss will be based on the average of a runner's top 2 qualifying race times.
              </p>
              <h2>Mode</h2>
              <p>
              The mode of this tournament is "Mystery II". What this means is runners will not know what the mode is until the race starts and they start playing the seed. The goal will always be to kill the “G4 bosses”, defeat Mother Brain and escape to the ship. Available settings will be weighted as follows:
              </p>
              <MysterySettings2026 defaultOpen={true} external={true} />
              <p>
                <em>These percentages are subject to change before the tournament starts. We will be testing them in the weeks leading up to the tournament. All percentages will be finalized at the same time that first round match ups are announced.</em>
              </p>
              <h2>Timeline</h2>
              <ul>
                <li>March 5: Registration begins</li>
                <li><LocalTime input="2026-03-26T23:59:00.000" originZone="America/New_York" format="MMMM d" />: Registration ends at <LocalTime input="2026-03-26T23:59:00.000" originZone="America/New_York" format="h:mm a" /></li>
                <li>April 2: Start of swiss week 1</li>
                <li>May 14: Last day of swiss weeks</li>
                <li>May 15: Bracket scheduling can begin</li>
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
                <li>Use of the FUNtoon2SNES room time tracker, or similar tools, is prohibited, due to their ability to tell apart surprise and shifted boss rando settings.</li>
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
              <p>Stream delay is not required.</p>
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
