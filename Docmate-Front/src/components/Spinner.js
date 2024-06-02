import React from 'react';
import { Dna } from  'react-loader-spinner';

export const Spinner = () => {
  return (
    <div className='spinner'><Dna
    visible={true}
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
  /></div>
  )
}
