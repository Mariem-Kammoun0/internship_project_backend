import { useNavigate } from "react-router-dom";

function JobCard({ jobOffer }) {

  const navigate = useNavigate();

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Fonction pour tronquer la description
  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 mb-4">
      <div className="card-body">
        {/* Header avec titre et date */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="card-title text-primary text-xl font-semibold flex-1 mr-4">
            {jobOffer.title}
          </h2>
          <div className="text-sm text-base-content/60 whitespace-nowrap">
            {formatDate(jobOffer.created_at)}
          </div>
        </div>

        {/* Description */}
        <p className="text-base-content/70 text-sm mb-4">
          {truncateText(jobOffer.description)}
        </p>

        {/* Informations sur l'emploi */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="badge badge-outline badge-lg">
            {jobOffer.employment_type}
            {jobOffer.type_of_contract && ` / ${jobOffer.type_of_contract}`}
          </div>
          {jobOffer.salary && (
            <div className="badge badge-success badge-lg text-success-content">
              {jobOffer.salary}
            </div>
          )}
        </div>

        {/* Requirements tags */}
        {jobOffer.requirements && (
          <div className="flex flex-wrap gap-2 mb-5">
            {jobOffer.requirements.split(',').slice(0, 3).map((req, index) => (
              <div key={index} className="badge badge-primary badge-sm">
                {req.trim()}
              </div>
            ))}
            {jobOffer.requirements.split(',').length > 3 && (
              <div className="badge badge-ghost badge-sm">
                +{jobOffer.requirements.split(',').length - 3} more
              </div>
            )}
          </div>
        )}

        {/* Footer avec entreprise et localisation */}
        <div className="flex justify-between items-center pt-4 border-t border-base-300">
          <div className="flex items-center gap-2">
            {jobOffer.company?.logo && (
              <div className="avatar">
                <div className="w-6 h-6 rounded">
                  <img
                    src={jobOffer.company.logo}
                    alt={jobOffer.company.name || "Company logo"}
                  />
                </div>
              </div>
            )}
            <span className="text-sm font-medium text-base-content">
              {jobOffer.company?.name || "Company"}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-base-content/60 text-sm">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {jobOffer.company?.address || jobOffer.company_location || "Location not specified"}
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-warning btn-sm" onClick={() => navigate(`/job-offers/${jobOffer.id}`)}>
            Voir Plus
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;