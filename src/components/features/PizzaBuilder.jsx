import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import useCartStore from '../../store/useCartStore';

const SIZES = [
    { id: 'small', name: 'Kichik', size: '25 sm', priceMod: 0 },
    { id: 'medium', name: 'O\'rtacha', size: '30 sm', priceMod: 15000 },
    { id: 'large', name: 'Katta', size: '35 sm', priceMod: 30000 },
];

const DOUGH_TYPES = [
    { id: 'traditional', name: 'An\'anaviy' },
    { id: 'thin', name: 'Yupqa' },
];

const PizzaModal = ({ product, onClose }) => {
    const [size, setSize] = useState(SIZES[1]); // Default Medium
    const [dough, setDough] = useState(DOUGH_TYPES[0]); // Default Traditional

    const addToCart = useCartStore(state => state.addItem);

    const basePrice = parseInt(product.price.replace(/,/g, ''));
    const finalPrice = basePrice + size.priceMod;
    const formattedPrice = finalPrice.toLocaleString();

    const handleAddToCart = () => {
        addToCart(product, {
            size: size.name,
            dough: dough.name,
            price: formattedPrice // Store the calculated price
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-yellow-50 flex items-center justify-center p-8 relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`w-[80%] object-contain drop-shadow-2xl transition-all duration-500 ${size.id === 'small' ? 'scale-90' : size.id === 'large' ? 'scale-110' : 'scale-100'
                            }`}
                    />
                    {/* Size Visual Indicator (optional) */}
                </div>

                {/* Controls Section */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col h-full overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                    <p className="text-gray-500 text-sm mb-6">{size.size}, {dough.name.toLowerCase()} xamir, {size.name}</p>

                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        {product.description}
                    </p>

                    <div className="space-y-6 flex-grow">
                        {/* Size Selector */}
                        <div className="bg-gray-100 p-1 rounded-full flex relative">
                            {SIZES.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setSize(s)}
                                    className={`flex-1 py-1 text-sm font-medium rounded-full transition-all duration-200 ${size.id === s.id ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>

                        {/* Dough Selector */}
                        <div className="bg-gray-100 p-1 rounded-full flex relative">
                            {DOUGH_TYPES.map((d) => (
                                <button
                                    key={d.id}
                                    onClick={() => setDough(d)}
                                    className={`flex-1 py-1 text-sm font-medium rounded-full transition-all duration-200 ${dough.id === d.id ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {d.name}
                                </button>
                            ))}
                        </div>

                        {/* Add Ons (Placeholder) */}
                        <div>
                            <h3 className="font-bold mb-3 text-sm">Pitsaga qo'shish</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="border border-gray-200 rounded-lg p-2 flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer transition-colors bg-white">
                                        <div className="w-8 h-8 bg-red-100 rounded-full mb-1"></div>
                                        <span className="text-xs font-medium">Pishloq</span>
                                        <span className="text-xs text-gray-500 font-bold">5,000</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-8 pt-4 border-t border-gray-100">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-primary hover:bg-primary-hover text-black font-bold py-3 rounded-full transition-transform active:scale-95 shadow-lg shadow-orange-200/50 flex justify-between px-6"
                        >
                            <span>Savatga qo'shish</span>
                            <span>{formattedPrice} so'm</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PizzaModal;
