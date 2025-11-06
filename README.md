# Meteo App (React 19 + TypeScript + Vite)

Aplicación meteorológica con una UX moderna: timeline “estilo iPhone” de 12 horas, tarjeta de detalle interactiva, tour de onboarding multi‑idioma, skeletons realistas y tooling profesional (ESLint + Prettier + Husky + lint‑staged + CI).

## Requisitos

- Node.js 20.19+ (recomendado por Vite 7)
- API Key de OpenWeather (One Call 3.0)

## Configuración rápida

1. Crea un archivo `.env.development.local` (o `.env`) y añade tu API key:

```bash
VITE_OPENWEATHER_API_KEY=tu_api_key
```

2. Instala dependencias e inicia el entorno de desarrollo:

```bash
npm ci
npm run dev
```

Si la API key falta en desarrollo, verás un aviso en consola del navegador. Las peticiones se construyen con Axios añadiendo `appid` desde `import.meta.env.VITE_OPENWEATHER_API_KEY`.

## Scripts disponibles

- `npm run dev` → desarrollo con Vite
- `npm run build` → compila (tsc -b) y construye (vite build)
- `npm run preview` → sirve el build
- `npm run test` → Vitest
- `npm run lint` → ESLint (flat config)
- `npm run lint:fix` → ESLint con autofix
- `npm run lint:ci` → ESLint sin warnings (–-max-warnings=0)
- `npm run format` → Prettier write
- `npm run format:check` → Prettier check
- `npm run typecheck` → tsc sin emitir (–-noEmit)

Pre‑commit: Husky ejecuta `lint-staged` (ESLint + Prettier en archivos staged) y `typecheck` para parar el commit si hay errores de TypeScript.

## CI (GitHub Actions)

Workflow en `.github/workflows/ci.yml`:

1. Node 20.19.x, `npm ci`
2. `npm run lint:ci`
3. `npm run typecheck`
4. `npm run build`
5. `npm test -- --run`

## Flujo de UX

1. Selección de idioma (EN/ES)
2. Selector de ciudad
3. Selector de día
4. Timeline horizontal (12 horas). En “hoy” incluye la hora en curso por defecto; en días futuros muestra todas las horas disponibles.
5. Tarjeta de detalle de la hora seleccionada (fecha/hora local, icono, descripción, temperatura y rango min/max del día).

Tour de onboarding: guía interactiva que resalta elementos reales de UI (idioma → ciudad → día → timeline → detalle), con posicionamiento móvil y bloqueo de scroll.

## Arquitectura y datos

- OpenWeather One Call 3.0, validado con Zod y mapeado a tipos de dominio.
- React Query v5 para cache y estados de petición.
- Manejo de zonas horarias usando `timezone_offset` del API para formatear y agrupar por día local.
- Hooks específicos encapsulan la lógica de selección de día, horas para el timeline, hora activa, etc.

Estructura relevante:

- `src/services/` → llamadas a API y mapeo (e.g., `weatherService.ts`)
- `src/lib/http.ts` → cliente Axios que añade la API key a cada request
- `src/hooks/` → lógica: `useTimelineHours`, `useDefaultHourEpoch`, `useActiveHourState`, `useAvailableDaysCount`, `useSelectedDayString`, `useCityOptions`, etc.
- `src/components/weather/` → `HourlyTimeline`, `HourDetail`
- `src/components/tour/` → `TourManager`, `TourOverlay`
- `src/components/common/` → `LoadingState` (skeletons), `CitySelector`, `DaySelector`
- `src/config/constants.ts` → ciudades por defecto y tipos de configuración

## Estilo y calidad de código

- ESLint 9 Flat Config (TypeScript + React + react-hooks + react-refresh) + `eslint-config-prettier`
- Prettier 3 con reglas consistentes; VSCode configura `formatOnSave` y fix de ESLint
- Husky + lint‑staged en pre‑commit: formatea y lintar archivos staged y pasa typecheck

Archivos clave:

- `eslint.config.js`
- `.prettierrc.json` y `.prettierignore`
- `.husky/pre-commit`
- `.vscode/settings.json`

## Troubleshooting

- Node versión: Si Vite avisa, actualiza a Node 20.19+.
- Husky v9: Las líneas `husky.sh` están eliminadas (deprecated). Si migras desde otra rama, asegúrate de que `.husky/pre-commit` no las incluya.
- API key: Si falta, verás `[meteo-app] Falta VITE_OPENWEATHER_API_KEY...` en consola; añade el valor en `.env.development.local`.

## Créditos y licencias

Código de ejemplo para evaluación técnica. Icons de OpenWeather.

---

¡Gracias por revisar esta prueba técnica!
