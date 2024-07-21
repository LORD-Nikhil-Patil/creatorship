import { useEffect } from "react";

import {useGetProposals} from "./hooks"
import { ShowHtml } from '../../components/renderHTML'
import { useNavigate } from "react-router-dom";
const ProposalList = () => {
    const navigate = useNavigate()
    const proposals = useGetProposals()
    useEffect(()=>{
        proposals.execute()
    },[]);

    const handleProposal = (id: string) => {
        navigate(`/proposals/${id}`)
    }
    return (
        <div className="w-full ">
            <div className="w-full relative top-8">
                <div className="w-9/12 min-h-10 bg-white p-4 ml-auto mr-auto">
                    <ul>
                        {proposals.data ? proposals.data.map(proposal => <li className="p-4 mt-4 bg-red-300" key={proposal.id} onClick={()=> handleProposal(proposal.id)}>
                            <h5 className="text-lg font-bold text-pink-950"> {proposal.title} </h5>
                            <ShowHtml htmlContent={String(decodeURIComponent(proposal.proposal))} className="text-base font-medium max-h-12 overflow-clip truncate" />
                            </li>) 
                        : <span>No data found</span> }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default ProposalList;