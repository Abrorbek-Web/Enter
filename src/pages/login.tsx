import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import bgImg from "../Assets/bg-img.png";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "../slice/authSlice";
import { login } from "../services/authservice";
import { PropagateLoader } from "react-spinners";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    login(email, password)
      .then((res) => {
        setIsLoading(false);
        dispatch(signIn(res));
        // toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err.response.data.error);
        if (err.response.data.error === "Awaiting confirmation") {
          navigate("/waiting");
        } else {
          dispatch(signOut());
          toast.error("Login failed. Please try again.");
        }
      });
  };

  return (
    <section
      className="bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 shadow">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login
            </h1>
            <form onSubmit={handleOnSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your email..."
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={isShowingPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                  {isShowingPassword ? (
                    <AiOutlineEye
                      onClick={() => setIsShowingPassword((prev) => !prev)}
                      className="absolute top-0 right-0 h-full mr-3 cursor-pointer w-[22px]"
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => setIsShowingPassword((prev) => !prev)}
                      className="absolute top-0 right-0 h-full mr-3 cursor-pointer w-[22px]"
                    />
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center  h-[40px] text-white bg-primary-600 hover:bg-primary-700 bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {!isLoading && <>Sign In</>}
                {isLoading && (
                  <PropagateLoader color="white" className="mb-4" />
                )}
              </button>
              <p className="text-sm font-light text-gray-500 ">
                You don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
