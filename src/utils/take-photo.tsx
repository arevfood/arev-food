import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source: CameraSource.Prompt, // CameraSource.Camera, CameraSource.Photos
  })

  return `data:image/${image.format};base64,${image.base64String}`
}

export default takePhoto
