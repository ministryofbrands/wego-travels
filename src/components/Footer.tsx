import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
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
                            <SocialIcon icon={<Facebook size={20} />} href="#" />
                            <SocialIcon icon={<Instagram size={20} />} href="#" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-orange-500">Discover</h4>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                            <li><Link to="/destinations" className="hover:text-orange-500 transition-colors">Destinations</Link></li>
                            <li><Link to="/services" className="hover:text-orange-500 transition-colors">Services</Link></li>
                            <li><Link to="/experiences" className="hover:text-orange-500 transition-colors">Experiences</Link></li>
                        </ul>
                    </div>

                    {/* More Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-orange-500">Community</h4>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li><Link to="/blogs" className="hover:text-orange-500 transition-colors">Travel Blogs</Link></li>
                            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-orange-500">Get in Touch</h4>
                        <div className="space-y-4 text-gray-300 text-sm">
                            {/* Added a placeholder address to balance the layout, as displayed in the previous mock-up attempt */}
                            <div className="flex items-start space-x-3">
                                <MapPin size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>123 Adventure Way, Wanderlust City, WL 10101</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                                <span>hello@wegotravels.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
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
