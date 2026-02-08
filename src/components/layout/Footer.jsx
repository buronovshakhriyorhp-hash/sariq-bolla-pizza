import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Facebook, Instagram, Twitter, Send, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        const toastId = toast.loading("Obuna bo'linmoqda...");

        // Simulate API call
        setTimeout(() => {
            console.log("Newsletter subscribed:", email);
            setStatus('success');
            toast.dismiss(toastId);
            toast.success("Yangiliklarga obuna bo'ldingiz! 📧");
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <footer className="bg-gray-900 text-white mt-16 pt-16 pb-8 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold flex items-center gap-2 mb-4">
                            <span className="bg-primary text-black px-2 py-1 rounded-md">SARIQ</span>
                            <span className="text-white">BOLLA</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Bizning pitsalarimiz faqat yangi masalliqlar va o'zgacha mehr bilan tayyorlanadi. Har bir luqmada lazzatni his eting.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary hover:text-black transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary hover:text-black transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary hover:text-black transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary">Menyu</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Pitsalar</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">Gazaklar</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">Ichimliklar</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">Shirinliklar</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">Souslar</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary">Bog'lanish</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary mt-0.5" />
                                <span>Toshkent sh., Chilonzor tumani, 5-mavze, 12-uy</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-primary" />
                                <span>+998 71 200-00-00</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-primary" />
                                <span>info@sariqbolla.uz</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary">Yangiliklar</h4>
                        <p className="text-gray-400 text-sm mb-4">Aksiyalar va yangiliklardan xabardor bo'ling</p>
                        <form onSubmit={handleSubscribe} className="relative mb-6">
                            <input
                                type="email"
                                placeholder="Email manzilingiz"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500 pr-10"
                                required
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white p-1">
                                {status === 'loading' ? <div className="animate-spin h-4 w-4 border-b-2 border-primary"></div> : <Send size={18} />}
                            </button>
                        </form>
                        {status === 'success' && <p className="text-green-500 text-xs mb-2">Rahmat! Obuna bo'ldingiz.</p>}
                        {status === 'error' && <p className="text-red-500 text-xs mb-2">Xatolik. Iltimos qayta urinib ko'ring.</p>}

                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-800 p-2 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition-colors">
                                <span className="text-xs text-gray-400 font-bold block">App Store</span>
                                <span className="text-[10px] text-gray-500">dan yuklab olish</span>
                            </div>
                            <div className="bg-gray-800 p-2 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition-colors">
                                <span className="text-xs text-gray-400 font-bold block">Google Play</span>
                                <span className="text-[10px] text-gray-500">dan yuklab olish</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Sariq Bolla Pizza. Barcha huquqlar himoyalangan.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Maxfiylik siyosati</a>
                        <a href="#" className="hover:text-white">Foydalanish shartlari</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
