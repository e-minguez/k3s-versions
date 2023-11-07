import React from "react";
import { Link } from "gatsby";

const Layout = ({ children }) => (
  <>
    <nav>
      <ul>
        <li>
          <Link to="/">Index</Link>
          <Link to="/k3s">K3s</Link>
        </li>
      </ul>
    </nav>
    <main>{children}</main>
  </>
);

export default Layout;
