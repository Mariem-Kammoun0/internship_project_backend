import JobCard from "../components/JobCard";
import { getJobs } from "../services/jobService";
import { useEffect, useState } from "react";
import JobFilter from "../components/JobFilter";

function JobOffers() {
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [lastSearchQuery, setLastSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        employment_type: "",
        type_of_contract: "",
        salary: { min: null, max: null },
        company_location: "",
        requirements: [],
        sort: ""
    });

    const loadJobOffers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getJobs({
                page: currentPage,
                search: lastSearchQuery,
                filters
            });
            setOffers(data.data || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            console.error("Error loading jobs:", err);
            setError("Failed to load job offers. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobOffers();
    }, [currentPage, lastSearchQuery, filters]);

    const handleSearch = (query) => {
        setCurrentPage(1);
        setLastSearchQuery(query);
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    const goToPage = (page) => setCurrentPage(page);

    const renderPaginationButtons = () => {
        const pages = [];
        const maxVisible = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const endPage = Math.min(totalPages, startPage + maxVisible - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    disabled={loading}
                    className={`btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-ghost'}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-base-200">
            {/* Header */}
            <div className="bg-primary text-primary-content shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold">
                        {lastSearchQuery ? `Search Results for "${lastSearchQuery}"` : "Job Opportunities"}
                    </h1>
                    <p className="text-primary-content/80 mt-2">
                        {loading ? "Loading..." : `${offers.length} job${offers.length !== 1 ? 's' : ''} found`}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filter */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <JobFilter
                            onSearch={handleSearch}
                            onFilterChange={handleFilterChange}
                            loading={loading}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="bg-base-100 rounded-lg shadow-sm p-4 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-base-content">
                                        {lastSearchQuery ? "Search Results" : "All Job Offers"}
                                    </h2>
                                    {!loading && (
                                        <p className="text-sm text-base-content/60">
                                            Showing {offers.length} of {totalPages * 10} jobs
                                        </p>
                                    )}
                                </div>
                                
                                {/* View Toggle */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-base-content/60">View:</span>
                                    <div className="btn-group">
                                        <button className="btn btn-sm btn-active">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-12">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                                    <p className="text-lg font-medium">Loading job offers...</p>
                                    <p className="text-sm text-base-content/60">Please wait while we fetch the latest opportunities</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Error State */}
                        {error && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-8">
                                <div className="alert alert-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-bold">Error loading jobs</h3>
                                        <div className="text-xs">{error}</div>
                                    </div>
                                    <button 
                                        className="btn btn-sm btn-outline"
                                        onClick={loadJobOffers}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Empty State */}
                        {!loading && !error && offers.length === 0 && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-12 text-center">
                                <div className="text-6xl mb-6">🔍</div>
                                <h3 className="text-2xl font-bold text-base-content mb-2">
                                    No jobs found
                                </h3>
                                <p className="text-base-content/60 mb-6 max-w-md mx-auto">
                                    {lastSearchQuery 
                                        ? `We couldn't find any jobs matching "${lastSearchQuery}". Try adjusting your search or filters.`
                                        : "No job offers are available at the moment. Check back later for new opportunities!"
                                    }
                                </p>
                                <div className="space-x-2">
                                    {lastSearchQuery && (
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setLastSearchQuery("");
                                                setCurrentPage(1);
                                            }}
                                        >
                                            View All Jobs
                                        </button>
                                    )}
                                    <button 
                                        className="btn btn-outline"
                                        onClick={loadJobOffers}
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Job List */}
                        {!loading && !error && offers.length > 0 && (
                            <div className="space-y-4 mb-6">
                                {offers.map(job => (
                                    <div key={job.id} className="bg-base-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <JobCard jobOffer={job} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && !error && totalPages > 1 && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-6">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-base-content/60">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                    
                                    <div className="flex items-center gap-1">
                                        <button
                                            disabled={currentPage === 1 || loading}
                                            onClick={() => goToPage(currentPage - 1)}
                                            className="btn btn-sm btn-ghost"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Previous
                                        </button>
                                        
                                        <div className="hidden sm:flex items-center gap-1">
                                            {renderPaginationButtons()}
                                        </div>
                                        
                                        <button
                                            disabled={currentPage === totalPages || loading}
                                            onClick={() => goToPage(currentPage + 1)}
                                            className="btn btn-sm btn-ghost"
                                        >
                                            Next
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="text-sm text-base-content/60">
                                        {offers.length} jobs this page
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

export default JobOffers;