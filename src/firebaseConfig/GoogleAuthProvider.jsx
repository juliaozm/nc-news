import { useEffect, useState, useContext } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleProvider } from "firebaseConfig/firebase";
import { UserContext } from "contexts/loggedinUser";
import { toast } from "react-toastify";

export const GoogleAuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState({});
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (user.displayName && user.email) {
      const displayUsername = user?.displayName
        ?.toLowerCase()
        .split("")
        .filter((char) => char !== " ")
        .join("");

      const newLoggedInUser = {
        username: displayUsername,
        name: user.displayName,
        email: user.email,
        avatar_url: user.photoURL,
        firebase: true,
      };
      setLoggedInUser(() => ({ ...newLoggedInUser }));
    }
  }, [user, loggedInUser]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { user } = result;
        setUser(user);
      })
      .catch((e) => {
        toast.error("Failed to sign in with Google. Please try again.", {
          toastId: "error",
        });
      });
  };

  return (
    <section className="mx-auto">
      <div className="mb-6 mt-12 flex justify-center border-t-2 border-solid border-neutral-200">
        <span className="-mt-4 block bg-white px-3 text-neutral-500">or</span>
      </div>
      <button
        type="button"
        className="w-full rounded-lg border border-neutral-200 px-3 py-2 font-mono font-medium text-neutral-500 outline-none transition-all hover:border-green-700 hover:text-green-700 active:border-green-500"
        onClick={() => signInWithGoogle()}
      >
        Sign in with Google
      </button>
    </section>
  );
};
