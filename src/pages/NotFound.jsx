import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const NotFound = () => {
    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center text-center px-4">
            <div>
                <div className="relative w-64 h-64 mx-auto mb-8">
                    {/* Abstract Pizza Slice Missing */}
                    <div className="w-full h-full bg-orange-400 rounded-full flex items-center justify-center overflow-hidden border-8 border-white shadow-xl relative">
                        <span className="text-9xl z-10">🍕</span>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-50 transform rotate-45 translate-x-4 -translate-y-4"></div>
                    </div>
                </div>
            </div>

            <h1 className="text-6xl font-black text-gray-900 mb-4">
                404
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-md">
                Voy! Bu sahifa pechda kuyib ketgan ko'rinadi. Yoki biz uni hali pishirmadik.
            </p>

            <div>
                <Link
                    to="/"
                    className="bg-primary hover:bg-primary-hover text-black font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 inline-block"
                >
                    Menyuga qaytish
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
