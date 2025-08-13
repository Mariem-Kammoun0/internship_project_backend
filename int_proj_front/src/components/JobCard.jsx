function JobCard ({JobOffer}){
    return(
        <div className="job-card">
            <img src={JobOffer.comapany.logo}></img>
            <h2>{JobOffer.title}</h2>
            <h3>{JobOffer.employment_type} / {contract_type}</h3>
            <h3>{JobOffer.salary}</h3>
            <div className="requirements">
                {(JobOffer.requirements).map((req)=>({req}))}
            </div>
            <p>{JobOffer.description}</p>
            <p>{JobOffer.Company.address}</p>
        </div>
    )
}

export default JobCard;