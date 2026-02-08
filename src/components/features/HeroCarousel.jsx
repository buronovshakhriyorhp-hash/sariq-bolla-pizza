import React from 'react';
import { motion } from 'framer-motion';

const HeroCarousel = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Big Banner */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white h-[340px] flex flex-col justify-center relative overflow-hidden shadow-xl group cursor-pointer"
                >
                    <div className="z-10 relative max-w-sm">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white text-orange-600 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block shadow-sm"
                        >
                            Yangi
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-5xl font-black mb-4 leading-tight"
                        >
                            Super Go'shtli Pitsa
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-8 text-orange-100 text-lg font-medium"
                        >
                            5 xil go'shtdan iborat haqiqiy go'shtxo'rlar uchun!
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors self-start shadow-lg"
                        >
                            Buyurtma berish
                        </motion.button>
                    </div>
                    {/* Abstract Pattern/Image placeholder */}
                    <div className="absolute right-[-20px] bottom-[-40px] w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8, rotate: -20, x: 100 }}
                        animate={{ opacity: 1, scale: 1, rotate: -15, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000&auto=format&fit=crop"
                        className="absolute right-[-60px] bottom-[-30px] w-80 h-80 object-cover rounded-full drop-shadow-2xl shadow-xl border-4 border-white/20"
                        alt="Pizza"
                    />
                </motion.div>

                {/* Small Banners */}
                <div className="hidden md:grid grid-rows-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-yellow-100 rounded-3xl p-8 flex justify-between items-center cursor-pointer hover:bg-yellow-200 transition-all shadow-sm"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">2 kishilik kombo</h3>
                            <p className="text-gray-600 mb-4">2 ta o'rtacha pitsa + Ichimlik</p>
                            <span className="bg-white text-black font-bold px-4 py-2 rounded-xl inline-block shadow-sm">120,000 so'm</span>
                        </div>
                        <div className="w-32 h-32 bg-yellow-300 rounded-full opacity-50 blur-xl absolute right-4"></div>
                        <img src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=1000&auto=format&fit=crop" className="w-32 h-32 object-cover rounded-full shadow-lg rotate-12 z-10" alt="Combo" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-blue-50 rounded-3xl p-8 flex justify-between items-center cursor-pointer hover:bg-blue-100 transition-all shadow-sm"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Tekin yetkazish</h3>
                            <p className="text-gray-600">100,000 so'mdan oshsa</p>
                        </div>
                        <div className="w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-xl absolute right-8"></div>
                        {/* Simple decorative element */}
                        <div className="bg-white p-3 rounded-2xl shadow-md z-10 rotate-[-10deg]">
                            <span className="text-4xl">🛵</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
