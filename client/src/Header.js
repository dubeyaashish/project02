import { useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";
import { StylistContext } from "./StylistContext";
export default function Header() {
  const {user} = useContext(UserContext);
  const {stylist} = useContext(StylistContext);

  if (user) {
    return (
        <header className='p-4 flex justify-between bg-purple-900'>
        <Link to={'/'} className="flex items-center gap-1">
          <span className="font-bold text-xl">Ishtyle</span>
        </Link>
        <Link to={user?'/account':'/login'} className='flex gap-4 border py-2 px-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
          </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </header>
    );
  } else if (stylist) {
    return (
      <header className='p-4 flex justify-between bg-purple-900'>
      <Link to={'/'} className="flex items-center gap-1">
        <span className="font-bold text-xl">Ishtyle</span>
      </Link>
      <Link to={stylist?'/stylistaccount':'/stylistlogin'} className='flex gap-4 border py-2 px-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden '>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>
        </div>
        {!!stylist && (
          <div>
            {stylist.name}
          </div>
        )}
      </Link>
    </header>
  );

}
}