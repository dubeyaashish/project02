import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import AccountNav from "../AccountNav";

export default function AllPortfolioPage() {
  const [portfolios,setPortfolios] = useState([]);
  useEffect(() => {
    axios.get('/portfolios').then(response => {
      setPortfolios(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {portfolios.length > 0 && portfolios.map(portfolio => (
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{portfolio.title}</h2>
              <p className="text-gray-700 text-base mb-2 font-bold">Years of Experience: {portfolio.experience}</p>
              <p className="text-gray-700 text-base mb-2 font-bold">Stylist: {portfolio.name}</p>
              <p className="text-gray-700 text-base mb-4">{portfolio.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold">Baht{portfolio.price} per day</div>
                <Link to={'/portfolio/'+portfolio._id} className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        }