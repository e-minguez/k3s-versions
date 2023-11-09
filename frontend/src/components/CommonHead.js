import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

/* https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/ */

const CommonHead = ({ children, title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <html lang="en" className="bg-slate-200 h-full" />
      <body className="h-full" />
      <title>
        {title && `${title} |`} {data.site.siteMetadata.title}
      </title>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      {children}
    </>
  );
};

export default CommonHead;
