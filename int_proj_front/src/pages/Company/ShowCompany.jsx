import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ShowCompany() {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchCompany = async () => {
            setLoading(true);
            try {
                // Simulate API call
                setTimeout(() => {
                    const mockCompany = {
                        id: id,
                        name: 'TechCorp Solutions',
                        address: '123 Innovation Drive, San Francisco, CA 94105',
                        phone: '+1 (555) 123-4567',
                        email: 'contact@techcorp.com',
                        website: 'https://www.techcorp.com',
                        industry: 'Technology',
                        description: 'TechCorp Solutions is a leading technology company specializing in innovative software solutions and digital transformation services. We help businesses leverage cutting-edge technologies to achieve their goals and stay competitive in the digital age.',
                        logo: '/api/placeholder/200/200',
                        founded_at: '2015-03-15',
                        size: 150,
                        employees: [
                            { id: 1, name: 'John Doe', position: 'CEO' },
                            { id: 2, name: 'Jane Smith', position: 'CTO' },
                            { id: 3, name: 'Mike Johnson', position: 'Lead Developer' },
                        ],
                        jobOffers: [
                            { id: 1, title: 'Senior Software Engineer', department: 'Engineering', posted: '2024-01-15' },
                            { id: 2, title: 'Product Manager', department: 'Product', posted: '2024-01-10' },
                            { id: 3, title: 'UI/UX Designer', department: 'Design', posted: '2024-01-05' },
                        ]
                    };
                    setCompany(mockCompany);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError('Failed to load company details');
                setLoading(false);
            }
        };

        fetchCompany();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-base-content">Loading company details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="alert alert-error max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="alert alert-warning max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>Company not found</span>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getYearsSinceFoundation = (foundedDate) => {
        const founded = new Date(foundedDate);
        const today = new Date();
        return Math.floor((today - founded) / (365.25 * 24 * 60 * 60 * 1000));
    };

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Card */}
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Company Logo */}
                                <div className="flex-shrink-0">
                                    <div className="avatar">
                                        <div className="w-24 lg:w-32 rounded-xl">
                                            <img 
                                                src={company.logo || "/api/placeholder/128/128"} 
                                                alt={`${company.name} logo`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Company Info */}
                                <div className="flex-grow">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                                        <div>
                                            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                                                {company.name}
                                            </h1>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <div className="badge badge-secondary">{company.industry}</div>
                                                <div className="badge badge-outline">{company.size} employees</div>
                                                <div className="badge badge-outline">
                                                    Founded {getYearsSinceFoundation(company.founded_at)} years ago
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-4 lg:mt-0">
                                            <Link 
                                                to={`/companies/${company.id}/edit`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button className="btn btn-ghost btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                </svg>
                                                Share
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quick Contact Info */}
                                    <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                                        {company.address && (
                                            <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {company.address}
                                            </div>
                                        )}
                                        {company.website && (
                                            <a 
                                                href={company.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 hover:text-primary"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                                </svg>
                                                {company.website}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="tabs tabs-lifted mb-6">
                        <button 
                            className={`tab tab-lg ${activeTab === 'overview' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button 
                            className={`tab tab-lg ${activeTab === 'employees' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('employees')}
                        >
                            Employees ({company.employees?.length || 0})
                        </button>
                        <button 
                            className={`tab tab-lg ${activeTab === 'jobs' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('jobs')}
                        >
                            Job Openings ({company.jobOffers?.length || 0})
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {activeTab === 'overview' && (
                            <>
                                {/* Company Details */}
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl mb-4">About {company.name}</h2>
                                        <p className="text-base-content/80 leading-relaxed mb-6">
                                            {company.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="stat bg-base-200 rounded-lg">
                                                <div className="stat-title">Founded</div>
                                                <div className="stat-value text-lg">
                                                    {formatDate(company.founded_at)}
                                                </div>
                                            </div>
                                            <div className="stat bg-base-200 rounded-lg">
                                                <div className="stat-title">Company Size</div>
                                                <div className="stat-value text-lg">{company.size} employees</div>
                                            </div>
                                            <div className="stat bg-base-200 rounded-lg">
                                                <div className="stat-title">Industry</div>
                                                <div className="stat-value text-lg">{company.industry}</div>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="mt-8">
                                            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {company.email && (
                                                    <div className="flex items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        <a href={`mailto:${company.email}`} className="hover:text-primary">
                                                            {company.email}
                                                        </a>
                                                    </div>
                                                )}
                                                {company.phone && (
                                                    <div className="flex items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        <a href={`tel:${company.phone}`} className="hover:text-primary">
                                                            {company.phone}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'employees' && (
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl mb-4">Team Members</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {company.employees?.map((employee) => (
                                            <div key={employee.id} className="card bg-base-200">
                                                <div className="card-body p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar placeholder">
                                                            <div className="bg-primary text-primary-content rounded-full w-12">
                                                                <span className="text-sm">
                                                                    {employee.name.split(' ').map(n => n[0]).join('')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">{employee.name}</h3>
                                                            <p className="text-sm text-base-content/70">{employee.position}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'jobs' && (
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl mb-4">Open Positions</h2>
                                    <div className="space-y-4">
                                        {company.jobOffers?.map((job) => (
                                            <div key={job.id} className="card bg-base-200">
                                                <div className="card-body p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-semibold text-lg">{job.title}</h3>
                                                            <p className="text-base-content/70">{job.department}</p>
                                                            <p className="text-sm text-base-content/50">
                                                                Posted on {formatDate(job.posted)}
                                                            </p>
                                                        </div>
                                                        <button className="btn btn-primary btn-sm">
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )) || (
                                        <div className="text-center py-8">
                                            <p className="text-base-content/60">No job openings available at the moment.</p>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
);
}


export default ShowCompany;