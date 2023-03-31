import Typograhy from './typography'

export const Body = (props: any) => {
  return (
    <Typograhy el="p" size="medium" {...props} />
  )
}

export const Headline = (props: any) => {
  return (
    <Typograhy el="h1" size="xlarge" weight="bold" {...props} />
  )
}

export const Heading = ({ el = 'h2', size = 'large', ...props }: any) => {
  return (
    <Typograhy el={el} size={size} weight="bold" {...props} />
  )
}

export default Body
