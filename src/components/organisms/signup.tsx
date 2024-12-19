"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUpLayout = () => {
  const [signIn, toggle] = useState(true);
  // State untuk Sign In
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  // State untuk Sign Up
  const [nama_perusahaan, setNamaPerusahaan] = useState("");
  const [nama_direktur, setNamaDirektur] = useState("");
  const [nama_penanggung_jawab, setNamaPJ] = useState("");
  const [alamat_perusahaan, setAlamatPerusahaan] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPasswordConfirmation, setSignUpPasswordConfirmation] =
    useState("");

  // Menambahkan state untuk menandai apakah sedang mengirimkan form
  const [isSubmittingSignIn, setIsSubmittingSignIn] = useState(false);
  const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false);

  const [errorSignIn, setErrorSignIn] = useState<string | null>(null);
  const [errorSignUp, setErrorSignUp] = useState<string | null>(null);
  const [successSignUp, setSuccessSignUp] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "admin") {
        router.push("/admin"); // Redirect ke halaman admin jika role admin
      } else if (role === "user") {
        router.push("/users"); // Redirect ke halaman user jika role user
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signInUsername || !signInPassword) {
      setErrorSignIn("Email dan password harus diisi.");
      return;
    }

    setIsSubmittingSignIn(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: signInUsername,
        password: signInPassword,
      });

      if (response.data && response.data.token && response.data.user) {
        // Simpan token dan role di localStorage
        localStorage.setItem("token", response.data.token);

        // Cek apakah user adalah admin atau anggota
        const role = response.data.user.hasOwnProperty("username")
          ? "admin"
          : "user";
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect sesuai role
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "user") {
          router.push("/users/kta");
        }
      } else {
        setErrorSignIn("Login gagal. Silakan coba lagi.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorSignIn(
          err.response.data.message || "Terjadi kesalahan. Silakan coba lagi."
        );
      } else {
        setErrorSignIn("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsSubmittingSignIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nama_perusahaan ||
      !nama_direktur ||
      !nama_penanggung_jawab ||
      !alamat_perusahaan ||
      !signUpUsername ||
      !signUpPassword
    ) {
      setErrorSignUp("Semua field harus diisi");
      return;
    }

    setIsSubmittingSignUp(true);
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        nama_perusahaan,
        nama_direktur,
        nama_penanggung_jawab,
        alamat_perusahaan,
        email: signUpUsername,
        password: signUpPassword,
        password_confirmation: signUpPasswordConfirmation,
      });

      if (response.status === 201) {
        setSuccessSignUp("Pendaftaran berhasil! Silahkan login");
        setShowPopup(true);
        setErrorSignUp(null);
        // Reset Form
        setNamaPerusahaan("");
        setNamaDirektur("");
        setNamaPJ("");
        setAlamatPerusahaan("");
        setSignUpUsername("");
        setSignUpPassword("");
        setSignUpPasswordConfirmation("");
      } else {
        setErrorSignUp("Pendaftaran gagal. Silahkan coba lagi");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorSignUp(
          err.response.data.message || "Terjadi kesalahan. Silahkan coba lagi"
        );
      } else {
        setErrorSignUp("Terjadi kesalahan. Silahkan coba lagi");
      }
    } finally {
      setIsSubmittingSignUp(false);
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
    toggle(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-[#ffff] rounded-2xl relative overflow-hidden w-[700px] max-w-[100%] min-h-[570px] shadow-2xl">
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-1/2 ${
            signIn ? "-left-0 opacity-0" : "left-[50%] opacity-100"
          }`}
        >
          <form
            onSubmit={handleRegister}
            className="bg-white flex items-center justify-center flex-col px-12 h-full text-center"
          >
            <h1 className="font-bold m-0">Create Account</h1>
            <input
              type="text"
              placeholder="Nama Perusahaan"
              value={nama_perusahaan}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Nama Direktur"
              value={nama_direktur}
              onChange={(e) => setNamaDirektur(e.target.value)}
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Nama Penanggung Jawab"
              value={nama_penanggung_jawab}
              onChange={(e) => setNamaPJ(e.target.value)}
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Alamat Perusahaan"
              value={alamat_perusahaan}
              onChange={(e) => setAlamatPerusahaan(e.target.value)}
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />

            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
              </button>
            </div>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={signUpPasswordConfirmation}
                onChange={(e) => setSignUpPasswordConfirmation(e.target.value)}
                className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
              </button>
            </div>
            <button
              disabled={isSubmittingSignIn || isSubmittingSignUp}
              className="rounded-sm border border-[#081b57] bg-[#081b57] text-white text-xs font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-300 active:scale-95 focus:outline-none"
            >
              {isSubmittingSignUp ? "Registering..." : "Register"}
            </button>
            {errorSignUp && <p className="text-red-500">{`*${errorSignUp}`}</p>}
            {/* {successSignUp && (
              <p className="text-green-500">{`*${successSignUp}`}</p>
            )} */}
          </form>
          {/* Success Popup */}
          {showPopup && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center transition-opacity duration-500 opacity-100">
              <div className="bg-white p-6 rounded-lg shadow-xl text-center transition-transform transform scale-100">
                <h2 className="text-xl font-bold">{successSignUp}</h2>
                <button
                  onClick={() => {
                    handlePopupClose();
                    toggle(true);
                  }}
                  className="mt-4 px-8 py-2 bg-[#081b57] text-white rounded hover:bg-[#7912d4] transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>

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
              value={signInUsername}
              onChange={(e) => setSignInUsername(e.target.value)}
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
            />
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
              </button>
            </div>
            <button
              disabled={isSubmittingSignIn || isSubmittingSignUp} // Menonaktifkan jika salah satu sedang mengirim
              className="rounded-md mt-2 border border-[#081b57] bg-[#081b57] text-white text-xs font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-300 active:scale-95 focus:outline-none"
            >
              {isSubmittingSignIn
                ? "Logging in..."
                : isSubmittingSignUp
                ? "Registering..."
                : "Sign In"}
            </button>
            {errorSignIn && <p className="text-red">{`*${errorSignIn}`}</p>}
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
