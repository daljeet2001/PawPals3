import React, { createContext, useState } from 'react'

export const RequestDataContext = createContext()


const RequestContext = ({ children }) => {

    const [ Requests, setRequests ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const updateRequests = (data) => {
        setRequests(data);
    };

    const value = {
        Requests,
        setRequests,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateRequests,
    };
     
    

    return (
        <div>
            <RequestDataContext.Provider value={value}>
                {children}
            </RequestDataContext.Provider>
        </div>
    )
}

export default RequestContext