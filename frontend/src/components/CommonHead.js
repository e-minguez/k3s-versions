import React from 'react';

/* https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/ */

const CommonHead = ({ children }) => (
  <>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
    {children}
  </>
);

export default CommonHead;
