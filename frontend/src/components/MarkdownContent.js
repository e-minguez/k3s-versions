import React from 'react';
import '../styles/markdown.css';

const MarkdownContent = ({ content }) => {
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />;
};

export default MarkdownContent;
