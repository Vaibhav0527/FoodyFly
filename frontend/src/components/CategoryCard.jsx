import React from 'react'

function CategoryCard({name,image,onClick}) {
  return (
    <div className='cursor-pointer flex flex-col items-center gap-3 shrink-0 group' onClick={onClick}>
      <div className='w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full border-[3px] border-transparent hover:border-[#ff4d2d] shrink-0 overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgb(255,77,45,0.15)] hover:-translate-y-2 transition-all duration-300 relative'>
        <img src={image} alt={name} className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500'/>
      </div>
      <span className='text-sm md:text-base font-semibold text-slate-700 group-hover:text-[#ff4d2d] transition-colors duration-300'>{name}</span>
    </div>
  )
}

export default CategoryCard
