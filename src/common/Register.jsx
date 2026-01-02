import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { registerUserAction } from '../redux/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserAPI } from '../services/service';

const Register = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const registerMutation = useMutation({
        mutationFn: registerUserAPI,
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                values.address="test value"
                const data =await  registerMutation.mutateAsync(values);
                dispatch(registerUserAction(data));
                navigate('/home')

            } catch (error) {
                alert(error.response?.data?.message || "Login failed");
            }


        },
    });

    return (
        <div className='flex login-page' style={{ backgroundImage: "url('/src/assets/background-login.avif')", backgroundSize: "cover", backgroundPosition: "center", height: "527px"}}> 
        <form onSubmit={formik.handleSubmit} className="flex flex-col  gap-4 p-4 m-10 border rounded shadow-md w-100 mx-auto" style={{height: '450px'}}>
            <div className='text-3xl font-bold text-white title' style={{ alignSelf: 'center'}}>Register User </div>
        
          <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-white font-medium">
                Name
                </label>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="p-2 border rounded input"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
            </div>

            <div className="flex flex-col gap-1">
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
               <button type="submit" className=" btn bg-blue-500 text-white p-2 rounded" disabled={registerMutation.isLoading}>
                {registerMutation.isLoading ? 'Registering...' : 'Register'}
            </button>
              <div style={{ alignSelf: 'center'}}> Already Have an Account ? <Link className=' font-bold' to="/login"><u>Login</u></Link>   </div>
            
        </form>
        </div>
     
    );
};

export default Register;
