import { useState, useEffect } from "react";
import { checkUserByEmail } from "utils/api";
import { ButtonLink } from "components/UI/button/ButtonLink";
import { TextInput } from "components/UI/input/TextInput";
import { FaSpinner } from "react-icons/fa";

export const UserCheckForm = ({ setUserChecked, setEmail, email }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const emailPattern =
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/;
    !emailPattern.test(email)
      ? setIsError("Please enter a valid email address")
      : setIsError("");
  }, [email]);

  const handleUserCheck = async (e) => {
    setUserChecked("none");
    e.preventDefault();
    setIsLoading(true);
    try {
      await checkUserByEmail(email);
      setUserChecked("login");
      setIsLoading(false);
    } catch (err) {
      if (err.response.status === 400) {
        setIsError(err.response.data.message);
      }
      if (err.response.status === 404) {
        setUserChecked("create");
      }
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUserCheck}>
      <h1 className="mb-6 text-center font-mono text-2xl font-semibold capitalize text-gray-900">
        Log in or create an account
      </h1>
      <TextInput
        id="email"
        value={email}
        placeholder={"Your e-mail"}
        setNewValue={setEmail}
        required={true}
      />
      {isError && email.length > 0 && (
        <h3 className="mb-4 px-3 text-left text-sm text-red-600">{isError}</h3>
      )}
      <ButtonLink
        type="submit"
        text={"Continue"}
        svg={
          <FaSpinner
            size={22}
            className={
              isLoading ? "ml-2 block animate-spin transition-all" : "hidden"
            }
          />
        }
        disabled={isLoading || isError}
        className={`w-full`}
      />
    </form>
  );
};
