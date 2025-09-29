import { Capacitor } from '@capacitor/core'

export const useGetPlatform = () => {
  return Capacitor.getPlatform()
}
