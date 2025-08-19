import { useState } from "react";

function ApplicationFilter({ onSearch, onFilterChange, loading }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        date_applied: "",
        job_type: "",
        company: "",
        salary_range: { min: null, max: null },
        location: "",
        sort: ""
    });
    const [isCollapsed, setIsCollapsed] = useState(false);

    const statusOptions = [
        { value: "pending", label: "En attente", color: "warning" },
        { value: "reviewed", label: "Examinée", color: "info" },
        { value: "interview", label: "Entretien", color: "primary" },
        { value: "accepted", label: "Acceptée", color: "success" },
        { value: "rejected", label: "Refusée", color: "error" }
    ];

    const jobTypes = [
        'full-time', 'part-time', 'contract', 'temporary', 'internship', 'freelance'
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

    const clearAllFilters = () => {
        const defaultFilters = {
            status: "",
            date_applied: "",
            job_type: "",
            company: "",
            salary_range: { min: null, max: null },
            location: "",
            sort: ""
        };
        setFilters(defaultFilters);
        Object.keys(defaultFilters).forEach(key => {
            onFilterChange(key, defaultFilters[key]);
        });
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (filters.status) count++;
        if (filters.date_applied) count++;
        if (filters.job_type) count++;
        if (filters.company) count++;
        if (filters.salary_range.min || filters.salary_range.max) count++;
        if (filters.location) count++;
        if (filters.sort) count++;
        return count;
    };

    return (
        <div className="bg-base-100 shadow-lg rounded-lg border border-base-300 sticky top-4">
            {/* Header */}
            <div className="p-4 border-b border-base-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-base-content">Filtres</h2>
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
                                Effacer tout
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
                            <span className="label-text font-medium text-sm">Rechercher Applications</span>
                        </label>
                        <form onSubmit={handleSearchSubmit} className="space-y-2">
                            <input
                                type="text"
                                placeholder="Poste, entreprise..."
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
                                        Rechercher
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="divider my-2"></div>

                    {/* Status Filter */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Statut de l'Application</span>
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                            className="select select-bordered select-sm w-full"
                        >
                            <option value="">Tous les statuts</option>
                            {statusOptions.map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Applied Filter */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Date de Candidature</span>
                        </label>
                        <select
                            value={filters.date_applied}
                            onChange={(e) => handleChange("date_applied", e.target.value)}
                            className="select select-bordered select-sm w-full"
                        >
                            <option value="">Toutes les dates</option>
                            <option value="today">Aujourd'hui</option>
                            <option value="week">Cette semaine</option>
                            <option value="month">Ce mois-ci</option>
                            <option value="3months">3 derniers mois</option>
                            <option value="6months">6 derniers mois</option>
                            <option value="year">Cette année</option>
                        </select>
                    </div>

                    {/* Job Type Filter */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Type d'Emploi</span>
                        </label>
                        <select
                            value={filters.job_type}
                            onChange={(e) => handleChange("job_type", e.target.value)}
                            className="select select-bordered select-sm w-full"
                        >
                            <option value="">Tous les types</option>
                            {jobTypes.map(type => (
                                <option key={type} value={type}>
                                    {type === 'full-time' ? 'Temps plein' :
                                     type === 'part-time' ? 'Temps partiel' :
                                     type === 'contract' ? 'Contrat' :
                                     type === 'temporary' ? 'Temporaire' :
                                     type === 'internship' ? 'Stage' :
                                     type === 'freelance' ? 'Freelance' : type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Company Filter */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Entreprise</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Nom de l'entreprise"
                            value={filters.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    {/* Location Filter */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Localisation</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ville ou région"
                            value={filters.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    {/* Salary Range */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Fourchette Salariale</span>
                        </label>
                        <div className="space-y-2">
                            <input
                                type="number"
                                placeholder="Salaire min"
                                value={filters.salary_range.min || ""}
                                onChange={(e) =>
                                    handleChange("salary_range", { 
                                        ...filters.salary_range, 
                                        min: e.target.value ? Number(e.target.value) : null 
                                    })
                                }
                                className="input input-bordered input-sm w-full"
                            />
                            <input
                                type="number"
                                placeholder="Salaire max"
                                value={filters.salary_range.max || ""}
                                onChange={(e) =>
                                    handleChange("salary_range", { 
                                        ...filters.salary_range, 
                                        max: e.target.value ? Number(e.target.value) : null 
                                    })
                                }
                                className="input input-bordered input-sm w-full"
                            />
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Trier par</span>
                        </label>
                        <select
                            value={filters.sort}
                            onChange={(e) => handleChange("sort", e.target.value)}
                            className="select select-bordered select-sm w-full"
                        >
                            <option value="">Par défaut</option>
                            <option value="newest">Plus récent</option>
                            <option value="oldest">Plus ancien</option>
                            <option value="status">Statut</option>
                            <option value="company">Entreprise</option>
                            <option value="position">Poste</option>
                        </select>
                    </div>

                    {/* Quick Status Filters */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-sm">Filtres Rapides</span>
                        </label>
                        <div className="grid grid-cols-1 gap-1">
                            {statusOptions.map(status => (
                                <button
                                    key={status.value}
                                    onClick={() => handleChange("status", filters.status === status.value ? "" : status.value)}
                                    className={`btn btn-sm justify-start ${
                                        filters.status === status.value 
                                            ? `btn-${status.color}` 
                                            : 'btn-ghost'
                                    }`}
                                >
                                    <div className={`w-2 h-2 rounded-full bg-${status.color} mr-2`}></div>
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicationFilter;