import React from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeCartItem } from '../redux/userSlice';

function FoodCard({data}) {
const {cartItems}=useSelector(state=>state.user)
const dispatch=useDispatch()

const cartItem = cartItems.find(i=>i.id === data._id)
const quantity = cartItem ? cartItem.quantity : 0

    const renderStars=(rating)=>{   
        const stars=[];
        for (let i = 1; i <= 5; i++) {
           stars.push(
            (i<=rating)?(
                <FaStar key={i} className='text-yellow-500 text-lg'/>
            ):(
                <FaRegStar key={i} className='text-yellow-500 text-lg'/>
            )
           )
        }
return stars
    }

const handleIncrease=()=>{
    if (quantity === 0) {
        dispatch(addToCart({
          id:data._id,
          name:data.name,
          price:data.price,
          image:data.image,
          shop:data.shop,
          quantity: 1,
          foodType:data.foodType
        }))
    } else {
        dispatch(updateQuantity({id: data._id, quantity: quantity + 1}))
    }
}
const handleDecrease=()=>{
    if(quantity > 1){
        dispatch(updateQuantity({id: data._id, quantity: quantity - 1}))
    } else if (quantity === 1) {
        dispatch(removeCartItem(data._id))
    }
}

  return (
    <div className='group w-[250px] rounded-3xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col'>
      <div className='relative w-full h-[170px] flex justify-center items-center bg-white'>
        <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10'>
          {data.foodType=="veg"?<FaLeaf className='text-green-600 text-base'/>:<FaDrumstickBite className='text-red-600 text-base'/>}
        </div>
        <img src={data.image} alt="" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'/>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <h1 className='font-semibold text-gray-900 text-base truncate'>{data.name}</h1>
        <div className='flex items-center gap-1 mt-1'>
        {renderStars(data.rating?.average || 0)}
        <span className='text-xs text-gray-500'>
            {data.rating?.count || 0}
        </span>
        </div>
      </div>
      <div className='flex items-center justify-between mt-auto p-3'>
        <span className='font-bold text-gray-900 text-lg'>
            &#8377;{data.price}
        </span>
        <div className='flex items-center border rounded-full overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]'>
        {quantity > 0 ? (
            <>
        <button className='px-2 py-1 hover:bg-gray-100 transition cursor-pointer' onClick={handleDecrease}>
        <FaMinus size={12}/>
        </button>
        <span className='px-2 font-medium'>{quantity}</span>
        <button className='px-2 py-1 hover:bg-gray-100 transition cursor-pointer' onClick={handleIncrease}>
        <FaPlus size={12}/>
        </button>
            </>
        ) : (
        <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 transition-colors flex items-center gap-2 text-sm font-medium w-full cursor-pointer' onClick={handleIncrease}>
        <span>Add</span> <FaShoppingCart size={14}/>
        </button>
        )}
        </div>
      </div>
    </div>
  )
}

export default FoodCard
