import { Body } from '@/app/components/text'

const ExternalLink = ({ href, children, ...props }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
)

const data = new Map()
data.set('canHellRun',
  (
    <>
      <Body>
        A hell run refers to traversing a set of rooms in a heated environment (ie many rooms in Norfair) without heat protection or limited heat protection. This check will determine whether you are able to hell run through following routes:
      </Body>
      <ul>
        <li>
          <Body>
            <ExternalLink href="https://wiki.supermetroid.run/Cathedral_Entrance" target="_blank">Cathedral</ExternalLink> to <ExternalLink href="https://wiki.supermetroid.run/Bubble_Mountain" target="_blank">Bubble Mountain</ExternalLink>
          </Body>
        </li>
        <li>
          <Body>
            <ExternalLink href="https://wiki.supermetroid.run/Kronic_Boost_Room" target="_blank">Kronic Boost</ExternalLink> to <ExternalLink href="https://wiki.supermetroid.run/Bubble_Mountain" target="_blank">Bubble Mountain</ExternalLink>
          </Body>
        </li>
      </ul>
    </>
  )
)
data.set('canAccessRedBrinstar',
  (
    <>
      <Body>This check will determine whether you are able to venture into Red Brinstar. This check does not assume which direction you enter Red Brinstar from, whether from <ExternalLink href="https://wiki.supermetroid.run/Red_Tower">Red Tower</ExternalLink> or the <ExternalLink href="https://wiki.supermetroid.run/Red_Tower_Elevator_Room">Elevator Room</ExternalLink>.</Body>
    </>
  )
)

data.set('canAccessHeatedNorfair',
  (
    <>
      <Body>This check will determine whether you are able to enter the heated rooms in Norfair.</Body>
    </>
  )
)

export default data
