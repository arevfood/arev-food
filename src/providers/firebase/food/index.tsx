import { errorHandler } from '@/utils/error-handler'
import { collection, documentId, getDocs, query, where } from 'firebase/firestore'
import { firebaseDb } from '@/utils/connections/firebase'

export const GET_FOODS = async ({ name }: { name: string }) => {
  try {
    const foodRef = collection(firebaseDb, 'food')
    const q = query(
      foodRef,
      where(documentId(), '>=', name),
      where(documentId(), '<=', name + '\uf8ff'),
    )
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
