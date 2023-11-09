import React from 'react';
import K3sIcon from '../images/icon-k3s.svg';
import { Link } from 'gatsby';

const Layout = ({ children }) => (
  <>
    {/* <nav>
      <ul>
        <li>
          <Link to="/">Index</Link>
          <Link to="/k3s">K3s</Link>
        </li>
      </ul>
    </nav> */}
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/">
          <div className="flex flex-row items-center">
            <K3sIcon className="h-9 pr-4" />
            <h1 className="text-3xl font-bold tracking-tight text-[#064a6e]">K3s versions</h1>
          </div>
        </Link>
      </div>
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
