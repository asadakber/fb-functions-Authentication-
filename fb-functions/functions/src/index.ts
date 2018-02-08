import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase)
import { signuplistener, loginListener } from './lib/auth';

export const signup = signuplistener;
export const login = loginListener
export const firestore = functions.firestore;