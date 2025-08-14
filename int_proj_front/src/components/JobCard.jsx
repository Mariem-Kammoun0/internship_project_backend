function JobCard({ jobOffer }) {
  return (
    <div className="job-card">
      <img
        src={jobOffer.company?.logo || "/fallback.png"}
        alt={jobOffer.company?.name || "Company logo"}
      />
      <h2>{jobOffer.title}</h2>
      <h3>{jobOffer.employment_type} / {jobOffer.type_of_contract}</h3>
      <h3>{jobOffer.salary}</h3>
      <div className="requirements">
        {jobOffer.requirements?.split(',').map((req, index) => (
          <span key={index} className="requirement">{req}</span>
        ))}
      </div>
      <p>{jobOffer.description}</p>
      <p>{jobOffer.company?.address || "Address not available"}</p>
    </div>
  );
}

export default JobCard;