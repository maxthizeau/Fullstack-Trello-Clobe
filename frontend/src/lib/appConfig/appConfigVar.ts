import { makeVar } from '@apollo/client'

interface AppConfig {
  isPaused: boolean
  showModal: boolean
}

const defaultAppConfig: AppConfig = {
  isPaused: false,
  showModal: false,
}
// typeof window !== 'undefined' && localStorage.clear()

const initialAppConfig: AppConfig =
  typeof window !== 'undefined'
    ? JSON.parse(window.localStorage.getItem('appConfig') as string) ??
      defaultAppConfig
    : defaultAppConfig

// console.log('init: ', initialAppConfig)
const appConfigVar = makeVar<AppConfig>(initialAppConfig)

export default appConfigVar
