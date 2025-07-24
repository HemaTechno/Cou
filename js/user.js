// js/main.js
import { auth, db, onAuthStateChanged, doc, getDoc } from './js/firebase.js';

const userInfoEl = document.getElementById("user-info");
const loginLinkEl = document.getElementById("login-link");
const mainLoginBtn = document.getElementById("main-login-btn");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // المستخدم مسجل دخول
    const uid = user.uid;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      userInfoEl.innerHTML = `👋 مرحبًا، <strong>${data.name}</strong> – 🪙 ${data.coins} كوين`;
      userInfoEl.classList.remove("hidden");
      loginLinkEl.style.display = "none";
      mainLoginBtn.style.display = "none";
    } else {
      console.warn("المستخدم موجود ولكن لا توجد بيانات له في Firestore.");
    }
  } else {
    // غير مسجل
    console.log("لا يوجد مستخدم مسجل حاليًا.");
  }
});
