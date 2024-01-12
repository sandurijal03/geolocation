import * as React from 'react'

import { Wrapper, Box, Input, Button, Title } from './login.style'

type LogoProps = {
  title: string
}

const Logo: React.FC<LogoProps> = ({ title }) => {
  return <Title>{title}</Title>
}

const Login = () => {
  const [username, setUsername] = React.useState<string>('')
  return (
    <Wrapper>
      <Box>
        <Logo title={'GeoCall'} />
        <Input
          type='text'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder='Username'
        />
        <Button>Login</Button>
      </Box>
    </Wrapper>
  )
}

export default Login
