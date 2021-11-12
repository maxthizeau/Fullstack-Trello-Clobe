import appConfigVar from './appConfigVar'

export default function saveAppConfig() {
  window.localStorage.setItem('appConfig', JSON.stringify(appConfigVar()))
}
