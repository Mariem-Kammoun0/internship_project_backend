import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {showcompanies} from '../../services/companyService'

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [lastSearchQuery, setLastSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [showFilters, setShowFilters] = useState(false);
    
    // Filter states
    const [filters, setFilters] = useState({
        industry: '',
        location: '',
        sizeMin: '',
        sizeMax: ''
    });
    

    const industries = [
        'Technology',
        'Finance',
        'Healthcare',
        'Education',
        'Manufacturing',
        'Retail',
        'Construction',
        'Transportation',
        'Energy',
        'Entertainment',
        'Other'
    ];

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchCompanies = async () => {
            const data = await showcompanies({
                currentPage,
                lastSearchQuery,
                filters});
            setLoading(false);
            setCompanies(data.data|| []);
            setTotalPages(data.totalPages || 1);
        };

        fetchCompanies();
    }, []);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            industry: '',
            location: '',
            sizeMin: '',
            sizeMax: ''
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).getFullYear();
    };

    const getSizeCategory = (size) => {
        if (size < 50) return { text: 'Small', class: 'badge-info' };
        if (size < 200) return { text: 'Medium', class: 'badge-warning' };
        return { text: 'Large', class: 'badge-success' };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-base-content">Loading companies...</p>
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

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-primary mb-2">Companies</h1>
                            <p className="text-base-content/70">
                                Discover {filteredCompanies.length} amazing companies
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0">
                            <Link to="/companies/create" className="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Add Company
                            </Link>
                        </div>
                    </div>

                    {/* Search and View Toggle */}
                    <div className="card bg-base-100 shadow-xl mb-6">
                        <div className="card-body p-4">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="form-control">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                name="search"
                                                placeholder="Search companies..."
                                                value={filters.search}
                                                onChange={handleFilterChange}
                                                className="input input-bordered flex-1"
                                            />
                                            <button className="btn btn-square btn-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`btn btn-outline ${showFilters ? 'btn-active' : ''}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                        </svg>
                                        Filters
                                    </button>

                                    {/* View Toggle */}
                                    <div className="join">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`btn join-item ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`btn join-item ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Filters */}
                            {showFilters && (
                                <div className="divider my-2"></div>
                            )}
                            
                            {showFilters && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="form-control">
                                        <label className="label label-text-sm">Industry</label>
                                        <select
                                            name="industry"
                                            value={filters.industry}
                                            onChange={handleFilterChange}
                                            className="select select-bordered select-sm"
                                        >
                                            <option value="">All Industries</option>
                                            {industries.map((industry) => (
                                                <option key={industry} value={industry}>
                                                    {industry}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label label-text-sm">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="City, State"
                                            value={filters.location}
                                            onChange={handleFilterChange}
                                            className="input input-bordered input-sm"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label label-text-sm">Min Size</label>
                                        <input
                                            type="number"
                                            name="sizeMin"
                                            placeholder="0"
                                            value={filters.sizeMin}
                                            onChange={handleFilterChange}
                                            className="input input-bordered input-sm"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label label-text-sm">Max Size</label>
                                        <input
                                            type="number"
                                            name="sizeMax"
                                            placeholder="1000"
                                            value={filters.sizeMax}
                                            onChange={handleFilterChange}
                                            className="input input-bordered input-sm"
                                        />
                                    </div>

                                    <div className="md:col-span-2 lg:col-span-4">
                                        <button
                                            onClick={clearFilters}
                                            className="btn btn-ghost btn-sm"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-base-content/70">
                            Showing {filteredCompanies.length} of {companies.length} companies
                        </p>
                    </div>

                    {/* Companies Grid/List */}
                    {filteredCompanies.length === 0 ? (
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center py-16">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <h3 className="text-2xl font-semibold mb-2">No companies found</h3>
                                <p className="text-base-content/70 mb-4">
                                    Try adjusting your search criteria or filters
                                </p>
                                <button 
                                    onClick={clearFilters}
                                    className="btn btn-primary btn-sm"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "space-y-4"
                        }>
                            {filteredCompanies.map((company) => (
                                <div key={company.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                                    {viewMode === 'grid' ? (
                                        /* Grid View */
                                        <>
                                            <div className="card-body">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="avatar">
                                                        <div className="w-16 rounded-lg">
                                                            <img 
                                                                src={company.logo || "/api/placeholder/64/64"} 
                                                                alt={`${company.name} logo`}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h2 className="card-title text-lg mb-1 truncate">
                                                            {company.name}
                                                        </h2>
                                                        <div className="flex flex-wrap gap-2 mb-2">
                                                            <div className="badge badge-secondary badge-sm">
                                                                {company.industry}
                                                            </div>
                                                            <div className={`badge badge-sm ${getSizeCategory(company.size).class}`}>
                                                                {getSizeCategory(company.size).text}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-base-content/70">
                                                            {company.address}
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="text-base-content/80 text-sm mb-4 line-clamp-3">
                                                    {company.description}
                                                </p>

                                                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                                    <div>
                                                        <span className="text-base-content/70">Size:</span>
                                                        <br />
                                                        <span className="font-semibold">{company.size} employees</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-base-content/70">Founded:</span>
                                                        <br />
                                                        <span className="font-semibold">{formatDate(company.founded_at)}</span>
                                                    </div>
                                                </div>

                                                {company.jobOffers > 0 && (
                                                    <div className="alert alert-info py-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-sm">
                                                            {company.jobOffers} open positions
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="card-actions justify-between mt-4">
                                                    {company.website && (
                                                        <a 
                                                            href={company.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-ghost btn-sm"
                                                        >
                                                            Visit Website
                                                        </a>
                                                    )}
                                                    <Link 
                                                        to={`/companies/${company.id}`}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        /* List View */
                                        <div className="card-body p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="w-12 rounded-lg">
                                                        <img 
                                                            src={company.logo || "/api/placeholder/48/48"} 
                                                            alt={`${company.name} logo`}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="font-semibold text-lg truncate">
                                                                {company.name}
                                                            </h3>
                                                            <p className="text-sm text-base-content/70 truncate">
                                                                {company.description}
                                                            </p>
                                                            <div className="flex items-center gap-4 mt-1 text-xs text-base-content/60">
                                                                <span>{company.industry}</span>
                                                                <span>{company.address}</span>
                                                                <span>{company.size} employees</span>
                                                                {company.jobOffers > 0 && (
                                                                    <span className="text-success font-medium">
                                                                        {company.jobOffers} jobs
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-2 mt-2 lg:mt-0">
                                                            {company.website && (
                                                                <a 
                                                                    href={company.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-ghost btn-xs"
                                                                >
                                                                    Website
                                                                </a>
                                                            )}
                                                            <Link 
                                                                to={`/companies/${company.id}`}
                                                                className="btn btn-primary btn-xs"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Companies;