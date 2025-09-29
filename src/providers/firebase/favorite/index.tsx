import { firebaseDb } from '@/utils/connections/firebase'
import { errorHandler } from '@/utils/error-handler'
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

export const FIREBASE_GET_FAVORITE_LIST = async ({ user_id }: { user_id: string }) => {
  try {
    const snapshot = await getDocs(collection(firebaseDb, `users/${user_id}/favorites`))
    const foodIds = snapshot.docs.map((doc) => doc.id)
    const foodsRef = collection(firebaseDb, 'food')
    const q = query(foodsRef, where(documentId(), 'in', foodIds))
    const foodDocs = await getDocs(q)

    const result = foodDocs.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    })
    return result
  } catch (error) {
    if (error instanceof Error) {
      errorHandler({
        code: 500,
        details: error.message,
        error: 'INTERNAL_SERVER_ERROR',
        error_code: 'FIREBASE_SIGNUP_ERROR',
      })
    }
  }
}

export const FIREBASE_ADD_OR_REMOVE_FAVORITE = async ({
  user_id,
  food_id,
}: {
  user_id: string
  food_id: string
}) => {
  try {
    const favoriteRef = doc(firebaseDb, `users/${user_id}/favorites/${food_id}`)
    const snapshot = await getDoc(favoriteRef)
    if (snapshot.exists()) {
      await deleteDoc(favoriteRef)
    } else {
      await setDoc(favoriteRef, {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      errorHandler({
        code: 500,
        details: error.message,
        error: 'INTERNAL_SERVER_ERROR',
        error_code: 'FIREBASE_SIGNUP_ERROR',
      })
    }
  }
}
