import { useContext } from "react";
import { IoIosLogOut } from "react-icons/io";
import { deleteRefreshToken } from "utils/api";
import { AuthContext } from "contexts/authTokenContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseConfig/firebase";
import { toast } from "react-toastify";

export const LogoutItem = ({ user, setLoggedInUser }) => {
  const auth = getAuth(app);
  const { accessToken } = useContext(AuthContext);

  const handleLogout = () => {
    setLoggedInUser(() => ({}));
    if (user.firebase) {
      signOut(auth)
        .then(() => {
          toast.info("You’ve Been Logged Out", {
            toastId: "info",
          });
        })
        .catch((err) => console.log(err));
    } else {
      deleteRefreshToken(accessToken)
        .then(() => {
          toast.info("You’ve Been Logged Out", {
            toastId: "info",
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="ml-3 flex justify-center">
      <button onClick={handleLogout}>
        <IoIosLogOut
          size={20}
          className="text-neutral-500 transition-all hover:text-green-600 active:text-green-500"
        />
      </button>
    </div>
  );
};
