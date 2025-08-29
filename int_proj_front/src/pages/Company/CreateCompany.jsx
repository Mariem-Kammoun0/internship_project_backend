import { useState } from 'react';

function CreateCompany() {
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
    const [errors, setErrors] = useState({});

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
            // const response = await fetch('/api/companies', {
            //     method: 'POST',
            //     body: submitData
            // });
            
            console.log('Form submitted:', formData);
            
            // Reset form on success
            setFormData({
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
            
            // Show success message
            alert('Company created successfully!');
            
        } catch (error) {
            console.error('Error creating company:', error);
            alert('Error creating company. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h1 className="card-title text-3xl mb-6 text-primary">
                                Create New Company
                            </h1>
                            
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
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file-input file-input-bordered w-full"
                                    />
                                    <label className="label">
                                        <span className="label-text-alt">PNG, JPG, GIF up to 2MB</span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="card-actions justify-end pt-6">
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Company'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCompany;