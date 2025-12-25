import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// ---------- 1) Paste your Firebase config here (from Firebase console -> Project settings -> Add web app) ----------
const firebaseConfig = {
  apiKey: "AIzaSyD8VKqA11Yl1Yz_K-77M5kBTbi-LIwJpGo",
  authDomain: "viralsense-ai.firebaseapp.com",
  projectId: "viralsense-ai",
  storageBucket: "viralsense-ai.firebasestorage.app",
  messagingSenderId: "592532332570",
  appId: "1:592532332570:web:9a622f9c58da926502f1a3",
  measurementId: "G-D29ZR8T4RR",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// UI bindings
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const signinBtn = document.getElementById("signin");
const signoutBtn = document.getElementById("signout");
const googleBtn = document.getElementById("googleSignIn");
const msg = document.getElementById("msg");
const signedIn = document.getElementById("signed-in");
const authForms = document.getElementById("auth-forms");
const userEmail = document.getElementById("user-email");
const userInfo = document.getElementById("user-info");
const pageLogo = document.getElementById("pageLogo");

function showMessage(text, isError = false) {
  msg.textContent = text;
  msg.style.background = isError
    ? "rgba(128,16,16,0.25)"
    : "rgba(0,90,40,0.18)";
  msg.classList.remove("hidden");
  setTimeout(() => msg.classList.add("hidden"), 5000);
}

// Accessibility: allow Enter to submit when focused on password
passwordInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") signinBtn.click();
});

// Create account with email & password
signupBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) {
    showMessage("Enter email and password", true);
    return;
  }
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    showMessage("Account created. Welcome " + (userCred.user.email || ""));
  } catch (err) {
    showMessage(err.message, true);
  }
});

// Sign in with email & password
signinBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) {
    showMessage("Enter email and password", true);
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showMessage("Signed in");
  } catch (err) {
    showMessage(err.message, true);
  }
});

// Google Sign-In (popup)
googleBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    showMessage("Signed in with Google as " + (result.user.email || ""));
  } catch (err) {
    showMessage(err.message, true);
  }
});

// Sign out
signoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  showMessage("Signed out");
});

// Monitor auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    authForms.classList.add("hidden");
    signedIn.classList.remove("hidden");
    userEmail.textContent = user.email || "(no email)";
    userInfo.innerHTML = `UID: ${user.uid}`;
    window.location.href = "dashboard.html";
  } else {
    authForms.classList.remove("hidden");
    signedIn.classList.add("hidden");
    userEmail.textContent = "";
    userInfo.textContent = "";
  }
});
