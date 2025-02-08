const REQUEST_URL = process.env.REQUEST_URL || "http://localhost:4000"

export const LOGIN = async (email, password) => {
    try {
      const response = await fetch(
        `${REQUEST_URL}/auth/login`,

        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({email, password}),
          }
      );

      return await response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  export const SIGNUP = async (signupData) => {
    try {
      const response = await fetch(
     `${REQUEST_URL}/auth/signup`,

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupData),
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  