import React from 'react';
import DetailsPanel from './DetailsPanel';

export default function DetailsPanels({ versionDetailsData, open, onClose }) {
  return (
    <>
      {versionDetailsData.nodes.map((versionDetail) => (
        <DetailsPanel
          key={versionDetail.id}
          versionDetail={versionDetail}
          isOpen={open === versionDetail.parent.name}
          onClose={onClose}
        />
      ))}
    </>
  );
}
