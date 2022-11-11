import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { Navigate } from "react-router-dom";

export default function RegisterSuccess() {
  const { user } = useUser();

  if (user) return <Navigate to={"/"} replace />;

  return (
    <div className="bg-indigo-300 rounded-lg w-96 h-72 p-10 mt-14 mx-auto shadow-lg">
      <h1 className="font-bold text-white text-5xl mb-5">Congratulations!</h1>
      <p className="text-2xl text-indigo-500 font-semibold mb-10 text-center">
        Register successfully
      </p>
      <Link to={"/login"}>
        <small className="mx-auto block w-fit">
          <span className="text-indigo-600 font-semibold decoration-indigo-500 underline underline-offset-2 decoration-2">
            Sign in
          </span>{" "}
          to start
        </small>
      </Link>
    </div>
  );
}
