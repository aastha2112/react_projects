import { useState } from "react";
import Checkbox from "../../components/Checkbox";
import CreateAccountButton from "../../components/CreateAccountButton";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { checkValidEmail } from "../../helpers";
import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    email: null,
    password: null,
  });

  function handleChange(fieldName, fieldValue) {
    setLoginFormState({ ...loginFormState, [fieldName]: fieldValue });
  }
  function errorMessage(errorField, errorValue) {
    setErrorMsg((errorMsg) => ({
      ...errorMsg,
      [errorField]: errorValue,
    }));
  }

  function handleSubmit() {
    let isEmailValid = checkValidEmail(loginFormState.email);

    if (!isEmailValid) {
      errorMessage("email", "*Invalid email address*");
    } else {
      errorMessage("email", null);
    }

    let isPasswordValid = loginFormState.password.length >= 8;
    if (!isPasswordValid) {
      errorMessage("password", "*Incorrect password. Try again.*");
    } else {
      errorMessage("password", null);
    }

    let users = JSON.parse(localStorage.getItem("users"));
    let existingUser = users.find(
      (user) => user.email === loginFormState.email
    );
    let currentUser = { email: existingUser.email, loginAt: Date.now() };

    if (!existingUser) {
      toast.error("Invalid Credentials");
      return;
    }

    if (existingUser.password === loginFormState.password) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      navigate("/");
    } else {
      toast.error("Invalid Credentials");
    }
  }

  return (
    <div className="h-[877px] flex  justify-center mobile:w-full mobile:flex ">
      <div className="flex justify-center flex-col items-center h-[781px] mobile:w-full mobile:p-3 mobile:flex mobile:flex-col mobile:justify-start mobile:pt-[40px]">
        <p className="h-[48px] text-[32px] text-[#333333] font-medium">
          Log in
        </p>
        <p>
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="underline ">
            Sign up
          </button>{" "}
        </p>
        <p className="text-[20px] text-[#111111] my-[32px]">
          Or continue with email
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="mobile:flex mobile:flex-col mobile:w-[90%]"
        >
          <Input
            title="Email address or username"
            type="text"
            value={loginFormState.email}
            handleChange={handleChange}
            fieldName={"email"}
            error={errorMsg.email}
          />
          <Input
            title="Password"
            type="password"
            showHideButton={true}
            value={loginFormState.password}
            handleChange={handleChange}
            fieldName={"password"}
            error={errorMsg.password}
          />
          <button className="underline flex w-full pr-4 justify-end items-end mobile:pb-7">
            Forgot your password
          </button>
          <div className="flex w-full ">
            <Checkbox
              handleChange={() => {
                handleChange("rememberMe", !loginFormState.rememberMe);
              }}
              checkboxValue={loginFormState.rememberMe}
            />
            <p className="pl-[8px] w-[412px] h-[48px]">Remember me</p>
          </div>
          <CreateAccountButton title="Log in" onSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
