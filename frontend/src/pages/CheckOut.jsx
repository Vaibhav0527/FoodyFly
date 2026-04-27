import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5"
import { TbCurrentLocation } from "react-icons/tb"
import { IoLocationSharp } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { MdDeliveryDining } from "react-icons/md"
import { FaCreditCard } from "react-icons/fa"
import axios from 'axios'
import { FaMobileScreenButton } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/userSlice'
import { serverUrl } from '../App'

function CheckOut() {
  const { cartItems, totalAmount } = useSelector(state => state.user)
  const [addressInput, setAddressInput] = useState("")
  const [location, setLocation] = useState({ lat: 19.076, lon: 72.8777 })
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const deliveryFee = totalAmount > 500 ? 0 : 40
  const amountWithDeliveryFee = totalAmount + deliveryFee

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${"f7e3db0551cb4488bc4dca19cc686f56"}`)
      setAddressInput(result?.data?.results?.[0]?.address_line2 || "")
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      setLocation({ lat: latitude, lon: longitude })
      getAddressByLatLng(latitude, longitude)
    })
  }

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${"f7e3db0551cb4488bc4dca19cc686f56"}`)
      const { lat, lon } = result.data.features[0].properties
      setLocation({ lat, lon })
    } catch (error) {
      console.log(error)
      alert("Address lookup failed")
    }
  }

  const openRazorpayWindow = (orderId, razorOrder) => {
    const options = {
      key: "rzp_test_RTG6UVPhFDFKyw",
      amount: razorOrder.amount,
      currency: 'INR',
      name: "Vingo",
      description: "Food Delivery Website",
      order_id: razorOrder.id,
      handler: async function (response) {
        try {
          await axios.post(`${serverUrl}/api/order/verify-payment`, {
            razorpay_payment_id: response.razorpay_payment_id,
            orderId
          }, { withCredentials: true })

          dispatch(clearCart())
          alert("Payment successful. Order placed successfully")
          navigate("/")
        } catch (error) {
          console.log(error)
          alert(error?.response?.data?.message || "Payment verification failed")
        }
      }
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load")
      return
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handlePlaceOrder = async () => {
    if (!cartItems?.length) {
      alert("Your cart is empty")
      return
    }

    if (!addressInput.trim()) {
      alert("Please enter delivery address")
      return
    }

    try {
      setIsPlacingOrder(true)

      let selectedLocation = location
      if (!selectedLocation?.lat || !selectedLocation?.lon) {
        const geoResult = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${"f7e3db0551cb4488bc4dca19cc686f56"}`)
        const { lat, lon } = geoResult.data.features[0].properties
        selectedLocation = { lat, lon }
        setLocation(selectedLocation)
      }

      const result = await axios.post(`${serverUrl}/api/order/place-order`, {
        paymentMethod,
        deliveryAddress: {
          text: addressInput,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lon
        },
        totalAmount: amountWithDeliveryFee,
        cartItems
      }, { withCredentials: true })

      if (paymentMethod === "cod") {
        dispatch(clearCart())
        alert("Order placed successfully")
        navigate("/")
      } else {
        const orderId = result.data.orderId
        const razorOrder = result.data.razorOrder
        openRazorpayWindow(orderId, razorOrder)
      }
    } catch (error) {
      console.log(error)
      alert(error?.response?.data?.message || "Failed to place order")
    } finally {
      setIsPlacingOrder(false)
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className='min-h-screen bg-[#fff9f6] flex items-center justify-center p-6'>
      <div className=' absolute top-[20px] left-[20px] z-[10]' onClick={() => navigate("/")}>
        <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
      </div>

      <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Checkout</h1>

        <section>
          <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'><IoLocationSharp className='text-[#ff4d2d]' /> Delivery Location</h2>

          <div className='flex gap-2 mb-3'>
            <input type="text" className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]' placeholder='Enter Your Delivery Address..' value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
            <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getLatLngByAddress}><IoSearchOutline size={17} /></button>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getCurrentLocation}><TbCurrentLocation size={17} /></button>
          </div>

          <div className='rounded-xl border bg-gray-50 p-3 text-sm text-gray-700'>
            <p>Latitude: {location?.lat?.toFixed ? location.lat.toFixed(6) : location?.lat}</p>
            <p>Longitude: {location?.lon?.toFixed ? location.lon.toFixed(6) : location?.lon}</p>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "cod" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"
              }`} onClick={() => setPaymentMethod("cod")}>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100'>
                <MdDeliveryDining className='text-green-600 text-xl' />
              </span>
              <div>
                <p className='font-medium text-gray-800'>Cash On Delivery</p>
                <p className='text-xs text-gray-500'>Pay when your food arrives</p>
              </div>
            </div>

            <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "online" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"
              }`} onClick={() => setPaymentMethod("online")}>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'>
                <FaMobileScreenButton className='text-purple-700 text-lg' />
              </span>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                <FaCreditCard className='text-blue-700 text-lg' />
              </span>
              <div>
                <p className='font-medium text-gray-800'>UPI / Credit / Debit Card</p>
                <p className='text-xs text-gray-500'>Pay Securely Online</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-3 text-gray-800'>Order Summary</h2>
          <div className='rounded-xl border bg-gray-50 p-4 space-y-2'>
            {cartItems.map((item, index) => (
              <div key={index} className='flex justify-between text-sm text-gray-700'>
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <hr className='border-gray-200 my-2' />

            <div className='flex justify-between font-medium text-gray-800'>
              <span>Subtotal</span>
              <span>{totalAmount}</span>
            </div>
            <div className='flex justify-between text-gray-700'>
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : deliveryFee}</span>
            </div>
            <div className='flex justify-between text-lg font-bold text-[#ff4d2d] pt-2'>
              <span>Total</span>
              <span>{amountWithDeliveryFee}</span>
            </div>
          </div>
        </section>

        <button className='w-full bg-[#ff4d2d] hover:bg-[#e64526] disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold' disabled={isPlacingOrder} onClick={handlePlaceOrder}>
          {isPlacingOrder ? "Processing..." : paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  )
}

export default CheckOut
