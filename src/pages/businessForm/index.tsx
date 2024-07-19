import { useEffect, useState, memo } from "react";
import { createPortal } from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';

import Register from "../register"
import JoditEditor from "../../components/textEditor.jsx";
import creator from "../../assets/creator.png";
import { usePostProposal, useGetProposal } from "./store.ts";
import _ from 'lodash';
import { Bounce, toast, ToastContainer } from "react-toastify";

interface ShowHtmlProps {
    htmlContent: string;
}

const ShowHtml: React.FC<ShowHtmlProps> = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} >
        </div>
    );
}


const PostPartnership = () => {
    const postProposal = usePostProposal()
    const getProposal = useGetProposal()
    const [editorData, setEditorData] = useState<any>("");
    const [title, setTitle] = useState<any>("");
    const [openRegister, setOpenRegister] = useState(false)
   
    const handleProposal = () => {
        console.log("editorData", title?.length, editorData?.length)
        if (
            title?.length <= 10 ||
            editorData?.length <= 10
          ) {
            toast.error('Write a complete proposal', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });

                return
          }
          const coded = encodeURIComponent(editorData)

          let params = {
              title: title,
              proposal: coded
          } 
        postProposal.execute(params)
        const userId = localStorage.getItem("userId")
        if (_.isEmpty(userId)) {
            setOpenRegister(true)
        }
    }

    useEffect(() => {
        const clientProposalId = localStorage.getItem("userProposalId");
        if (clientProposalId) {
            let params = {
                id: clientProposalId
            }
            getProposal.execute(params)
        }
    }, []);

    useEffect(()=>{
        setEditorData(getProposal?.data?.proposal)
        setTitle(getProposal?.data?.title)
    },[getProposal?.data])

    return (<div className="grid grid-cols-3">
        <div className="p-14 col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2">
            <div className="top-16">
                <span className="pacifico-regular self-center text-3xl font-extrabold whitespace-nowrap text-dark_pink">Creatorship</span>
                <h1 className="text-6xl font-bold">Tell us what is Your <span className="text-dark_pink">proposal.</span></h1>
                {_.isEmpty(getProposal.data) ? <>
                    <div className="proposal-title mt-7">
                        <label htmlFor="message" className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Title</label>
                        <textarea id="message" rows={4} onChange={(e) => setTitle(e.target.value)} value={_.isEmpty(title)? getProposal?.data?.title: title} className="block p-2.5 w-full text-lg font-serif text-gray-900 bg-gray-50 rounded-lg dark:text-white" placeholder="Write your thoughts here..."></textarea>
                    </div>

                    <div className="text-editor mt-7">
                        <JoditEditor setEditorData={setEditorData}/>
                    </div>
                </> : <div className="mt-7">
                    <div className="bg-white_pink min-h-10 p-4 flex justify-center items-center font-semibold text-lg">
                        {getProposal.data.title}
                    </div>

                    <div className="relative top-5 bg-white_pink p-4 min-h-20 flex justify-center items-center font-light text-lg">
                        <ShowHtml htmlContent={decodeURIComponent(getProposal.data.proposal)} />
                    </div>
                </div>}
                <button onClick={handleProposal} className="relative top-10 bg-white_pink text-lg font-bold py-2 mr-5 px-4 border border-blue-500 rounded">
                    Post Proposal
                </button>
            </div>
            <ToastContainer />
        </div>
        <div className="fixed hidden lg:block md:col-span-1 lg:col-span-1 xl:col-span-1">
            <img className="fixed right-0 h-full w-4/12 " src={creator} alt="Creator" />
        </div>
        {openRegister && createPortal(<Register proposal={getProposal?.data?.id} />, document.body)}
    </div>)
}

export default memo(PostPartnership);