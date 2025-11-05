import axios, { type InternalAxiosRequestConfig } from 'axios'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined

if (!apiKey) {
  // No lanzamos error en build, solo avisamos en runtime para desarrollo
  console.warn('[meteo-app] Falta VITE_OPENWEATHER_API_KEY en el entorno (.env)')
}

export const http = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.params = {
    ...(config.params || {}),
    appid: apiKey,
  }
  return config
})

export default http
