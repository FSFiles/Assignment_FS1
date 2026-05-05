import { useMemo, useState } from "react";
import { hasSupabaseCredentials, supabase } from "./lib/supabase";
import { foodItems, groceryItems } from "./data/catalog";

const popularCities = ["Hyderabad", "Chennai", "Bengaluru", "Mumbai", "Delhi"];

function parsePhoneToE164(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const digitsOnly = trimmed.replace(/\D/g, "");

  if (digitsOnly.length === 10) return `+91${digitsOnly}`;
  if (digitsOnly.startsWith("91") && digitsOnly.length === 12) return `+${digitsOnly}`;

  if (trimmed.startsWith("+")) {
    const rest = trimmed.slice(1).replace(/\D/g, "");
    if (rest.length >= 10 && rest.length <= 15) return `+${rest}`;
    return null;
  }

  if (digitsOnly.length >= 10 && digitsOnly.length <= 15) return `+${digitsOnly}`;

  return null;
}

function formatAuthError(error) {
  const raw =
    typeof error?.message === "string"
      ? error.message
      : typeof error?.error_description === "string"
        ? error.error_description
        : "";
  if (!raw) return "Sign-in failed. Open DevTools (F12) → Console and share the red error text.";

  const low = raw.toLowerCase();
  if (low.includes("invalid") && low.includes("jwt")) {
    return "Invalid Supabase key or URL. Check `.env`: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (no quotes, no extra spaces). Restart `npm run dev` after editing.";
  }
  if (low.includes("phone") && (low.includes("provider") || low.includes("disabled") || low.includes("configure"))) {
    return "SMS isn’t set up yet: Supabase Dashboard → Authentication → Providers → Phone (enable), then add SMS credentials.";
  }
  if (raw.includes("User not registered") || low.includes("signups not allowed")) {
    return "This phone isn’t registered — choose Register instead, or allow sign-ups in Supabase Authentication settings.";
  }
  return raw;
}

