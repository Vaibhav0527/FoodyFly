import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import CategoryCard from './CategoryCard'
import { categories } from '../category'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';
import { useNavigate } from 'react-router-dom';
import availfood from '../assets/foodavaiable.png'
import restrofound from '../assets/restrofound.png'

const UserDashboard = () => {

  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(state => state.user)
  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)
  const [updatedItemsList, setUpdatedItemsList] = useState([])
  const navigate = useNavigate()

  const handleFilterByCategory = (category) => {
    if (category === "All") {
      setUpdatedItemsList(itemsInMyCity)
    } else {
      const filteredList = itemsInMyCity?.filter(i => i.category === category)
      setUpdatedItemsList(filteredList)
    }
  }

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity)
  }, [itemsInMyCity])

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

  useEffect(() => {
    if (cateScrollRef.current) {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)

      const cateScroll = () => updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      const shopScroll = () => updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)

      cateScrollRef.current.addEventListener('scroll', cateScroll)
      shopScrollRef.current.addEventListener('scroll', shopScroll)

      return () => {
        cateScrollRef.current?.removeEventListener('scroll', cateScroll)
        shopScrollRef.current?.removeEventListener('scroll', shopScroll)
      }
    }
  }, [categories])

  return (
    <div className='w-screen min-h-screen flex flex-col gap-8 items-center bg-slate-50 overflow-y-auto pb-10 font-sans'>
      <Nav />

      {/* Hero Banner Section */}
      <div className='w-full pt-20 pb-4'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 w-full'>
          <div className='w-full bg-gradient-to-r from-orange-500 to-[#ff4d2d] rounded-3xl p-8 sm:p-14 text-white shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[300px]'>
            {/* Decorative background circle */}
            <div className='absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl'></div>
            
            <div className='relative z-10 max-w-2xl'>
              <h1 className='text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight leading-tight'>
                Craving something <br/> <span className='text-yellow-300'>delicious?</span>
              </h1>
              <p className='text-lg sm:text-xl opacity-90 mb-8 font-medium'>
                Discover the best food and drinks in {currentCity}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchItems && searchItems.length > 0 && (
        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4'>
          <h1 className='text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2'>
            Search Results
          </h1>
          <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
            {searchItems.map(item => <FoodCard data={item} key={item._id} />)}
          </div>
        </div>
      )}

      {/* Inspiration for First Order */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start px-4 sm:px-6">
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight'>Inspiration for your first order</h1>
        <div className='w-full relative'>
          {showLeftCateButton &&
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(cateScrollRef, "left")}>
              <FaCircleChevronLeft />
            </button>
          }

          <div className='w-full flex overflow-x-auto no-scrollbar gap-4 pb-2' ref={cateScrollRef}>
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

      {/* Best Shops */}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start px-4 sm:px-6 mt-4'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight'>Best Shops in {currentCity}</h1>
        <div className='w-full relative'>
          {showLeftShopButton &&
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(shopScrollRef, "left")}>
              <FaCircleChevronLeft />
            </button>
          }

          <div className='w-full flex overflow-x-auto no-scrollbar gap-4 pb-2' ref={shopScrollRef}>
            {shopInMyCity?.length > 0 ? (
              shopInMyCity.map((shop, index) => (
                <CategoryCard
                  name={shop.name}
                  image={shop.image}
                  key={index}
                  onClick={() => navigate(`/shop/${shop._id}`)}
                />
              ))
            ) : (
              <div className='flex flex-col items-center justify-center w-full py-10'>
                <img src={restrofound} alt="No shops found" className='w-56 h-56 object-contain opacity-90' />
                <p className='text-gray-600 text-lg mt-3 font-medium'>No registered shops found in your city</p>
              </div>
            )}
          </div>

          {showRightShopButton &&
            <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(shopScrollRef, "right")}>
              <FaCircleChevronRight />
            </button>
          }
        </div>
      </div>

      {/* Suggested Food Items */}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start px-4 sm:px-6 mt-4'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2'>Suggested Food Items</h1>

        <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center sm:justify-start'>
          {updatedItemsList?.length > 0 ? (
            updatedItemsList.map((item, index) => (
              <FoodCard key={index} data={item} />
            ))
          ) : (
            <div className='flex flex-col items-center justify-center w-full py-10'>
              <img src={availfood} alt="No food available" className='w-56 h-56 object-contain opacity-90' />
              <p className='text-gray-600 text-lg mt-3 font-medium'>No available food items right now</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
