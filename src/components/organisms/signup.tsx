"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUpLayout = () => {
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cek apakah pengguna sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });

      // Pastikan respons mengandung token
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/admin");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-[#ffff] rounded-2xl relative overflow-hidden w-[700px] max-w-[100%] min-h-[500px] shadow-2xl">
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-1/2 ${
            signIn ? "-left-0 opacity-0" : "left-[50%] opacity-100"
          }`}
        >
          <form className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
            <h1 className="font-bold m-0">Create Account</h1>
            <input
              type="text"
              placeholder="Nama Perusahaan"
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Nama Direktur"
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Nama Penanggung Jawab"
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Alamat Perusahaan"
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <button className="rounded-sm border border-[#081b57] bg-[#081b57] text-white text-xs font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-300 active:scale-95 focus:outline-none">
              Register
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-1/2 ${
            signIn ? "left-0 opacity-100" : "left-[7%] opacity-0"
          }`}
        >
          <form className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
            <h1 className="font-bold m-0 tracking-widest">LOGIN</h1>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
            />
            <button className="rounded-sm border border-[#081b57] bg-[#081b57] text-white text-xs font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-300 active:scale-95 focus:outline-none">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out ${
            signIn ? "translate-x-50%" : "-translate-x-full"
          }`}
        >
          <div className="bg-gradient-to-r from-[#081b57] to-[#7912d4] text-white flex flex-col items-center justify-center h-full">
            {signIn ? (
              <div className="text-center p-8">
                <div className="absolute top-0 right-0 p-4 transition-transform duration-700 ease-in-out">
                  <Image
                    src="/images/logo.png"
                    alt="Logo-Perkindo"
                    width={50}
                    height={50}
                    className={`rounded-full bg-white ${
                      signIn ? "translate-x-0" : "translate-x-full"
                    }`}
                  />
                </div>
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us, please login with your personal
                  info
                </p>
                <button
                  onClick={() => toggle(false)}
                  className="mt-4 px-8 py-2 border border-white text-white rounded hover:bg-white hover:text-[#081b57] transition-colors"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="absolute top-0 left-0 p-4 transition-transform duration-700 ease-in-out">
                  <Image
                    src="/images/logo.png"
                    alt="Logo-Perkindo"
                    width={50}
                    height={50}
                    className={`rounded-full bg-white ${
                      signIn ? "-translate-x-full" : "translate-x-0"
                    }`}
                  />
                </div>
                <h1>Hello, Friend!</h1>
                <p>
                  Enter your personal details and start your journey with us
                </p>
                <button
                  onClick={() => toggle(true)}
                  className="mt-4 px-8 py-2 border border-white text-white rounded hover:bg-white hover:text-[#081b57] transition-colors"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLayout;
