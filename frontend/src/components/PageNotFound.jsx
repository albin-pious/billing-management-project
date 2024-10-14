
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="bg-primary h-screen w-screen flex justify-center items-center">
      <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
        <div className="card overflow-hidden sm:rounded-md rounded-none">
          <div className="px-6 py-8">

            <h3 className="text-dark mb-4 mt-6 text-center text-3xl">Page Not Found</h3>

            <p className="text-dark/75 mb-8 mx-auto text-base text-center">It&apos;s looking like you may have taken a wrong turn. Don&apos;t worry... it happens to the best of us. You might want to check your internet connection.</p>

            <div className="flex justify-center">
              <Link to="home" className="btn text-white bg-primary"> Back To Home </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound