import React from 'react';
import HeaderLinkDropdown from './HeaderLinkDropdown';

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
        <HeaderLinkDropdown />
      </div>
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
