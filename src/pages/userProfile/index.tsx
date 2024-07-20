import { useState, useEffect } from "react";
import { createPortal  } from 'react-dom';
import _ from 'lodash';
import { useGetUser, } from "./hooks";

import UserForm from "./userForm"

const Profile = () => {
   
    const [editOpen, setEditOpen] = useState(false);
    const getUser:any = useGetUser();
    useEffect(()=>{
        let userId = localStorage.getItem("userId");
        let params = {
            id: userId
        }
        getUser.execute(params)
    },[]);
     
    return (<><div className="bg-gray-100">
        <div className="w-full text-white bg-main-color">
            <div 
                className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                <div className="p-4 flex flex-row items-center justify-between">
                    <span className="pacifico-regular self-center text-3xl font-extrabold whitespace-nowrap text-dark_pink">Creatorship</span>
                </div>
            </div>
        </div>
            {editOpen && createPortal(
                <UserForm formdata={getUser.data} close={setEditOpen} />,
                document.body
            )}
        <div className="container mx-auto my-5 p-5">
           {!_.isEmpty(getUser.data) && <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="p-5 rounded text-center text-gray-500 max-w-sm bg-white_pink">
                        {getUser?.data ? <img className="w-32 h-32 rounded-full mx-auto" src={getUser.data.photo} />: <img className="w-32 h-32 rounded-full mx-auto" src="https://loremflickr.com/320/320/girl" alt="" />}
                        <div className="text-sm mt-5">
                            <a
                                className="font-bold leading-none text-2xl">{getUser.data.first_name} {getUser.data.last_name}
                            </a>
                            <p className="font-semibold text-lg">Blogger &amp; Youtuber</p>
                        </div>

                        <p className="mt-2 text-lg font-light text-gray-900">{getUser.data.about}</p>
                    </div>
                </div>
                <div className="w-full md:w-9/12 mx-2 h-64">
                    <div className="bg-light_gray p-3 rounded-md">
                        <div className="flex items-center justify-between space-x-2 font-semibold text-gray-900 leading-8">
                            <div className="flex items-center justify-start">
                                <span className="text-green-500 m-1 font-bold text-lg">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide m-1 font-bold text-lg">About</span>
                            </div>
                            <div onClick={()=> setEditOpen(!editOpen)} className="flex items-center justify-end cursor-pointer">
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </div>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    <div className="px-4 py-2">{getUser.data.first_name}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                    <div className="px-4 py-2">{getUser.data.last_name}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Gender</div>
                                    <div className="px-4 py-2">Female</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                    <div className="px-4 py-2">{`${getUser.data.address}, ${getUser.data.city},  ${getUser.data.state}, ${getUser.data.country}, ${getUser.data.zip}`}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                    <div className="px-4 py-2">
                                        <a className="text-blue-800" href="mailto:jane@example.com">{getUser.data.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-4"></div>

                    <div className="bg-white p-3 shadow-sm rounded-sm">

                        <div className="grid grid-cols-2">
                            <div>
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span className="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Experience</span>
                                </div>
                                <ul className="list-inside space-y-2">
                                    <li>
                                        <div className="text-teal-600">Owner at Her Company Inc.</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div className="text-teal-600">Owner at Her Company Inc.</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div className="text-teal-600">Owner at Her Company Inc.</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div className="text-teal-600">Owner at Her Company Inc.</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span className="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path fill="#fff"
                                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Education</span>
                                </div>
                                <ul className="list-inside space-y-2">
                                    <li>
                                        <div className="text-teal-600">Masters Degree in Oxford</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div className="text-teal-600">Bachelors Degreen in LPU</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </div></>)
}

export default Profile;


