import AuthLayout from './AuthLayout';
import SignUpForm from './SignUpForm';
import {Link} from 'react-router-dom';

export default function SignUpPage() {

  return (
    <AuthLayout
      title="Sign Up to Amazon Opportunity Finder"
      footerLink={
        <>
          <span className="text-gray-600">Already have an account? </span>
          <Link
            to={"/auth/signin"}
            className="text-primary hover:text-blue-500"
          >
            Log In
          </Link>
        </>
      }
    
    >
      <SignUpForm />
    </AuthLayout>
  );
}
