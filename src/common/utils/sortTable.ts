export const pureChange = (sort: string, down: string, up: string) => {
  return sort === up ? down : up
}
