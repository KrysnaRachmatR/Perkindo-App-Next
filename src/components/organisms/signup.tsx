"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUpLayout = () => {
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Email dan password harus diisi.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: username, // Menggunakan 'email' untuk dikirim ke server
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/admin");
      } else {
        setError("Login gagal. Silakan coba lagi.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "Terjadi kesalahan. Silakan coba lagi."
        );
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-[#ffff] rounded-2xl relative overflow-hidden w-[700px] max-w-[100%] min-h-[500px] shadow-2xl">
        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-1/2 ${
            signIn ? "left-0 opacity-100" : "left-[7%] opacity-0"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white flex items-center justify-center flex-col px-12 h-full text-center"
          >
            <h1 className="font-bold m-0 tracking-widest">LOGIN</h1>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
            />
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Menentukan jenis input berdasarkan showPassword
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle untuk melihat/sembunyikan password
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
                {/* Ikon mata */}
              </button>
            </div>
            <button className="rounded-md mt-2 border border-[#081b57] bg-[#081b57] text-white text-xs font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-300 active:scale-95 focus:outline-none">
              Sign In
            </button>
            {error && <p className="text-red">{`*${error}`}</p>}
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
