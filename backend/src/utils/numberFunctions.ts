function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomIntString(numberOfChar: number): string {
  let returnedString: string = ""
  for (let i = 0; i < numberOfChar; i++) {
    returnedString += getRandomInt(0, 9)
  }
  return returnedString
}
export { getRandomInt, getRandomIntString }
