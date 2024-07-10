import React from 'react';
import Product from '../components/Product';
import SideBar from '../components/SideBar';

function Home() {
  return (
    <div className='grid grid-rows-2'>

      <div className='ml-72 mr-8'>
      <Product />
      </div>

      <div>
      <SideBar />
      </div>
    </div>
  );
}

export default Home;