import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
    const { createNewUserData, setUser,updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState({});
    const [terms, setTerms] = useState(false);

    const handlerTerms = () => {
        setTerms(!terms);
    };

    const handlerRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        const photoURL = form.get("photoURL");
        const email = form.get("email");
        const password = form.get("password");

        // Validate Name
        if (name.length < 5) {
            setError({ ...error, name: "Character must be at least 5" });
            return;
        } else {
            setError((prevError) => ({ ...prevError, name: null }));
        }

        // Log the form data
        // console.log({ name, photoURL, email, password });

        // Call the createNewUserData function
        createNewUserData(email, password)
            .then((result) => {
                setUser(result.user);
                // console.log("User Created Successfully:", result.user);
                updateUserProfile({displayName:name, photoURL:photoURL})
                .then(()=>{
                  navigate("/")
                })
                .catch(err =>{
                  console.log("Error",err.message);
                })
                 
            })
            .catch((err) => {
                console.error("ERROR:", err.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card bg-base-100 w-full max-w-lg shadow-2xl rounded-none">
                <h1 className="text-2xl mt-4 text-center font-bold">Register your account</h1>
                <form className="card-body" onSubmit={handlerRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Your Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            className="input input-bordered"
                            required
                        />
                        {error.name && <label className="label text-red-400">{error.name}</label>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the photo link"
                            name="photoURL"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Email</span>
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
                        <label className="label">
                            <p className="label-text-alt flex items-center gap-2">
                                <input
                                    onChange={handlerTerms}
                                    type="checkbox"
                                    checked={terms}
                                    className="checkbox"
                                />
                                Accept Terms & Conditions
                            </p>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button
                            className="btn btn-neutral rounded-none text-white"
                            disabled={!terms}
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mb-4 text-center font-semibold text-gray-500">
                    Don’t Have An Account?{" "}
                    <Link to="/auth/login" className="text-red-600">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
