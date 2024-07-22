import React, { ChangeEvent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { useGetProposal, usPostApplication } from "./hooks"
import { ShowHtml } from "../../components/renderHTML"

const Proposal = () => {
    const urlParams = useParams()
    const proposal = useGetProposal();
    const application = usPostApplication();
    const [detailopen, setDetailOpen] = useState(false)
    const [newApplication, setNewApplication] = useState("")

    useEffect(() => {
        let parameters = {
            data: {
                id: urlParams.proposal
            }
        }
        proposal.execute(parameters)
    }, [])

    const handleApplication = () => {
        const userId = localStorage.getItem("userId")
        let params = {
            data: {
                proposalId: urlParams.proposal,
                userId: userId,
                proposal: newApplication
            }
        }
        application.execute(params)
    }
    console.log("newApplication",proposal.data.application)
    return (<div className=" w-10/12 ml-auto mr-auto">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                <li className="me-2" role="presentation" onClick={() => setDetailOpen(!detailopen)}>
                    <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                </li>
                <li className="me-2" role="presentation" onClick={() => setDetailOpen(!detailopen)}>
                    <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Dashboard</button>
                </li>
            </ul>
        </div>
        <div id="default-tab-content">
            {detailopen && <div className="">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <h4 className="text-lg my-4 font-bold">{proposal.data?.title}</h4>
                    <ShowHtml htmlContent={decodeURIComponent(proposal.data?.proposal)} className="text-lg text-black dark:text-gray-400" />
                    <div className="relative p-4 w-full">
                        <label htmlFor="message" className="block mb-2 text-lg font-medium text-dark_pink dark:text-white">Your Proposal</label>
                        <textarea onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewApplication(e.target.value)} id="message" rows={5} className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        <div className="min-h-10 flex justify-end">
                            <Link to="" onClick={handleApplication} className="bg-white_pink relative top-3 bottom-3 hover:bg-dark_pink text-lg font-bold py-1 px-4 border rounded">
                                Post your Proposal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>}

            {!detailopen && <div className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                 <div>
                    <ul>
                        {proposal.data.application && proposal.data.application.map((application: any) => <li key={application.id} className="bg-white_pink mt-3 mb-3 p-4">
                            <h4 className="text-xl font-bold underline cursor-pointer hover:text-blueGray-700" >{application.userId.name}</h4>
                            <p className="text-lg font-medium">{application.proposal}</p>
                        </li>)}
                    </ul>
                 </div>
            </div>}
        </div>

    </div>)
}


export default Proposal