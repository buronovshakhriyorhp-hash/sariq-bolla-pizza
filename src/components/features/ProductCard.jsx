import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Heart } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const addItem = useCartStore(state => state.addItem);
    const wishlist = useWishlistStore(state => state.wishlist);
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);

    const isFavorite = wishlist.some(item => item.id === product.id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addItem(product);
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div
            className="flex flex-col h-full group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
                >
                    <Heart size={18} className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`} />
                </button>
            </div>

            <div className="flex flex-col flex-grow p-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {product.category}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{product.price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-primary hover:text-black dark:hover:bg-primary dark:hover:text-black px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 transform active:scale-95"
                    >
                        <Plus size={16} />
                        Qo'shish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
