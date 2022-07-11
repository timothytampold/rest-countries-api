import { useRef } from 'react'
import { useStateRef } from '../hooks/useStateRef'
import { useClickOutside } from '../hooks/useClickOutside'

interface IProps {
  defaultTitle: string
  options: React.ReactNode[]
  selectedValue: React.ReactNode,
  setSelectedValue: React.Dispatch<React.SetStateAction<any>>
}

const DropdownSelect: React.FC<IProps> = ({ defaultTitle, options, selectedValue, setSelectedValue }) => {
  const [isOpen, setIsOpen, isOpenRef] = useStateRef<boolean>(false)
  const dropdownButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownListRef = useRef<HTMLUListElement>(null)

  const toggle = () => setIsOpen(prevState => !prevState)

  useClickOutside([dropdownButtonRef, dropdownListRef], () => {
    if (isOpenRef.current) {
      toggle()
    }
  })

  return (
    <div className="relative text-[.75rem] desktop:text-[.875rem]">
      <button
        className="w-[12.5rem] h-12 desktop:h-14 bg-white dark:bg-[#2B3844] px-6 flex justify-between items-center rounded-[.3125rem] drop-shadow"
        onClick={toggle}
        ref={dropdownButtonRef}
      >
        {selectedValue ? selectedValue : defaultTitle}
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="dark:fill-white" fillRule="evenodd" clipRule="evenodd" d="M6.875 0.875L4 3.75L1.125 0.875L0.25 1.75L4 5.5L7.75 1.75L6.875 0.875Z" fill="black" />
        </svg>
      </button>

      <ul
        className={`absolute top-[calc(100%+.25rem)] w-[12.5rem] bg-white dark:bg-[#2B3844] rounded-[.3125rem] drop-shadow px-6 py-4 flex flex-col gap-2 z-[999] ${!isOpen && 'hidden'}`}
        ref={dropdownListRef}
      >
        {options.map((option, index) => (
          <li
            className="cursor-pointer"
            onClick={e => setSelectedValue((e.target as HTMLElement).innerText)}
            key={index}
          >{option}</li>
        ))}
      </ul>
    </div>
  )
}

export default DropdownSelect