import * as React from 'react'

import { Wrapper, Box, Input, Button, Title } from './login.style'

type LogoProps = {
  title: string
}

const Logo: React.FC<LogoProps> = ({ title }) => {
  return <Title>{title}</Title>
}

const Login = () => {
  return (
    <Wrapper>
      <Box>
        <Logo title={'GeoCall'} />
        <Input />
        <Button>Login</Button>
      </Box>
    </Wrapper>
  )
}

export default Login
