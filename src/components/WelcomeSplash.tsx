import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Plane, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

interface WelcomeSplashProps {
    onComplete?: () => void;
    showSelection?: boolean;
}

export function WelcomeSplash({ onComplete, showSelection: showSelectionProp = false }: WelcomeSplashProps) {
    const [showSelection, setShowSelection] = useState(showSelectionProp);
    const { travelType, setTravelType } = useTravel();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (travelType) {
                if (onComplete) onComplete();
                navigate('/');
            } else {
                setShowSelection(true);
            }
        }, 2200);
        return () => clearTimeout(timer);
    }, [travelType, onComplete, navigate]);

    const handleSelection = (type: 'Inbound' | 'Outbound') => {
        setTravelType(type);
        if (onComplete) onComplete();
        navigate('/');
    };

    // Advanced Easing: Liquid Smooth Quart [0.16, 1, 0.3, 1]
    const liquidTransition: any = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };
    const bloomTransition: any = { duration: 1.5, ease: [0.22, 1, 0.36, 1] };

    const containerVariants = {
        initial: { opacity: 1 },
        exit: {
            opacity: 0,
            scale: 1.4,
            filter: 'blur(15px)',
            transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] as any }
        }
    };

    const logoAreaVariants = {
        animate: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 30, scale: 0.9 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: bloomTransition
        }
    };

    const panelVariants = {
        initial: (custom: number) => ({
            x: custom === 0 ? '-100%' : '100%',
        }),
        animate: {
            x: 0,
            transition: liquidTransition
        }
    };

    const panelContentVariants = {
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 bg-blue-950/20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] opacity-20" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-orange-600/10 rounded-full blur-[150px] opacity-15" />
            </div>

            <AnimatePresence mode="wait">
                {!showSelection ? (
                    <motion.div
                        key="intro"
                        variants={logoAreaVariants}
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, scale: 0.8, filter: 'blur(20px)', transition: { duration: 1 } }}
                        className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center"
                    >
                        <motion.div variants={itemVariants} className="relative inline-block mb-10">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 to-blue-500/30 rounded-full blur-3xl scale-150" />
                            <img
                                src="/logo/76293549293501.png"
                                alt="Wego Travels"
                                className="h-24 md:h-36 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            />
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-6xl md:text-[11rem] font-black text-white tracking-tighter leading-[0.9] mb-8"
                        >
                            Wego<span className="text-orange-500">Travels.</span>
                        </motion.h1>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center gap-6"
                        >
                            <div className="h-[1px] w-16 bg-white/10" />
                            <p className="text-blue-200/40 uppercase text-xs font-bold tracking-[0.6em]">
                                Premium Voyage Curation
                            </p>
                            <div className="h-[1px] w-16 bg-white/10" />
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full flex flex-col md:flex-row"
                    >
                        {/* Sri Lanka (Inbound) Panel */}
                        <motion.div
                            custom={0}
                            variants={panelVariants}
                            initial="initial"
                            animate="animate"
                            onClick={() => handleSelection('Inbound')}
                            className="relative flex-1 group cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10"
                        >
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2000"
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                    alt="Sri Lanka"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            </div>

                            <motion.div
                                variants={panelContentVariants}
                                className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center"
                            >
                                <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
                                    <div className="h-[1px] w-12 bg-orange-500/50" />
                                    <Globe className="text-orange-500 w-8 h-8 md:w-16 md:h-16" />
                                    <div className="h-[1px] w-12 bg-orange-500/50" />
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                                    Sri Lanka
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-orange-500 uppercase text-xs font-bold tracking-[0.4em] mb-12">Inbound Experience</motion.p>

                                <motion.div
                                    variants={itemVariants}
                                    className="h-16 w-16 md:h-24 md:w-24 rounded-full border border-white/20 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 transition-all duration-700"
                                >
                                    <ArrowRight className="text-white w-6 h-6 md:w-10 md:h-10 transform group-hover:translate-x-2 transition-transform" />
                                </motion.div>
                            </motion.div>
                            <div className="absolute inset-x-0 bottom-0 h-2 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </motion.div>

                        {/* Global (Outbound) Panel */}
                        <motion.div
                            custom={1}
                            variants={panelVariants}
                            initial="initial"
                            animate="animate"
                            onClick={() => handleSelection('Outbound')}
                            className="relative flex-1 group cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2000"
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                    alt="Global Tours"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            <motion.div
                                variants={panelContentVariants}
                                className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center"
                            >
                                <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
                                    <div className="h-[1px] w-12 bg-blue-500/50" />
                                    <Plane className="text-blue-400 w-8 h-8 md:w-16 md:h-16" />
                                    <div className="h-[1px] w-12 bg-blue-500/50" />
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                                    Global
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-blue-400 uppercase text-xs font-bold tracking-[0.4em] mb-12">Worldwide Adventures</motion.p>

                                <motion.div
                                    variants={itemVariants}
                                    className="h-16 w-16 md:h-24 md:w-24 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-400 transition-all duration-700"
                                >
                                    <ArrowRight className="text-white w-6 h-6 md:w-10 md:h-10 transform group-hover:translate-x-2 transition-transform" />
                                </motion.div>
                            </motion.div>
                            <div className="absolute inset-x-0 bottom-0 h-2 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />
                        </motion.div>

                        {/* Floating Center Brand */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block">
                            <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ delay: 1, type: "spring", stiffness: 100, damping: 15 }}
                                className="h-28 w-28 bg-black/60 backdrop-blur-3xl rounded-full border border-white/10 p-5 shadow-2xl"
                            >
                                <img src="/logo/76293549293501.png" alt="Wego" className="h-full w-full object-contain filter brightness-125" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
