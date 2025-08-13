import { useState } from "react";


function JobFilters({ onSearch, onFilterChange, loading }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        employment_type: "",
        type_of_contract: "",
        salary: { min: null, max: null },
        company_location: "",
        requirements: [],
        sort: ""
    });

    const reqs=['python','javascript','php','sql','nosql','c+','french','english','arabic','time-management','team-work','+5 years experience'];

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

    return (
        <div className="filters-container">
            {/* Search */}
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" disabled={loading}>Search</button>
            </form>

            {/* Employment Type */}
            <select
                value={filters.employment_type}
                onChange={(e) => handleChange("employment_type", e.target.value)}
            >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="temporary">Temporary</option>
                <option value="contract">Contract</option>
            </select>

            {/* Contract Type */}
            <select
                value={filters.type_of_contract}
                onChange={(e) => handleChange("type_of_contract", e.target.value)}
            >
                <option value="">All Contracts</option>
                <option value="Permanent">Permanent</option>
                <option value="Fixed_term">Fixed term</option>
                <option value="Freelance">Freelance</option>
            </select>

            {/* Salary */}
            <input
                type="number"
                placeholder="Min Salary"
                value={filters.salary.min || ""}
                onChange={(e) =>
                    handleChange("salary", { ...filters.salary, min: Number(e.target.value) })
                }
            />
            <input
                type="number"
                placeholder="Max Salary"
                value={filters.salary.max || ""}
                onChange={(e) =>
                    handleChange("salary", { ...filters.salary, max: Number(e.target.value) })
                }
            />

            {/* Location */}
            <input
                type="text"
                placeholder="Location"
                value={filters.company_location}
                onChange={(e) => handleChange("company_location", e.target.value)}
            />

            {/* Requirements */}
            <select
                multiple
                value={filters.requirements}
                onChange={(e) =>
                    handleChange(
                        "requirements",
                        Array.from(e.target.selectedOptions, (opt) => opt.value)
                    )
                }
            >
                {(reqs.map((req)=>
                    {<option value={req}>{req}</option>}
                ))}
            </select>

            {/* Sort */}
            <select
                value={filters.sort}
                onChange={(e) => handleChange("sort", e.target.value)}
            >
                <option value="">Default</option>
                <option value="newest">Newest First</option>
                <option value="salary_desc">Highest Salary</option>
                <option value="salary_asc">Lowest Salary</option>
            </select>
        </div>
    );
}

export default JobFilters;
