import { useState, useEffect } from "react";
import { ButtonLink } from "components/UI/button/ButtonLink";
import { TextInput } from "components/UI/input/TextInput";
import { ButtonEdit } from "components/UI/button/ButtonEdit";
import { FaSpinner } from "react-icons/fa";

export const UserCreateForm = ({
  email,
  username,
  setUsername,
  setUserChecked,
  password,
  setPassword,
  handleUserCreate,
  isLoading,
}) => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const usernamePattern = /^(?![_])([a-z0-9_]{8,})$/;
    !usernamePattern.test(username)
      ? setUsernameError(
          "At least 8 characters — only lowercase letters, numbers, and can't begin with an underscore"
        )
      : setUsernameError("");
  }, [username]);

  useEffect(() => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    !passwordPattern.test(password)
      ? setPasswordError(
          "At least 8 characters — including 1 uppercase letter and 1 number"
        )
      : setPasswordError("");
  }, [password]);

  return (
    <>
      <form onSubmit={handleUserCreate}>
        <h1 className="mb-2 text-center font-mono text-2xl font-semibold capitalize text-gray-900">
          Create new account
        </h1>
        <h3 className="mb-12 text-center text-red-500">
          This e-mail not found
        </h3>
        <div className="relative flex flex-col items-center sm:flex-row">
          <TextInput
            id="email"
            value={email}
            placeholder={"E-mail"}
            required={true}
            disabled={true}
          />
          <div className="absolute bottom-16 sm:bottom-7 sm:right-0">
            <ButtonEdit
              setEdit={() => setUserChecked("none")}
              text={"Change e-mail"}
            />
          </div>
        </div>
        <TextInput
          id="username"
          value={username}
          placeholder={"Username"}
          setNewValue={setUsername}
          required={true}
          autoComplete={"on"}
        />
        {usernameError && username.length > 0 && (
          <h3 className="mb-4 px-3 text-left text-red-600">{usernameError}</h3>
        )}
        <TextInput
          id="password"
          value={password}
          placeholder={"Password"}
          setNewValue={setPassword}
          required={true}
        />
        {passwordError && password.length > 0 && (
          <h3 className="mb-4 px-3 text-left text-red-600">{passwordError}</h3>
        )}
        <ButtonLink
          text={"Create Account"}
          svg={
            <FaSpinner
              size={22}
              className={
                isLoading ? "ml-2 block animate-spin transition-all" : "hidden"
              }
            />
          }
          disabled={isLoading || passwordError || usernameError}
          className={`w-full`}
        />
      </form>
    </>
  );
};
