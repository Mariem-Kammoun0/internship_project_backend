import { useState } from "react";
import { register } from "../services/auth";
import { Navigate, useNavigate } from "react-router-dom";

function Registration() {
     const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        
        setIsLoading(true);

        try {
            const response = await register(formData);
                alert("Inscription réussie !");
                navigate("/");
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-base-content">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-base-content/60">
                        Join our community and find your next opportunity
                    </p>
                </div>

                {/* Registration Form */}
                <div className="bg-base-100 py-8 px-6 shadow-xl rounded-lg">
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">First Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                placeholder="Enter your first name"
                                onChange={handleInputChange}
                                className="input input-bordered w-full focus:input-primary"
                            />
                        </div>

                        {/* Surname Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Last Name</span>
                            </label>
                            <input
                                type="text"
                                name="surname"
                                required
                                value={formData.surname}
                                placeholder="Enter your last name"
                                onChange={handleInputChange}
                                className="input input-bordered w-full focus:input-primary"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                placeholder="your.email@example.com"
                                onChange={handleInputChange}
                                className="input input-bordered w-full focus:input-primary"
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">I am a...</span>
                            </label>
                            <select
                                name="role"
                                required
                                value={formData.role}
                                onChange={handleInputChange}
                                className="select select-bordered w-full focus:select-primary"
                            >
                                <option value="">Select your role</option>
                                <option value="employer">Employer</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleInputChange}
                                className="input input-bordered w-full focus:input-primary"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                required
                                value={formData.password_confirmation}
                                placeholder="Confirm your password"
                                onChange={handleInputChange}
                                className="input input-bordered w-full focus:input-primary"
                            />
                            {formData.password && formData.password_confirmation && formData.password !== formData.password_confirmation && (
                                <label className="label">
                                    <span className="label-text-alt text-error">Passwords do not match</span>
                                </label>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                disabled={isLoading || !formData.name || !formData.surname || !formData.email || !formData.password || !formData.password_confirmation || !formData.role || formData.password !== formData.password_confirmation}
                                className="btn btn-primary w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Rest of your component remains the same... */}
                    <div className="divider mt-6">or</div>

                    <div className="space-y-3">
                        <button className="btn btn-outline w-full">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                        
                        <button className="btn btn-outline w-full">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Continue with Facebook
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-base-content/60">
                            Already have an account?{" "}
                            <a href="/login" className="link link-primary font-medium">
                                Sign in here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Registration;