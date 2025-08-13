import { fetchJobs } from './jobService';

useEffect(() => {
  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  loadJobs();
}, []);
