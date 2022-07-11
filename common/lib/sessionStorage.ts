
export const getVerticalScrollPositionFromSessionStorage = () => {
  let position = sessionStorage.getItem('verticalScrollPosition')

  return position ? parseInt(position) : null
}

export const saveVerticalScrollPositionToSessionStorage = (position: number) => {
  sessionStorage.setItem('verticalScrollPosition', position.toString())
}