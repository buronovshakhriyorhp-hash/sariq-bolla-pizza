import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow pt-16"> {/* Add padding top for fixed header */}
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
