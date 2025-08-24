import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// now include displayName in the function
export const doCreateUserWithEmailAndPassword = async (
  email,
  displayName,
  password
) => {
  console.log(
    "Registering user with email:",
    email,
    "and displayName:",
    displayName
  );
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // update profile with displayName
  await updateProfile(userCredential.user, {
    displayName:displayName,
  });

  console.log("userCredential", userCredential);

  return userCredential;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // result.user
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
