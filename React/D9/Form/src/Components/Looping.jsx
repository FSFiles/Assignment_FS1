import React, { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([
    {id: 1,name: "iPhone 13",price: 70000,image: "https://inventstore.in/wp-content/uploads/2023/04/iPhone_13_Starlight_Pure_-1-300x300.webp"},
    {id: 2,name: "Samsung Galaxy",price: 50000,image: "https://images.samsung.com/is/image/samsung/p6pim/in/s2602/gallery/in-galaxy-s26-ultra-s948-sm-s948bzvcins-thumb-550793754"},
    {id: 3,name: "OnePlus",price: 45000,image: "https://image01-in.oneplus.net/media/202504/29/982fd9ce3cdb0e1330f2a84c69ffd9dd.png?x-amz-process=image/format,webp/quality,Q_80"}
  ]);

  const handleBuy = (product) => {
    alert("You buyed");
  };

  return (
    <div className="min-h-screen bg-orange-400 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md p-4"
          >
            <img src={product.image} className="w-full h-40 object-cover rounded-lg"/>
            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
            <p className="text-green-600 font-bold mt-1">{product.price}</p>
            <button onClick={() => handleBuy(product)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;