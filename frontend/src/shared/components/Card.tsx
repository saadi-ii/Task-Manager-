import React from 'react'
import { IconType } from 'react-icons';

export const SingleCard = ({heading,discription}:{
    heading:string,
    discription:string
}) => {
  return (
    <div className='flex flex-col justify-center items-center mx-20 max-sm:mx-5 max-xl:mx-10 max-xl:my-5 gap-2'>
      <h1 className='font-bold text-4xl  text-chart-1'>{heading}</h1>
      <div>{discription}</div>
    </div>
  )
}

