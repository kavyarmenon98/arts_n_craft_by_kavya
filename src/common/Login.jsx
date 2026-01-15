import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { loginUserAction } from "../redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: loginUserAPI,
  });

  /* ---------- EMAIL LOGIN ---------- */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginMutation.mutateAsync(values);
        dispatch(loginUserAction(data));
        navigate("/home");
      } catch (error) {
        alert(
          error.response?.data?.message || "Login failed"
        );
      }
    },
  });

  /* ---------- PARTICLE EFFECT ---------- */
  useEffect(() => {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* PARTICLE CANVAS */}
      <canvas id="particles" className="absolute inset-0 z-0"></canvas>

      {/* BACKGROUND IMAGE WITH DARK OVERLAY */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/background-login.avif')",
        }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

      {/* LOGIN FORM */}
      <form
        onSubmit={formik.handleSubmit}
        className="relative z-10 w-[92%] max-w-md bg-[#121212]/90 border border-white/10 rounded-2xl p-8 shadow-2xl text-white"
      >
        <div className="flex justify-center mb-6">
          <img
            src="/src/assets/logo2.png"
            alt="logo"
            className="w-[180px]"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Sign in to continue
        </p>

        {/* EMAIL INPUT */}
        <div className="mb-4">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className={`w-full mt-1 p-3 rounded-lg bg-[#1e1e1e] border ${
              formik.touched.email && formik.errors.email
                ? "border-red-400"
                : "border-white/10"
            } focus:ring-2 focus:ring-blue-500`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD INPUT */}
        <div className="mb-4">
          <label className="text-sm text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className={`w-full mt-1 p-3 pr-10 rounded-lg bg-[#1e1e1e] border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-400"
                  : "border-white/10"
              } focus:ring-2 focus:ring-blue-500`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold hover:scale-105 transition-transform duration-200"
        >
          {loginMutation.isLoading ? "Signing in..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
