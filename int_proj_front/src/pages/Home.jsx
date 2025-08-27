import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to job offers page with search query
            navigate(`/job-offers?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const featuredJobs = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "TechCorp",
            location: "Tunis, Tunisia",
            type: "Full-time",
            salary: "3000-4000 TND"
        },
        {
            id: 2,
            title: "Product Manager",
            company: "StartupXYZ",
            location: "Sousse, Tunisia",
            type: "Full-time",
            salary: "2500-3500 TND"
        },
        {
            id: 3,
            title: "UI/UX Designer",
            company: "DesignStudio",
            location: "Sfax, Tunisia",
            type: "Contract",
            salary: "2000-3000 TND"
        }
    ];

    return (
        <div className="min-h-screen bg-base-200">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary to-secondary text-primary-content">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Find Your Dream Job
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            Discover thousands of opportunities from top companies in Tunisia and beyond
                        </p>
                        
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="join w-full">
                                <input
                                    type="text"
                                    placeholder="Search for jobs, companies, or keywords..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input input-bordered input-lg join-item flex-1 text-base-content"
                                />
                                <button 
                                    type="submit"
                                    className="btn btn-accent btn-lg join-item px-8"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search Jobs
                                </button>
                            </div>
                        </form>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold">1000+</div>
                                <div className="text-lg opacity-80">Active Jobs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">500+</div>
                                <div className="text-lg opacity-80">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">50k+</div>
                                <div className="text-lg opacity-80">Job Seekers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <div className="card-body text-center">
                            <div className="text-4xl mb-4">💼</div>
                            <h3 className="card-title justify-center">Browse Jobs</h3>
                            <p className="text-sm">Explore all available positions</p>
                            <div className="card-actions justify-center mt-4">
                                <button 
                                    onClick={() => navigate('/job-offers')}
                                    className="btn btn-primary btn-sm"
                                >
                                    View All Jobs
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <div className="card-body text-center">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="card-title justify-center">Create Profile</h3>
                            <p className="text-sm">Build your professional profile</p>
                            <div className="card-actions justify-center mt-4">
                                <button 
                                    onClick={() => navigate('/register')}
                                    className="btn btn-secondary btn-sm"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <div className="card-body text-center">
                            <div className="text-4xl mb-4">🏢</div>
                            <h3 className="card-title justify-center">For Employers</h3>
                            <p className="text-sm">Post jobs and find talent</p>
                            <div className="card-actions justify-center mt-4">
                                <button 
                                    onClick={() => navigate('/post-job')}
                                    className="btn btn-accent btn-sm"
                                >
                                    Post a Job
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <div className="card-body text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="card-title justify-center">Career Insights</h3>
                            <p className="text-sm">Market trends and salary data</p>
                            <div className="card-actions justify-center mt-4">
                                <button 
                                    onClick={() => navigate('/insights')}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Jobs Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-base-content">Featured Jobs</h2>
                        <button 
                            onClick={() => navigate('/jobs')}
                            className="btn btn-outline btn-sm"
                        >
                            View All
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredJobs.map(job => (
                            <div key={job.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                                <div className="card-body">
                                    <h3 className="card-title text-primary">{job.title}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-base-content/70">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            {job.company}
                                        </div>
                                        <div className="flex items-center text-base-content/70">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {job.location}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="badge badge-secondary badge-sm">{job.type}</span>
                                            <span className="font-medium text-success">{job.salary}</span>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end mt-4">
                                        <button className="btn btn-primary btn-sm">Apply Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How it Works Section */}
                <div className="bg-base-100 rounded-lg p-8 shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-8">How Lynq Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">1️⃣</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                            <p className="text-base-content/70">Sign up and build a comprehensive profile showcasing your skills and experience.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">2️⃣</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Search & Apply</h3>
                            <p className="text-base-content/70">Browse thousands of jobs, filter by your preferences, and apply with one click.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">3️⃣</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Get Hired</h3>
                            <p className="text-base-content/70">Connect with employers, showcase your talent, and land your dream job.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;