import creatorship from "../../assets/creatorship.mp4"
import ReactPlayer from 'react-player/lazy'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const LandingPage = () => {
  
    const navigate = useNavigate()

    return (<>
        <header>
            <nav className="px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="https://" className="flex items-center">
                        <span className="pacifico-regular self-center text-3xl font-extrabold whitespace-nowrap text-dark_pink">Creatorship</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <Link to="login" className="text-gray-800 dark:text-white font-bold rounded-lg text-lg px-5 py-2.5 mr-2">Log in</Link>
                        <Link to="register"  className="bg-primary-700 font-bold rounded-lg text-lg px-5 py-2.5 mr-2">Sign Up</Link>
                        <Link to="partnership" className="bg-white_pink hover:bg-dark_pink text-lg font-bold py-1 px-3 border rounded">
                            Post Business
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
        <section className="dark:bg-gray-900">
            <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="place-self-center mr-auto lg:col-span-5">
                    <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">Introducing Creatorship Platform</h1>
                    <p className="mb-6 max-w-2xl text-lg font-semibold text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">The envisioned web platform that empowers creators and businesses to establish mutually beneficial partnerships through equity.</p>
                    <Link to="partnership" className="bg-white_pink hover:bg-dark_pink text-lg font-bold py-1 mr-3 px-4 border rounded">
                        Find Creators
                    </Link>
                    <Link to="register" className="mr-5 text-lg font-bold py-1 px-3 border rounded shadow">
                        Search Businesses
                    </Link>
                </div>
                <div className="relative mt-5 lg:col-span-7 ">
                    <ReactPlayer url={creatorship} playing loop muted width="auto" height="auto" />
                </div>
            </div>
        </section>
    </>)
}

export default LandingPage;