export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          مرحبًا بك في منصتك التعليمية
        </h1>
        <p className="text-lg md:text-xl mb-10">
          تعلّم بذكاء، اختبر مهاراتك، وتقدّم بثقة.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
            تسجيل الدخول
          </a>
          <a href="/dashboard" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50">
            الدخول كطالب
          </a>
        </div>
      </section>
    </main>
  );
}
