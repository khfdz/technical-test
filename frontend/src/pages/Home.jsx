import React from 'react';
import Product from '../components/Product';
import SideBar from '../components/SideBar';
import Order from '../components/Order';

function Home() {
  return (
    <div className='grid grid-rows-2'>

      
      <SideBar />

      <div className='ml-72 mr-8'>
      <Product />

      <Order />
      
      </div>
      
    

    </div>
  );
}

export default Home;