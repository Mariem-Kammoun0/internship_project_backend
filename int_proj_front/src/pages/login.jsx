import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, isAuthenticated } from "../services/auth";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            await login({ email, password, rememberMe: true });
            alert("Login successful!");
            const user = await isAuthenticated();
            
            if (user) {
                alert(`Login successful! Welcome ${user.name}`);
            //navigate("/dashboard");
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            const message = err.response?.data?.message || "An error occurred during login.";
            setError(message);
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
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-base-content/60">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-base-100 py-8 px-6 shadow-xl rounded-lg">
                    {error && (
                        <div className="alert alert-error mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                placeholder="your.email@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full focus:input-primary"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                                <a href="/reset-password" className="label-text-alt link link-primary">
                                    Forgot password?
                                </a>
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full focus:input-primary"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                disabled={isLoading || !email || !password}
                                className="btn btn-primary w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider mt-6">or continue with</div>

                    {/* Social Login */}
                    <div className="space-y-3">
                        <button className="btn btn-outline w-full group hover:bg-base-200">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                        
                        <button className="btn btn-outline w-full group hover:bg-base-200">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Continue with Facebook
                        </button>

                        <button className="btn btn-outline w-full group hover:bg-base-200">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Continue with Email
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-base-content/60">
                            Don't have an account?{" "}
                            <a href="/register" className="link link-primary font-medium">
                                Create one here
                            </a>
                        </p>
                    </div>
                </div>

                {/* Additional Help */}
                <div className="text-center space-y-2">
                    <p className="text-xs text-base-content/50">
                        Having trouble? 
                        <a href="/support" className="link link-primary ml-1">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;