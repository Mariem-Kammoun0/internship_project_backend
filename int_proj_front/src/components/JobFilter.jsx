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
        // Apply each filter individually
        Object.keys(defaultFilters).forEach(key => {
            onFilterChange(key, defaultFilters[key]);
        });
    };

    return (
        <div className="bg-base-100 p-6 rounded-lg shadow-sm border border-base-300 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-base-content">Filtres de recherche</h2>
                <button 
                    onClick={clearAllFilters}
                    className="btn btn-ghost btn-sm text-primary"
                >
                    Effacer tout
                </button>
            </div>

            <div className="space-y-4">
                {/* Search */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Rechercher</span>
                    </label>
                    <form onSubmit={handleSearchSubmit} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Rechercher des emplois..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-bordered flex-1"
                            disabled={loading}
                        />
                        <button 
                            type="submit" 
                            disabled={loading || !searchQuery.trim()}
                            className="btn btn-primary"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Rechercher"
                            )}
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Employment Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Type d'emploi</span>
                        </label>
                        <select
                            value={filters.employment_type}
                            onChange={(e) => handleChange("employment_type", e.target.value)}
                            className="select select-bordered"
                        >
                            <option value="">Tous les types</option>
                            <option value="full-time">Temps plein</option>
                            <option value="part-time">Temps partiel</option>
                            <option value="temporary">Temporaire</option>
                            <option value="contract">Contrat</option>
                        </select>
                    </div>

                    {/* Contract Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Type de contrat</span>
                        </label>
                        <select
                            value={filters.type_of_contract}
                            onChange={(e) => handleChange("type_of_contract", e.target.value)}
                            className="select select-bordered"
                        >
                            <option value="">Tous les contrats</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Fixed_term">Durée déterminée</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Localisation</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ville ou région"
                            value={filters.company_location}
                            onChange={(e) => handleChange("company_location", e.target.value)}
                            className="input input-bordered"
                        />
                    </div>
                </div>

                {/* Salary Range */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Fourchette salariale</span>
                    </label>
                    <div className="flex gap-2 items-center">
                        <input
                            type="number"
                            placeholder="Salaire min"
                            value={filters.salary.min || ""}
                            onChange={(e) =>
                                handleChange("salary", { 
                                    ...filters.salary, 
                                    min: e.target.value ? Number(e.target.value) : null 
                                })
                            }
                            className="input input-bordered flex-1"
                        />
                        <span className="text-base-content/60">à</span>
                        <input
                            type="number"
                            placeholder="Salaire max"
                            value={filters.salary.max || ""}
                            onChange={(e) =>
                                handleChange("salary", { 
                                    ...filters.salary, 
                                    max: e.target.value ? Number(e.target.value) : null 
                                })
                            }
                            className="input input-bordered flex-1"
                        />
                    </div>
                </div>

                {/* Requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Compétences requises</span>
                        {filters.requirements.length > 0 && (
                            <span className="label-text-alt text-primary">
                                {filters.requirements.length} sélectionnée(s)
                            </span>
                        )}
                    </label>
                    <div className="flex flex-wrap gap-2 p-3 border border-base-300 rounded-lg bg-base-50 max-h-32 overflow-y-auto">
                        {reqs.map((req) => (
                            <label key={req} className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.requirements.includes(req)}
                                    onChange={() => handleRequirementToggle(req)}
                                    className="checkbox checkbox-primary checkbox-sm mr-2"
                                />
                                <span className="text-sm">{req}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Sort */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Trier par</span>
                    </label>
                    <select
                        value={filters.sort}
                        onChange={(e) => handleChange("sort", e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="">Par défaut</option>
                        <option value="newest">Plus récent</option>
                        <option value="salary_desc">Salaire décroissant</option>
                        <option value="salary_asc">Salaire croissant</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default JobFilter;