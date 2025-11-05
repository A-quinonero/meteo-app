import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root { color-scheme: light dark; }
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; margin: 0; }
  body { background: #0b0b0c; color: #f3f4f6; }
`
