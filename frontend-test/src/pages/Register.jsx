import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {register} from '../services/authService';
import {validatePassword} from "../validate/passwordValidation.js";

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const passwordError = validatePassword(password, passwordConfirm);
        if (passwordError) {
            setError(passwordError);
            setLoading(false);
            return;
        }

        try {
            await register(username, email, password);
            navigate('/login');
        } catch (err) {
            console.log(err);
            setError(err.response?.message ||  "Login failed. Please try again.");
        }
    }

    return (
        <>
            <div className={"flex min-h-screen justify-center items-center bg-gray-200"}>
                <div className={"w-full max-w-md bg-white rounded-md shadow-lg p-6 "}>
                    <h2 className={"text-xl text-orange-300 font-bold font-sans text-center pb-6"}>Register</h2>
                    {error && (<p className={" text-xs font-medium text-red-500 text-center bg-red-100 rounded-md p-2 mb-4"}>
                        {typeof error === "string" ? error : JSON.stringify(error)}
                    </p>)}
                    <form className={"space-y-4"} onSubmit={handleSubmit}>
                        <input type="text"
                               className={"w-full border-gray-300 rounded-md"}
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               placeholder="Username"
                        />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={"w-full border-gray-300 rounded-md"}/>

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={"w-full border-gray-300 rounded-md"}/>

                        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="Confirm Password"
                        className={"w-full border-gray-300 rounded-md"}/>
                        <button type={"submit"} className={"w-full font-bold bg-blue-400 p-2 text-white rounded-md shadow-md hover:bg-blue-700 transition disabled:bg-gray-400"}
                        disabled={loading}
                        >
                            Submit
                        </button>

                        {/* Login Section */}
                        <div className="flex justify-center mt-4 p-3 bg-gray-100 rounded-lg shadow-sm">
                            <p className="text-gray-600">
                                Already have account?
                                <Link className="ml-1 text-blue-600 font-medium hover:underline" to="/register">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </form>

                </div>

            </div>
        </>
    )
};

export default Register;