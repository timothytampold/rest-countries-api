import { useEffect } from 'react'

export const useClickOutside = (nodes: React.RefObject<HTMLElement>[], callback: () => any) => {
  useEffect(() => {
    const handleClick = ({ target }: MouseEvent) => {
      if (nodes.every(node => node.current && !node.current.contains(target as Node))) {
        callback()
      }
    }
    
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}