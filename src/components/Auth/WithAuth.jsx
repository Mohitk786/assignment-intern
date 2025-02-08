
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        if (!token) {
          navigate('/auth/signin'); 
        } else {
          setIsAuthenticated(true); 
        }
      }
    }, []);

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
