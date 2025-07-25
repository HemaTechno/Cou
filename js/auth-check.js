// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBoPJbx5v6EkOqxOJkbhzHqIJdAByh79Rg",
  authDomain: "hhhhhh-d4fb8.firebaseapp.com",
  projectId: "hhhhhh-d4fb8",
  storageBucket: "hhhhhh-d4fb8.appspot.com",
  messagingSenderId: "24512338206",
  appId: "1:24512338206:web:dfe045db59bd3434a2110f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Function to check session
async function checkSession() {
  const student = JSON.parse(localStorage.getItem("student"));
  const session_id = localStorage.getItem("session_id");

  if (!student || !session_id) {
    window.location.href = "login.html";
    return;
  }

  try {
    const doc = await db.collection("students").doc(student.id).get();

    if (!doc.exists || doc.data().status !== "تمت الموافقة") {
      window.location.href = "login.html";
      return;
    }

    if (doc.data().session_id !== session_id) {
      alert("تم تسجيل الدخول من جهاز آخر.");
      localStorage.clear();
      window.location.href = "login.html";
    } else {
      console.log("✅ تم التحقق من الجلسة بنجاح");
    }

  } catch (err) {
    console.error("فشل التحقق:", err.message);
    window.location.href = "login.html";
  }
}

checkSession();
