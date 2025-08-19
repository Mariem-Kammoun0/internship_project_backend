import logo from '../assets/interview.png';

export default function Welcome() {
    return (
        <div 
            className="min-h-screen flex flex-col justify-center items-center px-6 relative"
            style={{
                backgroundImage: 'url(/src/assets/background.jpg)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="bg-base-100/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-base-300/50">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <img
                                src={logo}
                                alt="Lynq Logo"
                                className="w-16 h-16 md:w-20 md:h-20"
                            />
                        </div>
                    </div>

                    {/* Brand */}
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tracking-tight">
                        Lynq
                    </h1>

                    <p className="text-lg md:text-xl text-base-content/80 mb-8 leading-relaxed max-w-lg mx-auto">
                        Connect with professionals, grow your network, and find your dream opportunity.
                    </p>

                    {/* Call to Action */}
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-semibold text-base-content">
                            Get Started Today
                        </h2>
                        
                        <p className="text-base-content/70 mb-6">
                            Choose your path to success
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                            <a 
                                href="/register-jobseeker" 
                                className="btn btn-secondary btn-lg flex-1 group hover:scale-105 transition-transform"
                            >
                                <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                </svg>
                                Job Seeker
                            </a>
                            
                            <a 
                                href="/register-recruiter" 
                                className="btn btn-primary btn-lg flex-1 group hover:scale-105 transition-transform"
                            >
                                <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Recruiter
                            </a>
                        </div>
                    </div>

                    {/* Sign In Link */}
                    <div className="mt-8 pt-6 border-t border-base-300">
                        <p className="text-sm text-base-content/60">
                            Already have an account?{" "}
                            <a 
                                href="/login" 
                                className="link link-primary font-medium hover:link-hover transition-colors"
                            >
                                Sign In
                            </a>
                        </p>
                    </div>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center justify-center space-x-2 text-base-content/70">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Free to join</span>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-2 text-base-content/70">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Trusted network</span>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-2 text-base-content/70">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Easy matching</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}