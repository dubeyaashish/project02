import {Link, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
export default function PortfoliosPage() {
  const [portfolios,setPortfolios] = useState([]);
  useEffect(() => {
    axios.get('/stylist-portfolios').then(({data}) => {
      setPortfolios(data);
    });
  }, []);

  const deletePortfolio = (portfolioId) => {
    const confirmed = window.confirm('Are you sure you want to delete this portfolio?');
    if (confirmed) {
      axios.delete(`/stylist-portfolios/${portfolioId}`)
        .then(({data}) => {
          setPortfolios(portfolios.filter(p => p._id !== portfolioId));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  
  
  return (
    <div>
      <AccountNav />
        <div className="text-center">
        <Link className="inline-flex gap-1 bg-purple-900 text-white py-2 px-6 rounded-full" to={'/stylistaccount/portfolios/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new portfolio
          </Link>
        </div>
        <div className="mt-4">
          {portfolios.length > 0 && portfolios.map(portfolio => (
            <Link to={'/stylistaccount/portfolios/'+portfolio._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="grow-0 shrink">
              <h2 className="text-2xl font-bold mb-2">{portfolio.title}</h2>
              <p className="text-gray-600 text-lg mb-2">{portfolio.description}</p>
              <p className="text-sm mb-1">{portfolio.address}</p>
              <p className="text-sm mb-1">Price: {portfolio.price}</p>
              <p className="text-sm mb-2">Experience: {portfolio.experience}</p>
              <button className="bg-purple-900 text-white py-2 px-4 rounded" onClick={() => deletePortfolio(portfolio._id)}>Delete</button>
   
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}