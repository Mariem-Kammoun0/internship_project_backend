import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationFilter from "../../components/ApplicationFilter";
import ApplicationCard from "../../components/ApplicationCard";
import { getMyApplications, withdrawApplication, updateApplicationStatus } from "../services/applicationService";

function Applications() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [lastSearchQuery, setLastSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        date_applied: "",
        job_type: "",
        company: "",
        salary_range: { min: null, max: null },
        location: "",
        sort: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getApplications= async (()=>{
        const apps= await getJobApplications({
                job_offer_id: lastSearchQuery,
                filters
                 });
        setApplications(apps);
        })
    }, [currentPage, lastSearchQuery, filters]);

    const handleSearch = (query) => {
        setCurrentPage(1);
        setLastSearchQuery(query);
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    const handleWithdraw = async (applicationId) => {
        if (window.confirm("Êtes-vous sûr de vouloir retirer cette candidature ?")) {
            try {
                // await withdrawApplication(applicationId);
                setApplications(prev => prev.filter(app => app.id !== applicationId));
                alert("Candidature retirée avec succès !");
            } catch (error) {
                console.error("Error withdrawing application:", error);
                alert("Erreur lors du retrait de la candidature.");
            }
        }
    };

    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            // await updateApplicationStatus(applicationId, newStatus);
            setApplications(prev => 
                prev.map(app => 
                    app.id === applicationId 
                        ? { ...app, status: newStatus }
                        : app
                )
            );
            alert("Statut mis à jour avec succès !");
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Erreur lors de la mise à jour du statut.");
        }
    };

    const handleViewDetails = (application) => {
        navigate(`/jobs/${application.job_offer_id}`);
    };

    const getStatusSummary = () => {
        if (applications.length === 0) return null;
        
        const summary = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {});

        return (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="stat bg-warning/10 rounded-lg p-4 text-center">
                    <div className="stat-value text-warning text-2xl">{summary.pending || 0}</div>
                    <div className="stat-title text-sm">En attente</div>
                </div>
                <div className="stat bg-info/10 rounded-lg p-4 text-center">
                    <div className="stat-value text-info text-2xl">{summary.reviewed || 0}</div>
                    <div className="stat-title text-sm">Examinées</div>
                </div>
                <div className="stat bg-primary/10 rounded-lg p-4 text-center">
                    <div className="stat-value text-primary text-2xl">{summary.interview || 0}</div>
                    <div className="stat-title text-sm">Entretiens</div>
                </div>
                <div className="stat bg-success/10 rounded-lg p-4 text-center">
                    <div className="stat-value text-success text-2xl">{summary.accepted || 0}</div>
                    <div className="stat-title text-sm">Acceptées</div>
                </div>
                <div className="stat bg-error/10 rounded-lg p-4 text-center">
                    <div className="stat-value text-error text-2xl">{summary.rejected || 0}</div>
                    <div className="stat-title text-sm">Refusées</div>
                </div>
            </div>
        );
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
            <div className="bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Mes Candidatures</h1>
                            <p className="text-primary-content/80 mt-2">
                                {loading ? "Chargement..." : `${applications.length} candidature${applications.length !== 1 ? 's' : ''} trouvée${applications.length !== 1 ? 's' : ''}`}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => navigate('/jobs')}
                                className="btn btn-accent"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Nouvelle Candidature
                            </button>
                            <button 
                                onClick={loadApplications}
                                className="btn btn-outline btn-accent"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Actualiser
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filter */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <ApplicationFilter
                            onSearch={handleSearch}
                            onFilterChange={handleFilterChange}
                            loading={loading}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Status Summary */}
                        {!loading && !error && applications.length > 0 && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Résumé de vos candidatures</h3>
                                {getStatusSummary()}
                            </div>
                        )}

                        {/* Results Header */}
                        <div className="bg-base-100 rounded-lg shadow-sm p-4 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-base-content">
                                        {lastSearchQuery ? `Résultats pour "${lastSearchQuery}"` : "Toutes mes candidatures"}
                                    </h2>
                                    {!loading && (
                                        <p className="text-sm text-base-content/60">
                                            Affichage de {applications.length} candidature{applications.length !== 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>
                                
                                {/* Export Options */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                        Options
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a>Exporter en PDF</a></li>
                                        <li><a>Exporter en Excel</a></li>
                                        <li><a>Imprimer</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-12">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                                    <p className="text-lg font-medium">Chargement de vos candidatures...</p>
                                    <p className="text-sm text-base-content/60">Veuillez patienter</p>
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
                                        <h3 className="font-bold">Erreur de chargement</h3>
                                        <div className="text-xs">{error}</div>
                                    </div>
                                    <button 
                                        className="btn btn-sm btn-outline"
                                        onClick={loadApplications}
                                    >
                                        Réessayer
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Empty State */}
                        {!loading && !error && applications.length === 0 && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-12 text-center">
                                <div className="text-6xl mb-6">📄</div>
                                <h3 className="text-2xl font-bold text-base-content mb-2">
                                    {lastSearchQuery ? "Aucune candidature trouvée" : "Aucune candidature"}
                                </h3>
                                <p className="text-base-content/60 mb-6 max-w-md mx-auto">
                                    {lastSearchQuery 
                                        ? `Aucune candidature ne correspond à "${lastSearchQuery}". Essayez de modifier votre recherche ou vos filtres.`
                                        : "Vous n'avez pas encore soumis de candidature. Commencez par explorer les offres d'emploi disponibles !"
                                    }
                                </p>
                                <div className="space-x-2">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => navigate('/jobs')}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Parcourir les emplois
                                    </button>
                                    {lastSearchQuery && (
                                        <button 
                                            className="btn btn-outline"
                                            onClick={() => {
                                                setLastSearchQuery("");
                                                setCurrentPage(1);
                                            }}
                                        >
                                            Voir toutes les candidatures
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {/* Applications List */}
                        {!loading && !error && applications.length > 0 && (
                            <div className="space-y-4 mb-6">
                                {applications.map(application => (
                                    <ApplicationCard
                                        key={application.id}
                                        application={application}
                                        onStatusChange={handleStatusChange}
                                        onWithdraw={handleWithdraw}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && !error && totalPages > 1 && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-6">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-base-content/60">
                                        Page {currentPage} sur {totalPages}
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
                                            Précédent
                                        </button>
                                        
                                        <div className="hidden sm:flex items-center gap-1">
                                            {renderPaginationButtons()}
                                        </div>
                                        
                                        <button
                                            disabled={currentPage === totalPages || loading}
                                            onClick={() => goToPage(currentPage + 1)}
                                            className="btn btn-sm btn-ghost"
                                        >
                                            Suivant
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="text-sm text-base-content/60">
                                        {applications.length} candidature{applications.length !== 1 ? 's' : ''} affichée{applications.length !== 1 ? 's' : ''}
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

export default Applications;
