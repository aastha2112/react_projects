import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/Logo";
import SignUpForm from "./SignUpForm";
import { useEffect } from "react";

function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    let currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);

  return (
    <>
      <Header />

      <div className="w-[1440px] h-[948px] flex  justify-end mobile:justify-start mobile:w-full">
        <div className="flex w-1/2 mobile:hidden">
          <Logo />
        </div>
        <div className="px-[48px] mobile:w-full object-contain">
          <Navbar />
          <SignUpForm />
        </div>
      </div>
    </>
  );
}

export default SignUp;
