
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getToken } from '../../utils/getToken';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  //if token is present then don't show login page even when user manually edit the url
  useEffect(()=>{
    const token = getToken();
    if(token) navigate('/user/dashboard')

  },[])

  return (
    <AuthLayout
      title="Log In to Amazon Opportunity Finder"
      footerLink={
        <>
          <span className="text-gray-600">New Here? </span>
          <Link to={'/auth/signup'} className="text-primary hover:text-blue-500">
            Sign Up Now
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
