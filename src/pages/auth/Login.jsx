import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AUTH_IMG, GOOGLE_IMG } from "../../assets";
import { useTrackingCode } from "react-hubspot-tracking-code-hook";
import supabase from "../../Supabase";
import Swal from "sweetalert2";
import axios from "axios";
import { setUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginText, setLoginText] = React.useState("Sign In");
  const [userAuth, setUserAuth] = React.useState(false);
  const { setIdentity } = useTrackingCode();

  React.useMemo(() => {
    if (localStorage.getItem("auth")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const getUserByEmail = async (email) => {
    let resData = null;
    try {
      const { data } = await axios.post("/api/users/getUser", { email });
      if (data && data?.success) {
        resData = data?.data;
        dispatch(setUser(data?.data));
      }
    } catch (error) {
      console.log(`Error in getUser : `, error?.message);
    }
    return resData;
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginText("Logging in...");
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log({ user, session, error });

    const isUser = await supabase.auth.getUser();
    if (isUser?.data?.identities?.id === null) {
      localStorage.clear();
      setLoginText("Login");
      return;
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      setLoginText("Login");
      return;
    } else {
      setLoginText("Login");
      const resData = await getUserByEmail(email);
      if (resData && resData?.aboutBusiness) {
        window.location.href = "/auth";
        console.log("dash");
      } else {
        history.push("/onboarding");
        console.log("onb");
      }
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginWithGoogle = async () => {
    const { user, session, error } = await supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.END_POINT_URL}/auth`,
        },
      })
      .then(() => {
        setIdentity(user?.email);
      });

    if (error) {
      console.log(error);
      localStorage.clear();
      return;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="hidden md:flex">
          <img
            className="w-full object-fill"
            src={AUTH_IMG}
            alt="auth-sidebar-img"
          />
        </div>
        <div className="py-10 md:py-16 px-5 flex flex-col items-center">
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center space-y-6 w-full md:w-[300px]"
          >
            <h2 className="text-2xl text-center font-medium uppercase">
              Sign in
            </h2>
            {/* <button
              onClick={loginWithGoogle}
              className="bg-gray-800 hover:bg-gray-900 w-full flex items-center justify-center gap-4 py-2 px-6 rounded-md"
            >
              <img className="w-7 h-7" src={GOOGLE_IMG} alt="google-icon-img" />
              <span className="text-yellow-100 text-base tracking-wide">
                Sign in with Google
              </span>
            </button>

            <p className="text-base text-center text-gray-500">
              OR- Sign In With Email
            </p> */}

            <div className="flex flex-col gap-3 w-full">
              <input
                className="py-[10px] px-4 rounded-md text-sm md:text-base border border-gray-400 outline-none focus:ring-1 focus:ring-gray-500 shadow-sm"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmail}
                required
              />
              <input
                className="py-[10px] px-4 rounded-md text-sm md:text-base border border-gray-400 outline-none focus:ring-1 focus:ring-gray-500 shadow-sm"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 w-full py-[10px] rounded-md text-sm md:text-base font-medium tracking-wide"
            >
              {loginText}
            </button>

            <div className="w-full">
              {/* <p className="text-sm tracking-wide text-gray-500">
                Forgot Password?
              </p> */}
              <p className="text-sm text-center tracking-wide text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
