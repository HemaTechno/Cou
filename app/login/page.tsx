'use client';

import { useState, useRef } from 'react';
import { auth, RecaptchaVerifier } from '@/lib/firebase';
import { signInWithPhoneNumber } from 'firebase/auth';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [error, setError] = useState('');
  const recaptchaRef = useRef<any>(null);

  const handleSendCode = async () => {
    setError('');
    try {
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {},
        });
      }

      const result = await signInWithPhoneNumber(auth, phone, recaptchaRef.current);
      setConfirmationResult(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    try {
      await confirmationResult.confirm(code);
      alert('تم تسجيل الدخول بنجاح!');
    } catch (err: any) {
      setError('رمز التحقق غير صحيح');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">تسجيل الدخول</h2>

        {!confirmationResult ? (
          <>
            <input
              type="tel"
              placeholder="أدخل رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button
              onClick={handleSendCode}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              إرسال كود التحقق
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="أدخل كود التحقق"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button
              onClick={handleVerifyCode}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              تحقق
            </button>
          </>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div id="recaptcha-container" />
      </div>
    </div>
  );
}
