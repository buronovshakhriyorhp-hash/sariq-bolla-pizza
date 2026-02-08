import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, User, Search } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import ThemeToggle from '../common/ThemeToggle';
import LanguageToggle from '../common/LanguageToggle';
import useLanguageStore, { translations } from '../../store/useLanguageStore';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const { language } = useLanguageStore();
    const t = translations[language] || translations['uz'];
    const [isScrolled, setIsScrolled] = useState(false);

    // Calculate cart totals dynamically to ensure reactivity
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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-2'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Mobile Menu (Hamburger) */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden text-gray-800"
                >
                    <Menu size={24} />
                </motion.button>

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
                    <motion.span
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-primary text-black px-2 py-1 rounded-md group-hover:bg-primary-hover transition-colors"
                    >
                        SARIQ
                    </motion.span>
                    <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-black"
                    >
                        BOLLA
                    </motion.span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 font-medium text-sm">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index + 0.3 }}
                        >
                            <Link to={item.link} className="hover:text-primary transition-colors relative group dark:text-gray-200 dark:hover:text-primary">
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <LanguageToggle />
                    <ThemeToggle />

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Search size={20} />
                    </motion.button>

                    <Link to="/profile">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <User size={20} />
                        </motion.div>
                    </Link>

                    <Link to="/cart">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary hover:bg-primary-hover text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 transition-all relative group shadow-lg shadow-primary/20"
                        >
                            <ShoppingBag size={20} />
                            <span className="hidden sm:inline transition-all">
                                {itemCount > 0 ? `${totalPrice.toLocaleString()} so'm` : t.cart}
                            </span>
                            <AnimatePresence>
                                {itemCount > 0 && (
                                    <motion.span
                                        key="count"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full sm:hidden border-2 border-white"
                                    >
                                        {itemCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
