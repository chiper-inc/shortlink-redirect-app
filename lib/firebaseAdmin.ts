import admin from 'firebase-admin';
import fs from 'fs';
import { appConfig } from './config';

class FirebaseAdminService {
  private static instance: FirebaseAdminService | null = null;
  private db: admin.firestore.Firestore;

  private constructor() {
    this.db = this.initializeFirebase();
  }

  public static getInstance(): FirebaseAdminService {
    console.log('FirebaseAdminService.instance', FirebaseAdminService.instance);
    if (FirebaseAdminService.instance === null) {
      console.log('Initializing Firebase Admin SDK');
      FirebaseAdminService.instance = new FirebaseAdminService();
    }
    return FirebaseAdminService.instance;
  }

  private initializeFirebase(): admin.firestore.Firestore {
    const { serviceAccountPath, project } = appConfig.firestore;
    if (!serviceAccountPath) {
      throw new Error('SERVICE_ACCOUNT_PATH env variable is not set');
    }

    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, 'utf8'),
    );

    if (!admin.apps.length) {
      console.log('Initializing Firebase Admin SDK');
      console.log('Using service account from:', serviceAccountPath);
      console.log('Using project ID:', project);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: project,
      });
    }

    return admin.firestore();
  }

  public getFirestore() {
    return this.db;
  }

  // Métodos de conveniencia para acceder directamente
  public get firestore() {
    return this.db;
  }
}

// Exportar la instancia única
export const firebaseAdminService = FirebaseAdminService.getInstance();

// Exportar las instancias para mantener compatibilidad con el código existente
export const firestore = firebaseAdminService.getFirestore();
