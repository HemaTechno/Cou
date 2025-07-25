// ✅ تحميل Firebase إذا غير محمّل
if (typeof firebase === "undefined") {
  const firebaseApp = document.createElement("script");
  firebaseApp.src = "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js";
  document.head.appendChild(firebaseApp);

  const firestore = document.createElement("script");
  firestore.src = "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js";
  document.head.appendChild(firestore);
}

// ✅ انتظر تحميل Firebase
const waitForFirebase = () => {
  return new Promise((resolve) => {
    const check = () => {
      if (typeof firebase !== "undefined" && firebase.firestore) {
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
};

(async () => {
  await waitForFirebase();

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

  const student = JSON.parse(localStorage.getItem("student"));
  const session_id = localStorage.getItem("session_id");

  // ✅ الحالة 1: مفيش تسجيل خالص
  if (!student || !session_id) {
    showMessage("🚨 يجب إنشاء حساب أولاً!", "signup.html");
    return;
  }

  try {
    const doc = await db.collection("students").doc(student.id).get();

    // ✅ الحالة 2: بيانات مش موجودة أو لم تتم الموافقة
    if (!doc.exists || doc.data().status !== "تمت الموافقة") {
      showMessage("🚫 حسابك لم يُقبل بعد أو غير موجود", "login.html");
      return;
    }

    // ✅ الحالة 3: الجلسة من جهاز آخر
    if (doc.data().session_id !== session_id) {
      showFancyLogoutMessage();
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "login.html";
      }, 3000);
    }

    // ✅ الحالة 4: كل شيء تمام ✅

  } catch (error) {
    console.error("🔥 خطأ أثناء التحقق من الجلسة:", error.message);
    showMessage("حدث خطأ غير متوقع", "login.html");
  }
})();

// ✅ تنبيه فخم للجلسة المكررة
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

// ✅ تنبيه عادي وتحويل
function showMessage(message, redirectTo) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div style="position:fixed; top:20px; right:20px; z-index:9999; padding:16px 24px; border-radius:12px;
      background:#f59e0b; color:white; box-shadow:0 4px 12px rgba(0,0,0,0.15);
      font-family:'Tajawal', sans-serif; font-size:15px; max-width:300px;">
      <strong>${message}</strong><br>
      سيتم تحويلك خلال لحظات...
    </div>
  `;
  document.body.appendChild(div);
  setTimeout(() => {
    window.location.href = redirectTo;
  }, 2500);
}
