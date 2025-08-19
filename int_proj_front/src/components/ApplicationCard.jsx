import { useState } from "react";

function ApplicationCard({ application, onStatusChange, onWithdraw, onViewDetails }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { label: "En attente", class: "badge-warning", icon: "⏳" },
            reviewed: { label: "Examinée", class: "badge-info", icon: "👀" },
            interview: { label: "Entretien", class: "badge-primary", icon: "🤝" },
            accepted: { label: "Acceptée", class: "badge-success", icon: "✅" },
            rejected: { label: "Refusée", class: "badge-error", icon: "❌" }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`badge ${config.class} gap-1`}>
                <span>{config.icon}</span>
                {config.label}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        if (diffInDays === 0) return "Aujourd'hui";
        if (diffInDays === 1) return "Hier";
        if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
        if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
        return `Il y a ${Math.floor(diffInDays / 30)} mois`;
    };

    return (
        <div className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-all duration-200">
            <div className="card-body p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="card-title text-lg text-primary hover:text-primary-focus cursor-pointer" 
                                onClick={() => onViewDetails(application)}>
                                {application.job_title}
                            </h3>
                            {getStatusBadge(application.status)}
                        </div>
                        
                        <div className="space-y-1 text-sm text-base-content/70">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="font-medium">{application.company_name}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{application.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Candidaté {getTimeAgo(application.applied_date)}</span>
                                <span className="text-xs">({formatDate(application.applied_date)})</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                        {application.salary && (
                            <div className="text-success font-semibold">
                                {application.salary}
                            </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                            <span className={`badge badge-sm ${
                                application.job_type === 'full-time' ? 'badge-primary' :
                                application.job_type === 'part-time' ? 'badge-secondary' :
                                application.job_type === 'contract' ? 'badge-accent' :
                                'badge-ghost'
                            }`}>
                                {application.job_type === 'full-time' ? 'Temps plein' :
                                 application.job_type === 'part-time' ? 'Temps partiel' :
                                 application.job_type === 'contract' ? 'Contrat' :
                                 application.job_type === 'temporary' ? 'Temporaire' :
                                 application.job_type === 'internship' ? 'Stage' :
                                 application.job_type === 'freelance' ? 'Freelance' : application.job_type}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Expandable Details */}
                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-base-300 space-y-3">
                        {application.cover_letter && (
                            <div>
                                <h4 className="font-medium text-sm mb-2">Lettre de motivation:</h4>
                                <p className="text-sm text-base-content/80 bg-base-200 p-3 rounded">
                                    {application.cover_letter}
                                </p>
                            </div>
                        )}
                        
                        {application.notes && (
                            <div>
                                <h4 className="font-medium text-sm mb-2">Notes personnelles:</h4>
                                <p className="text-sm text-base-content/80 bg-base-200 p-3 rounded">
                                    {application.notes}
                                </p>
                            </div>
                        )}

                        {application.interview_date && (
                            <div className="alert alert-info">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <h3 className="font-bold">Entretien programmé</h3>
                                    <div className="text-xs">{formatDate(application.interview_date)} à {application.interview_time}</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-300">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="btn btn-ghost btn-sm"
                    >
                        {isExpanded ? (
                            <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                Masquer détails
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                Voir détails
                            </>
                        )}
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onViewDetails(application)}
                            className="btn btn-outline btn-sm"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Voir l'offre
                        </button>

                        {application.status === 'pending' && (
                            <button
                                onClick={() => onWithdraw(application.id)}
                                className="btn btn-error btn-sm btn-outline"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Retirer
                            </button>
                        )}

                        {application.status === 'interview' && (
                            <button
                                onClick={() => onStatusChange(application.id, 'completed')}
                                className="btn btn-primary btn-sm"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Marquer comme terminé
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicationCard;