import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const Cart = () => {
    const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
    const navigate = useNavigate();
    const totalPrice = getTotalPrice();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <img src="https://dodopizza-a.akamaihd.net/site-static/dist/121df529925b0f43cc35.svg" alt="Empty Cart" className="w-64 mx-auto mb-8 opacity-50" />
                <h2 className="text-2xl font-bold mb-4">Savatchangiz bo'sh</h2>
                <p className="text-gray-500 mb-8">Mazali pitsalarni tanlash uchun menyuga o'ting!</p>
                <Link to="/" className="bg-primary hover:bg-primary-hover text-black px-8 py-3 rounded-full font-bold transition-colors inline-block">
                    Menyuga qaytish
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold">Savatcha</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.cartItemId} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />

                            <div className="flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">{item.size}, {item.dough === 'traditional' ? "An'anaviy" : "Yupqa"} xamir</p>
                                </div>

                                <div className="flex justify-between items-end mt-2">
                                    <span className="font-bold">{item.price} so'm</span>

                                    <div className="flex items-center bg-gray-50 rounded-full px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.cartItemId, -1)}
                                            className="p-1 hover:text-red-500 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            {item.quantity === 1 ? <Trash2 size={16} className="text-gray-400 hover:text-red-500" /> : <Minus size={16} />}
                                        </button>
                                        <span className="mx-3 font-bold text-sm w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.cartItemId, 1)}
                                            className="p-1 hover:text-primary transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeItem(item.cartItemId)}
                                className="self-start text-gray-400 hover:text-red-500 p-1"
                            >
                                <XIcon />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Buyurtma summasi</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">{items.reduce((acc, i) => acc + i.quantity, 0)} ta mahsulot</span>
                                <span className="font-medium">{totalPrice.toLocaleString()} so'm</span>
                            </div>
                            <div className="flex justify-between text-sm text-green-600 font-medium">
                                <span>Chegirma</span>
                                <span>0 so'm</span>
                            </div>
                            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
                                <span>Jami</span>
                                <span>{totalPrice.toLocaleString()} so'm</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input type="text" placeholder="Promokod" className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-full text-sm outline-none focus:border-primary" />
                                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 text-sm">Qo'llash</button>
                            </div>

                            <Link to="/checkout" className="block w-full bg-primary hover:bg-primary-hover text-black text-center font-bold py-3 rounded-full shadow-lg shadow-primary/20 transition-transform active:scale-95">
                                Rasmiylashtirish
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for removing specific item if needed separately
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
)

export default Cart;
