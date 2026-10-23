import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ComponentItem, GalleryItem, TeamMember } from '../types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Connection testing as mandated by skill
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or initializing.');
    }
  }
}
testFirestoreConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ----------------- Real Firestore Cloud Services -----------------

// Team
export function subscribeToTeam(onUpdate: (team: TeamMember[]) => void) {
  const path = 'team';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const items: TeamMember[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as TeamMember);
      });
      onUpdate(items);
    },
    (err) => {
      console.warn('Firestore team subscription warning:', err);
    }
  );
}

export async function saveTeamMemberToFirestore(member: TeamMember) {
  const path = 'team';
  try {
    await setDoc(doc(db, path, member.id), member);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${path}/${member.id}`);
  }
}

export async function deleteTeamMemberFromFirestore(memberId: string) {
  const path = 'team';
  try {
    await deleteDoc(doc(db, path, memberId));
  } catch (err) {
    console.warn(`Firestore delete team warning for ${memberId}:`, err);
  }
}

// Gallery
export function subscribeToGallery(onUpdate: (gallery: GalleryItem[]) => void) {
  const path = 'gallery';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const items: GalleryItem[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as GalleryItem);
      });
      onUpdate(items);
    },
    (err) => {
      console.warn('Firestore gallery subscription warning:', err);
    }
  );
}

export async function saveGalleryItemToFirestore(item: GalleryItem) {
  const path = 'gallery';
  try {
    await setDoc(doc(db, path, item.id), item);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${path}/${item.id}`);
  }
}

export async function deleteGalleryItemFromFirestore(itemId: string) {
  const path = 'gallery';
  try {
    await deleteDoc(doc(db, path, itemId));
  } catch (err) {
    console.warn(`Firestore delete gallery warning for ${itemId}:`, err);
  }
}

// Components
export function subscribeToComponents(onUpdate: (components: ComponentItem[]) => void) {
  const path = 'components';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const items: ComponentItem[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as ComponentItem);
      });
      if (items.length > 0) {
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('Firestore components subscription warning:', err);
    }
  );
}

export async function saveComponentToFirestore(comp: ComponentItem) {
  const path = 'components';
  try {
    await setDoc(doc(db, path, comp.id), comp);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${path}/${comp.id}`);
  }
}

export async function deleteComponentFromFirestore(compId: string) {
  const path = 'components';
  try {
    await deleteDoc(doc(db, path, compId));
  } catch (err) {
    console.warn(`Firestore delete component warning for ${compId}:`, err);
  }
}
