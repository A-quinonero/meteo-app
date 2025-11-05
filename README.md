# Meteo App (React + TypeScript + Vite)

Aplicación meteorológica con UX moderna que consume OpenWeather One Call 3.0 y muestra previsión por horas multi‑día, con i18n (EN/ES), selector de ciudad y manejo correcto de zonas horarias.

## Estructura

- `src/services/`: llamadas a API y mapeo a tipos de dominio (controlamos los datos en frontend)
- `src/lib/`: utilidades de infraestructura (cliente HTTP Axios)
- `src/hooks/`: lógica de React (React Query)
- `src/helpers/`: helpers puros (fecha/husos horarios, etc.)
- `src/config/`: constantes y configuración
- `src/models/`: esquemas Zod y tipos de dominio
- `src/components/`: componentes UI (layout, tarjetas, selectores, estados de carga/error)

## Requisitos

- Node 20.19+ (requerido por Vite 7).
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
- React Query (v5) para cacheo y estados de petición (queryKey por ciudad/idioma/unidades), con `staleTime` y `gcTime` coherentes.
- Separación de capas: servicios (datos), hooks (React), helpers (puros), UI desacoplada.
- Formateo y comparaciones de fecha/hora con huso horario de la ciudad usando offset de `timezone_offset` (sin depender del huso del dispositivo).

## Funcionalidad clave

- Ciudades por defecto: Sabadell (ES), Tokyo (JP), Los Ángeles (US).
- i18n EN/ES con persistencia en `localStorage`.
- One Call 3.0: forecast horario (~48h). Además de las horas, se mapea `current` (condición actual al minuto) cuando está disponible.
- Selector de día: “Hoy” + días siguientes disponibles (calculados a partir de las horas).
  - “Hoy” muestra solo desde la hora local actual hacia adelante para simular “tiempo real”.
  - Días futuros muestran el día completo.
- Tarjeta principal (WeatherSummary): muestra siempre el dato “current” para el día actual y las mín/máx del día.
- Grid de tarjetas horarias mostrando la hora local de la ciudad.
- Estados de carga y error con UI cuidada.

## Tests

- Vitest + JSDOM.
- Ejemplo incluido: `src/test/datetime.test.ts` validando helpers de fecha/hora con offset (formato de hora y fecha local, comparación por día local).

## UX/Detalles

- UI responsive mobile‑first, layouts con `styled-components` y efectos sutiles (glass, hover, focus visibles).
- Accesibilidad: roles/aria en estados, y toggle de idiomas sin banderas (EN/ES).
- El resumen permanece “sticky” en desktop, y el grid aprovecha el ancho con columnas fluidas.

## Próximos pasos

- Nueva rama para:
  - Mejorar skeletons de carga en más vistas/transiciones.
  - Optimización de re‑renders (memoización selectiva, `React.memo`, `useMemo`/`useCallback` en límites, y selectores de React Query).
- Añadir más tests (hooks de filtrado por día y límites en zonas horarias).

## Próximos pasos (UI/UX)

- Componentes accesibles para selector de idioma y ciudades.
- Tarjetas responsivas con icono, descripción, temperatura actual, mínima y máxima.
- Internacionalización de etiquetas y formatos (fecha/hora) en EN/ES.
- Test unitario (opcional) sobre helpers/servicios o componentes.

---

Gracias por revisar esta prueba técnica.
