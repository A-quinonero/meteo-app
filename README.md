# Meteo App (React + TypeScript + Vite)

Pequeña aplicación meteorológica que consume OpenWeather y muestra la previsión por horas del día actual, con selección de idioma (EN/ES) y ciudad (Londres, Toronto, Singapur).

## Estructura

- `src/services/`: llamadas a API y mapeo a tipos de dominio (controlamos los datos en frontend)
- `src/lib/`: utilidades de infraestructura (cliente HTTP Axios)
- `src/hooks/`: lógica de React (React Query)
- `src/helpers/`: helpers puros (fecha/husos horarios, etc.)
- `src/config/`: constantes y configuración
- `src/models/`: esquemas Zod y tipos de dominio
- `src/components/`: componentes UI (pendiente de completar en la fase de UI/UX)

## Requisitos

- Node 18+ recomendado.
- API Key de OpenWeather.

## Configuración

1. Copia `.env.example` a `.env` y coloca tu API key:

```
VITE_OPENWEATHER_API_KEY=tu_api_key
```

2. Instala dependencias e inicia el entorno de desarrollo.

## Scripts

- `npm run dev`: arranca Vite en modo desarrollo.
- `npm run build`: compila para producción.
- `npm run preview`: previsualiza el build.
- `npm test`: ejecuta tests con Vitest.

## Notas de arquitectura

- Datos de OpenWeather validados con Zod y mapeados a tipos de dominio (`WeatherForecast`, `WeatherEntry`).
- React Query para cacheo y estados de petición, parametrizado por ciudad/idioma/unidades.
- Separación de capas: servicios (datos), hooks (React), helpers (pure), UI desacoplada.

## Próximos pasos (UI/UX)

- Componentes accesibles para selector de idioma y ciudades.
- Tarjetas responsivas con icono, descripción, temperatura actual, mínima y máxima.
- Internacionalización de etiquetas y formatos (fecha/hora) en EN/ES.
- Test unitario (opcional) sobre helpers/servicios o componentes.

---

Gracias por revisar esta prueba técnica.# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
