import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { connectWithSocketIOServer } from '../../socketConnection/socketConn'
import { proceedWithLogin } from '../../store/actions/loginActions'
import { setMyLocation } from '../../store/MapPage/mapSlice'
import { getFakeLocation } from './fake_location'

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

  const myLocation = useSelector((state: any) => state.map.myLocation)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isUsernameValid = (username: string) => {
    return (
      username.length > 0 && username.length < 10 && !username.includes(' ')
    )
  }

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    proceedWithLogin({
      username,
      coords: {
        lat: myLocation.lat,
        lng: myLocation.lng,
      }
    })
    navigate('/map')
  }

  const onSuccess = (position: any) => {
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
    // navigator.geolocation.getCurrentPosition(
    //   onSuccess,
    //   onError,
    //   locationOptions,
    // )
    onSuccess(getFakeLocation())
  }, [])

  React.useEffect(() => {
    if (myLocation) {
      connectWithSocketIOServer()
    }
  }, [myLocation])

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
