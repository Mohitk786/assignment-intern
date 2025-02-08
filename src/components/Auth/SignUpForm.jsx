import React, { useState } from "react";
import { CircleDot, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP } from "../..//services/Auth/auth";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    
    
    username: "",
    email: "",
    password: "",
    mobile: "",
    isActive: false,
  });

  // const [termsAccepted, setTermsAccepted] = useState(false);


  const hasMinLength = (pass) => pass.length >= 8;
  const hasMixedChars = (pass) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(pass);

  const doesNotContainEmail = (pass, email) => {
    if (!email || !email.includes("@")) return true;
    const emailPrefix = email.split("@")[0];
    return !pass.toLowerCase().includes(emailPrefix.toLowerCase());
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // if (!termsAccepted) {
    //   alert('You must agree to the terms and conditions.');
    //   return;
    // }

    setIsLoading(true);
    const data = await SIGNUP(signupData);
    setIsLoading(false);

    if (data?.status) {
      toast.success("Registered");
      navigate("/auth/signin");
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={signupData.username}
            placeholder="First and last name"
            className="mt-1"
            required
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
        </div>

        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            onChange={(e) =>
              setSignupData({ ...signupData, mobile: e.target.value })
            }
            placeholder="This will be your login"
            className="mt-1"
            required
            value={signupData.mobile}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="tel"
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
            placeholder="This will be your login"
            className="mt-1"
            required
            value={signupData.email}
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
            placeholder="Choose a strong password"
            className="mt-1"
            required
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <ul className="mt-2 space-y-1 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              {hasMinLength(signupData.password) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <CircleDot className="h-4 w-4 text-gray-400" />
              )}
              At least 8 characters
            </li>
            <li className="flex items-center gap-2">
              {hasMixedChars(signupData.password) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <CircleDot className="h-4 w-4 text-gray-400" />
              )}
              A mixture of letters, numbers and special characters
            </li>
            <li className="flex items-center gap-2">
              {doesNotContainEmail(signupData.password, signupData.email) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <CircleDot className="h-4 w-4 text-gray-400" />
              )}
              Cannot contain part of your email
            </li>
          </ul>
        </div>

        {/* <div className="flex items-start">
          <Checkbox
            onClick={() => setTermsAccepted((prev) => !prev)}
            id="terms"
            className="mt-1"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree with the{' '}
            <Link href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-blue-600 hover:text-blue-500">
              Terms & Conditions
            </Link>
          </label>
        </div> */}

        <button
          disabled={isLoading}
          type="submit"
          className={`${
            isLoading ? "cursor-not-allowed" : ""
          } w-full bg-primary`}
        >
          {!isLoading ? (
            "Sign up"
          ) : (
            <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full mr-2"></span>
          )}
        </button>
        <Link to={"/auth/signup"} className="text-xs text-gray-500"></Link>
      </div>
    </form>
  );
}
