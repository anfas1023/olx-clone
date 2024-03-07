import { userAuth } from "@/Context/ProductContext";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

type UserDataType = {
  email: string;
  password: string;
};

const Signup = () => {
  const [userData, setUserData] = useState<UserDataType>({
    email: "",
    password: "",
  });

  const auth = userAuth();

  if (!auth) {
    throw new Error("userAuth not defined for signUp");
  }

  const { signUp } = auth;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(userData.email, userData.password);
    

    try {
      await signUp(userData.email, userData.password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full h-full ">
        <div className="w-full max-w-md mx-auto my-[10%] p-8 border-green-950 border-2">
          {/* <h1 className='text-center text-3xl font-semibold mb-8'>OLX</h1> */}
          <img
            src="https://logowik.com/content/uploads/images/t_olx5151.jpg "
            className="h-24 mx-auto "
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block font-medium">
                Username
              </label>
              <input
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                type="text"
                id="username"
                className="w-full border rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full border rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-between items-center mt-5">
  <p className="text-gray-600 font-serif text-lg">Already have an account? Just Login..</p>
  <Link to='/login' className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 ease-in-out">
    Login
  </Link>
</div>

        </div>
      </div>
    </>
  );
}; 

export default Signup;
