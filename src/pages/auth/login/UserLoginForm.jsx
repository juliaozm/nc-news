import { useState, useEffect } from "react";
import { ButtonLink } from "components/UI/button/ButtonLink";
import { TextInput } from "components/UI/input/TextInput";
import { ButtonEdit } from "components/UI/button/ButtonEdit";
import { ButtonToggleShow } from "components/UI/button/ButtonToggleShow";
import { FaSpinner } from "react-icons/fa";

export const UserLoginForm = ({
  email,
  password,
  setPassword,
  setUserChecked,
  handleUserLogin,
  isLoading,
}) => {
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordShown, setPasswordShown] = useState(false);

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
      <form onSubmit={handleUserLogin}>
        <h1 className="mb-2 text-center font-mono text-2xl font-semibold capitalize text-gray-900">
          Login to your account
        </h1>
        <h3 className="mb-12 text-center text-green-700">This email exists</h3>
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
        <div className="relative flex flex-col items-center sm:flex-row">
          <TextInput
            id="password"
            type={isPasswordShown ? "text" : "password"}
            value={password}
            placeholder={"Password"}
            setNewValue={setPassword}
            required={true}
          />
          {password.length > 0 && (
            <div className="absolute right-0 sm:bottom-1/2">
              <ButtonToggleShow
                isPasswordShown={isPasswordShown}
                setPasswordShown={setPasswordShown}
              />
            </div>
          )}
        </div>
        {passwordError && password.length > 0 && (
          <h3 className="mb-4 px-3 text-left text-sm text-red-600">
            {passwordError}
          </h3>
        )}
        <ButtonLink
          text={"Login"}
          svg={
            <FaSpinner
              size={22}
              className={
                isLoading ? "ml-2 block animate-spin transition-all" : "hidden"
              }
            />
          }
          disabled={isLoading || passwordError}
          className={`w-full`}
        />
      </form>
    </>
  );
};
