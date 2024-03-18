import Input from "../../components/Input";
import TermsAndConditions from "../../components/TermsAndConditions";
import CreateAccountButton from "../../components/CreateAccountButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { checkValidEmail } from "../../helpers";

function SignUpForm() {
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    TnCChecked: null,
  });
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    TnCChecked: false,
  });
  const navigate = useNavigate();

  function handleSubmit() {
    let isFirstNameValid = formState.firstName.length > 3;

    if (!isFirstNameValid) {
      errorMessage(
        "firstName",
        "First name is too short. It must be at least 4 characters."
      );
    } else {
      errorMessage("firstName", null);
    }
    let isLastNameValid = formState.lastName
      ? formState.lastName.length > 3
      : true;

    if (!isLastNameValid) {
      errorMessage(
        "lastName",
        "Last name is too short. It must be at least 4 characters."
      );
    } else {
      errorMessage("lastName", null);
    }

    let isEmailValid = checkValidEmail(formState.email);
    if (!isEmailValid) {
      errorMessage("email", "Invalid email address. Please check your input.");
    } else {
      errorMessage("email", null);
    }
    let isPasswordValid = formState.password.length >= 8;

    if (!isPasswordValid) {
      errorMessage("password", "Password must be atleast 8 characters.");
    } else {
      errorMessage("password", null);
    }

    let isConfirmPasswordValid = formState.confirmPassword.length >= 8;

    if (
      formState.password !== formState.confirmPassword ||
      !isConfirmPasswordValid
    ) {
      errorMessage(
        "confirmPassword",
        "The passwords entered do not match. Please re-enter them to ensure accuracy."
      );
    } else {
      errorMessage("confirmPassword", null);
    }

    if (!formState.TnCChecked) {
      errorMessage(
        "TnCChecked",
        "Please accept the terms and conditions to continue."
      );
    } else {
      errorMessage("TnCChecked", null);
    }

    if (!formState.TnCChecked) {
      toast.error("Please accept the terms and conditions to continue.");
    }

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      formState.password === formState.confirmPassword &&
      formState.TnCChecked
    ) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let existingUser = users.find((user) => user.email === formState.email);

      if (!existingUser) {
        users.push(formState);
        localStorage.setItem("users", JSON.stringify(users));
        toast.success("Signup successfull");
        navigate("/login");
      } else {
        toast.error("Email already exist");
      }
    }
  }

  function errorMessage(errorField, errorValue) {
    setErrors((errors) => ({
      ...errors,
      [errorField]: errorValue,
    }));
  }

  function handleOnChange(fieldName, fieldValue) {
    setFormState({ ...formState, [fieldName]: fieldValue });
  }

  function handleTnCCheckbox() {
    setFormState({ ...formState, TnCChecked: !formState.TnCChecked });
  }

  function testAlphabets(value) {
    const regexp = /^[A-Za-z\s]*$/gi;

    return regexp.test(value);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Input
        title="First name"
        value={formState.firstName}
        handleChange={(fieldName, fieldValue) => {
          if (testAlphabets(fieldValue)) {
            handleOnChange(fieldName, fieldValue);
          }
        }}
        fieldName={"firstName"}
        type="text"
        error={errors.firstName}
      />
      <Input
        title="Last name"
        value={formState.lastName}
        handleChange={(fieldName, fieldValue) => {
          if (testAlphabets(fieldValue)) {
            handleOnChange(fieldName, fieldValue);
          }
        }}
        fieldName={"lastName"}
        type="text"
        error={errors.lastName}
      />
      <Input
        title="Email"
        value={formState.email}
        handleChange={handleOnChange}
        fieldName={"email"}
        type="email"
        error={errors.email}
      />
      <Input
        title="Password"
        value={formState.password}
        handleChange={handleOnChange}
        fieldName={"password"}
        type="password"
        error={errors.password}
      />
      <Input
        title="Confirm Password"
        value={formState.confirmPassword}
        handleChange={handleOnChange}
        fieldName={"confirmPassword"}
        type="password"
        error={errors.confirmPassword}
      />

      <TermsAndConditions
        checkboxValue={formState.TnCChecked}
        handleChange={handleTnCCheckbox}
      />
      <CreateAccountButton onSubmit={handleSubmit} title="Create an account" />
    </form>
  );
}

export default SignUpForm;
