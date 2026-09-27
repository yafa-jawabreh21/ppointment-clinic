import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Phone, ArrowRight } from "lucide-react";
import logo from "../assets/mend-container.svg";
import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  useDocumentTitle("SignUP");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* ======================================
          BACKGROUND DECORATION
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-blue-100/60" />
      </div>

      {/* ======================================
          SIGNUP CONTAINER
      ====================================== */}

      <div className="relative z-10 w-full max-w-md">
        {/* ======================================
            CARD
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          {/* ======================================
              LOGO
          ====================================== */}

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <img
                src={logo}
                width={50}
                height={50}
                className=" flex items-center justify-center"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">Clinic</h2>

              <p className="text-xs text-gray-500">Management System</p>
            </div>
          </div>

          {/* ======================================
              TITLE
          ====================================== */}

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Create an account
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create your account to manage your clinic
            </p>
          </div>

          {/* ======================================
              FORM
          ====================================== */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ==================================
                FULL NAME
            ================================== */}

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* ==================================
                EMAIL
            ================================== */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* ==================================
                PHONE
            ================================== */}

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* ==================================
                PASSWORD
            ================================== */}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ==================================
                CONFIRM PASSWORD
            ================================== */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Confirm Password
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ==================================
                TERMS
            ================================== */}

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
              />

              <label htmlFor="terms" className="text-sm text-gray-500">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-blue-700 hover:text-blue-800 font-medium"
                >
                  Terms & Conditions
                </button>
              </label>
            </div>

            {/* ==================================
                SIGNUP BUTTON
            ================================== */}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* ======================================
              LOGIN
          ====================================== */}

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to="/signin"
              type="button"
              className="ml-1  font-medium text-blue-700 hover:text-blue-800 cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* ======================================
            FOOTER
        ====================================== */}

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 Clinic Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
}
