import React,{useState, useEffect} from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import profileImage from '../../assets/images/profile.png'
import { baseurl } from '../../api/baseUrl';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import Modal from '../../common/Modals/Modal';
import Profile from '../Profile/Profile';
import Employee from '../Employee/Employee';

function SideBar() {
	const navigate = useNavigate();
    const [details, setDetails] = useState({});
	let token = localStorage.getItem("token");
	const getProfile = async () => {
		try {
		  let response = await axios.get(`${baseurl}/profile/getprofile`,{
			headers: {
			  Authorization: `Bearer ${token}`
			}
		  })
		  if(response.data.Data != 0){
			  setDetails(response.data.Data);
		  }
		} catch (error) {
		  console.log(error);
		}
	  };
	  useEffect(() => {
		getProfile();
	  }, []);

const handleLogout = () => {
    localStorage.clear();
	navigate(`../login`);
  }
	return (
		<div className="main flex min-h-screen bg-slate">
			{/* <!-- Left Panel --> */}
			<div className="leftPanel max-w-[230px] w-full bg-lightWhite border-[#CBD5E1] border-r-2 relative z-30">
				<div className="flex flex-col min-h-full">
					<div className="mx-auto pl-[50px] rounded-full pr-[50px] pb-[10px] pt-[0px]">
						<Link to={'/'}><img src={Logo} alt="logo images" width={100} /></Link>
					</div>
					<nav className="SideNav px-[24px]">
						<NavLink to="../dashboard" activeclassname="active" className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray ">
						<i className="fa-solid fa-house"></i>
							<span className="text-sm font-bold leading-5  pl-[13px]">Dashboard</span>
						</NavLink>
					</nav>
					<nav className="SideNav px-[24px]">
						<NavLink to="../employee" activeclassname="active" className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray ">
						<i className="fa-solid fa-user"></i>
							<span className="text-sm font-bold leading-5  pl-[13px]">Employee</span>
						</NavLink>
					</nav>
					<div className="mt-auto px-[24px] mb-[80px]">
						<Link to="../dashboard" className="SideLink flex items-center rounded-lg px-[18px] py-3.5 text-lightGray">
						<i class="fa-solid fa-circle-info"></i>
							<span className="text-sm font-bold leading-5 pl-[13px]">Help</span>
						</Link>
						<button onClick={handleLogout} className="SideLink w-full flex items-center rounded-lg px-[18px] py-3.5 text-lightGray">
						<i className="fa-solid fa-right-from-bracket"></i>
							<span className="text-sm font-bold leading-5 pl-[13px]" >Logout</span>
						</button>
					</div>
				</div>
			</div>
			{/* Right Panel  */}
			<div className="w-full">
				{/* <!-- Top Header --> */}
				<div className="w-full bg-lightWhite py-1 px-1 xl:px-10 xl:py-1 flex flex-wrap items-center border-[#CBD5E1] border-b-2">
					<div className="w-full flex justify-between items-center ">
						<h2 className='block font-bold leading-[48px] text-[#0F172A]'></h2>
						<div className="flex items-center space-x-10">
							<button type="button" className="relative flex items-center bg-azureishWhite rounded-full py-[6px] px-4 group">
								<div className="relative">
									<div className="flex items-center">
										<div className="flex items-center">
											<div className="w-9 h-9 overflow-hidden rounded-full bg-white">
												<img src={(profileImage)} alt="Profile Avatar" className='w-full h-full object-cover object-top' />
											</div>
											<span className="block text-left max-w-[120px] min-w-[120px] w-full text-sm font-bold leading-5 text-[#1E293B] ml-3 truncate">{details.firstName} {details.lastName}</span>
										</div>
										<i className="fa-solid fa-arrow-left"></i>
									</div>
								</div>
								{/* Profile Details Box   */}
								<div className="absolute w-full top-[54px] right-0 bg-white rounded-2xl shadow-shadowbox max-w-[218px] min-w-[218px] invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 z-40 anim">
									<div className="">
										<span onClick={() => navigate('/profile')} className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2 pt-4'>Account Details</span>
										<span className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2 pb-4' onClick={handleLogout}>Logout</span>
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
				{/* <!-- Content In --> */}
				<div className="rightInContent">
					<Routes>
						<Route path='dashboard'>
							<Route index element={<Dashboard />} />
						</Route>
						<Route path="profile" element={<Profile />} />
						<Route path="employee" element={<Employee />} />
					</Routes>
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

export default SideBar