import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "@/utils/connections/firebase";

export const uploadImageToStorage = async (file: File, path: string) => {
    const storageRef = ref(firebaseStorage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
};