import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { serverUrl } from '../App';


// ...existing code...

// ...existing code...

const SignUp = () => {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const [fullname, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const [loading, setLoading] = useState(false)
    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullname, email, password, mobile, role
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            console.log(result)
            setErr("")
            setLoading(false)


        } catch (error) {
            console.log(error)
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen w-full flex bg-[#fff9f6]'>
            
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#ff4d2d] overflow-hidden">
                <img 
                    src="/food-hero.png" 
                    alt="Delicious Gourmet Food" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-16 left-16 text-white max-w-lg z-10">
                    <h1 className="text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">Cravings,<br/>Delivered.</h1>
                    <p className="text-xl font-medium opacity-90 leading-relaxed drop-shadow-md">
                        Experience the fastest delivery of your favorite gourmet meals straight to your door. Fresh, hot, and right on time.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
                <div className="w-full max-w-md my-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold mb-3 text-[#ff4d2d]">FoodyFly</h1>
                        <p className="text-gray-500 font-medium text-lg">Create your account to get started!</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl w-full p-8 border border-gray-100">
                        {/* fullName */}
                        <div className='mb-4'>
                            <label htmlFor="fullname" className='block text-gray-700 font-bold mb-2 ml-1 text-sm tracking-wide uppercase'>Full Name</label>
                            <input 
                                type="text" 
                                className='w-full bg-slate-50 border-2 border-transparent rounded-xl px-4 py-3 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d]/30 transition-all text-gray-800 font-medium' 
                                placeholder='Enter your Full Name' 
                                onChange={(e) => setFullName(e.target.value)} 
                                value={fullname} 
                                required 
                            />
                        </div>
                        
                        {/* email */}
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-700 font-bold mb-2 ml-1 text-sm tracking-wide uppercase'>Email</label>
                            <input 
                                type="email" 
                                className='w-full bg-slate-50 border-2 border-transparent rounded-xl px-4 py-3 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d]/30 transition-all text-gray-800 font-medium' 
                                placeholder='Enter your Email' 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                                required 
                            />
                        </div>
                        
                        {/* mobile*/}
                        <div className='mb-4'>
                            <label htmlFor="mobile" className='block text-gray-700 font-bold mb-2 ml-1 text-sm tracking-wide uppercase'>Mobile</label>
                            <input 
                                type="text" 
                                className='w-full bg-slate-50 border-2 border-transparent rounded-xl px-4 py-3 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d]/30 transition-all text-gray-800 font-medium' 
                                placeholder='Enter your Mobile Number' 
                                onChange={(e) => setMobile(e.target.value)} 
                                value={mobile} 
                                required 
                            />
                        </div>
                        
                        {/* password*/}
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-700 font-bold mb-2 ml-1 text-sm tracking-wide uppercase'>Password</label>
                            <div className='relative'>
                                <input 
                                    type={`${showPassword ? "text" : "password"}`} 
                                    className='w-full bg-slate-50 border-2 border-transparent rounded-xl px-4 py-3 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#ff4d2d]/10 focus:border-[#ff4d2d]/30 transition-all text-gray-800 font-medium pr-12' 
                                    placeholder='Enter your password' 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password} 
                                    required 
                                />
                                <button className='absolute right-4 cursor-pointer top-[14px] text-gray-500 hover:text-gray-800 transition-colors' onClick={() => setShowPassword(prev => !prev)}>
                                    {!showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                                </button>
                            </div>
                        </div>
                        
                        {/* role*/}
                        <div className='mb-8'>
                            <label htmlFor="role" className='block text-gray-700 font-bold mb-2 ml-1 text-sm tracking-wide uppercase'>Role</label>
                            <div className='flex gap-2'>
                                {["user", "owner", "deliveryBoy"].map((r) => (
                                    <button
                                        key={r}
                                        className={`flex-1 rounded-xl px-3 py-2.5 text-center font-bold text-sm transition-all cursor-pointer border-2 ${role === r ? 'bg-[#ff4d2d] border-[#ff4d2d] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-500 hover:border-[#ff4d2d] hover:text-[#ff4d2d]'}`}
                                        onClick={() => setRole(r)}
                                    >
                                        {r === "deliveryBoy" ? "Delivery" : r.charAt(0).toUpperCase() + r.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <button 
                            className="w-full font-bold py-3.5 rounded-xl transition-all duration-300 bg-[#ff4d2d] text-white shadow-[0_8px_20px_rgba(255,77,45,0.3)] hover:shadow-[0_12px_25px_rgba(255,77,45,0.4)] hover:-translate-y-1 cursor-pointer flex justify-center items-center" 
                            onClick={handleSignUp} 
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={22} color='white' /> : "Sign Up"}
                        </button>
                        
                        {err && <p className='text-red-500 text-center mt-4 font-medium p-3 bg-red-50 rounded-lg border border-red-100'>*{err}</p>}
                    </div>

                    <p className='text-center mt-8 text-gray-600 font-medium'>
                        Already have an account? <span className='text-[#ff4d2d] font-bold cursor-pointer hover:underline' onClick={() => navigate("/signin")}>Sign In</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp

