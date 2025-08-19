import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountPath) {
  throw new Error('SERVICE_ACCOUNT_PATH env variable is not set');
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
  console.log('Initializing Firebase Admin SDK');
  console.log('Using service account from:', serviceAccountPath);
  console.log('Using project ID:', process.env.FIREBASE_PROJECT_ID);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();

export { admin, db };
