import JoditEditor from "../../components/textEditor.jsx";

const PostPartnership = () => {

    return (<div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
        <div className="p-14">
            <div className="relative top-16">
                <h1 className="text-6xl font-bold">Tell us what is Your <span className="text-dark_pink">proposal.</span></h1>
                <div className="text-editor mt-7">
                    <JoditEditor />
                </div>
            </div>
        </div>
        <div className="bg-black">awdwad</div>

    </div>)
}

export default PostPartnership 