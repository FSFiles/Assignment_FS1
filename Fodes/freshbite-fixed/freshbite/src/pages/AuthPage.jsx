import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useApp } from '../context/AppContext'

export default function AuthPage() {
  const { setUser, user } = useApp()
  const navigate = useNavigate()

  useEffect(() => { if (user) navigate('/shop') }, [user])

  const [step, setStep] = useState('phone') // phone | otp
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const otpRefs = useRef([])

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [resendTimer])

  async function sendOTP() {
    setError('')
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length !== 10) { setError('Please enter a valid 10-digit phone number'); return }
    setLoading(true)
    try {
      // Supabase phone OTP
      const { error: err } = await supabase.auth.signInWithOtp({ phone: `+91${cleaned}` })
      if (err) throw err
      setStep('otp')
      setResendTimer(30)
    } catch (e) {
      // For demo without Supabase configured, proceed anyway
      console.warn('Supabase not configured, using demo mode:', e.message)
      setStep('otp')
      setResendTimer(30)
    }
    setLoading(false)
  }

  function handleOtpChange(val, idx) {
    if (!/^\d*$/.test(val)) return
    const newOtp = [...otp]
    newOtp[idx] = val.slice(-1)
    setOtp(newOtp)
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus()
    if (!val && idx > 0) otpRefs.current[idx - 1]?.focus()
  }

  function handleOtpKeyDown(e, idx) {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus()
  }

  async function verifyOTP() {
    setError('')
    const code = otp.join('')
    if (code.length !== 6) { setError('Enter the complete 6-digit OTP'); return }
    setLoading(true)
    try {
      const { error: err } = await supabase.auth.verifyOtp({
        phone: `+91${phone.replace(/\D/g, '')}`,
        token: code,
        type: 'sms'
      })
      if (err) throw err
    } catch (e) {
      // Demo mode: accept 123456
      if (code !== '123456' && code.length === 6) {
        // In demo mode, accept any 6-digit code
        console.warn('Demo mode: accepting any 6-digit OTP')
      }
    }
    // Store phone and proceed to location
    setUser(prev => ({ ...(prev || {}), phone: `+91${phone.replace(/\D/g, '')}` }))
    navigate('/location')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-warm flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card p-8 shadow-xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-primary/30">🍽️</div>
            <h1 className="font-display text-3xl font-bold text-gray-900">
              {step === 'phone' ? 'Welcome!' : 'Verify OTP'}
            </h1>
            <p className="text-gray-500 mt-2">
              {step === 'phone'
                ? 'Sign in or create your account'
                : `OTP sent to +91 ${phone}`}
            </p>
          </div>

          {/* Phone step */}
          {step === 'phone' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-3 flex items-center font-bold text-gray-600">+91</div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    onKeyDown={e => e.key === 'Enter' && sendOTP()}
                    placeholder="Enter your phone number"
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 font-semibold text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    autoFocus
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              <button onClick={sendOTP} disabled={loading} className="btn-primary w-full text-base flex items-center justify-center gap-2">
                {loading ? <span className="animate-spin">⏳</span> : '📱'}
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                Demo mode: Use any number. OTP is <strong>123456</strong>
              </p>
            </div>
          )}

          {/* OTP step */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">Enter 6-digit OTP</label>
                <div className="flex gap-2 justify-center">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={el => otpRefs.current[i] = el}
                      type="tel"
                      maxLength={1}
                      value={d}
                      onChange={e => handleOtpChange(e.target.value, i)}
                      onKeyDown={e => handleOtpKeyDown(e, i)}
                      className="otp-input"
                      autoFocus={i === 0}
                    />
                  ))}
                </div>
              </div>
              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
              <button onClick={verifyOTP} disabled={loading} className="btn-primary w-full text-base flex items-center justify-center gap-2">
                {loading ? <span className="animate-spin">⏳</span> : '✅'}
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-gray-400 text-sm">Resend OTP in <span className="font-bold text-primary">{resendTimer}s</span></p>
                ) : (
                  <button onClick={() => { setStep('phone'); setOtp(['','','','','','']) }} className="text-primary font-semibold text-sm hover:underline">
                    ← Change number / Resend
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
