type Coordinate = {
  lat: number
  lng: number
}

export const calculateDistanceBetweenCoords = (
  coord1s: Coordinate,
  coord2s: Coordinate,
) => {
  return getDistanceFrormLatLonInKm(
    coord1s.lat,
    coord1s.lng,
    coord2s.lat,
    coord2s.lng,
  )
}

const getDistanceFrormLatLonInKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) => {
  let R = 6371 // Radius of earth in km
  let dLat = deg2rad(lat2 - lat1)
  let dLng = deg2rad(lng2 - lng1)

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c
  return roundToTwoDecimals(d)
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}

const roundToTwoDecimals = (num: number) => {
  let nums = +num.toFixed(2)
  return Math.round(nums)
}
