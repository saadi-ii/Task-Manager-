import React from 'react'

export const Tip = () => {
  return (
    <div className='flex flex-col justify-center items-start text-chart-1 bg-accent gap-2 w-70 aspect-auto max-lg:w-50  p-5 border border-chart-1 rounded-2xl '>
      <h1 className='text-black font-bold text-2xl max-lg:text-2xl '>Task Tip</h1>
      <div className='text-justify'>{`Did you know? Breaking a "Big Task" into 3 small ones (Update) makes it 40% easier to start.`}</div>
    </div>
  )
}

