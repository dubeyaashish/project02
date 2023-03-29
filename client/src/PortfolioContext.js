import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PortfolioContext = createContext({});

export function PortfolioContextProvider({children}) {
    const [portfolio, setPortfolio] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        console.log("Fetching portfolio data...");
        axios.get('/portfolios')
          .then(({data}) => {
            console.log("Received portfolio data:", data);
            setPortfolio(data);
            setReady(true);
          })
          .catch((error) => {
            console.error("Error fetching portfolio data:", error);
            setReady(true);
          });
    }, []);
    
    return(
        <PortfolioContext.Provider value={{portfolio, setPortfolio, ready}}>
            {children}
        </PortfolioContext.Provider>

    );
}
