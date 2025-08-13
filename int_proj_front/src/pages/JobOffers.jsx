import JobCard from "../components/JobCard";
import { getJobs } from "../services/jobService";
import { useEffect, useState } from "react";
import JobFilters from "../components/JobFilters";

function JobOffers() {
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [lastSearchQuery, setLastSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        employment_type: "",
        type_of_contract: "",
        salary: { min: null, max: null },
        company_location: "",
        requirements: [],
        sort: ""
    });

    useEffect(() => {
        const loadJobOffers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getJobs({
                    page: currentPage,
                    search: lastSearchQuery,
                    filters
                });
                setOffers(data.data);
                setTotalPages(data.last_page);
            } catch (err) {
                setError("Failed to load job offers...");
            } finally {
                setLoading(false);
            }
        };

        loadJobOffers();
    }, [currentPage, lastSearchQuery, filters]);

    const handleSearch = (query) => {
        setCurrentPage(1);
        setLastSearchQuery(query);
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    return (
        <div className="job-offers">
            <JobFilters
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                loading={loading}
            />

            {lastSearchQuery
                ? <h1>Offers we suggest for you:</h1>
                : <h1>Offers we found for you:</h1>}

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : offers.length > 0 ? (
                offers.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
                <p>No job offers available at the moment.</p>
            )}

            <div className="pagination">
                <button
                    disabled={currentPage === 1 || loading}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages || loading}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default JobOffers;
