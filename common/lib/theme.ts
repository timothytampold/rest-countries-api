
export const detectTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches || localStorage.getItem('theme') === 'dark') {
    addDarkClass()
  }
}

export const toggleTheme = () => {
  const toggleLight = document.head.classList.contains('dark')
  if (toggleLight) {
    removeDarkClass()
  } else {
    addDarkClass()
  }

  localStorage.setItem('theme', toggleLight ? 'light' : 'dark')
}

const addDarkClass = () => document.head.classList.add('dark')
const removeDarkClass = () => document.head.classList.remove('dark')