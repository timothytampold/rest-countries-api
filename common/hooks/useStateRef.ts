import { useState, useRef, useEffect } from 'react'

export const useStateRef = <T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>] => {
  const [value, setValue] = useState(initialValue)
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return [value, setValue, ref]
}