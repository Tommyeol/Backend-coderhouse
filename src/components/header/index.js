import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import logoutService from "../../services/logout";
import Carrito from "../carrito";

export default function Header() {
  const { user, setUser } = useUser();
  const [logoutMessage, setLogoutMessage] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutService();
    setLogoutMessage(true);

    setTimeout(() => {
      setUser(null);
      setLogoutMessage(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      {logoutMessage ? (
        <div className="fixed left-2/5 bg-indigo-500 text-white p-5">
          <h1>See you{user?.username}!</h1>
        </div>
      ) : null}
      <header className="bg-white w-full">
        <div className="flex justify-between items-center w-11/12 m-auto max-w-screen-lg">
          <Link to={"/"}>
            <h2 className="text-xl tracking-tighter pb-2">
              <span className="text-4xl font-bold text-indigo-700">E</span>
              commerce
            </h2>
          </Link>
          <div className="flex items-center">
            {user ? (
              <div className="flex gap-5 p-2 items-center">
                <img
                  src={`http://localhost:8080/api/upload/${user._id}`}
                  alt="avatar"
                  className="w-9 h-9 rounded-full m-0"
                />
                <p className="text-base">
                  {" "}
                  <span className="font-bold">{user.username}</span>
                </p>
                <p
                  className="relative after:absolute after:-inset-3 after:border-b-2 after:border-indigo-300 after:hidden hover:after:block cursor-pointer ml-4"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            ) : (
              <Link to={"/login"}>
                <p className="relative after:absolute after:-inset-3 after:border-b-2 after:border-indigo-300 after:hidden hover:after:block mr-2">
                  Login
                </p>
              </Link>
            )}
            <Link to={"/cart"}>
              <Carrito />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
