'use client';

import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null); // لاحقًا نربطه بـ Firebase Auth
  const [courses, setCourses] = useState([
    { id: 1, title: 'دورة تطوير الويب', progress: 75 },
    { id: 2, title: 'أساسيات البرمجة', progress: 40 },
  ]);
  const [coins, setCoins] = useState(120);

  // مثال بسيط – لاحقًا تربط بـ Firebase
  useEffect(() => {
    setUser({ name: 'أحمد الطالب' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">
        مرحبًا، {user?.name || 'طالب'} 👋
      </h2>

      <div className="mb-6">
        <p className="text-lg">
          لديك <span className="font-bold text-yellow-500">{coins}</span> كوين.
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-3">كورساتك</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-bold text-lg mb-2">{course.title}</h4>
            <div className="w-full bg-gray-200 h-2 rounded mb-2">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">نسبة التقدم: {course.progress}%</p>
            <a
              href={`/course/${course.id}`}
              className="mt-3 inline-block text-blue-600 hover:underline text-sm"
            >
              متابعة الكورس →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <a href="/forum" className="bg-white p-4 rounded-xl shadow text-center hover:bg-blue-50">
          🗣️ المنتدى
        </a>
        <a href="/wallet" className="bg-white p-4 rounded-xl shadow text-center hover:bg-blue-50">
          💰 المحفظة
        </a>
        <a href="/profile" className="bg-white p-4 rounded-xl shadow text-center hover:bg-blue-50">
          👤 الملف الشخصي
        </a>
      </div>
    </div>
  );
}
