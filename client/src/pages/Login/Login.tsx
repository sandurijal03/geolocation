import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setMyLocation } from '../../store/MapPage/mapSlice'

import { Wrapper, Box, Input, Button, Title } from './login.style'

type LogoProps = {
  title: string
}

const Logo: React.FC<LogoProps> = ({ title }) => {
  return <Title>{title}</Title>
}

const Login = () => {
  const [username, setUsername] = React.useState<string>('')
  const [locationErrorOccurred, setLocationErrorOccurred] =
    React.useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isUsernameValid = (username: string) => {
    return (
      username.length > 0 && username.length < 10 && !username.includes(' ')
    )
  }

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    navigate('/map')
  }

  const onSuccess = (position: GeolocationPosition) => {
    console.log(position)
    dispatch(
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }),
    )
  }

  const onError = (error: any) => {
    console.error('Error occured when trying to fetch location', error)
    setLocationErrorOccurred(true)
  }

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      locationOptions,
    )
  }, [])

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
        <Button
          onClick={handleLogin}
          disabled={!isUsernameValid(username) || locationErrorOccurred}
        >
          Login
        </Button>
      </Box>
    </Wrapper>
  )
}

export default Login
