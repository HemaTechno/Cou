import './globals.css';

export const metadata = {
  title: 'منصتي التعليمية',
  description: 'أفضل منصة تعليمية باللغة العربية',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans bg-white text-gray-800">
        <header className="p-4 bg-white shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">منصتي التعليمية</h1>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-blue-600 hover:underline">لوحة الطالب</a>
            <a href="/forum" className="text-blue-600 hover:underline">المنتدى</a>
            <a href="/wallet" className="text-blue-600 hover:underline">المحفظة</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="p-4 text-center text-sm text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
        </footer>
      </body>
    </html>
  );
}
