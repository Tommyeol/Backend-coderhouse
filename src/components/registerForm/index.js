import { useState } from "react";
import { Link } from "react-router-dom";
import registerService, { uploadAvatar } from "../../services/register";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [mobile, setMobile] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    const newUser = {
      username,
      name,
      lastname,
      password: pass,
      mail,
      mobile,
    };
    try {
      const res = await registerService(newUser);
      const response = await res.json();
      if (response.status === "error") throw response;
      console.log({ response });
      await uploadAvatar(file, response.user._id);
      setLoading(false);
      navigate("success");
    } catch (error) {
      console.log("error es", error);
      setLoading(false);
      setError(error);
      setUsername("");
      setPass("");
      setName("");
      setLastname("");
      setMail("");
      setMobile("");
      setFile("");
    }
  };
  console.log("error is", error);

  if (loading) return <Loader />;

  return (
    <>
      <section className="bg-white max-w-3xl w-11/12 mx-auto flex flex-col mt-32 rounded-xl shadow-md">
        <h2 className="text-center font-bold text-4xl my-8">Signup</h2>
        {error && (
          <p className="shadow shadow-red-300 bg-red-100 w-52 p-2 mx-auto text-red-500 text-center">
            {error.msg}
          </p>
        )}
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-4/5 mx-auto px-5 py-10 gap-4 mb-10"
          >
            <label htmlFor="username" required className="text-lg">
              username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded-md shadow-sm border bg-slate-50"
            />

            <label htmlFor="namee" className="text-lg">
              name
            </label>
            <input
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-md shadow-sm border bg-slate-50"
            />

            <label htmlFor="lastname" className="text-lg">
              lastname
            </label>
            <input
              type="text"
              name="lastname"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="p-3 rounded-md shadow-sm border bg-slate-50"
            />

            <label htmlFor="password" required className="mt-4 text-lg">
              password
            </label>
            <input
              type="password"
              name="password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="p-3 rounded-md shadow-sm border bg-slate-50"
            />

            <label htmlFor="mail" className="text-lg">
              mail
            </label>
            <input
              type="mail"
              name="mail"
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="p-3 rounded-md shadow-sm border bg-slate-50"
            />

            <label htmlFor="telefono" className="text-lg">
              mobile
            </label>
            <input
              type="text"
              name="username"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="p-3 rounded-md shadow-sm border bg-slate-50"
            />

            <label htmlFor="avatar" className="text-lg">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="p-3 rounded-md shadow-sm border bg-slate-50 "
            />

            <button className="bg-indigo-400 font-bold p-3 rounded-md text-white text-xl mt-8 hover:bg-indigo-300">
              Create account
            </button>
            <small>
              You have an account?
              <span className="text-indigo-400">
                <Link to={"/login"}> Sign in</Link>
              </span>{" "}
            </small>
          </form>
        </div>
      </section>
    </>
  );
}
