import { createContext, useContext, useState, ReactNode } from 'react';

type TravelType = 'Inbound' | 'Outbound' | null;

interface TravelContextType {
    travelType: TravelType;
    setTravelType: (type: TravelType) => void;
    isFirstVisit: boolean;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export function TravelProvider({ children }: { children: ReactNode }) {
    const [travelType, setTravelTypeState] = useState<TravelType>(() => {
        return sessionStorage.getItem('travelType') as TravelType || null;
    });

    const [isFirstVisit, setIsFirstVisit] = useState(true);

    const setTravelType = (type: TravelType) => {
        setTravelTypeState(type);
        if (type) {
            sessionStorage.setItem('travelType', type);
        } else {
            sessionStorage.removeItem('travelType');
        }
        setIsFirstVisit(false);
    };

    return (
        <TravelContext.Provider value={{ travelType, setTravelType, isFirstVisit }}>
            {children}
        </TravelContext.Provider>
    );
}

export function useTravel() {
    const context = useContext(TravelContext);
    if (context === undefined) {
        throw new Error('useTravel must be used within a TravelProvider');
    }
    return context;
}
