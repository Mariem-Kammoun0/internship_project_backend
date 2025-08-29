import { useState } from 'react';

function CompanyFilters({ filters, onFilterChange, onClearFilters, viewMode, onViewModeChange }) {
    const [showFilters, setShowFilters] = useState(false);

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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    const handleClearFilters = () => {
        onClearFilters();
        setShowFilters(false);
    };

    return (
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
                                    value={filters.search || ''}
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
                                onClick={() => onViewModeChange('grid')}
                                className={`btn join-item ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => onViewModeChange('list')}
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
                    <>
                        <div className="divider my-2"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="form-control">
                                <label className="label label-text-sm">Industry</label>
                                <select
                                    name="industry"
                                    value={filters.industry || ''}
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
                                    value={filters.location || ''}
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
                                    value={filters.sizeMin || ''}
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
                                    value={filters.sizeMax || ''}
                                    onChange={handleFilterChange}
                                    className="input input-bordered input-sm"
                                />
                            </div>

                            <div className="md:col-span-2 lg:col-span-4">
                                <button
                                    onClick={handleClearFilters}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CompanyFilters;