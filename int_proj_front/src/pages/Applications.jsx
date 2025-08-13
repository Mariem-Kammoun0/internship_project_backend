import ApplicationCard from '../components/ApplicationCard';

function Applications({ applications }) {
    return (
        <div className="applications">
            <h1>Applications:</h1>
            {applications.length > 0 ? (
                applications.map((application) => <ApplicationCard key={application.id} application={application} />)
            ) : (
                <p>No applications submitted yet.</p>
            )}
        </div>
    );
}