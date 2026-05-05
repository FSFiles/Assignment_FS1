import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Smartphone, Banknote, Globe, ChevronDown, Lock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
  { id: 'upi', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm & more' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: '🌐', desc: 'All major Indian banks' },
];

const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank'];

export default function Checkout() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [selectedBank, setSelectedBank] = useState('');
  const [placing, setPlacing] = useState(false);
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useAuth();
  const navigate = useNavigate();

  const deliveryFee = 29;
  const taxes = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + taxes;

  const formatCardNumber = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    return clean.length >= 2 ? clean.slice(0,2) + '/' + clean.slice(2) : clean;
  };

  const handlePlaceOrder = async () => {
    if (!selectedMethod) { toast.error('Please select a payment method'); return; }
    if (selectedMethod === 'upi' && !upiId.includes('@')) { toast.error('Enter a valid UPI ID (e.g. user@upi)'); return; }
    if (selectedMethod === 'card' && (card.number.replace(/\s/g,'').length < 16 || !card.expiry || !card.cvv || !card.name)) {
      toast.error('Please fill all card details'); return;
    }
    if (selectedMethod === 'netbanking' && !selectedBank) { toast.error('Please select a bank'); return; }

    setPlacing(true);
    await new Promise(r => setTimeout(r, 2000));

    // Save order
    addOrder({
      id: `ORD${Date.now()}`,
      items: cartItems,
      total: grandTotal,
      paymentMethod: selectedMethod,
      date: new Date().toISOString(),
      status: 'Confirmed',
    });

    clearCart();
    setPlacing(false);
    navigate('/order-success');
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <Navbar />

      <div className="pt-16 max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/cart')} className="p-2 glass rounded-xl hover:border-orange-500/30 transition-all">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white">💳 Checkout</h1>
            <p className="text-gray-400 text-sm">Choose your payment method</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment Methods - Left */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-bold text-white mb-4">Select Payment Method</h2>

            {paymentMethods.map(method => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`payment-card cursor-pointer ${selectedMethod === method.id ? 'selected' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${selectedMethod === method.id ? 'bg-orange-500/20' : 'bg-white/5'}`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold">{method.label}</p>
                    <p className="text-gray-400 text-sm">{method.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${selectedMethod === method.id ? 'border-orange-500 bg-orange-500' : 'border-gray-600'}`}>
                    {selectedMethod === method.id && <div className="w-full h-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full" /></div>}
                  </div>
                </div>

                {/* Method-specific fields */}
                {selectedMethod === method.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-slide-up">
                    {method.id === 'cod' && (
                      <div className="glass-light rounded-xl p-4 text-center">
                        <p className="text-green-400 font-semibold text-sm">✅ No prepayment needed</p>
                        <p className="text-gray-400 text-xs mt-1">Keep exact change ready. Our delivery partner will collect payment.</p>
                      </div>
                    )}

                    {method.id === 'upi' && (
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">UPI ID</label>
                        <input
                          type="text"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          className="input-field"
                        />
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                            <span key={app} className="text-xs px-3 py-1 glass-light rounded-full text-gray-300 border border-white/10">{app}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {method.id === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-gray-400 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={card.number}
                            onChange={e => setCard(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                            className="input-field font-mono"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="As on card"
                            value={card.name}
                            onChange={e => setCard(p => ({ ...p, name: e.target.value }))}
                            className="input-field"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-gray-400 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Expiry</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={card.expiry}
                              onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                              className="input-field font-mono"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-xs font-semibold mb-1.5 block uppercase tracking-wider">CVV</label>
                            <input
                              type="password"
                              placeholder="•••"
                              value={card.cvv}
                              onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g,'').slice(0,3) }))}
                              className="input-field font-mono"
                              maxLength={3}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Lock className="w-3 h-3" /> 256-bit SSL encrypted
                        </div>
                      </div>
                    )}

                    {method.id === 'netbanking' && (
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Select Bank</label>
                        <div className="relative">
                          <select
                            value={selectedBank}
                            onChange={e => setSelectedBank(e.target.value)}
                            className="input-field appearance-none pr-10 bg-transparent"
                          >
                            <option value="" className="bg-gray-900">-- Select your bank --</option>
                            {banks.map(b => <option key={b} value={b} className="bg-gray-900">{b}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary - Right */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-black text-white mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400 truncate mr-2">{item.emoji} {item.name} ×{item.qty}</span>
                    <span className="text-white shrink-0">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span><span className="text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Delivery</span><span className="text-white">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Taxes</span><span className="text-white">₹{taxes}</span>
                </div>
                <div className="flex justify-between text-lg font-black border-t border-white/10 pt-3">
                  <span className="text-white">Total</span>
                  <span className="gradient-text">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70"
              >
                {placing ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : (
                  <>🎉 Place Order — ₹{grandTotal} <ArrowRight className="w-5 h-5" /></>
                )}
              </button>

              <p className="text-center text-gray-500 text-xs mt-3">
                🔒 Secure checkout — Your data is safe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
