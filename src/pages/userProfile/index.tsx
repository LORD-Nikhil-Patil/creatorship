import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import _ from 'lodash';
import { useGetUser, useUserProposal } from "./hooks";

import UserForm from "./userForm"
import { Link, useNavigate } from "react-router-dom";
import { ShowHtml } from "../../components/renderHTML.tsx"

const Profile = () => {
    const navigate = useNavigate()
    const [editOpen, setEditOpen] = useState(false);
    const getUser: any = useGetUser();
    const updateProposal = useUserProposal();

    const handlePostBusiness = () => {
        navigate("/partnership")
    }

    useEffect(() => {
        let userId = localStorage.getItem("userId");
        let proposalId = localStorage.getItem("userProposalId");
        let params = {
            id: userId
        }
        getUser.execute(params)

        if (!_.isEmpty(userId) && !_.isEmpty(proposalId)) {
            let data = {
                data: { userId, proposalId }
            }
            updateProposal.execute(data)
            localStorage.setItem("userProposalId", "");
        }
    }, []);
    return (<><div className="bg-gray-100">
        <div className="w-full text-white bg-main-color">
            <div
                className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                <div className="p-4 flex flex-row items-center justify-between">
                    <span className="pacifico-regular self-center text-3xl font-extrabold whitespace-nowrap text-dark_pink">Creatorship</span>
                </div>

                <div className="flex flex-row gap-3">
                    <Link to="/proposals" className="mr-5 my-2 text-base font-bold text-slate-950 py-2 px-3 border border-slate-500 rounded shadow">
                        Search Businesses
                    </Link>
                    <button onClick={handlePostBusiness} className="hover:bg-white_pink my-2 bg-dark_pink text-base font-bold py-1 px-3 rounded">
                        Post Business
                    </button>
                    <div className="flex items-center gap-4">
                        <img className="w-10 h-10 rounded-full" src="https://loremflickr.com/320/320/girl" alt="" />
                        <div className="font-medium dark:text-white">
                            <div>Jese Leos</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {editOpen && createPortal(
            <UserForm formdata={getUser.data} close={setEditOpen} />,
            document.body
        )}
        <div className="container mx-auto my-5 p-5">
            {!_.isEmpty(getUser.data) ? <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="h-lvh p-5 rounded text-center text-gray-500 max-w-sm bg-white_pink">
                        {getUser?.data.photo ? <img className="w-32 h-32 rounded-full mx-auto" src={getUser.data.photo} /> : <img className="w-32 h-32 rounded-full mx-auto" src="https://loremflickr.com/320/320/girl" alt="" />}
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
                            <div onClick={() => setEditOpen(!editOpen)} className="flex items-center justify-end cursor-pointer">
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

                        <div className="grid">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Posted Proposals</span>
                            </div>
                            <ul className="list-inside">
                                {getUser.data.proposals.map((proposal: {
                                    title: string,
                                    proposal: string,
                                    id: string
                                }) => <li key={proposal.id} className="mt-4">
                                        <a className="rounded-sm w-full grid grid-cols-12 bg-white_pink shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform" href="#">
                                            <div className="col-span-12">
                                                <p className="text-blueGray-800 font-semibold">{proposal.title}</p>
                                            </div>
                                            <div className="col-span-12 max-h-10 overflow-y-scroll no-scrollbar">
                                                <p className="text-sm text-gray-800 font-light"><ShowHtml htmlContent={decodeURIComponent(String(decodeURIComponent(proposal.proposal)))} className="" /></p>
                                            </div>
                                        </a>
                                    </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div> : <span>No proposal posted.</span>}
        </div>
    </div></>)
}

export default Profile;


