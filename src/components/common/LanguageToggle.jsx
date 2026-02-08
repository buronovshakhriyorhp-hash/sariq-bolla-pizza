import React from 'react';
import useLanguageStore from '../../store/useLanguageStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguageStore();
    const [isOpen, setIsOpen] = React.useState(false);

    const languages = [
        { code: 'uz', label: "O'z" },
        { code: 'ru', label: "Ру" },
        { code: 'en', label: "En" }
    ];

    return (
        <div className="relative">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors flex items-center gap-1"
            >
                <Globe size={18} />
                <span className="text-xs font-bold uppercase">{language}</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden min-w-[80px] z-50 border border-gray-100 dark:border-gray-700"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${language === lang.code ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageToggle;
