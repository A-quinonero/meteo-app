export const theme = {
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  colors: {
    bg: '#0a0e27',
    text: '#f3f4f6',
    muted: '#9ca3af',
    cardBg: '#111827',
    cardBgHover: '#1a202c',
    border: '#1f2937',
    borderLight: '#374151',
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    accent: '#ec4899',
    success: '#10b981',
    error: '#ef4444',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '12px',
    xl: '16px',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  transitions: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
  },
} as const

export type AppTheme = typeof theme
