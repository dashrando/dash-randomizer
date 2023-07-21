import type { NextPage } from 'next'
import { Wrapper } from '@/app/components/wrapper'
import { PropsWithChildren } from 'react'

const LogicLayout: NextPage = (props: PropsWithChildren) => {
   return (
      <Wrapper>
         {props.children}
      </Wrapper>
   )
}

export default LogicLayout
