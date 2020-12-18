import React from 'react';

const PageNotFound = () => {
  return (
    <div className="container" style={
      {flexGrow: '1', width: '100%',boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}
    }>
      <span style={{fontSize: '2rem'}}>This Page doesn't exist yet</span>
    </div>
  );
};

export default PageNotFound;