function App() {
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [activeCategory, setActiveCategory] = useState("food");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [cart, setCart] = useState({});
  const [showFlyTick, setShowFlyTick] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [message, setMessage] = useState("");

  const allItems = useMemo(() => [...foodItems, ...groceryItems], []);
  const visibleItems = activeCategory === "food" ? foodItems : groceryItems;

  const cartItems = useMemo(
    () =>
      allItems
        .filter((item) => cart[item.id])
        .map((item) => ({ ...item, qty: cart[item.id] })),
    [allItems, cart],
  );

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const normalizedPhone = useMemo(() => parsePhoneToE164(phone), [phone]);

  const addToCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const openCart = () => {
    if (cartCount === 0) {
      setMessage("Your cart is empty — add something from the shop.");
      if (page !== "shop") setPage("shop");
      return;
    }
    setPage("checkout");
  };

  const sendOtp = async () => {
    if (!phone.trim()) {
      setMessage("Please enter a phone number.");
      return;
    }

    if (!normalizedPhone) {
      setMessage("Enter a valid number: 10 digits, or full international format with + and country code.");
      return;
    }

    if (!hasSupabaseCredentials) {
      setMessage("Supabase keys missing: using demo OTP 123456.");
      setPage("verifyOtp");
      return;
    }

    if (!supabase) {
      setMessage("Supabase client failed to load. Check `.env` and restart the dev server.");
      return;
    }

    try {
      setIsSendingOtp(true);
      setMessage("");
      const { error } = await supabase.auth.signInWithOtp({
        phone: normalizedPhone,
        options: {
          channel: "sms",
          shouldCreateUser: authMode === "register",
        },
      });
      if (error) throw error;
      setMessage("OTP sent to your number. Check SMS.");
      setPage("verifyOtp");
    } catch (error) {
      setMessage(formatAuthError(error));
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) {
      setMessage("Please enter the OTP.");
      return;
    }

    if (!hasSupabaseCredentials) {
      if (otp === "123456") {
        setMessage("");
        setPage("location");
      } else {
        setMessage("Demo OTP is 123456.");
      }
      return;
    }

    if (!normalizedPhone) {
      setMessage("Go back and enter a valid phone number.");
      return;
    }

    if (!supabase) {
      setMessage("Supabase client failed to load. Check `.env` and restart the dev server.");
      return;
    }

    try {
      setIsVerifyingOtp(true);
      setMessage("");
      const { error } = await supabase.auth.verifyOtp({
        phone: normalizedPhone,
        token: otp.trim(),
        type: "sms",
      });
      if (error) throw error;
      setPage("location");
    } catch (error) {
      setMessage(formatAuthError(error));
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    setShowFlyTick(true);
    window.setTimeout(() => {
      setShowFlyTick(false);
      setPage("profile");
      setCart({});
    }, 1400);
  };

  const primaryBtn =
    "rounded-xl bg-[#1e3a2f] px-5 py-2 font-medium text-[#faf8f5] shadow-sm transition hover:bg-[#152a22] disabled:opacity-50";

  const tabClass = (on) =>
    `rounded-lg px-4 py-2 text-sm transition ${
      on ? "bg-[#1e3a2f] text-[#faf8f5]" : "bg-stone-100 text-stone-800 hover:bg-stone-200"
    }`;

  const renderContent = () => {
    if (page === "home") {
      return (
        <section className="space-y-5 rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-[#8b6914]">Welcome</p>
          <h1 className="font-display text-3xl font-semibold leading-tight text-[#1e3a2f] md:text-4xl">
            Food & groceries, delivered with care.
          </h1>
          <p className="text-lg text-stone-600">
            Browse restaurant-style meals and everyday pantry staples — one cart, one checkout.
          </p>
          <button type="button" onClick={() => setPage("auth")} className={primaryBtn}>
            Start ordering
          </button>
        </section>
      );
    }

    if (page === "auth") {
      return (
        <section className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-[#1e3a2f]">Login / Register</h2>
          <p className="mt-1 text-sm text-stone-600">We’ll text a one-time code to your phone.</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={tabClass(authMode === "login")}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={tabClass(authMode === "register")}
            >
              Register
            </button>
          </div>
          <div className="mt-5 space-y-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              inputMode="tel"
              autoComplete="tel"
              className="w-full rounded-lg border border-stone-300 bg-[#faf8f5] px-3 py-2.5 text-stone-900 outline-none ring-[#1e3a2f]/20 focus:ring-2"
            />
            <button type="button" onClick={sendOtp} disabled={isSendingOtp} className={primaryBtn}>
              {isSendingOtp ? "Sending OTP…" : `Send OTP — ${authMode}`}
            </button>
            {!hasSupabaseCredentials && (
              <p className="text-xs text-amber-800">Add `VITE_SUPABASE_*` in `.env` for live SMS OTP.</p>
            )}
          </div>
        </section>
      );
    }

    if (page === "verifyOtp") {
      return (
        <section className="space-y-4 rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-[#1e3a2f]">Verify OTP</h2>
          <p className="text-sm text-stone-600">
            Code sent to {normalizedPhone ?? "—"}
          </p>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit code"
            inputMode="numeric"
            maxLength={8}
            className="w-full rounded-lg border border-stone-300 bg-[#faf8f5] px-3 py-2.5 outline-none ring-[#1e3a2f]/20 focus:ring-2"
          />
          <button type="button" onClick={verifyOtp} disabled={isVerifyingOtp} className={primaryBtn}>
            {isVerifyingOtp ? "Verifying…" : "Verify & continue"}
          </button>
        </section>
      );
    }

    if (page === "location") {
      return (
        <section className="space-y-4 rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-[#1e3a2f]">Where are we delivering?</h2>
          <p className="text-sm text-stone-600">Pick a city or type your own.</p>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <button
                type="button"
                key={city}
                onClick={() => setLocation(city)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  location === city
                    ? "border-[#1e3a2f] bg-[#1e3a2f] text-[#faf8f5]"
                    : "border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-300"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or area"
            className="w-full rounded-lg border border-stone-300 bg-[#faf8f5] px-3 py-2.5 outline-none ring-[#1e3a2f]/20 focus:ring-2"
          />
          <button
            type="button"
            onClick={() => setPage("name")}
            disabled={!location.trim()}
            className={primaryBtn}
          >
            Continue
          </button>
        </section>
      );
    }

    if (page === "name") {
      return (
        <section className="space-y-4 rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-[#1e3a2f]">How should we address you?</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            className="w-full rounded-lg border border-stone-300 bg-[#faf8f5] px-3 py-2.5 outline-none ring-[#1e3a2f]/20 focus:ring-2"
          />
          <button
            type="button"
            onClick={() => setPage("shop")}
            disabled={!name.trim()}
            className={primaryBtn}
          >
            Continue to shop
          </button>
        </section>
      );
    }

    if (page === "shop") {
      return (
        <section className="space-y-5 rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-2xl font-semibold text-[#1e3a2f]">Shop</h2>
            <button
              type="button"
              onClick={() => openCart()}
              disabled={cartCount === 0}
              className="rounded-xl bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#1a1814] shadow-sm transition hover:bg-[#b89220] disabled:opacity-45"
            >
              Buy now
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("food")}
              className={tabClass(activeCategory === "food")}
            >
              Food
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("groceries")}
              className={tabClass(activeCategory === "groceries")}
            >
              Groceries
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visibleItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-stone-200 bg-[#faf8f5]/50 shadow-sm"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold leading-snug text-stone-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-stone-600">₹ {item.price}</p>
                  <button
                    type="button"
                    onClick={() => addToCart(item.id)}
                    className="mt-3 w-full rounded-lg bg-[#1e3a2f] py-2 text-sm font-medium text-[#faf8f5] transition hover:bg-[#152a22]"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (page === "checkout") {
      return (
        <section className="space-y-5 rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-[#1e3a2f]">Checkout</h2>
          <div className="space-y-3 rounded-xl border border-stone-200 bg-[#faf8f5] p-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm text-stone-800">
                <img
                  src={item.image}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-1 justify-between gap-2">
                  <span>
                    {item.name}
                    <span className="text-stone-500"> × {item.qty}</span>
                  </span>
                  <span className="shrink-0 font-medium">₹ {item.qty * item.price}</span>
                </div>
              </div>
            ))}
            <p className="flex justify-between border-t border-stone-200 pt-3 font-display text-lg font-semibold text-[#1e3a2f]">
              <span>Total</span>
              <span>₹ {cartTotal}</span>
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-[#1e3a2f]">Payment method</h3>
            {[
              { id: "cod", label: "Cash on delivery" },
              { id: "upi", label: "UPI" },
              { id: "card", label: "Credit / debit card" },
              { id: "netbanking", label: "Netbanking" },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                  selectedPayment === method.id
                    ? "border-[#1e3a2f] bg-[#faf8f5]"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === method.id}
                  onChange={() => setSelectedPayment(method.id)}
                  className="accent-[#1e3a2f]"
                />
                <span>{method.label}</span>
              </label>
            ))}
          </div>

          <button type="button" onClick={placeOrder} className={primaryBtn + " w-full sm:w-auto"}>
            Proceed & place order
          </button>
        </section>
      );
    }

    return (
      <section className="space-y-4 rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold text-[#1e3a2f]">Profile</h2>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            Order placed
          </span>
        </div>
        <p className="text-stone-700">
          Name: <span className="font-semibold text-stone-900">{name || "Guest"}</span>
        </p>
        <p className="text-stone-700">
          Location:{" "}
          <span className="font-semibold text-stone-900">{location || "Not set"}</span>
        </p>
        <p className="text-stone-700">
          Payment: <span className="font-semibold uppercase text-stone-900">{selectedPayment}</span>
        </p>
        <button type="button" onClick={() => setPage("shop")} className={primaryBtn}>
          Order again
        </button>
      </section>
    );
  };

  return (
    <main className="min-h-screen bg-[#f0ebe3] p-4 md:p-8">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <header className="flex items-center justify-between rounded-2xl border border-[#c9a227]/35 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="font-display text-2xl font-semibold tracking-wide text-[#1e3a2f]">Fooodes</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[#8b6914]">Food & groceries</p>
          </div>
          <button
            type="button"
            onClick={() => (page === "checkout" ? setPage("shop") : openCart())}
            className="rounded-xl border border-stone-200 bg-[#faf8f5] px-4 py-2 text-sm font-medium text-[#1e3a2f] shadow-sm transition hover:border-[#c9a227]/50"
          >
            {page === "checkout" ? "Back to shop" : `Cart (${cartCount})`}
          </button>
        </header>

        {message && (
          <div className="rounded-xl border border-amber-400/60 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            {message}
          </div>
        )}

        {renderContent()}

        {showFlyTick && (
          <>
            <div className="fixed inset-0 z-50 grid place-items-center bg-black/25 backdrop-blur-[1px]">
              <div className="font-display rounded-full bg-emerald-600 p-10 text-6xl text-white shadow-xl">
                ✓
              </div>
            </div>
            <div className="flying-tick">✓</div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
