import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, Shield, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function PhoneOtp() {
  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const { login, user, updateUser } = useAuth();

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    if (phone.length !== 10) {
      toast.error('Enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    // Simulate OTP send (replace with supabase.auth.signInWithOtp)
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep(2);
    startResendTimer();
    toast.success(`OTP sent to +91 ${phone} 📱`);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      toast.error('Enter all 6 digits');
      return;
    }
    setLoading(true);
    // Demo: accept "123456" or any 6 digits
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    // In real app: supabase.auth.verifyOtp({ phone: `+91${phone}`, token: enteredOtp, type: 'sms' })
    if (user) {
      updateUser({ phone, isVerified: true });
    } else {
      login({ phone, isVerified: true });
    }
    toast.success('Phone verified! ✅');
    navigate('/location');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 relative overflow-hidden">
      <div className="blob-1 top-0 right-0 opacity-40" />
      <div className="blob-2 bottom-0 left-0 opacity-40" />

      <div className="w-full max-w-md animate-slide-up relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl shadow-2xl mb-4">
            <span className="text-3xl">🍽️</span>
          </div>
          <h1 className="text-3xl font-black gradient-text">ProFood</h1>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map(s => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= s ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-500'
                }`}>{s}</div>
                {s < 2 && <div className={`flex-1 h-0.5 transition-all duration-500 ${step > s ? 'bg-orange-500' : 'bg-white/10'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 ? (
            // Phone Input
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Enter Phone Number</h2>
                <p className="text-gray-400 text-sm">We'll send you a 6-digit OTP to verify your number</p>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">Mobile Number</label>
                <div className="flex gap-3">
                  <div className="glass-light px-4 rounded-xl flex items-center gap-2 text-white font-semibold border border-orange-500/20">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-sm">+91</span>
                  </div>
                  <div className="relative flex-1">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="input-field pl-11"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 glass-light rounded-xl p-4">
                <Shield className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <p className="text-gray-400 text-xs leading-relaxed">
                  Your number is safe with us. We'll only use it for order updates and account verification.
                </p>
              </div>

              <button
                onClick={sendOtp}
                disabled={loading || phone.length !== 10}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending OTP...</>
                ) : (
                  <>Send OTP <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          ) : (
            // OTP Input
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Verify OTP</h2>
                <p className="text-gray-400 text-sm">
                  Enter the 6-digit code sent to <span className="text-orange-400 font-semibold">+91 {phone}</span>
                </p>
                <p className="text-green-400 text-xs mt-1">💡 Demo mode: use any 6 digits (e.g. 123456)</p>
              </div>

              {/* OTP boxes */}
              <div className="flex gap-2 justify-between">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => otpRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className="otp-input"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading || otp.join('').length !== 6}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying...</>
                ) : (
                  <>Verify & Continue <ArrowRight className="w-5 h-5" /></>
                )}
              </button>

              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-gray-500 text-sm">Resend OTP in <span className="text-orange-400 font-bold">{resendTimer}s</span></p>
                ) : (
                  <button onClick={() => { setOtp(['','','','','','']); sendOtp(); }} className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1 mx-auto transition-colors">
                    <RefreshCw className="w-4 h-4" /> Resend OTP
                  </button>
                )}
              </div>

              <button onClick={() => { setStep(1); setOtp(['','','','','','']); }} className="w-full text-gray-500 text-sm hover:text-gray-300 transition-colors">
                ← Change phone number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
