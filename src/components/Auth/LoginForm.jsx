
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '../../services/Auth/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function LoginForm() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const loginHandler = async (e) => {
    e.preventDefault();

    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    setIsLoading(true);
    const data = await LOGIN(email, password);
    setIsLoading(false);

    if (data?.status) {
        navigate('/user/dashboard');

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(data.user)); // Store token persistently
        localStorage.setItem("authToken", data.token); // Store token persistently
    } else {
        sessionStorage.setItem("authToken", data.token); // Store token until browser closes
    }
      toast.success('Login successful');
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <form onSubmit={loginHandler} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            name="email"
            placeholder="Please enter email or phone"
            className="mt-1"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Please enter your password"
            className="mt-1"
            required
          />
        </div>

        {/* <div className="flex items-center justify-end">
          <Link href="#" className="text-sm text-blue-600 hover:text-blue-500">
            Forgot password?
          </Link>
        </div> */}

        <div className="flex items-center">
          <checkbox
            checked={rememberMe}
            onClick={() => setRememberMe((prev) => !prev)}
            id="remember-me"
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember Me
          </label>
        </div>

        <div className="text-xs text-gray-500">
          (if this is a private computer)
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`${isLoading ? 'cursor-not-allowed' : ''} w-full bg-primary`}
        >
          {!isLoading ? (
            'LOG IN'
          ) : (
            <span className="animate-spin  h-5 w-5 border-t-2 border-white rounded-full mr-2"></span>
          )}
        </button>
        <Link to={'/auth/signin'} className="text-xs text-gray-500">
        </Link>
      </div>
    </form>
  );
}
