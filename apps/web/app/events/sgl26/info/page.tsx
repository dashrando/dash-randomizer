import { Wrapper } from '@/app/components/wrapper'
import styles from '../../vs-world/event.module.css'
import Link from 'next/link'

export const metadata = {
  title: 'Info - DASH SGL26',
  description: 'Infor on in-person DASH tournament Oct 22-25',
}

export default function TournamentInfoPage() {
  const baseUrl = '/events/sgl26'

  return (
    <>
      <div className={styles.mysteryMobileNavBg} />
      <Wrapper borderless>
        <div style={{ maxWidth: '660px', margin: 'var(--spacer-8x) auto var(--spacer-4x)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              <h1 style={{ color: '#fff', fontWeight: '600', fontSize: '64px', lineHeight: '64px', margin: '0' }}>
                SGL26
              </h1>
              <nav className={styles.mysteryNav}>
                <ul>
                  <li>
                    <Link href={`${baseUrl}/info`} className={styles.activeNavLink}>Info</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/register`} prefetch={false}>Register</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/schedule`} prefetch={false}>Schedule</Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/discord`} prefetch={false}>Discord</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <article
              style={{
                margin: "var(--spacer-16x) auto var(--spacer)",
                maxWidth: "800px",
                textAlign: "left",
              }}
              className={styles.mysteryArticle}
            >
              <h2>Timeline</h2>
              <ul>
                <li>Signup Dealine: October 21, 2026</li>
                <li>Tournament Dates: October 22-25, 2026</li>
              </ul>
              <h2>Links</h2>
              <ul>
                <li>Challonge: https://speedgaming.challonge.com/sgl26smdash</li>
                <li>Tournament information: https://sglive.speedgaming.org/smdash/</li>
                <li>Prizes and event information: https://sglive.speedgaming.org</li>
                <li>SGL Discord server: https://discord.gg/grCj3sfUBT</li>
                <li>DASH Discord: https://dashrando.net/discord</li>
                <li>SGLive Tickets: https://matcherino.com/t/sglive26</li>
                <li>Hotel Info: Washington Dulles Airport Hilton in Herndon, VA</li>
              </ul>
              <h2 id="settings">Settings</h2>
              <ul>
                <li>Item Split: Major/Minor</li>
                <li>Map Layout: Area randomization</li>
                <li>Boss Locations: Shuffled</li>
                <li>Bosses Known: On</li>
                <li>Double Jump, Pressure Valve and Heat Shield on</li>
                <li>Charge Beam: Vanilla</li>
                <li>Ammo: 3:2:1 distribution</li>
                <li>Environment updates: Standard</li>
                <li>Gravity Heat Reduction: Off</li>
                <li>Logic: Standard</li>
                <li>Item Fanfare: On</li>
              </ul>
              <h2 id="format">Format</h2>
              <p>The tournament will be broken up into two stages:</p>
              <ul>
                <li>Group (Oct 22 - 23)</li>
                <li>Playoffs (Oct 24)</li>
              </ul>
              <p>
                In the Group stage, you will need to play everyone in your group once.
                These will be single race matches. You are responsible for finding a
                time that works for you and your opponents to play. Please expect to get
                at least half of your matches played by the end of the first day. We
                will aim to restream as many races as possible.
              </p>
              <p>
                The Playoffs stage will be a single elimination bracket. Your placement
                in the group stage will determine your seed in the playoffs. Only the
                finals and the semi-finals will be played as best of 3.
              </p>
              <h2 id="equipment">Equipment</h2>
              <p>You are responsible for bringing:</p>
              <ul>
                <li>Console / Device and Cartridge (if necessary) for gameplay.</li>
                <li>Headphones (see below)</li>
                <li>Tracking programs (optional)</li>
                <li>Controller</li>
                <li>Cables</li>
              </ul>
              <p>
                SGLive will be providing TVs and Monitors. The monitors accept HDMI,
                RCA, and Component (via Retrotink) connections. If you are playing on a
                non-HDMI connection, please let us know so we can ensure there are
                Retrotink connections available.
              </p>
              <p>
                It is heavily recommended that you use earbuds. On the restream stage,
                you will be wearing closed-ear headphones over your earbuds that pipe in
                white noise to block out the commentary and/or crowd. Connections are
                standard 3.5mm plug into the TV.
              </p>
              <h2 id="hardware-rules">Hardware Rules</h2>
              <ul>
                <li>
                  Runners may use cartridge, flashcart, approved emulator, FPGA System
                  (Analogue or MiSTer), or SNES Classic.
                </li>
                <li>ZSNES and Snes9x (v1.43 and below) are banned.</li>
                <li>The run-ahead feature in RetroArch is also banned.</li>
                <li>Turbo controllers and functionality are both banned.</li>
                <li>
                  Emulator specific functionality is banned (e.g. save states, fast
                  forward, etc).
                </li>
                <li>Pressing Up+Down or Left+Right simultaneously is banned.</li>
                <li>Only one in-game action can be mapped to any given button.</li>
                <li>Only one button can be mapped to any given in-game action.</li>
                <li>Usage of more than two shoulder buttons is allowed.</li>
                <li>
                  Angle Up/Down may be mapped to any of the buttons, not just shoulder
                  buttons. Usage of the map rando patch to enable this in-game is
                  allowed.
                </li>
                <li>Keyboard and hitbox are allowed on any legal platform.</li>
                <li>
                  On hardware that allows simultaneous Left+Right or Up+Down inputs,
                  intentional abuse of the system used to prevent Left+Right or Up+Down
                  (SOCD resolution) is not allowed.
                </li>
              </ul>
              <h2 id="race-procedure">Race Procedure</h2>
              <p>
                Races will need to be submitted through the means provided by SG, even
                if you choose to race instantly. The reasons for this includes tracking
                who has raced, planning for restreams if schedule allows, and to take
                inventory on room availability in our Tournament Room. Races must take
                place during the hours the tournament room is open - 8:00AM to Midnight
                Thursday, Friday &amp; Saturday, and 8:00AM to when the event wraps
                Sunday. There will be a public PC set up in the tournament room to
                schedule races or to sign up for commentary and tracking if needed.
              </p>
              <h3 id="for-all-races-regardless-of-restream-status">
                For all races, regardless of restream status
              </h3>
              <p>
                At the agreed time, runners will meet up in the Tournament Room and
                seeds will be distributed at the Tournament Desk by an event
                administrator. Please make sure any special requests are communicated
                with the event administrator.
              </p>
              <h3 id="for-non-restreamed-races">For non-restreamed races</h3>
              <p>
                After seed distribution, a Race Proctor will seat you both in a manner
                so that you cannot see your opponent’s screen. Set up your equipment -
                console, emulator, etc, and then signal the Race Proctor that you are
                ready to go. Once both runners are confirmed ready with race hash codes
                matching, the proctor will count you down with a “3 - 2 - 1 - GO!” count
                and time will begin.
              </p>
              <p>
                Once the goal has been reached with the loss of control of your sprite,
                raise your hand to signal finished to the Race Proctor. The Race Proctor
                will verify completion, and then communicate to your opponent of finish.
                Race Proctors are responsible for reporting results to the Tournament
                Admin desk. At that time, tear down your equipment so the space can be
                used by the next racers as needed, and head to the hall – do not talk
                about the seed with your opponent at great lengths in the tournament
                room.
              </p>
              <h3 id="for-restreamed-races">For restreamed races</h3>
              <p>
                After seed distribution, head to the restream room where a Broadcast
                Operator will assist you in setting up your equipment. They will also
                equip you with white noise headphones, which will go over your game
                audio earbuds so that you cannot hear your opponent or commentary. Once
                you are ready and hash codes are confirmed, the Broadcast Operator will
                count you down “3 - 2 - 1 - GO!” countdown and time will begin.
              </p>
              <p>
                After goal completion, raise your hand to signal finish. The opponent
                should stop playing at this point unless they are about to finish. Then
                you can head to the audience for post-race interviews if you wish, and
                after the broadcast has concluded, then tear down your equipment.
              </p>
              <p>
                Players are responsible for contacting each opponent, scheduling a time,
                and checking in at the Tournament Desk when you are ready to begin your
                match. Players who do not make an effort to schedule with their opponent
                will be given a “Loss” for each incomplete match.
              </p>
              <h3 id="emergency-protocol">Emergency Protocol</h3>
              <p>
                In the event of an emergency (power outage, evacuation, etc), please
                notify the race proctor and event admin. In the interest of keeping the
                tournament running smoothyl, the following will be used to determine the
                next actions:
              </p>
              <ul>
                <li>
                  If one runner was past Mother Brain 2 (right before rainbow beam and
                  has 300+ energy) and the other player was not in the same room, the
                  player ahead will be declared the winner.
                </li>
                <li>
                  If both players were close, the runners can discuss for a few minutes.
                  If both agree on an outcome, that will be honored.
                </li>
                <li>
                  If neither of the above conditions are met, the race will be reset and
                  the runners will start over with a new seed.
                </li>
              </ul>
              <h3 id="no-shows">No Shows</h3>
              <ul>
                <li>
                  There will be zero tolerance for no-shows. If a player is a no-show,
                  that player will forfeit the match.
                </li>
                <li>
                  A player will be considered a no-show if they are not in the race room
                  by 10 minutes after the scheduled start time, and have made no effort
                  to contact their opponent or the organizers.
                </li>
                <li>
                  Even if said contact is made, if a race is unable to be played at that
                  time, or reasonably be rescheduled, the player that was the original
                  no-show will forfeit the match.
                </li>
              </ul>
              <h2 id="miscellaneous">Miscellaneous</h2>
              <ul>
                <li>
                  Out of bounds, ammo underflow, wrong warps, artificial items, and
                  memory corruption are all banned. If you have a question about whether
                  a specific glitch is allowed, ask an organizer BEFORE you use it in a
                  race.
                </li>
                <li>
                  Auto tracking is permitted for items and map locations of collected
                  items. Auto tracking of area portals is not allowed.
                </li>
                <li>
                  Runners caught or who are suspected of cheating will be automatically
                  forfeited from further participation in the tournament. All decisions
                  on cheating will be made by the organizers and will be final.
                </li>
                <li>
                  Players may use alternate sprites, including the use of
                  SpriteSomething to inject custom sprites into race ROMs, with two
                  caveats. The hitbox Samus sprite is banned, and the Screw Attack
                  animation must be identical with and without Space Jump.
                </li>
                <li>
                  Any disputes will be handled by organizers and all decisions will be
                  final.
                </li>
                <li>
                  Controller restrictions and/or BT Skip restrictions are in alignment
                  with the ruling by the SM speedrunning committee established on Nov.
                  20, 2024
                </li>
              </ul>
            </article>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
