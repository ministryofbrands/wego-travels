import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Footer() {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <footer className="bg-blue-950 text-white pt-12 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="inline-block">
                            <img
                                src="/logo/76293549293501.png"
                                alt="Wego Travels Logo"
                                className="h-30 w-auto object-contain hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Exploring the world, one adventure at a time. We curate unforgettable experiences that connect you with the beauty of our planet.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <SocialIcon icon={<Facebook size={20} />} href="https://www.facebook.com/share/12LbiwLgY4f/" />
                            <SocialIcon icon={<Instagram size={20} />} href="https://www.instagram.com/wego.travelspvtltd?igsh=ZXR5bHl0NWhwNmFh" />
                            <SocialIcon icon={<Tiktok size={20} />} href="https://www.tiktok.com/@wego_travels?_r=1&_t=ZS-93CDoMkCQvU" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-orange-500">Discover</h4>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li><Link to="/about" className={`hover:text-orange-500 transition-colors ${isActive('/about') ? 'text-orange-500' : ''}`}>About Us</Link></li>
                            <li><Link to="/destinations" className={`hover:text-orange-500 transition-colors ${isActive('/destinations') ? 'text-orange-500' : ''}`}>Destinations</Link></li>
                            <li><Link to="/services" className={`hover:text-orange-500 transition-colors ${isActive('/services') ? 'text-orange-500' : ''}`}>Services</Link></li>
                            <li><Link to="/experiences" className={`hover:text-orange-500 transition-colors ${isActive('/experiences') ? 'text-orange-500' : ''}`}>Experiences</Link></li>
                        </ul>
                    </div>

                    {/* More Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-orange-500">Community</h4>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li><Link to="/blogs" className={`hover:text-orange-500 transition-colors ${isActive('/blogs') ? 'text-orange-500' : ''}`}>Travel Blogs</Link></li>
                            <li><Link to="/contact" className={`hover:text-orange-500 transition-colors ${isActive('/contact') ? 'text-orange-500' : ''}`}>Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-orange-500">Get in Touch</h4>
                        <div className="space-y-4 text-gray-300 text-sm">
                            {/* Added a placeholder address to balance the layout, as displayed in the previous mock-up attempt */}
                            <div className="flex items-start space-x-3">
                                <MapPin size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>No 151, Gattuwana Junction, Kandy Road, Kurunagala, Sri Lanka</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                                <span>wegotravelss@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                                <span>+94 77 622 4546</span>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal & Compliance Bottom Bar */}
                <div className="border-t border-blue-900 pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
                            <p>© {new Date().getFullYear()} WEGOTravels. All rights reserved.</p>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 text-[10px] uppercase tracking-widest font-medium">
                            <Link to="/privacy-policy" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</Link>
                            <Link to="/terms-conditions" className="text-gray-400 hover:text-orange-500 transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            className="bg-blue-900/50 p-2 rounded-full text-gray-300 hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1"
        >
            {icon}
        </a>
    );
}

function Tiktok({ size = 24, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M19.3205 7C17.7605 6.78 16.5105 5.56 16.1405 4H12.7805V15.34C12.7805 17.55 10.9905 19.34 8.78052 19.34C6.57052 19.34 4.78052 17.55 4.78052 15.34C4.78052 13.13 6.57052 11.34 8.78052 11.34C9.17052 11.34 9.54052 11.4 9.89052 11.51V8.04C9.53052 7.97 9.16052 7.93 8.78052 7.93C4.69052 7.93 1.37052 11.24 1.37052 15.34C1.37052 19.43 4.69052 22.75 8.78052 22.75C12.8705 22.75 16.1905 19.43 16.1905 15.34V9.6C17.4805 10.53 19.0605 11.08 20.7605 11.08V7.61C20.2705 7.61 19.7805 7.4 19.3205 7Z" />
        </svg>
    );
}
