import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateCompany() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        industry: '',
        description: '',
        logo: null,
        founded_at: ''
    });

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [currentLogo, setCurrentLogo] = useState(null);

    const industries = [
        'Technology',
        'Finance',
        'Healthcare',
        'Education',
        'Manufacturing',
        'Retail',
        'Construction',
        'Transportation',
        'Energy',
        'Entertainment',
        'Other'
    ];

    // Fetch company data on component mount
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                // Simulate API call - replace with actual API
                setTimeout(() => {
                    const mockCompany = {
                        name: 'TechCorp Solutions',
                        address: '123 Innovation Drive, San Francisco, CA 94105',
                        phone: '+1 (555) 123-4567',
                        email: 'contact@techcorp.com',
                        website: 'https://www.techcorp.com',
                        industry: 'Technology',
                        description: 'TechCorp Solutions is a leading technology company specializing in innovative software solutions and digital transformation services.',
                        founded_at: '2015-03-15',
                        logo: '/api/placeholder/200/200'
                    };
                    
                    setFormData({
                        name: mockCompany.name,
                        address: mockCompany.address,
                        phone: mockCompany.phone,
                        email: mockCompany.email,
                        website: mockCompany.website,
                        industry: mockCompany.industry,
                        description: mockCompany.description,
                        founded_at: mockCompany.founded_at,
                        logo: null
                    });
                    
                    setCurrentLogo(mockCompany.logo);
                    setInitialLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching company:', error);
                setInitialLoading(false);
            }
        };

        fetchCompany();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            logo: file
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Company name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.industry) {
            newErrors.industry = 'Industry is required';
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    submitData.append(key, formData[key]);
                }
            });

            // Here you would make your API call
            // const response = await fetch(`/api/companies/${id}`, {
            //     method: 'PUT' or 'PATCH',
            //     body: submitData
            // });
            
            console.log('Form updated:', formData);
            
            // Show success message and redirect
            alert('Company updated successfully!');
            navigate(`/companies/${id}`);
            
        } catch (error) {
            console.error('Error updating company:', error);
            alert('Error updating company. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this company? This action cannot be undone.'
        );
        
        if (confirmDelete) {
            try {
                // Here you would make your API call
                // await fetch(`/api/companies/${id}`, { method: 'DELETE' });
                
                alert('Company deleted successfully!');
                navigate('/companies');
            } catch (error) {
                console.error('Error deleting company:', error);
                alert('Error deleting company. Please try again.');
            }
        }
    };

    if (initialLoading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-base-content">Loading company data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="card-title text-3xl text-primary">
                                    Update Company
                                </h1>
                                
                                {/* Delete Button */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>
                                            <button 
                                                onClick={handleDelete}
                                                className="text-error hover:bg-error hover:text-error-content"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete Company
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Company Name */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Company Name <span className="text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter company name"
                                            className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                        />
                                        {errors.name && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.name}</span>
                                            </label>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Email <span className="text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="company@example.com"
                                            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                        />
                                        {errors.email && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.email}</span>
                                            </label>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Phone</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 123-4567"
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Website */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Website</span>
                                        </label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="https://www.company.com"
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Industry */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">
                                                Industry <span className="text-error">*</span>
                                            </span>
                                        </label>
                                        <select
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleInputChange}
                                            className={`select select-bordered w-full ${errors.industry ? 'select-error' : ''}`}
                                        >
                                            <option value="">Select an industry</option>
                                            {industries.map((industry) => (
                                                <option key={industry} value={industry}>
                                                    {industry}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.industry && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.industry}</span>
                                            </label>
                                        )}
                                    </div>

                                    {/* Founded Date */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Founded Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="founded_at"
                                            value={formData.founded_at}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Business St, City, State, Country"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Description */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">
                                            Description <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your company, its mission, and what makes it unique..."
                                        rows="4"
                                        className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
                                    ></textarea>
                                    {errors.description && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.description}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Logo Upload */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Company Logo</span>
                                    </label>
                                    
                                    {/* Current Logo Preview */}
                                    {currentLogo && (
                                        <div className="mb-4">
                                            <p className="text-sm text-base-content/70 mb-2">Current logo:</p>
                                            <div className="avatar">
                                                <div className="w-20 rounded">
                                                    <img src={currentLogo} alt="Current logo" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file-input file-input-bordered w-full"
                                    />
                                    <label className="label">
                                        <span className="label-text-alt">
                                            {currentLogo ? 'Upload new logo (PNG, JPG, GIF up to 2MB)' : 'PNG, JPG, GIF up to 2MB'}
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Buttons */}
                                <div className="card-actions justify-between pt-6">
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => navigate(`/companies/${id}`)}
                                    >
                                        Cancel
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline"
                                            onClick={() => navigate(`/companies/${id}`)}
                                        >
                                            View Company
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-primary"
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="loading loading-spinner loading-sm"></span>
                                                    Updating...
                                                </>
                                            ) : (
                                                'Update Company'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCompany;