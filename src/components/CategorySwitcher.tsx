import { Globe, Plane } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

interface CategorySwitcherProps {
    className?: string;
    isDark?: boolean;
}

export function CategorySwitcher({ className = '', isDark = false }: CategorySwitcherProps) {
    const { travelType, setTravelType } = useTravel();

    const textColor = isDark ? 'text-gray-800' : 'text-white';
    const bgColor = isDark ? 'bg-gray-200/50' : 'bg-white/10';
    const getBorderColor = () => {
        if (travelType === 'Inbound') return 'border-orange-500';
        if (travelType === 'Outbound') return 'border-blue-600';
        return isDark ? 'border-gray-300' : 'border-white/20';
    };

    return (
        <div className={`hidden lg:flex items-center p-1 ${bgColor} backdrop-blur-md rounded-full border-[0.5px] ${getBorderColor()} transition-all duration-300 ${className}`}>
            <button
                onClick={() => setTravelType('Inbound')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${travelType === 'Inbound'
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : `${textColor} opacity-60 hover:opacity-100`
                    }`}
            >
                <Globe size={12} />
                SL
            </button>
            <button
                onClick={() => setTravelType('Outbound')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${travelType === 'Outbound'
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : `${textColor} opacity-60 hover:opacity-100`
                    }`}
            >
                <Plane size={12} />
                Global
            </button>
        </div>
    );
}
