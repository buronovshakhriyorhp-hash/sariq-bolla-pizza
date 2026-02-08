import React, { useState, useEffect } from 'react';
import HeroCarousel from '../components/features/HeroCarousel';
import ProductCard from '../components/features/ProductCard';
import { PRODUCTS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ["Barchasi", "Pitsalar", "Gazaklar", "Ichimliklar", "Shirinliklar", "Souslar"];

const Home = () => {
    const [products] = useState(PRODUCTS);
    const [activeCategory, setActiveCategory] = useState("Barchasi");

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProducts = activeCategory === "Barchasi"
        ? products
        : products.filter(p => p.category === activeCategory || (activeCategory === "Pitsalar" && p.category === "Pitsalar"));

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <HeroCarousel />

            {/* Category Filter (Sticky below header) */}
            <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm transition-all">
                <div className="container mx-auto px-4 overflow-x-auto flex gap-4 no-scrollbar">
                    {CATEGORIES.map((cat, index) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * index }}
                            onClick={() => setActiveCategory(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium border ${activeCategory === cat
                                ? 'bg-primary text-secondary border-primary shadow-lg shadow-primary/20'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-6 flex items-center gap-2"
                >
                    {activeCategory === "Barchasi" ? "Menyu" : activeCategory}
                    <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{filteredProducts.length}</span>
                </motion.h2>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
