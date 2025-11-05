export const theme = {
  colors: {
    bg: '#0b0b0c',
    text: '#f3f4f6',
    muted: '#9ca3af',
    cardBg: '#111214',
    border: '#26272b',
    primary: '#5b8def',
  },
  radii: {
    sm: '6px',
    md: '10px',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
} as const

export type AppTheme = typeof theme
