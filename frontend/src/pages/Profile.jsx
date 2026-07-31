import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { FiLoader, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector(state => state.user);
    
    const [fullname, setFullname] = useState(userData?.fullname || '');
    const [mobile, setMobile] = useState(userData?.mobile || '');
    const [profilePic, setProfilePic] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(userData?.profilePic || null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setSuccessMsg('');
        }
    };

    const handleSave = async () => {
        setError('');
        setSuccessMsg('');
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('fullname', fullname);
            formData.append('mobile', mobile);
            if (profilePic) {
                formData.append('profilePic', profilePic);
            }

            const { data } = await axios.put(`${serverUrl}/api/user/profile`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            dispatch(setUserData(data));
            setSuccessMsg("Profile updated successfully!");
            setIsEditing(false);
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-10">
            {/* Header / Navbar */}
            <div className="bg-white shadow-sm sticky top-0 z-50 h-[80px] flex items-center px-6 md:px-12 border-b border-gray-100">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#ff4d2d] transition-colors font-semibold"
                >
                    <FiArrowLeft size={24} />
                    <span className="hidden sm:inline">Go Back</span>
                </button>
                <h1 className="text-2xl font-bold text-[#ff4d2d] absolute left-1/2 -translate-x-1/2">FoodyFly</h1>
            </div>

            {/* Profile Content Container */}
            <div className="max-w-3xl mx-auto mt-10 px-4">
                
                <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    {/* Top Banner */}
                    <div className="h-48 w-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7b42]"></div>

                    {/* Content Section */}
                    <div className="px-8 pb-10 pt-4 relative flex flex-col items-center">
                        
                        {/* Avatar */}
                        <div className="relative -mt-24 mb-4 group flex flex-col items-center">
                            <div 
                                className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-[6px] border-white bg-slate-100 flex items-center justify-center text-6xl font-bold text-white transition-transform duration-300 group-hover:scale-[1.02]"
                                style={{ backgroundColor: previewUrl ? 'transparent' : '#ff4d2d' }}
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    userData?.fullname?.slice(0, 1).toUpperCase()
                                )}
                            </div>
                            
                            {/* Edit Photo Text Button */}
                            {isEditing && (
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-4 px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white text-[#ff4d2d] border border-gray-100"
                                >
                                    Edit Photo
                                </button>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                        </div>

                        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{userData?.fullname}</h2>
                        <p className="text-gray-500 font-medium mb-10 capitalize">{userData?.role}</p>

                        {error && <p className="text-red-500 font-medium mb-4 bg-red-50 p-4 rounded-2xl w-full max-w-lg text-center border border-red-100">{error}</p>}
                        {successMsg && <p className="text-green-600 font-medium mb-4 bg-green-50 p-4 rounded-2xl w-full max-w-lg text-center border border-green-100">{successMsg}</p>}

                        {/* Form Fields */}
                        <div className="w-full max-w-lg flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-600 ml-2 tracking-wide uppercase">Full Name</label>
                                <input 
                                    type="text" 
                                    value={fullname} 
                                    onChange={(e) => setFullname(e.target.value)}
                                    readOnly={!isEditing}
                                    className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-gray-800 font-semibold text-lg ${isEditing ? 'bg-slate-50 border-transparent focus:bg-white focus:border-[#ff4d2d]/30 focus:ring-4 focus:ring-[#ff4d2d]/10' : 'bg-transparent border-gray-100 opacity-80'}`}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-600 ml-2 tracking-wide uppercase">Mobile Number</label>
                                <input 
                                    type="text" 
                                    value={mobile} 
                                    onChange={(e) => setMobile(e.target.value)}
                                    readOnly={!isEditing}
                                    className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-gray-800 font-semibold text-lg ${isEditing ? 'bg-slate-50 border-transparent focus:bg-white focus:border-[#ff4d2d]/30 focus:ring-4 focus:ring-[#ff4d2d]/10' : 'bg-transparent border-gray-100 opacity-80'}`}
                                    placeholder="Enter your mobile number"
                                />
                            </div>

                            {isEditing ? (
                                <button 
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="mt-8 w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center shadow-[0_10px_20px_rgba(255,77,45,0.3)] hover:shadow-[0_15px_25px_rgba(255,77,45,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
                                    style={{ backgroundColor: '#ff4d2d' }}
                                >
                                    {loading ? <FiLoader className="animate-spin" size={24} /> : 'Save Profile Changes'}
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="mt-8 w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center shadow-[0_10px_20px_rgba(255,77,45,0.3)] hover:shadow-[0_15px_25px_rgba(255,77,45,0.4)] hover:-translate-y-1 transition-all duration-300"
                                    style={{ backgroundColor: '#ff4d2d' }}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
