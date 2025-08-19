import { useState } from "react";

function JobFilter({ onSearch, onFilterChange, loading }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        employment_type: "",
        type_of_contract: "",
        salary: { min: null, max: null },
        company_location: "",
        requirements: [],
        sort: ""
    });
    const [isCollapsed, setIsCollapsed] = useState(false);

    const reqs = [
        'python', 'javascript', 'php', 'sql', 'nosql', 'c++', 
        'french', 'english', 'arabic', 'time-management', 
        'team-work', '+5 years experience'
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;
        onSearch(searchQuery.trim());
        setSearchQuery("");
    };

    const handleChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        onFilterChange(field, value);
    };

    const handleRequirementToggle = (req) => {
        const newRequirements = filters.requirements.includes(req)
            ? filters.requirements.filter(r => r !== req)
            : [...filters.requirements, req];
        
        setFilters(prev => ({ ...prev, requirements: newRequirements }));
        onFilterChange("requirements", newRequirements);
    };

    const clearAllFilters = () => {
        const defaultFilters = {
            employment_type: "",
            type_of_contract: "",
            salary: { min: null, max: null },
            company_location: "",
            requirements: [],
            sort: ""
        };
        setFilters(defaultFilters);
        Object.keys(defaultFilters).forEach(key => {
            onFilterChange(key, defaultFilters[key]);
        });
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (filters.employment_type) count++;
        if (filters.type_of_contract) count++;
        if (filters.salary.min || filters.salary.max) count++;
        if (filters.company_location) count++;
        if (filters.requirements.length > 0) count++;
        if (filters.sort) count++;
        return count;
    };

    return (
        <div className="bg-base-100 shadow-lg rounded-lg border border-base-300 sticky top-4">
            {/* Header */}
            <div className="p-4 border-b border-base-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-base-content">Filters</h2>
                        {getActiveFilterCount() > 0 && (
                            <span className="badge badge-primary badge-sm">
                                {getActiveFilterCount()}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {getActiveFilterCount() > 0 && (
                            <button 
                                onClick={clearAllFilters}
                                className="btn btn-ghost btn-sm text-error"
                            >
                                Clear All
                            </button>
                        )}
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="btn btn-ghost btn-sm lg:hidden"
                        >
                            {isCollapsed ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
                <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* Search */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Search Jobs</span>
                        </label>
                        <form onSubmit={handleSearchSubmit} className="space-y-2">
                            <input
                                type="text"
                                placeholder="Job title, company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered input-sm w-full"
                                disabled={loading}
                            />
                            <button 
                                type="submit" 
                                disabled={loading || !searchQuery.trim()}
                                className="btn btn-primary btn-sm w-full"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Search
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="divider my-2"></div>

                    {/* Employment Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Employment Type</span>
                        </label>
                        <select
                            value={filters.employment_type}
                            onChange={(e) => handleChange("employment_type", e.target.value)}
                            className="select select-bordered select-sm w-full"
                        >
                            <option value="">All Types</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="temporary">Temporary</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>

                    {/* Contract Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Contract Type</span>
                        </label>
                        <select
                            value={filters.type_of_contract}
                            onChange={(e) => handleChange("type_of_contract", e.target.value)}
                            className="select select-bordered select-sm w-full"
                        >
                            <option value="">All Contracts</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Fixed_term">Fixed Term</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Location</span>
                        </label>
                        <input
                            type="text"
                            placeholder="City or region"
                            value={filters.company_location}
                            onChange={(e) => handleChange("company_location", e.target.value)}
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    {/* Salary Range */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Salary Range</span>
                        </label>
                        <div className="space-y-2">
                            <input
                                type="number"
                                placeholder="Min salary"
                                value={filters.salary.min || ""}
                                onChange={(e) =>
                                    handleChange("salary", { 
                                        ...filters.salary, 
                                        min: e.target.value ? Number(e.target.value) : null 
                                    })
                                }
                                className="input input-bordered input-sm w-full"
                            />
                            <input
                                type="number"
                                placeholder="Max salary"
                                value={filters.salary.max || ""}
                                onChange={(e) =>
                                    handleChange("salary", { 
                                        ...filters.salary, 
                                        max: e.target.value ? Number(e.target.value) : null 
                                    })
                                }
                                className="input input-bordered input-sm w-full"
                            />
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Skills & Requirements</span>
                            {filters.requirements.length > 0 && (
                                <span className="label-text-alt text-primary text-xs">
                                    {filters.requirements.length} selected
                                </span>
                            )}
                        </label>
                        <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-base-300 rounded bg-base-50">
                            {reqs.map((req) => (
                                <label key={req} className="cursor-pointer flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.requirements.includes(req)}
                                        onChange={() => handleRequirementToggle(req)}
                                        className="checkbox checkbox-primary checkbox-xs"
                                    />
                                    <span className="text-xs">{req}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Sort By</span>
                        </label>
                        <select
                            value={filters.sort}
                            onChange={(e) => handleChange("sort", e.target.value)}
                            className="select select-bordered select-sm w-full"
                        >
                            <option value="">Default</option>
                            <option value="newest">Newest First</option>
                            <option value="salary_desc">Highest Salary</option>
                            <option value="salary_asc">Lowest Salary</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobFilter;