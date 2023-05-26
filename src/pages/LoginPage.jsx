import { UserContext } from "contexts/loggedinUser";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackLink } from "components/UI/BackLink";
import { toast } from "react-toastify";
import { ButtonLink } from "components/UI/ButtonLink";
import { TextInput } from "components/UI/TextInput";

export const LoginPage = () => {
  const [input, setInput] = useState("weegembump");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const newLoggedInUser = {
    username: "weegembump",
    name: "Gemma Bump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553",
  };

  useEffect(() => {
    if (loggedInUser.username) {
      navigate("/articles");
    }
  }, [loggedInUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (input === "weegembump") {
      setLoggedInUser(() => ({ ...newLoggedInUser }));
    } else {
      toast.error("Enter the right username!", {
        toastId: "error",
      });
    }
  };
  return (
    <main className="container relative mx-auto h-screen px-4 2xl:container lg:px-8 xl:px-16">
      <BackLink />
      <form
        onSubmit={handleLogin}
        className="absolute left-1/2 top-1/4 w-4/5 -translate-x-1/2 -translate-y-1/4 transform border-solid border-gray-300 md:w-1/2 md:border md:px-6 md:py-10 2xl:w-1/3"
      >
        <h1 className="mb-8 text-center font-mono text-2xl font-semibold capitalize text-gray-900">
          Login to your account
        </h1>
        <TextInput
          id="username"
          value={input}
          placeholder={"Enter 'weegembump' to login"}
          setNewValue={setInput}
          required={true}
          autoComplete={"on"}
        />
        <ButtonLink text={"Login"} className={"w-full"} />
      </form>
    </main>
  );
};
