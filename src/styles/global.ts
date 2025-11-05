import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root { color-scheme: light dark; }
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; margin: 0; }
  body { 
    background: #0a0e27; 
    color: #f3f4f6;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Cantarell, 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 { margin: 0; font-weight: 600; }
  button { cursor: pointer; font-family: inherit; }
  
  /* Tour highlight */
  .tour-highlight {
    position: relative !important;
    z-index: 10000 !important;
  }
`
