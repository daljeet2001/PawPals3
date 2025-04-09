import { createContext, useState, useContext } from 'react';

export const DogwalkerDataContext = createContext();

const DogwalkerContext = ({ children }) => {
    const [ Dogwalker, SetDogwalker ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const updateDogwalker = (DogwalkerData) => {
        SetDogwalker(DogwalkerData);
    };

    const value = {
        Dogwalker,
        SetDogwalker,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateDogwalker
    };

    return (
        <DogwalkerDataContext.Provider value={value}>
            {children}
        </DogwalkerDataContext.Provider>
    );
};

export default DogwalkerContext;