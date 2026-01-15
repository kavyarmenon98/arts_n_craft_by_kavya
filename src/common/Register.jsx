import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { registerUserAction } from '../redux/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserAPI } from '../services/service';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: registerUserAPI,
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await registerMutation.mutateAsync(values);
        dispatch(registerUserAction(data));
        navigate('/home');
      } catch (error) {
        alert(error.response?.data?.message || 'Registration failed');
      }
    },
  });

  // Floating particle effect
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const inputVariant = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  };

  const formVariant = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  return (
    <div className="register-page">
      {/* Particle background */}
      <canvas id="particle-canvas" className="particle-canvas"></canvas>

      {/* Background overlay */}
      <div
        className="overlay"
        style={{
          backgroundImage: "url('/src/assets/background-login.avif')",
        }}
      />

      {/* Form card */}
      <motion.form
        onSubmit={formik.handleSubmit}
        initial="initial"
        animate="animate"
        variants={formVariant}
        className="register-card"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="register-title"
        >
          Register
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="register-subtitle"
        >
          Create your account to continue
        </motion.p>

        {/* Name */}
        <motion.div className="form-group" variants={inputVariant}>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            className="form-input"
          />
          <label className="form-label">Name</label>
          {formik.touched.name && formik.errors.name && (
            <span className="form-error">{formik.errors.name}</span>
          )}
        </motion.div>

        {/* Email */}
        <motion.div className="form-group" variants={inputVariant}>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            className="form-input"
          />
          <label className="form-label">Email</label>
          {formik.touched.email && formik.errors.email && (
            <span className="form-error">{formik.errors.email}</span>
          )}
        </motion.div>

        {/* Password */}
        <motion.div className="form-group password-group" variants={inputVariant}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            className="form-input"
          />
          <label className="form-label">Password</label>
          <span
            className="show-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
          {formik.touched.password && formik.errors.password && (
            <span className="form-error">{formik.errors.password}</span>
          )}
        </motion.div>

        {/* Address */}
        <motion.div className="form-group" variants={inputVariant}>
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            className="form-input"
          />
          <label className="form-label">Address</label>
          {formik.touched.address && formik.errors.address && (
            <span className="form-error">{formik.errors.address}</span>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={registerMutation.isLoading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="register-btn"
        >
          {registerMutation.isLoading ? 'Registering...' : 'Register'}
        </motion.button>

        {/* Login link */}
        <motion.p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </motion.p>
      </motion.form>
    </div>
  );
};

export default Register;
