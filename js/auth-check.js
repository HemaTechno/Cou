// 🚀 تهيئة Firebase
if (!window.firebase) {
  document.write(`
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"><\/script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"><\/script>
  `);
}

window.addEventListener("DOMContentLoaded", async () => {
  // تأخير بسيط لضمان تحميل Firebase
  await new Promise(r => setTimeout(r, 300));

  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyBoPJbx5v6EkOqxOJkbhzHqIJdAByh79Rg",
      authDomain: "hhhhhh-d4fb8.firebaseapp.com",
      projectId: "hhhhhh-d4fb8",
      storageBucket: "hhhhhh-d4fb8.appspot.com",
      messagingSenderId: "24512338206",
      appId: "1:24512338206:web:dfe045db59bd3434a2110f"
    });
  }

  const db = firebase.firestore();

  // 🔐 التحقق من الجلسة
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

    const serverSession = doc.data().session_id;

    if (serverSession !== session_id) {
      showFancyLogoutMessage();
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "login.html";
      }, 3500);
    }

  } catch (error) {
    console.error("فشل التحقق:", error);
    window.location.href = "login.html";
  }
});

// 🎨 رسالة فخمة عند الطرد
function showFancyLogoutMessage() {
  const div = document.createElement("div");
  div.innerHTML = `
    <div style="position:fixed; top:20px; right:20px; z-index:9999; padding:16px 24px; border-radius:12px;
      background:linear-gradient(to left, #f43f5e, #e11d48); color:white; box-shadow:0 8px 20px rgba(0,0,0,0.2);
      font-family:'Tajawal', sans-serif; font-size:16px; max-width:300px;">
      <strong>🚫 تم تسجيل الدخول من جهاز آخر</strong><br>
      سيتم تحويلك لصفحة الدخول خلال لحظات...
    </div>
  `;
  document.body.appendChild(div);
}
