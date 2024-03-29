import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/coding.jpg"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/up.png"
import bottomCircle from "../../assets/images/down.png";
import { baseurl } from '../../api/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

	const [userData, setUserData] = useState({ mobileNo: "", password: "" });
	const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

	const setFormField = (field, value) => {
		setUserData({ ...userData, [field]: value })
	}

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
          let payload = Object.assign({}, userData);
          let response = await axios.post(`${baseurl}/login`,payload)
          if (response.data?.Data !== 0) {
            toast.success(response.data?.Message);
            localStorage.setItem("token", response.data.Data.token);
            setError(false);
            navigate("/dashboard");
          } else {
            toast.error(response.data?.Message);
          }
        } catch (error) {
                toast.error('Username or Password Incorrect');
                setError(true);
        }finally {
                setLoading(false);
        }
      };
    return (
        <div className="flex h-screen">
            <div className="flex w-full flex-wrap bg-white">
                <div className="w-full relative lg:w-1/2 flex p-[60px]">
                    <div className="">
                        <div className="absolute top-0 sm:right-20 md:right-32 sm:block hidden">
                            <img src={topCircle} alt="Top Circle Shape" />
                        </div>
                        <div className="absolute bottom-0 sm:left-20 md:left-32 sm:block hidden">
                            <img src={bottomCircle} alt="Bottom Circle Shape" />
                        </div>
                    </div>
                    <div className=''>
                    <Link to='/' className='relative'><img src={logo} alt="Alt Text" width={100} height={75} /></Link>
                    </div>
                    <div className="max-w-md w-full m-auto">
                        <h1>Welcome back</h1>
                        <p className="text-lg text-[#64748B] font-normal sm:pt-3.5 xl:pr-8">Please enter your details</p>
                        <div className="w-full pt-7 sm:pt-9">
                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="" className="input-titel">Email or Phone</label>
                                    <input type="text" name="mobileNo" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter your mobile number' value={userData.mobileNo} onChange={(e) => { setFormField('mobileNo', e.target.value); setError(false) }} required />
                                </div>
                                <div>
                                    <label htmlFor="" className="input-titel">Password</label>
                                    <input type="Password" name="Password" placeholder='Enter your password' className="input_box placeholder:text-[#94A3B8] placeholder:text-base"  value={userData.password} onChange={(e) => { setFormField('password', e.target.value); setError(false) }} required />
                                </div>
                                {loading ? (
                                    <div className="flex justify-center">
                                        <div className="loader"></div>
                                    </div>
                                ) : (
                                    <Link to="../../dashboard" className='block'>
                                    <button type='submit' className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold" onClick={handleSubmit}>Sign in</button>
                                </Link>
                                )}
                                
                                <span className="block text-sm text-[#94A3B8] font-bold text-center">Don’t have an account?<Link to="../register" className='text-yankeesBlue font-bold ml-1'>Sign up for free</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full lg:w-1/2 hidden lg:block">
                    <img src={bgImage} alt="login-bg" className="w-full h-full object-cover object-bottom" />
                </div>
            </div>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
        </div>
    )
}

export default Login
