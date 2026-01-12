import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query'; 
import { loginUserAction } from '../redux/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAPI } from '../services/service';
import './login.css'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const loginMutation = useMutation({
        mutationFn: loginUserAPI,
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const data = await loginMutation.mutateAsync(values);
                dispatch(loginUserAction(data));

                // const decodedUser = jwtDecode(data.token)

                // if (decodedUser.role === "admin") {
                //     navigate("/admin");
                // } else {
                    navigate("/home");
                // }
            } catch (error) {
                alert(error.response?.data?.message || "Login failed");
            }
        }

    });
// const imageUrl ='\src\assets\background-login.avif'
    return (
        <div className='flex  login-page' style={{ backgroundImage: "url('/src/assets/background-login.avif')", backgroundSize: "cover", backgroundPosition: "center", height: "627px",alignSelf: 'center'}}> 
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 items-stretch  gap-4 m-5 p-4 border  rounded shadow-md w-100   mx-auto" >
  

            <div className='text-white title' style={{ alignSelf: 'center'}}>         
                 <img src=" \src\assets\logo2.png" style={{width: '255px',height: '130px'}} /> 

            </div>

            <div className="flex flex-col gap-1">
                <p className="text-2xl font-bold mb-3">Sign in to your account</p>

                <label htmlFor="email" className="text-white font-medium">
                Email
                </label>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 border rounded input icon-email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
            </div>
           <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-white font-medium">
                    Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="p-2 border rounded input icon-lock"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}
            </div>
            <button type="submit" className=" btn bg-blue-500 text-white p-2 rounded" disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? 'Logging in...' : 'Login'}
            </button>
            <div> Don't Have an Account ? <Link className=' font-bold' to="/register"><u>Register</u></Link>   </div>
        </form>
      
        </div>
      
    );
};

export default Login;
