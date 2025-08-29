import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob } from "../../services/PublicJobService";
import { applyForJob, withdrawApplication, checkMyApplication, formatDate, formatSalary } from "../../services/applicationService";

function JobOfferPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobOffer, setJobOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [application, setApplication] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadJobOffer();
        checkUserApplication();
    }, [id]);

    const loadJobOffer = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getJob(id);
            setJobOffer(data);
        } catch (err) {
            console.error("Error loading job offer:", err);
            setError("Failed to load job offer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const checkUserApplication = async () => {
        try {
            const res= await checkMyApplication(id);
            setApplication(res);
        } catch (err) {
            console.error("Error checking application status:", err);
        }
    };

    const handleApply = async () => {
        if (!jobOffer) return;
        setActionLoading(true);
        try {
            await applyForJob(id, {});
            setApplication({ status: "pending" });
            document.getElementById('success_modal').showModal();
        } catch (err) {
            console.error("Error applying to job:", err);
            setError("Failed to submit application. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleWithdraw = async () => {
        if (!application?.applicationId) return;
        
        setActionLoading(true);
        try {
            await withdrawApplication(application.applicationId);
            document.getElementById('withdraw_modal').showModal();
            navigate('/profile')
        } catch (err) {
            console.error("Error withdrawing application:", err);
            setError("Failed to withdraw application. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    const getEmploymentTypeLabel = (type) => {
        const labels = {
            'full-time': 'Full Time',
            'part-time': 'Part Time',
            'contract': 'Contract',
            'temporary': 'Temporary'
        };
        return labels[type] || type;
    };

    const getContractTypeLabel = (type) => {
        const labels = {
            'permanent': 'Permanent',
            'fixed-term': 'Fixed Term',
            'freelance': 'Freelance'
        };
        return labels[type] || type;
    };

    const isApplicationDeadlinePassed = () => {
        if (!jobOffer?.application_deadline) return false;
        return new Date(jobOffer.application_deadline) < new Date();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                    <p className="text-lg font-medium">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (error && !jobOffer) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="bg-base-100 rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
                    <div className="alert alert-error mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="font-bold">Error</h3>
                            <div className="text-xs">{error}</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn btn-primary flex-1" onClick={loadJobOffer}>
                            Try Again
                        </button>
                        <button className="btn btn-ghost flex-1" onClick={() => navigate('/profile')}>
                            Back to profile
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!jobOffer) return null;

    const deadlinePassed = isApplicationDeadlinePassed();

    return (
        <div className="min-h-screen bg-base-200">
            {/* Header */}
            <div className="bg-primary text-primary-content shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <button 
                            className="btn btn-ghost btn-sm"
                            onClick={() => navigate('/jobs')}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Jobs
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{jobOffer.title}</h1>
                    <p className="text-primary-content/80 text-lg">{jobOffer.company?.name}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <div className="badge badge-accent">{getEmploymentTypeLabel(jobOffer.employment_type)}</div>
                        <div className="badge badge-accent">{getContractTypeLabel(jobOffer.type_of_contract)}</div>
                        {jobOffer.duration && <div className="badge badge-accent">{jobOffer.duration}</div>}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Description */}
                        <div className="bg-base-100 rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-base-content mb-4">Job Description</h2>
                            <div className="prose prose-sm max-w-none text-base-content/80">
                                <p className="whitespace-pre-wrap">{jobOffer.description}</p>
                            </div>
                        </div>

                        {/* Requirements */}
                        {jobOffer.requirements && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-base-content mb-4">Requirements</h2>
                                <div className="prose prose-sm max-w-none text-base-content/80">
                                    <p className="whitespace-pre-wrap">{jobOffer.requirements}</p>
                                </div>
                            </div>
                        )}

                        {/* Company Information */}
                        {jobOffer.company && (
                            <div className="bg-base-100 rounded-lg shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-base-content mb-4">About the Company</h2>
                                <div className="flex items-start gap-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-primary text-primary-content rounded-full w-16">
                                            <span className="text-xl font-bold">
                                                {jobOffer.company.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2">{jobOffer.company.name}</h3>
                                        {jobOffer.company.location && (
                                            <p className="text-base-content/60 mb-2">
                                                📍 {jobOffer.company.location}
                                            </p>
                                        )}
                                        {jobOffer.company.description && (
                                            <p className="text-base-content/80">{jobOffer.company.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Application Card */}
                        <div className="bg-base-100 rounded-lg shadow-sm p-6 sticky top-4">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-primary mb-2">
                                    {formatSalary(jobOffer.salary)}
                                </h3>
                                <p className="text-base-content/60">per year</p>
                            </div>

                            {error && (
                                <div className="alert alert-error mb-4 text-xs">
                                    <span>{error}</span>
                                </div>
                            )}

                            {deadlinePassed ? (
                                <div className="alert alert-warning mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-bold">Application Deadline Passed</h3>
                                        <div className="text-xs">This position is no longer accepting applications.</div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {application?.status==="pending" ? (
                                        <div className="space-y-4">
                                            <div className="alert alert-success">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <h3 className="font-bold">Application Submitted</h3>
                                                    <div className="text-xs">You have already applied to this position.</div>
                                                </div>
                                            </div>
                                            <button 
                                                className="btn btn-error btn-outline w-full"
                                                onClick={handleWithdraw}
                                                disabled={actionLoading}
                                            >
                                                {actionLoading && <span className="loading loading-spinner loading-sm"></span>}
                                                Withdraw Application
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            className="btn btn-primary w-full btn-lg"
                                            onClick={handleApply}
                                            disabled={actionLoading}
                                        >
                                            {actionLoading && <span className="loading loading-spinner loading-sm"></span>}
                                            Apply Now
                                        </button>
                                    )}
                                </>
                            )}

                            {jobOffer.motivation_letter_required && !application?.status==="pending" && (
                                <div className="alert alert-info mt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="text-xs">
                                        <h3 className="font-bold">Motivation Letter Required</h3>
                                        <div>You'll need to submit a motivation letter with your application.</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Job Details */}
                        <div className="bg-base-100 rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-4">Job Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-base-content/60">Employment Type:</span>
                                    <span className="font-medium">{getEmploymentTypeLabel(jobOffer.employment_type)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-base-content/60">Contract Type:</span>
                                    <span className="font-medium">{getContractTypeLabel(jobOffer.type_of_contract)}</span>
                                </div>
                                {jobOffer.duration && (
                                    <div className="flex justify-between">
                                        <span className="text-base-content/60">Duration:</span>
                                        <span className="font-medium">{jobOffer.duration}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-base-content/60">Application Deadline:</span>
                                    <span className={`font-medium ${deadlinePassed ? 'text-error' : 'text-success'}`}>
                                        {formatDate(jobOffer.application_deadline)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-base-content/60">Posted:</span>
                                    <span className="font-medium">{formatDate(jobOffer.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <dialog id="success_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-success">Application Submitted!</h3>
                    <p className="py-4">Your application has been successfully submitted. You'll hear back from the company soon.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-primary">Great!</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Withdraw Modal */}
            <dialog id="withdraw_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-warning">Application Withdrawn</h3>
                    <p className="py-4">Your application has been successfully withdrawn. You can reapply anytime before the deadline.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">OK</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default JobOfferPage;