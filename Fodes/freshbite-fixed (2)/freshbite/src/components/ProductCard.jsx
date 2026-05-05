import { useApp } from '../context/AppContext'

export default function ProductCard({ item, type = 'food' }) {
  const { addToCart, removeFromCart, getQty } = useApp()
  const qty = getQty(item.id)
  const isGrocery = type === 'grocery'

  return (
    <div className="card group hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Image area */}
      <div className={`relative h-40 flex items-center justify-center text-6xl ${isGrocery ? 'bg-teal/10' : 'bg-orange-50'}`}>
        <span className="group-hover:scale-110 transition-transform duration-200 select-none">{item.emoji}</span>
        {item.tag && (
          <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full ${
            item.tag === 'Bestseller' ? 'bg-yellow-400 text-yellow-900' :
            item.tag === 'Organic'    ? 'bg-green-100 text-green-700' :
            item.tag === 'Fresh'      ? 'bg-teal/20 text-teal-dark' :
            item.tag === 'Spicy'      ? 'bg-red-100 text-red-600' :
            item.tag === 'Healthy'    ? 'bg-green-100 text-green-700' :
            'bg-primary/10 text-primary'
          }`}>
            {item.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{item.desc}</p>

        {/* Meta */}
        <div className="flex items-center gap-2 mt-1">
          {item.rating && (
            <span className="text-xs text-yellow-600 font-semibold flex items-center gap-0.5">
              ⭐ {item.rating}
            </span>
          )}
          {item.time && <span className="text-xs text-gray-400">• {item.time}</span>}
          {item.unit && <span className="text-xs text-gray-400">{item.unit}</span>}
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-3">
          <span className={`font-bold text-base ${isGrocery ? 'text-teal' : 'text-primary'}`}>₹{item.price}</span>

          {qty === 0 ? (
            <button
              onClick={() => addToCart(item)}
              className={`text-sm font-bold px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                isGrocery
                  ? 'bg-teal/10 text-teal hover:bg-teal hover:text-white border border-teal/30'
                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/30'
              }`}
            >
              + ADD
            </button>
          ) : (
            <div className={`flex items-center gap-2 rounded-xl px-1.5 py-1 ${isGrocery ? 'bg-teal' : 'bg-primary'}`}>
              <button onClick={() => removeFromCart(item.id)} className="text-white font-bold w-6 h-6 flex items-center justify-center text-lg leading-none hover:bg-white/20 rounded-lg transition-colors">−</button>
              <span className="text-white font-bold text-sm w-4 text-center">{qty}</span>
              <button onClick={() => addToCart(item)}  className="text-white font-bold w-6 h-6 flex items-center justify-center text-lg leading-none hover:bg-white/20 rounded-lg transition-colors">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
