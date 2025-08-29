import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { showcompanies } from '../../services/companyService';
import CompanyFilters from '../../components/CompanyFilters';
import CompanyCard from '../../components/CompanyCard';
import Pagination from '../../components/pagination';

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [itemsPerPage] = useState(12); // Fixed items per page
    
    // Filter states
    const [filters, setFilters] = useState({
        search: '',
        industry: '',
        location: '',
        sizeMin: '',
        sizeMax: ''
    });

    // Fetch companies data
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setLoading(true);
                const data = await showcompanies({
                    currentPage: 1, // Get all companies for client-side filtering
                    lastSearchQuery: '',
                    filters: {}
                });
                setCompanies(data.data || []);
            } catch (err) {
                setError('Failed to load companies');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    // Filter companies based on current filters
    const filteredCompanies = useMemo(() => {
        let filtered = companies;

        // Search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(company =>
                company.name.toLowerCase().includes(searchTerm) ||
                company.description?.toLowerCase().includes(searchTerm) ||
                company.industry?.toLowerCase().includes(searchTerm) ||
                company.address?.toLowerCase().includes(searchTerm)
            );
        }

        // Industry filter
        if (filters.industry) {
            filtered = filtered.filter(company => company.industry === filters.industry);
        }

        // Location filter
        if (filters.location) {
            const locationTerm = filters.location.toLowerCase();
            filtered = filtered.filter(company =>
                company.address?.toLowerCase().includes(locationTerm)
            );
        }

        // Size filters
        if (filters.sizeMin) {
            const minSize = parseInt(filters.sizeMin);
            filtered = filtered.filter(company => company.size >= minSize);
        }

        if (filters.sizeMax) {
            const maxSize = parseInt(filters.sizeMax);
            filtered = filtered.filter(company => company.size <= maxSize);
        }

        return filtered;
    }, [companies, filters]);

    // Paginated companies
    const paginatedCompanies = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredCompanies.slice(startIndex, endIndex);
    }, [filteredCompanies, currentPage, itemsPerPage]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            search: '',
            industry: '',
            location: '',
            sizeMin: '',
            sizeMax: ''
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    </div>

                    {/* Filters Component */}
                    <CompanyFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                    />

                    {/* Results Count */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-base-content/70">
                            Showing {paginatedCompanies.length} of {filteredCompanies.length} companies
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
                                    onClick={handleClearFilters}
                                    className="btn btn-primary btn-sm"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={viewMode === 'grid' 
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "space-y-4"
                            }>
                                {paginatedCompanies.map((company) => (
                                    <CompanyCard 
                                        key={company.id} 
                                        company={company} 
                                        viewMode={viewMode} 
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredCompanies.length}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Companies;