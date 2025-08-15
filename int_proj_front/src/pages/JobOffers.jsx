import JobCard from "../components/JobCard";
import { getJobs } from "../services/jobService";
import { useEffect, useState } from "react";
import JobFilter from "../components/JobFilter";

function JobOffers() {
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        employment_type: "",
        type_of_contract: "",
        salary: { min: null, max: null },
        company_location: "",
        requirements: [],
        sort: ""
    });

    const loadJobOffers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getJobs({
                    page: currentPage,
                    search: searchQuery,
                    filters
                });
                setOffers(data.data || []);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Error loading jobs:", err);
                setError("Failed to load job offers...");
            } finally {
                setLoading(false);
            }
        };


    useEffect(() => {
        loadJobOffers();
    }, [currentPage, searchQuery, filters]);

    const handleSearch = (query) => {
        setCurrentPage(1);
        setLastSearchQuery(query);
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    const goToPage = (page) => setCurrentPage(page);

    return (
        <div className="job-offers">
            <JobFilter
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                loading={loading}
            />

            <h1>
                {searchQuery ? "Offers we suggest for you:" : "Offers we found for you:"}
            </h1>

            {loading && <p>Loading...</p>}
            
            {error && <p className="error">{error}</p>}
            
            {!loading && !error && offers.length === 0 && (
                <p>No job offers available at the moment.</p>
            )}
            
            {!loading && !error && offers.length > 0 && (
                <div className="job-list">
                    {offers.map(job => (
                        <JobCard key={job.id} jobOffer={job} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1 || loading}
                        onClick={() => goToPage(currentPage - 1)}
                    >
                        Prev
                    </button>
                    
                    <span>Page {currentPage} of {totalPages}</span>
                    
                    <button
                        disabled={currentPage === totalPages || loading}
                        onClick={() => goToPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default JobOffers;