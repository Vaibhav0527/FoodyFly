import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import CategoryCard from './CategoryCard'
import { categories } from '../category'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';



const UserDashboard = () => {

  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
 
  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)
 
  
  

 

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if (element) {
      setLeftButton(element.scrollLeft > 0)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
    }
  }

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  const handleFilterByCategory = (category) => {
    console.log("Filter by category:", category);
  }

  useEffect(() => {
    const cateScroll = () => {
      if (cateScrollRef.current) updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
    };
    const shopScroll = () => {
      if (shopScrollRef.current) updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    };

    if (cateScrollRef.current) {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
      cateScrollRef.current.addEventListener('scroll', cateScroll);
    }
    if (shopScrollRef.current) {
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      shopScrollRef.current.addEventListener('scroll', shopScroll);
    }

    return () => {
      cateScrollRef.current?.removeEventListener('scroll', cateScroll);
      shopScrollRef.current?.removeEventListener('scroll', shopScroll);
    };
  }, [categories]);

  return (
    <div className='w-screen min-h-screen flex flex-col gap-8 items-center bg-[#fff9f6] overflow-y-auto pb-10'>
      <Nav />

     

      {/* Inspiration for First Order */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] mt-24">
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
        <div className='w-full relative'>
          {showLeftCateButton &&
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(cateScrollRef, "left")}>
              <FaCircleChevronLeft />
            </button>
          }

          <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={cateScrollRef}>
            {categories.map((cate, index) => (
              <CategoryCard
                name={cate.category}
                image={cate.image}
                key={index}
                onClick={() => handleFilterByCategory(cate.category)}
              />
            ))}
          </div>

          {showRightCateButton &&
            <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(cateScrollRef, "right")}>
              <FaCircleChevronRight />
            </button>
          }
        </div>
      </div>

     
      
    </div>
  )
}

export default UserDashboard
