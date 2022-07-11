import { useTheme } from 'next-themes'

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-[#2B3844] drop-shadow sticky top-0 z-[99999]">
      <div className="container flex justify-between items-center py-[1.875rem]">
        <span className="font-extra-bold desktop:text-[1.5rem]">Where in the world?</span>
        <button
          className="flex items-center gap-[.625rem] text-[.75rem] desktop:text-[1rem] font-bold capitalize"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" className="w-3 desktop:w-[.9375rem] h-[.6875rem] desktop:h-[.859375rem]" xmlns="http://www.w3.org/2000/svg">
            <path className="dark:stroke-white" fillRule="evenodd" clipRule="evenodd" d="M9.84257 9.052C6.73486 9.052 4.21543 6.74226 4.21543 3.89457C4.21543 2.82024 4.57343 1.82526 5.18514 1C2.75229 1.75612 1 3.86498 1 6.35045C1 9.47079 3.75943 12 7.16286 12C9.87429 12 12.1757 10.3945 13 8.16362C12.1 8.72383 11.0129 9.052 9.84257 9.052Z" fill="white" stroke="#111517" />
          </svg>
          Dark mode
        </button>
      </div>
    </header>
  )
}

export default Header