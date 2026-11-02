import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './config';

/**
 * Fetch all documents from a Firestore collection
 */
export async function getCollectionData<T = any>(collectionName: string): Promise<T[]> {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const colRef = collection(db, collectionName);
    const snap = await getDocs(colRef);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as T));
  } catch (error) {
    console.error(`Firebase fetch error for ${collectionName}:`, error);
    return [];
  }
}

/**
 * Save or overwrite a document with a specific ID
 */
export async function saveDocument(collectionName: string, docId: string, data: any): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (error) {
    console.error(`Firebase saveDocument error in ${collectionName}/${docId}:`, error);
    return false;
  }
}

/**
 * Add a new document (auto-generated ID)
 */
export async function addDocument(collectionName: string, data: any): Promise<string | null> {
  if (!isFirebaseConfigured || !db) return null;
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, { ...data, createdAt: new Date().toISOString() });
    return docRef.id;
  } catch (error) {
    console.error(`Firebase addDocument error in ${collectionName}:`, error);
    return null;
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(collectionName: string, docId: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Firebase deleteDocument error in ${collectionName}/${docId}:`, error);
    return false;
  }
}

/**
 * Upload a file/image to Firebase Storage and get public URL
 */
export async function uploadFileToFirebase(path: string, file: File | Blob): Promise<string | null> {
  if (!isFirebaseConfigured || !storage) return null;
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error(`Firebase storage upload error at ${path}:`, error);
    return null;
  }
}
