import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AUTH_IMG, GOOGLE_IMG } from "../../assets";
import Swal from "sweetalert2";
import { useTrackingCode } from "react-hubspot-tracking-code-hook";
import supabase from "../../Supabase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signBtnText, setSignBtnText] = React.useState("Create Your Account");
  const { setIdentity } = useTrackingCode();

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const createAccount = async () => {
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      redirectTo: "https://localhost:5173/",
      options: {
        data: {
          fullName: fullName,
          phone: phoneNumber,
        },
      },
    });

    setIdentity(user?.email);
    if (error) {
      console.log(error);
      return -1;
    }
    console.log({
      user,
      session,
      error,
    });
    return 1;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      });
      return;
    }
    setSignBtnText("Signing Up...");
    const serverResponse = await createAccount();
    if (serverResponse == -1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error creating account",
      });
      setSignBtnText("Sign Up");
      return;
    }
    const userData = {
      fullName,
      email,
      phone: phoneNumber,
      password,
    };

    // create user in mongodb also
    const { data } = await axios.post("/api/users/create", userData);
    if (data && data?.success) {
      dispatch(setUser(data?.data));
      history.push("/verify", { user: userData });
      // setSignBtnText("Check your mail");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error creating account",
      });
      setSignBtnText("Sign Up");
    }
  };

  const loginWithGoogle = async () => {
    const { user, session, error } = await supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://localhost:5173/dashboard",
        },
      })
      .then(() => {
        setIdentity(user.email);
      });
    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="hidden lg:flex">
          <img
            className="w-full object-fill"
            src={AUTH_IMG}
            alt="auth-sidebar-img"
          />
        </div>
        <div className="py-10 px-5 flex flex-col items-center">
          <form
            onSubmit={handleSignup}
            className="flex flex-col items-center space-y-6 w-full lg:w-[300px]"
          >
            <div>
              <h2 className="text-2xl text-center font-semibold">
                <p className="text-2xl tracking-wide">
                  1,527 People Joined Last
                </p>
                <p className="text-2xl tracking-wide">Weak. Join Them!</p>
              </h2>
              <p className="text-base text-center text-gray-500 tracking-wide mt-1">
                Start Your FREE Trial Now!
              </p>
            </div>
            {/* <button
              onClick={loginWithGoogle}
              className="bg-gray-800 hover:bg-gray-900 w-full flex items-center justify-center gap-4 py-2 px-6 rounded-md"
            >
              <img className="w-7 h-7" src={GOOGLE_IMG} alt="google-icon-img" />
              <span className="text-yellow-100 text-base tracking-wide">
                Continue with Google
              </span>
            </button>

            <p className="text-base text-center text-gray-500">
              OR- Sign Up With Email
            </p> */}

            <div className="flex flex-col gap-3 w-full">
              <input
                className="py-[10px] px-4 rounded-md text-sm md:text-base border border-gray-400 outline-none focus:ring-1 focus:ring-gray-500 shadow-sm"
                type="text"
                placeholder="Enter Your Full Name"
                value={fullName}
                onChange={handleFullName}
                required
              />
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
                type="text"
                placeholder="Enter Your Phone No."
                value={phoneNumber}
                onChange={handlePhoneNumber}
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
              {signBtnText}
            </button>

            <div className="w-full">
              <p className="text-sm text-center tracking-wide text-gray-500">
                Already have an account?{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
