/**
 * 🎩 نظام إدارة الجلسات الفاخر - منصة عبدالرحمن السقا
 * 🚀 إصدار فخم مع تأثيرات متطورة وواجهة مستخدم راقية
 */

// 🌟 تهيئة البيئة والاستيرادات
const loadFirebaseSDK = () => {
  return new Promise((resolve) => {
    // 🔥 تحميل Firebase إذا لم يكن محملًا
    if (typeof firebase === "undefined") {
      console.log("%c✨ جاري تحميل Firebase SDK...", "color: #4fd1c5; font-weight: bold");
      
      const firebaseScripts = [
        { id: 'firebase-app', src: 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js' },
        { id: 'firebase-firestore', src: 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js' },
        { id: 'firebase-auth', src: 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js' }
      ];

      let loadedCount = 0;
      
      firebaseScripts.forEach(script => {
        if (!document.getElementById(script.id)) {
          const scriptElement = document.createElement('script');
          scriptElement.id = script.id;
          scriptElement.src = script.src;
          scriptElement.onload = () => {
            loadedCount++;
            if (loadedCount === firebaseScripts.length) {
              console.log("%c🔥 تم تحميل Firebase بنجاح!", "color: #f6ad55; font-weight: bold");
              resolve();
            }
          };
          document.head.appendChild(scriptElement);
        }
      });
    } else {
      resolve();
    }
  });
};

// ⏳ انتظر تحميل Firebase بكل أناقه
const waitForFirebase = () => {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (typeof firebase !== "undefined" && firebase.firestore && firebase.auth) {
        clearInterval(checkInterval);
        console.log("%c🔄 تم التأكد من جاهزية Firebase", "color: #68d391; font-weight: bold");
        resolve();
      }
    }, 100);
  });
};

// 🎩 العرض الفخم للرسائل
class FancyNotifier {
  static showSuccess(message, duration = 3000) {
    this._showNotification(message, "bg-gradient-to-r from-green-400 to-teal-500", "✅", duration);
  }

  static showError(message, duration = 3000) {
    this._showNotification(message, "bg-gradient-to-r from-red-500 to-pink-600", "❌", duration);
  }

  static showWarning(message, duration = 3000) {
    this._showNotification(message, "bg-gradient-to-r from-yellow-400 to-orange-500", "⚠️", duration);
  }

  static _showNotification(message, bgClass, icon, duration) {
    const notificationId = `notif-${Date.now()}`;
    const notification = document.createElement('div');
    notification.id = notificationId;
    notification.className = `fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white font-medium flex items-start space-x-3 space-x-reverse transform transition-all duration-500 ${bgClass}`;
    notification.style.maxWidth = '400px';
    notification.style.backdropFilter = 'blur(10px)';
    notification.innerHTML = `
      <span class="text-xl">${icon}</span>
      <div>
        <p class="text-sm font-bold">${message}</p>
        <div class="h-1 mt-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
          <div class="h-full bg-white bg-opacity-70 rounded-full progress-bar" style="width: 100%"></div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Animation in
    setTimeout(() => {
      notification.classList.remove('opacity-0');
      notification.classList.remove('translate-y-10');
    }, 10);

    // Progress bar animation
    const progressBar = notification.querySelector('.progress-bar');
    let progress = 100;
    const interval = setInterval(() => {
      progress -= (100 / (duration / 50));
      progressBar.style.width = `${progress}%`;
      if (progress <= 0) clearInterval(interval);
    }, 50);

    // Auto dismiss
    setTimeout(() => {
      notification.classList.add('opacity-0', 'translate-y-10');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, duration);
  }
}

// 🌌 تأثيرات الانتقال الفاخرة
const applyPageTransitions = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .page-transition {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease;
    }
    .page-transition.active {
      opacity: 1;
      pointer-events: all;
    }
    .loader {
      width: 64px;
      height: 64px;
      position: relative;
    }
    .loader:before {
      content: "";
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 6px solid rgba(255, 255, 255, 0.1);
      position: absolute;
      top: 0;
      left: 0;
    }
    .loader:after {
      content: "";
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 6px solid transparent;
      border-top-color: white;
      position: absolute;
      top: 0;
      left: 0;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .brand-text {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 2rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
  `;
  document.head.appendChild(style);

  const transitionDiv = document.createElement('div');
  transitionDiv.className = 'page-transition';
  transitionDiv.innerHTML = `
    <div class="loader"></div>
    <div class="brand-text">منصة عبدالرحمن السقا</div>
  `;
  document.body.appendChild(transitionDiv);

  window.showTransition = () => {
    transitionDiv.classList.add('active');
  };

  window.hideTransition = () => {
    transitionDiv.classList.remove('active');
  };
};

// 🚀 الدالة الرئيسية
(async () => {
  // تطبيق تأثيرات الانتقال
  applyPageTransitions();
  window.showTransition();

  try {
    // ⏳ انتظر تحميل Firebase
    await loadFirebaseSDK();
    await waitForFirebase();

    // 🔥 تهيئة Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBoPJbx5v6EkOqxOJkbhzHqIJdAByh79Rg",
        authDomain: "hhhhhh-d4fb8.firebaseapp.com",
        projectId: "hhhhhh-d4fb8",
        storageBucket: "hhhhhh-d4fb8.appspot.com",
        messagingSenderId: "24512338206",
        appId: "1:24512338206:web:dfe045db59bd3434a2110f"
      });
      console.log("%c🚀 تم تهيئة Firebase بنجاح", "color: #63b3ed; font-weight: bold");
    }

    const db = firebase.firestore();
    const auth = firebase.auth();

    // 📦 جلب بيانات الجلسة
    const student = JSON.parse(localStorage.getItem("student"));
    const session_id = localStorage.getItem("session_id");

    // 🔍 التحقق من حالة المستخدم
    if (!student || !session_id) {
      FancyNotifier.showWarning("يجب إنشاء حساب أولاً!", 2500);
      setTimeout(() => {
        window.location.href = "signup.html";
      }, 2500);
      return;
    }

    try {
      const doc = await db.collection("students").doc(student.id).get();

      // حالة عدم وجود حساب أو غير موافق عليه
      if (!doc.exists || doc.data().status !== "تمت الموافقة") {
        FancyNotifier.showError("حسابك لم يُقبل بعد أو غير موجود", 3000);
        setTimeout(() => {
          window.location.href = "login.html";
        }, 3000);
        return;
      }

      // حالة الجلسة المكررة (تسجيل دخول من جهاز آخر)
      if (doc.data().session_id !== session_id) {
        FancyNotifier.showError("تم تسجيل الدخول من جهاز آخر", 3000);
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "login.html";
        }, 3000);
        return;
      }

      // كل شيء على ما يرام ✅
      FancyNotifier.showSuccess("تم التحقق من الجلسة بنجاح", 2000);
      console.log("%c🎉 تم التحقق من صحة الجلسة بنجاح!", "color: #68d391; font-weight: bold");

    } catch (error) {
      console.error("%c🔥 خطأ في التحقق من الجلسة:", "color: #f56565; font-weight: bold", error);
      FancyNotifier.showError("حدث خطأ غير متوقع أثناء التحقق من الجلسة", 3000);
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    }

  } catch (error) {
    console.error("%c💥 خطأ فادح في تهيئة التطبيق:", "color: #f56565; font-weight: bold", error);
    FancyNotifier.showError("حدث خطأ في تحميل النظام. يرجى تحديث الصفحة", 4000);
  } finally {
    setTimeout(() => {
      window.hideTransition();
    }, 1000);
  }
})();
