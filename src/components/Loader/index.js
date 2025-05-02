import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
    <Circles height="80" width="80" color="#007bff" />
  </div>
);

export default Loader;