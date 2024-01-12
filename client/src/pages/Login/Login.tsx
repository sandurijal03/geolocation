import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { Wrapper, Box, Input, Button, Title } from './login.style'

type LogoProps = {
  title: string
}

const Logo: React.FC<LogoProps> = ({ title }) => {
  return <Title>{title}</Title>
}

const Login = () => {
  const [username, setUsername] = React.useState<string>('')

  const navigate = useNavigate()

  const isUsernameValid = (username: string) => {
    return (
      username.length > 0 && username.length < 10 && !username.includes(' ')
    )
  }

  const handleLogin = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault()
    navigate('/map')
  }

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
        <Button onClick={handleLogin} disabled={!isUsernameValid(username)}>
          Login
        </Button>
      </Box>
    </Wrapper>
  )
}

export default Login
