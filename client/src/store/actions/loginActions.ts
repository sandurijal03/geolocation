import * as socketConn from '../../socketConnection/socketConn'

export type LoginParameters = {
  username: string
  coords: {
    lat: number
    lng: number
  }
}

export const proceedWithLogin = (data: LoginParameters) => {
  socketConn.login(data)
}
