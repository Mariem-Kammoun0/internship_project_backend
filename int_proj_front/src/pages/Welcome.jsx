import logo from '../assets/interview.png';
export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 px-6" style={{backgroundImage: 'url(/src/assets/background.jpg)', backgroundSize: 'cover'}}>
        <div className=" glass text-center rounded ">
            <img
            src={logo}
            alt="Company Logo"
            className="mx-auto w-24 h-24"
            />
            <h1 className="text-5xl font-bold text-primary">
            Lynq
            </h1>

            <p className="text-lg text-base-content/80 max-w-xl mx-auto">
            Connect with professionals, grow your network, and find your dream opportunity.
            </p>

            
            <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">
                        Are you a ...
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button href="/register-jobseeker" className="btn btn-secondary btn-md">
                        Job Seeker
                        </button>
                    <button href="/register-recruiter" className="btn btn-primary btn-md">
                        Recruiter
                        </button>
                    </div>
            </div>
            <p className="text-sm mt-6">
                Already have an account?{" "}
            <a href="/login" className="link link-primary">
                Sign In
            </a>
            </p>
        </div>

      </div>
  );
}
