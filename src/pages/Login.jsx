import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
    const {singInUser,setUser}= useContext(AuthContext);
    const [error,setError] = useState(null);
    const location = useLocation();
    // console.log(location);
    const navigate = useNavigate();
    const handlerFrom = e =>{
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");
        // console.log(email,password);
        singInUser(email,password)
        .then(result =>{
            setUser(result.user);
            navigate(location?.state ? location.state : "/");
            // console.log(result.user);

        })
        .catch(err =>{
            setError(err.code);

        })

    }
  return (
   <div className="min-h-screen flex items-center justify-center">
     <div onSubmit={handlerFrom} className="card bg-base-100 w-full max-w-lg  shrink-0 shadow-2xl rounded-none">
      <h1 className="text-2xl my-10 text-center font-bold">Login Your Account</h1>
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Email</ span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered"
            required
          />
          {
            error &&  <label className="label text-red-400">
             {error}
          </label>
          }
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-neutral rounded-none text-white">Login</button>
        </div>
      </form>
        <p className="mb-8 text-center mt-2 font-semibold text-gray-500">Dont’t Have An Account ? <Link to="/auth/register" className="text-red-600">Register</Link></p>
    </div>
   </div>
  );
};

export default Login;
