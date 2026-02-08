import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, User, Search, X, ChevronRight, Phone, Instagram, Send } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import ThemeToggle from '../common/ThemeToggle';
import LanguageToggle from '../common/LanguageToggle';
import useLanguageStore, { translations } from '../../store/useLanguageStore';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
    const { language } = useLanguageStore();
    const t = translations[language] || translations['uz'];
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const items = useCartStore(state => state.items || []);
    const totalPrice = items.reduce((total, item) => total + (parseInt(item.price.replace(/,/g, '')) * item.quantity), 0);
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    const menuItems = [
        { label: t.pizzas, link: '/' },
        { label: t.snacks, link: '/' },
        { label: t.drinks, link: '/' },
        { label: t.desserts, link: '/' }
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setIsMobileMenuOpen(false), [location]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${isScrolled ? 'py-4' : 'py-6'}`}
            >
                <div className={`
                    relative flex items-center justify-between px-6 transition-all duration-500
                    ${isScrolled
                        ? 'w-[90%] max-w-6xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 py-3'
                        : 'w-full max-w-7xl bg-transparent py-2'
                    }
                `}>
                    {/* Mobile Menu Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 text-gray-800 dark:text-white bg-white/50 dark:bg-gray-800/50 backdrop-blur rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                        <Menu size={24} />
                    </motion.button>

                    {/* Logo Area */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            layout
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/30"
                        >
                            SB
                        </motion.div>
                        <motion.div layout className="hidden sm:flex flex-col leading-none">
                            <span className="font-black text-lg tracking-tight text-gray-900 dark:text-white">SARIQ</span>
                            <span className="font-bold text-sm text-orange-500 tracking-widest">BOLLA</span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation - Pill Style */}
                    <nav className="hidden lg:flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md shadow-sm">
                        {menuItems.map((item, index) => (
                            <Link key={index} to={item.link} className="relative px-5 py-2 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors group overflow-hidden">
                                <span className="relative z-10">{item.label}</span>
                                <motion.div
                                    className="absolute inset-0 bg-white dark:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                                    layoutId="nav-pill"
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions Area */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full border border-gray-200/50 dark:border-gray-700/50">
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>

                        <Link to="/cart">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative bg-black dark:bg-white text-white dark:text-black pl-5 pr-2 py-2 rounded-full font-bold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all group overflow-hidden"
                            >
                                <span className="text-sm z-10 group-hover:-translate-x-1 transition-transform">
                                    {itemCount > 0 ? `${totalPrice.toLocaleString()}` : t.cart}
                                </span>
                                <div className="z-10 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-md group-hover:scale-110 transition-transform">
                                    {itemCount}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-gray-100 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.header>

            {/* Premium Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 z-[70] lg:hidden shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col"
                        >
                            {/* Mobile Header */}
                            <div className="p-6 flex items-center justify-between">
                                <span className="text-2xl font-black text-gray-900 dark:text-white">Menyu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Mobile Content */}
                            <div className="flex-1 overflow-y-auto p-6 pt-0 space-y-8">
                                <nav className="grid gap-2">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={item.link}
                                                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-orange-50 dark:hover:bg-gray-800 hover:pl-6 transition-all group border border-transparent hover:border-orange-200"
                                            >
                                                <span className="font-bold text-lg text-gray-700 dark:text-gray-200 group-hover:text-orange-600">{item.label}</span>
                                                <ChevronRight size={20} className="text-gray-300 group-hover:text-orange-500" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-5 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 dark:text-white">Sozlamalar</span>
                                            <span className="text-xs text-gray-500">Til va ko'rinish</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <LanguageToggle />
                                            <ThemeToggle />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <a href="#" className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-colors">
                                            <Send size={24} />
                                            Telegram
                                        </a>
                                        <a href="#" className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-pink-50 text-pink-600 font-bold hover:bg-pink-100 transition-colors">
                                            <Instagram size={24} />
                                            Instagram
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Footer */}
                            <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                                <a href="tel:+998901234567" className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-green-500/30 active:scale-95 transition-transform">
                                    <Phone size={24} />
                                    <span>Bog'lanish</span>
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
