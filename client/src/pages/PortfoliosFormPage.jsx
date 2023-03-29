import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import {Navigate, useParams} from "react-router-dom";

export default function PortfoliosFormPage() {
  const [redirect, setRedirect] = useState(false);
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [experience,setExperience] = useState('')
  const [address,setAddress] = useState('');
  const [price,setPrice] = useState(100);
  useEffect(() => {
    if (!id) {
      return;
    }
    console.log('ID:', id);
    axios.get('/portfolios/'+id).then(response => {
        
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setDescription(data.description);
       setPrice(data.price);
       setExperience(data,experience);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePortfolio(ev) {
    ev.preventDefault();
    const portfolioData = {
      title, address,
      description, price, experience,
    };
    if (id) {
      // update
      await axios.put('/portfolios', {
        id, ...portfolioData
      });
      setRedirect(true);
    } else {
      // new portfolio
      await axios.post('/portfolios', portfolioData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/stylistaccount/portfolio'} />
  }

  return (
    <div>
        <header>
      <AccountNav />
      <form onSubmit={savePortfolio}>
        {preInput('Title', 'Title for your portfolio. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: John's officewear "  className="rounded-lg px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        {preInput('Address', 'City where you live')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="address"  className="rounded-lg px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        {preInput('Description','Describe your style')}
        <input type={description} onChange={ev => setDescription(ev.target.value)} placeholder="Formal/Casual/Sporty?"  className="rounded-lg px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        {preInput('Your experience')}
        <input type={experience} onChange={ev => setExperience(ev.target.value)}placeholder="How many years?"  className="rounded-lg px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Price</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)} placeholder="Per hour!"  className="rounded-lg px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
          </div>
        </div>
        <button className="inline-flex gap-1 bg-purple-900 text-white py-2 px-6 rounded-full">Save</button>
      </form>
      </header>
    </div>

  );
}