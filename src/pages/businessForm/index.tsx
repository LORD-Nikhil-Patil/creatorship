import { useEffect, useState, memo } from "react";
import JoditEditor from "../../components/textEditor.jsx";
import creator from "../../assets/creator.png";
import { usePostProposal, useGetProposal } from "./store.ts";
import _ from 'lodash';

interface ShowHtmlProps {
    htmlContent: any;
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
    const [editorData, setEditorData] = useState<any>(getProposal?.data?.proposal);
    const [title, setTitle] = useState<string>();


    const handleProposal = () => {
        const coded = encodeURIComponent(editorData)

        let params = {
            title: title,
            proposal: coded
        }

        postProposal.execute(params)
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

    return (<div className="grid grid-cols-3">
        <div className="p-14 col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2">
            <div className="top-16">
                <span className="pacifico-regular self-center text-3xl font-extrabold whitespace-nowrap text-dark_pink">Creatorship</span>
                <h1 className="text-6xl font-bold">Tell us what is Your <span className="text-dark_pink">proposal.</span></h1>
                {_.isEmpty(getProposal.data) ? <>
                    <div className="proposal-title mt-7">
                        <label htmlFor="message" className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Title</label>
                        <textarea id="message" rows={4} onChange={(e) => setTitle(e.target.value)} value={title} className="block p-2.5 w-full text-lg font-serif text-gray-900 bg-gray-50 rounded-lg dark:text-white" placeholder="Write your thoughts here..."></textarea>
                    </div>

                    <div className="text-editor mt-7">
                        <JoditEditor setEditorData={setEditorData} />
                    </div>
                    <button onClick={handleProposal} className="relative top-4 bg-white_pink text-lg font-bold py-2 mr-5 px-4 border border-blue-500 rounded">
                        Post Proposal
                    </button>
                </> : <div className="relative top-7">
                    <div className="bg-white_pink min-h-10 p-4 flex justify-center items-center font-semibold text-lg">
                        {getProposal.data.title}
                    </div>

                    <div className="relative top-5 bg-white_pink p-4 min-h-20 flex justify-center items-center font-light text-lg">
                        <ShowHtml htmlContent={decodeURIComponent(getProposal.data.proposal)} />
                    </div>
                </div>}
            </div>
        </div>
        <div className="fixed hidden lg:block md:col-span-1 lg:col-span-1 xl:col-span-1">
            <img className="fixed right-0 h-full w-4/12 " src={creator} alt="Creator" />
        </div>
    </div>)
}

export default memo(PostPartnership);