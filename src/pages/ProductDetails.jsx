import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart, Clock, Star } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = PRODUCTS.find(p => p.id === parseInt(id));
    const addItem = useCartStore(state => state.addItem);
    const { toggleWishlist, isInWishlist } = useWishlistStore();

    const [quantity, setQuantity] = useState(1);
    const isFavorite = product ? isInWishlist(product.id) : false;

    if (!product) {
        return <div className="text-center py-20 dark:text-white">Mahsulot topilmadi</div>;
    }

    const handleAddToCart = () => {
        // Add item multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        toast.success(`${quantity} ta ${product.name} savatga qo'shildi!`);
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-24 px-4">
            <div className="container mx-auto max-w-5xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Ortga qaytish
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative bg-gray-100 dark:bg-gray-700">
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center min-h-[400px]"
                        />
                        <button
                            onClick={() => toggleWishlist(product)}
                            className="absolute top-6 right-6 p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full shadow-lg transition-transform active:scale-90"
                        >
                            <Heart size={24} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"} />
                        </button>
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-primary/20 text-orange-700 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star size={18} fill="currentColor" />
                                    <span className="text-black dark:text-white font-bold">4.8</span>
                                </div>
                            </div>

                            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">{product.name}</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                                {product.description}. Eng sifatli mahsulotlardan tayyorlangan, unutilmas ta'm!
                            </p>

                            <div className="flex items-center gap-6 mb-8 text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Clock size={20} className="text-primary" />
                                    <span>25-30 daqiqa</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-bold">540</span>
                                    <span>kkal</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Soni:</span>
                                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <Minus size={16} className="dark:text-white" />
                                    </button>
                                    <span className="text-xl font-bold w-6 text-center dark:text-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <Plus size={16} className="dark:text-white" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-6">
                                <div className="flex-1">
                                    <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Umumiy narx:</span>
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {(parseInt(product.price.replace(/\D/g, '')) * quantity).toLocaleString()} so'm
                                    </span>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-primary hover:bg-primary-hover text-black font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 text-lg active:scale-95"
                                >
                                    <ShoppingBag size={22} />
                                    Savatga
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
