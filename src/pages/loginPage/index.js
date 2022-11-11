import { useState } from "react";
import { Link } from "react-router-dom";
import loginService from "../../services/login";
import { useUser } from "../../context/userContext";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "../../components/loader/index";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    loginService({ username, password })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          setError(data);
          return;
        }
        setUser(data.user);
        navigate("/");
        console.log(data.user);
      })
      .finally(setLoading(false));

    setUsername("");
    setPassword("");
  };

  if (user) return <Navigate to={"/"} />;
  if (loading) return <Loader />;

  return (
    <section className="bg-white max-w-lg w-11/12 mx-auto flex flex-col mt-32 rounded-xl shadow-md">
      <h2 className="text-center font-bold text-4xl my-8">Login</h2>
      <div>
        {error && (
          <p className="shadow shadow-red-300 bg-red-100  mx-20 p-1 text-red-500 text-center">
            {error.msg}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-4/5 mx-auto px-5 py-10 gap-4 mb-10"
        >
          <label htmlFor="username" className="text-lg">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-md shadow-sm border bg-slate-50"
          />

          <label htmlFor="password" className="mt-4 text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md shadow-sm border bg-slate-50"
          />

          <button className="bg-indigo-400 font-bold p-3 rounded-md text-white text-xl mt-8 hover:bg-indigo-300">
            Login
          </button>
          <small>
            You don't have account?
            <span className="text-indigo-400">
              <Link to={"/register"}> Register</Link>
            </span>{" "}
          </small>
        </form>
      </div>
    </section>
  );
}
