import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Banknote, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import useCartStore from '../store/useCartStore';

const Checkout = () => {
    const navigate = useNavigate();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const totalPrice = getTotalPrice();

    const [formData, setFormData] = useState({
        name: '',
        phone: '+998 ',
        address: '',
        comment: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cash'); // cash | card | click
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading("Buyurtma yuborilmoqda...");

        const orderData = {
            customer: formData,
            items: items,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod
        };

        // Simulate API call
        setTimeout(() => {
            console.log("Order Placed (Mock):", orderData);
            setOrderId(Date.now());
            setIsOrderPlaced(true);
            clearCart();
            setIsLoading(false);
            toast.dismiss(toastId);
            toast.success("Buyurtmangiz qabul qilindi! 🎉");
        }, 1500);
    };

    if (isOrderPlaced) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Buyurtma qabul qilindi!</h2>
                    <p className="text-gray-500 mb-6">Buyurtmangiz tayyorlanmoqda. Bizning "Sariq Bola" kuryerimiz yo'lga chiqdi!</p>
                    <div className="bg-gray-100 rounded-xl p-4 mb-6">
                        <p className="font-bold text-lg">Buyurtma #{orderId}</p>
                        <p className="text-sm text-gray-500">Yetkazish vaqti: 30-40 daqiqa</p>
                    </div>
                    <button onClick={() => navigate('/')} className="w-full bg-primary hover:bg-primary-hover font-bold py-3 rounded-xl">Menyuga qaytish</button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 font-medium">
                <ArrowLeft size={20} />
                Savatchaga qaytish
            </button>

            <h1 className="text-3xl font-bold mb-8">Rasmiylashtirish</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">1. Bog'lanish ma'lumotlari</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ismingiz</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors"
                                    placeholder="Buron"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors"
                                    placeholder="+998 90 123 45 67"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">2. Yetkazish manzili</h2>
                        <div>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors"
                                    placeholder="Ko'cha, Uy, Kvartira..."
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-4 outline-none focus:border-primary focus:bg-white transition-colors h-24 resize-none"
                                placeholder="Kuryer uchun izoh (Masalan: Domofon kodi, qavat...)"
                                value={formData.comment}
                                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Payment Method */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">3. To'lov turi</h2>
                        <div className="space-y-3">
                            <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-primary bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="payment" className="hidden" onClick={() => setPaymentMethod('cash')} />
                                <Banknote className={paymentMethod === 'cash' ? 'text-black' : 'text-gray-400'} />
                                <span className="font-medium">Naqd pul</span>
                            </label>
                            <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'click' ? 'border-primary bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="payment" className="hidden" onClick={() => setPaymentMethod('click')} />
                                <div className="w-6 h-6 bg-blue-500 rounded text-xs text-white flex items-center justify-center font-bold">C</div>
                                <span className="font-medium">Click / Payme</span>
                            </label>
                            <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="payment" className="hidden" onClick={() => setPaymentMethod('card')} />
                                <CreditCard className={paymentMethod === 'card' ? 'text-black' : 'text-gray-400'} />
                                <span className="font-medium">Karta orqali (Kuryerga)</span>
                            </label>
                        </div>
                    </div>

                    {/* Total & Submit */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500">To'lov summasi:</span>
                            <span className="text-2xl font-bold">{totalPrice.toLocaleString()} so'm</span>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-primary hover:bg-primary-hover text-black font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-transform active:scale-95 text-lg flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div> : "Buyurtma berish"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
