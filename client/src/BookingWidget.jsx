import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.js";
import {StylistContext} from "./StylistContext.js";
import {PortfolioContext} from "./PortfolioContext.js";


export default function BookingWidget({place}) {
  const [redirect,setRedirect] = useState('');
  const [name,setName] = useState('');
  const {user} = useContext(UserContext);
  const {stylist} = useContext(StylistContext);
  const {portfolio} = useContext(PortfolioContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function bookThisPortfolio() {
    const response = await axios.post('/bookings', {
        portfolio:portfolio._id,
        user: user._id,
        stylist: stylist._id,
        userName: user.name,
        stylistName: stylist.name,
        title: portfolio.title,
        price: portfolio.price
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: Baht{portfolio.price} / per day
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">

          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            {user.name} {user.surname}
            <label>Email:</label>
            {user.email}
          </div>
      </div>
      <button onClick={bookThisPortfolio} className="primary mt-4">
        Book this Stylist
      </button>
    </div>
    </div>
  );
}