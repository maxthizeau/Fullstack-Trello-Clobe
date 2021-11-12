import { useQuery } from '@apollo/client'
import appConfigVar from './appConfigVar'
import GetAppConfig from './getAppConfig'
import saveAppConfig from './saveAppConfig'

export default function useAppConfig() {
  const {
    data: { appConfig },
  } = useQuery(GetAppConfig)

  return {
    isPaused: appConfig.isPaused,
    showModal: appConfig.showModal,
    toggleModal() {
      appConfigVar({ ...appConfig, showModal: !appConfig.showModal })
      saveAppConfig()
    },
  }
}
