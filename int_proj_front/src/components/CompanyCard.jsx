import { Link } from 'react-router-dom';

function CompanyCard({ company, viewMode = 'grid' }) {
    const formatDate = (dateString) => {
        return new Date(dateString).getFullYear();
    };

    const getSizeCategory = (size) => {
        if (size < 50) return { text: 'Small', class: 'badge-info' };
        if (size < 200) return { text: 'Medium', class: 'badge-warning' };
        return { text: 'Large', class: 'badge-success' };
    };

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    if (viewMode === 'list') {
        return (
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="card-body p-4">
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-base-200">
                                <img 
                                    src={company.logo || "/api/placeholder/48/48"} 
                                    alt={`${company.name} logo`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-lg truncate text-primary hover:text-primary-focus">
                                        {company.name}
                                    </h3>
                                    <p className="text-sm text-base-content/70 truncate">
                                        {truncateText(company.description, 100)}
                                    </p>
                                    <div className="flex items-center flex-wrap gap-4 mt-2 text-xs text-base-content/60">
                                        <div className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span>{company.industry}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{company.address}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                            <span>{company.size} employees</span>
                                        </div>
                                        {company.jobOffers > 0 && (
                                            <div className="flex items-center gap-1 text-success font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6" />
                                                </svg>
                                                <span>{company.jobOffers} jobs</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-3 lg:mt-0 flex-shrink-0">
                                    {company.website && (
                                        <a 
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-ghost btn-xs"
                                            title="Visit Website"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                    <Link 
                                        to={`/companies/${company.id}`}
                                        className="btn btn-primary btn-xs"
                                    >
                                        See More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid view (default)
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
                {/* Header with logo and basic info */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="avatar">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-base-200">
                            <img 
                                src={company.logo || "/api/placeholder/64/64"} 
                                alt={`${company.name} logo`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="card-title text-lg mb-2 truncate text-primary">
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
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-3 text-sm text-base-content/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{company.address}</span>
                </div>

                {/* Description */}
                <p className="text-base-content/80 text-sm mb-4 line-clamp-3">
                    {truncateText(company.description, 120)}
                </p>

                {/* Company stats */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-4 p-3 bg-base-200/50 rounded-lg">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-base-content/70 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <span>Size</span>
                        </div>
                        <span className="font-semibold">{company.size}</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-base-content/70 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M3 21h18l-2-7H5l-2 7z" />
                            </svg>
                            <span>Founded</span>
                        </div>
                        <span className="font-semibold">{formatDate(company.founded_at)}</span>
                    </div>
                </div>

                {/* Job offers alert */}
                {company.jobOffers > 0 && (
                    <div className="alert alert-success py-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6" />
                        </svg>
                        <span className="text-sm font-medium">
                            {company.jobOffers} open position{company.jobOffers > 1 ? 's' : ''}
                        </span>
                    </div>
                )}

                {/* Actions */}
                <div className="card-actions justify-between mt-4">
                    {company.website && (
                        <a 
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm"
                            title="Visit Website"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Website
                        </a>
                    )}
                    <Link 
                        to={`/companies/${company.id}`}
                        className="btn btn-primary btn-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        See More
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CompanyCard;