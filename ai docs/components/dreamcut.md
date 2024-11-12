

# Code

```css
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import logo from "../assets/logo11.svg";
import signInImage1 from "../assets/signin1.jpg";
import signInImage2 from "../assets/signin2.jpg";
import signInImage3 from "../assets/signin3.jpg";
import signInImage4 from "../assets/signin4.jpg";
import signInImage5 from "../assets/signin5.jpg";
import signInImage6 from "../assets/signin6.jpg";
import signInImage7 from "../assets/signin7.jpg";
import signInImage8 from "../assets/signin8.jpg";
import signInImage9 from "../assets/signin9.jpg";
import signInImage10 from "../assets/signin10.jpg";
import signInImage11 from "../assets/signin11.jpg";
import { Info, AlertCircle, X } from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onSignIn: (user: User | null) => void;
  onClose?: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onSignIn,
  onClose,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [randomImage, setRandomImage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [_, setIsMouseInModal] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    const images = [
      signInImage1,
      signInImage2,
      signInImage3,
      signInImage4,
      signInImage5,
      signInImage6,
      signInImage7,
      signInImage8,
      signInImage9,
      signInImage10,
      signInImage11,
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const handleMouseEnter = () => setIsMouseInModal(true);
    const handleMouseLeave = () => {
      setIsMouseInModal(false);
      setMousePosition({ x: 0.5, y: 0.5 });
    };

    if (modalRef.current) {
      modalRef.current.addEventListener("mouseenter", handleMouseEnter);
      modalRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (modalRef.current) {
        modalRef.current.removeEventListener("mouseenter", handleMouseEnter);
        modalRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (onClose) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [onClose, handleEscapeKey]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onSignIn(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const getFriendlyErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try signing in instead.";
      case "auth/weak-password":
        return "Your password is too weak. Please choose a stronger password.";
      case "auth/invalid-email":
        return "The email address you entered is not valid. Please check and try again.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support for assistance.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect email or password. Please try again.";
      case "auth/too-many-requests":
        return "Too many unsuccessful attempts. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleEmailSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      onSignIn(userCredential.user);
    } catch (error: any) {
      setError(getFriendlyErrorMessage(error.code));
    }
  };

  const handleEmailSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onSignIn(userCredential.user);
    } catch (error: any) {
      setError(getFriendlyErrorMessage(error.code));
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset your password.");
      setIsForgotPassword(true);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
      setIsForgotPassword(false);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      setError(getFriendlyErrorMessage(error.code));
      setIsForgotPassword(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      handleEmailSignUp();
    } else {
      handleEmailSignIn();
    }
  };

  const handleCancel = () => {
    setError(null);
    setIsForgotPassword(false);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 m-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
        style={{ opacity: 0, animation: "fadeIn 1s 0s forwards" }}
      />
      <div
        ref={modalRef}
        className="flex flex-col md:flex-row w-[450px] md:w-[800px] md:h-[540px] bg-neutral-800 bg-opacity-80 backdrop-blur-md rounded-3xl shadow-large z-50 shine overflow-hidden relative"
        style={{ opacity: 0, animation: "blurUp 1s 0s forwards" }}
      >
        <button
          onClick={handleClose}
          className="bg-neutral-900/30 hover:bg-neutral-700 text-neutral-500 text-xs p-2 rounded-xl flex items-center shine shadow-large absolute top-3.5 right-3.5 z-50"
        >
          <X size={16} />
        </button>
        <div className="md:hidden h-[200px] bg-black/20 relative overflow-hidden">
          <img
            src={randomImage}
            alt="DreamCut"
            className="w-full h-full object-cover absolute"
            style={{
              transform: `translate(${mousePosition.x * 3}px, ${
                mousePosition.y * 3
              }px) scale(1.03)`,
              transition: "transform 0.2s ease-out",
            }}
          />
          <div
            className="absolute bottom-4 left-0 w-full z-10"
            style={{
              transform: `translate(${mousePosition.x * 5}px, ${
                mousePosition.y * 5
              }px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <h1
              className="text-[160px] h-[170px] relative text-left"
              style={{
                opacity: 1,
                animation: "blurUp 1s ease-in-out forwards",
              }}
            >
              <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-b from-white/20 to-white/0">
                Dream
              </span>
            </h1>
          </div>
          <div
            className="absolute bottom-4 left-4 text-white bg-neutral-900/20 p-2 rounded-xl backdrop-blur-md z-30 flex items-start shine saturate-150 shadow-large hover:shadow-large-hover cursor-pointer hover:bg-neutral-700/30 transition-all duration-300"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${
                mousePosition.y * 10
              }px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <Info
              className="mr-2 text-white/30 mt-0.5 flex-shrink-0"
              size={14}
            />
            <div>
              <h3 className="text-xs font-light text-white/30 mb-0.5">
                Night colors, starry skies, geometry
              </h3>
              <p className="text-[10px] font-light text-white/20">
                Futuristic, nostalgia, dark, trailing lights
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 h-full bg-black/20 relative overflow-hidden">
          <img
            src={randomImage}
            alt="DreamCut"
            className="w-full h-full object-cover absolute"
            style={{
              transform: `translate(${mousePosition.x * 3}px, ${
                mousePosition.y * 3
              }px) scale(1.03)`,
              transition: "transform 0.2s ease-out",
            }}
          />
          <div
            className="absolute bottom-4 left-0 w-full z-10"
            style={{
              transform: `translate(${mousePosition.x * 5}px, ${
                mousePosition.y * 5
              }px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <h1
              className="text-[100px] h-[110px] sm:text-[160px] sm:h-[170px] relative text-left"
              style={{
                opacity: 1,
                animation: "blurUp 1s ease-in-out forwards",
              }}
            >
              <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-b from-white/20 to-white/0">
                Dream
              </span>
            </h1>
          </div>
          <div
            className="absolute bottom-4 left-4 text-white bg-neutral-900/20 p-2 rounded-xl backdrop-blur-md z-30 flex items-start shine saturate-150 shadow-large hover:shadow-large-hover cursor-pointer hover:bg-neutral-700/30 transition-all duration-300"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${
                mousePosition.y * 10
              }px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <Info
              className="mr-2 text-white/30 mt-0.5 flex-shrink-0"
              size={14}
            />
            <div>
              <h3 className="text-xs font-light text-white/30 mb-0.5">
                Night colors, starry skies, geometry
              </h3>
              <p className="text-[10px] font-light text-white/20">
                Futuristic, nostalgia, dark, trailing lights
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-6 sm:p-8 w-full h-full flex flex-col justify-center max-w-[320px] mx-auto">
          <img
            src={logo}
            alt="logo"
            className="w-24 h-24 mx-auto"
            style={{ opacity: 0, animation: "blurUp 1s 0s forwards" }}
          />
          <h2
            className="font-medium mb-2 text-neutral-100 text-center"
            style={{ opacity: 0, animation: "blurUp 1s 0.1s forwards" }}
          >
            {isSignUp ? "Sign Up for DreamCut" : "Sign In to DreamCut"}
          </h2>
          <hr
            className="border-0 h-[1px] bg-gradient-to-r from-white/0 via-white/10 to-white/0 mb-2"
            style={{ opacity: 0, animation: "blurUp 1s 0.2s forwards" }}
          />
          <p
            className="text-sm mb-4 text-white/50 text-center"
            style={{ opacity: 0, animation: "blurUp 1s 0.3s forwards" }}
          >
            DreamCut is a brand new AI video editor and screen recorder that
            works right from your browser.{" "}
            <Link to="/pricing" className="underline">
              Early Access
            </Link>
          </p>
          {!error && (
            <>
              <button
                onClick={handleGoogleSignIn}
                className="bg-neutral-950/50 hover:bg-neutral-800 w-full text-white text-sm px-2 py-2 rounded-lg flex items-center justify-center shine shadow-large"
                style={{ opacity: 0, animation: "blurUp 1s 0.4s forwards" }}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign in with Google
              </button>
              <div
                className="flex items-center my-4"
                style={{ opacity: 0, animation: "blurUp 1s 0.4s forwards" }}
              >
                <div className="flex-grow h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
                <span className="px-4 text-sm text-white/50">OR</span>
                <div className="flex-grow h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
              </div>
            </>
          )}
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-2 p-2 rounded-lg bg-neutral-500/20 border border-neutral-500/30 text-white text-sm dark font-light"
              style={{ opacity: 0, animation: "blurUp 1s 0.3s forwards" }}
            />
            {!isForgotPassword && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-2 p-2 rounded-lg bg-neutral-500/20 border border-neutral-500/30 text-white text-sm dark font-light"
                style={{ opacity: 0, animation: "blurUp 1s 0.4s forwards" }}
              />
            )}
            {error && (
              <div
                className="mb-2 p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm flex items-start"
                style={{ opacity: 0, animation: "blurUp 0.5s forwards" }}
              >
                <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={16} />
                <span>{error}</span>
              </div>
            )}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-neutral-950/50 hover:bg-neutral-800 flex-grow text-white text-sm px-2 py-2 rounded-lg flex items-center justify-center shine shadow-large"
                style={{ opacity: 0, animation: "blurUp 1s 0.4s forwards" }}
              >
                {isForgotPassword
                  ? "Reset Password"
                  : isSignUp
                  ? "Sign Up"
                  : "Sign In"}
              </button>
              {(error || isForgotPassword) && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-neutral-700/50 hover:bg-neutral-600 text-white text-sm px-4 py-2 rounded-lg flex items-center justify-center shine shadow-large"
                  style={{ opacity: 0, animation: "blurUp 1s 0.4s forwards" }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          <hr
            className="border-0 h-[1px] bg-gradient-to-r from-white/0 via-white/10 to-white/0 mb-2 mt-4"
            style={{ animation: "blurUp 1s 0.2s forwards" }}
          />
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-white/50 hover:text-white mb-2 nofocus"
            style={{ opacity: 0, animation: "blurUp 1s 0.5s forwards" }}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
          <button
            onClick={handleForgotPassword}
            className="text-sm text-white/50 hover:text-white mb-4 nofocus"
            style={{ opacity: 0, animation: "blurUp 1s 0.6s forwards" }}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
```

# Usage

## **Tailwind CSS Configuration**

- Update your `tailwind.config.js` file:
    
    ```yaml
    module.exports = {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
        extend: {
          keyframes: {
            "scale-pulse": {
              "0%, 100%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.2)" },
            },
            "border-beam": {
              "100%": {
                "offset-distance": "100%",
              },
            },
          },
          animation: {
            "scale-pulse": "scale-pulse 3s ease-in-out infinite",
            "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
          },
          animationDelay: {
            500: "500ms",
          },
        },
      },
      plugins: [
        function ({ addUtilities, theme }) {
          const animationDelays = theme("animationDelay");
          const newUtilities = Object.entries(animationDelays).map(
            ([key, value]) => {
              return {
                [`.animation-delay-${key}`]: { animationDelay: value },
              };
            }
          );
          addUtilities(newUtilities);
        },
      ],
    };`
    ```
    

## **Global CSS**

- Update your `app/globals.css` file:
    
    ```css
    @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");
    
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    .font-space-grotesk {
      font-family: "Space Grotesk", sans-serif;
    }
    
    body {
      background: #fff;
    
      @media (prefers-color-scheme: dark) {
        background: #171717;
      }
    }
    
    @layer base {
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    
    a,
    input,
    button {
      transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    
    a:focus,
    input:focus[type="text"],
    input:focus[type="number"],
    textarea:focus,
    button:focus,
    select:focus {
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.03),
        0px 0px 2px 0px rgba(0, 0, 0, 0.1), 0px 5px 5px 0px rgba(0, 0, 0, 0.03);
      border-color: rgba(0, 0, 0, 0.5);
      outline: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    @media (prefers-color-scheme: dark) {
      a:focus,
      input:focus[type="text"],
      input:focus[type="number"],
      textarea:focus,
      button:focus,
      select:focus {
        box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.5),
          0px 0px 10px 0px rgba(255, 255, 255, 0.3),
          0px 0px 10px 0px rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5) !important;
        outline: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    
    .dark:focus {
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.5),
        0px 0px 10px 0px rgba(255, 255, 255, 0.3),
        0px 0px 10px 0px rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5) !important;
      outline: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .dark-strong:focus {
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.8),
        0px 0px 10px 0px rgba(255, 255, 255, 0.3),
        0px 0px 10px 0px rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.8) !important;
      outline: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    input:focus[type="range"],
    .nofocus:focus {
      box-shadow: none !important;
      border: none !important;
      outline: none !important;
    }
    
    .glow {
      box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
    }
    
    .text-glow {
      text-shadow: 0px 0px 30px rgba(255, 255, 255, 0.2);
    }
    
    @keyframes blurUp {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
        filter: blur(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0px) scale(1);
        filter: blur(0px);
      }
    }
    
    @keyframes blurDown {
      0% {
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
        filter: blur(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0px) scale(1);
        filter: blur(0px);
      }
    }
    
    @keyframes blurDownInfinite {
      0% {
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
        filter: blur(10px);
      }
      20% {
        opacity: 1;
        transform: translateY(0px) scale(1);
        filter: blur(0px);
      }
      80% {
        opacity: 1;
        transform: translateY(0px) scale(1);
        filter: blur(0px);
      }
      100% {
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
        filter: blur(10px);
      }
    }
    
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @keyframes scaleIn {
      0% {
        transform: scale(0.95) translateY(20px);
        opacity: 0;
      }
      100% {
        transform: scale(1) translateY(0px);
      }
    }
    
    .noselect {
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer */
      user-select: none;
    }
    
    .track {
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
      transition: 0.3s ease-out;
    }
    
    .track:hover {
      border: 1px solid rgba(0, 0, 0, 0.5);
      outline: none;
    }
    
    @media (prefers-color-scheme: dark) {
      .track {
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 0 10px rgba(255, 255, 255, 0.1);
        transition: 0.3s ease-out;
      }
    
      .track:hover {
        border: 1px solid rgba(255, 255, 255, 1);
        box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5),
          inset 0 0 10px rgba(255, 255, 255, 0.1);
        outline: none;
      }
    }
    .track.dark {
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 0 10px rgba(255, 255, 255, 0.1);
      transition: 0.3s ease-out;
    }
    
    .track.dark:hover {
      border: 1px solid rgba(255, 255, 255, 1);
      box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5),
        inset 0 0 10px rgba(255, 255, 255, 0.1);
      outline: none;
    }
    
    .selected {
      background: white;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 2px rgba(0, 0, 0, 0.1),
        0px 5px 10px rgba(0, 0, 0, 0.08);
      border-color: rgba(0, 0, 0, 0.5);
      outline: 1px solid rgba(0, 0, 0, 0.03);
    }
    
    @media (prefers-color-scheme: dark) {
      .selected {
        box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.1),
          inset 0px 0px 5px 0px rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5) !important;
        outline: 0.5px solid rgba(255, 255, 255, 0.3);
      }
    }
    
    .shine {
      border-top: 0.5px solid rgba(255, 255, 255, 0.2);
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0)
      );
    }
    
    .shine-large {
      border-top: 0.5px solid rgba(255, 255, 255, 0.3);
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0)
      );
    }
    
    .no-scroll {
      overflow: hidden;
    }
    
    .markdown-content {
      line-height: 1.6;
    }
    
    .markdown-content h1,
    .markdown-content h2,
    .markdown-content h3,
    .markdown-content h4,
    .markdown-content h5,
    .markdown-content h6 {
      margin-top: 0.5em;
      margin-bottom: 1em;
      font-weight: bold;
    }
    
    .markdown-content h1 {
      font-size: 1.5em;
    }
    .markdown-content h2 {
      font-size: 1.2em;
    }
    .markdown-content h3 {
      font-size: 1.1em;
    }
    .markdown-content h4 {
      font-size: 1em;
    }
    .markdown-content h5 {
      font-size: 0.83em;
    }
    .markdown-content h6 {
      font-size: 0.67em;
    }
    
    .markdown-content hr {
      background: rgba(0, 0, 0, 0.05);
      border: none;
      height: 1px;
      margin: 1.5em 0;
    
      @media (prefers-color-scheme: dark) {
        background: rgba(255, 255, 255, 0.05);
      }
    }
    
    .markdown-content p {
      margin-bottom: 2em;
    }
    
    .markdown-content ul,
    .markdown-content ol {
      margin-bottom: 2em;
      padding-left: 1.5em;
    }
    
    .markdown-content ul {
      list-style-type: disc;
    }
    
    .markdown-content ol {
      list-style-type: decimal;
    }
    
    .markdown-content ul ul,
    .markdown-content ol ul {
      list-style-type: circle;
    }
    
    .markdown-content ul ul ul,
    .markdown-content ol ul ul,
    .markdown-content ol ol ul {
      list-style-type: square;
    }
    
    .markdown-content li {
      margin-bottom: 0.5em;
    }
    
    .markdown-content li > p {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
    
    .markdown-content li > ul,
    .markdown-content li > ol {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
    
    .markdown-content a {
      color: #3b82f6;
      text-decoration: underline;
    }
    
    .markdown-content blockquote {
      border-left: 4px solid #e5e7eb;
      padding-left: 1em;
      margin-left: 0;
      margin-right: 0;
      font-style: italic;
    }
    
    .markdown-content code {
      font-size: 0.9em;
    }
    
    .markdown-chat p:last-child,
    .markdown-chat ul:last-child,
    .markdown-chat ol:last-child {
      margin-bottom: 0em;
    }
    
    .shadow {
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
        0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    }
    
    .shadow-subtle {
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.03),
        0px 0px 2px 0px rgba(0, 0, 0, 0.1), 0px 5px 5px 0px rgba(0, 0, 0, 0.03);
    }
    
    .shadow-strong {
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
        0px 4px 4px 0px rgba(0, 0, 0, 0.1), 0px 10px 10px 0px rgba(0, 0, 0, 0.15),
        inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
    }
    
    .shadow-large {
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05),
        0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 20px 40px 0px rgba(0, 0, 0, 0.25),
        inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
    }
    
    .shadow-large-strong {
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2),
        0px 15px 30px 0px rgba(0, 0, 0, 0.3), 0px 20px 40px 0px rgba(0, 0, 0, 0.5),
        inset 0px -1px 0px 0px rgba(0, 0, 0, 0.2);
    }
    
    .draggable {
      -webkit-app-region: drag;
    }
    
    .non-draggable {
      -webkit-app-region: no-drag;
    }
    
    /* Add this to your existing CSS */
    .selectable-text {
      user-select: text !important;
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      cursor: text;
    }
    
    /* Ensure child elements are also selectable */
    .selectable-text * {
      user-select: text !important;
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
    }
    
    /* Override any conflicting styles */
    .selectable-text p,
    .selectable-text span,
    .selectable-text div {
      user-select: text !important;
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
    }
    
    /* Safari dropdown styling */
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("../src/assets/dropdown-arrow.svg");
      background-repeat: no-repeat;
      background-position: right 0.7em top 50%;
      background-size: 1em auto;
      padding-right: 2em;
      padding-left: 0.7em;
    }
    
    select::-ms-expand {
      display: none;
    }
    
    @media (prefers-color-scheme: dark) {
      select {
        background-image: url("../src/assets/dropdown-arrow-dark.svg");
      }
    }
    
    select.dark {
      background-image: url("../src/assets/dropdown-arrow-dark.svg");
    }
    
    /* Custom slider styling for Safari and other browsers */
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      background: transparent;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05),
        0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05),
        0px 10px 10px 0px rgba(0, 0, 0, 0.1);
      margin-top: -8px;
      cursor: pointer;
      transition: 0.3s ease-out;
    }
    
    input[type="range"]::-moz-range-thumb {
      appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05),
        0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05),
        0px 10px 10px 0px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: 0.3s ease-out;
    }
    
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      background: #e5e5ea;
      border-radius: 2px;
    }
    
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 4px;
      background: #e5e5ea;
      border-radius: 2px;
    }
    
    input[type="range"]:focus {
      outline: none;
    }
    
    input[type="range"]:focus::-webkit-slider-thumb {
      background: #6057e8;
      box-shadow: 0px 1px 0px 0px rgba(96, 87, 232, 0.05),
        0px 4px 4px 0px rgba(96, 87, 232, 0.1),
        0px 10px 10px 0px rgba(96, 87, 232, 0.2);
    }
    
    input[type="range"]:focus::-moz-range-thumb {
      box-shadow: 0px 1px 0px 0px rgba(96, 87, 232, 0.05),
        0px 4px 4px 0px rgba(96, 87, 232, 0.1),
        0px 10px 10px 0px rgba(96, 87, 232, 0.2);
    }
    
    /* Dark mode styles */
    @media (prefers-color-scheme: dark) {
      input[type="range"]::-webkit-slider-thumb {
        background: #636366;
      }
    
      input[type="range"]::-moz-range-thumb {
        background: #636366;
      }
    
      input[type="range"]::-webkit-slider-runnable-track {
        background: #3a3a3c;
      }
    
      input[type="range"]::-moz-range-track {
        background: #3a3a3c;
      }
    
      input[type="range"]:focus::-webkit-slider-thumb {
        background: #fff;
        box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
          0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
      }
    
      input[type="range"]:focus::-moz-range-thumb {
        background: #fff;
        box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
          0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
      }
    }
    
    input.dark[type="range"]::-webkit-slider-thumb {
      background: #636366;
    }
    
    input.dark[type="range"]::-moz-range-thumb {
      background: #636366;
    }
    
    input.dark[type="range"]::-webkit-slider-runnable-track {
      background: #3a3a3c;
    }
    
    input.dark[type="range"]::-moz-range-track {
      background: #3a3a3c;
    }
    
    input.dark[type="range"]:focus::-webkit-slider-thumb {
      background: #fff;
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
        0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    }
    
    input.dark[type="range"]:focus::-moz-range-thumb {
      background: #fff;
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
        0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    }
    
    /* Add these styles at the end of your index.css file */
    
    /* Toggle switch container */
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 28px;
    }
    
    /* Hide default HTML checkbox */
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    /* The slider */
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e5e5ea;
      transition: 0.4s;
      border-radius: 34px;
    }
    
    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05),
        0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05),
        0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    }
    
    input:checked + .toggle-slider {
      background-color: #6057e8;
    }
    
    input:checked + .toggle-slider:before {
      transform: translateX(20px);
    }
    
    /* Focus styles */
    input:focus + .toggle-slider {
      box-shadow: 0 0 1px #6057e8;
    }
    
    /* Dark mode styles */
    @media (prefers-color-scheme: dark) {
      .toggle-slider {
        background-color: #3a3a3c;
      }
    
      .toggle-slider:before {
        background-color: #636366;
      }
    
      input:checked + .toggle-slider {
        background-color: #6057e8;
      }
    
      input:checked + .toggle-slider:before {
        background-color: #ffffff;
      }
    }
    
    .dark .toggle-slider {
      background-color: #3a3a3c;
    }
    
    .dark .toggle-slider:before {
      background-color: #636366;
    }
    
    .dark input:checked + .toggle-slider {
      background-color: #6057e8;
    }
    
    .dark input:checked + .toggle-slider:before {
      background-color: #ffffff;
    }
    
    .scrollbar-hide {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    
    .scrollbar-hide::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
    
    .latest-image-mask {
      -webkit-mask-image: -webkit-gradient(
        linear,
        left,
        right,
        color-stop(0%, rgba(0, 0, 0, 0)),
        color-stop(6%, rgba(0, 0, 0, 0)),
        color-stop(12%, rgba(0, 0, 0, 1)),
        color-stop(96%, rgba(0, 0, 0, 1)),
        color-stop(100%, rgba(0, 0, 0, 0))
      );
      mask-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 6%,
        rgba(0, 0, 0, 1) 12%,
        rgba(0, 0, 0, 1) 96%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    
    @keyframes strikethrough {
      0% {
        transform: scaleX(0);
        opacity: 0;
      }
      100% {
        transform: scaleX(1);
        opacity: 1;
      }
    }
    
    @keyframes spin-slow {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes spin-medium {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes spin-fast {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .animate-spin-slow {
      animation: spin-slow 100s linear infinite;
    }
    .animate-spin-medium {
      animation: spin-medium 60s linear infinite;
    }
    .animate-spin-fast {
      animation: spin-fast 20s linear infinite;
    }
    
    .react-syntax-highlighter-line-number {
      color: #444 !important;
    }
    
    @keyframes ticker {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    
    .animate-ticker {
      animation: ticker 30s linear infinite;
    }`
    ```

--

and this too :<aside>

# Code

```jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Mic, CirclePlay, CircleSlash, Loader, Info } from "lucide-react";
import AudioWaveformWrapper from "../components/AudioWaveformWrapper";
import axios from "axios";
import danielAudio from "../assets/Daniel.mp3";
import charlotteAudio from "../assets/Charlotte.mp3";
import sourasithAudio from "../assets/Sourasith.mp3";
import jessicaAudio from "../assets/Jessica.mp3";
import lilyAudio from "../assets/Lily.mp3";
import mengAudio from "../assets/Meng.mp3";
import willAudio from "../assets/Will.mp3";
import chrisAudio from "../assets/Chris.mp3";
import lauraAudio from "../assets/Laura.mp3";
import sarahAudio from "../assets/Sarah.mp3";
import myraAudio from "../assets/Myra.mp3";
import alexAudio from "../assets/Alex.mp3";
import paolaAudio from "../assets/Paola.mp3";

interface Voice {
  voice_id: string;
  name: string;
}

const predefinedVoices: Voice[] = [
  { voice_id: "zp5DoEM2LmGvGfgiBEP5", name: "Paola" },
  { voice_id: "AbeWvdYm2Ajqu0LRK5vW", name: "Myra" },
  { voice_id: "eCTLABB8t5tP4VmRoX0z", name: "Alex" },
  { voice_id: "cgSgspJ2msm6clMCkdW9", name: "Jessica" },
  { voice_id: "iP95p4xoKVk53GoZ742B", name: "Chris" },
  { voice_id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily" },
  { voice_id: "bIHbv24MWmeRgasZH58o", name: "Will" },
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
  { voice_id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura" },
  { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte" },
  { voice_id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },
];

const TextToSpeechModalPreview: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState<string>(
    predefinedVoices[0].voice_id
  );
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [text, setText] = useState<string>("");
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedSeconds, setGeneratedSeconds] = useState<number>(0);
  const [totalGeneratedSeconds, setTotalGeneratedSeconds] = useState<number>(0);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);

  const voiceAudios: { [key: string]: string } = {
    Daniel: danielAudio,
    Charlotte: charlotteAudio,
    Sourasith: sourasithAudio,
    Jessica: jessicaAudio,
    Lily: lilyAudio,
    Meng: mengAudio,
    Will: willAudio,
    Chris: chrisAudio,
    Laura: lauraAudio,
    Sarah: sarahAudio,
    Myra: myraAudio,
    Alex: alexAudio,
    Paola: paolaAudio,
  };

  useEffect(() => {
    const storedSeconds = localStorage.getItem("totalGeneratedSeconds");
    if (storedSeconds) {
      const totalSeconds = parseFloat(storedSeconds);
      setTotalGeneratedSeconds(totalSeconds);
      if (totalSeconds >= 10) {
        setIsLimitReached(true);
      }
    }
  }, []);

  const createAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    return audioContextRef.current;
  };

  const stopAudioVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAudioLevel(0);
  };

  const visualizeAudio = (audioElement: HTMLAudioElement) => {
    const audioContext = createAudioContext();
    const analyser = analyserRef.current!;
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateLevels = () => {
      analyser.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      setAudioLevel(average / 255);
      animationFrameRef.current = requestAnimationFrame(updateLevels);
    };
    updateLevels();
  };

  const handleVoiceButton = useCallback(
    (voice: Voice) => {
      setSelectedVoice(voice.voice_id);
      if (playingVoice === voice.name) {
        if (audioPlayer) {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
        }
        setPlayingVoice(null);
        stopAudioVisualization();
      } else {
        if (audioPlayer) {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
        }
        const audioSrc = voiceAudios[voice.name];
        if (audioSrc) {
          const audio = new Audio(audioSrc);
          audio.play();
          setAudioPlayer(audio);
          setPlayingVoice(voice.name);
          visualizeAudio(audio);
          audio.onended = () => {
            setPlayingVoice(null);
            stopAudioVisualization();
          };
        }
      }
    },
    [audioPlayer, playingVoice]
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, 100));
  };

  const handleGenerateVoice = async () => {
    setIsGenerating(true);
    try {
      // Check if generating this voice would exceed the 10-second limit
      if (totalGeneratedSeconds >= 10) {
        setIsLimitReached(true);
        setIsGenerating(false);
        return;
      }

      const response = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/" + selectedVoice,
        {
          text: text,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": import.meta.env.VITE_ELEVEN_LABS_API_KEY,
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setGeneratedAudioUrl(url);

      // Calculate generated seconds
      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => {
        const seconds = Math.round(audio.duration);
        setGeneratedSeconds(seconds);
        const newTotalSeconds = Math.min(totalGeneratedSeconds + seconds, 10);
        setTotalGeneratedSeconds(newTotalSeconds);
        localStorage.setItem(
          "totalGeneratedSeconds",
          newTotalSeconds.toString()
        );
        setHasGenerated(true);
        if (newTotalSeconds >= 10) {
          setIsLimitReached(true);
        }
      });
    } catch (error) {
      console.error("Error generating voice:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsGenerating(false);
    }
  };

  const playGeneratedAudio = useCallback(() => {
    if (generatedAudioUrl) {
      const audio = new Audio(generatedAudioUrl);
      audio.play();
      setPlayingVoice("Generated");
      visualizeAudio(audio);
      audio.onended = () => {
        setPlayingVoice(null);
        stopAudioVisualization();
      };
    }
  }, [generatedAudioUrl]);

  useEffect(() => {
    return () => {
      stopAudioVisualization();
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="bg-neutral-900/90 backdrop-blur-md p-4 rounded-2xl shadow-large-strong w-full max-w-sm shine">
      <div className="flex justify-between items-center mb-2 text-sm">
        <h2 className="text-neutral-200">AI Voice Generator</h2>
      </div>
      <hr className="border-0 h-[1px] bg-gradient-to-r from-white/10 to-white/0 mb-2" />
      <div className="mb-4 relative">
        <div className="flex justify-center items-center">
          <AudioWaveformWrapper
            audioLevels={[audioLevel, audioLevel, audioLevel]}
          />
        </div>
        <button className="absolute top-1/2 mt-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full flex items-center justify-center transition-all duration-300 bg-opacity-10 backdrop-blur-sm shine-large shadow-large brightness-125 saturate-150 bg-neutral-500 hover:bg-neutral-400/20">
          <Mic size={20} className="text-neutral-200" />
        </button>
      </div>
      <textarea
        className="w-full h-24 p-2 border border-neutral-600/50 rounded-xl mb-4 bg-neutral-800/60 text-neutral-200 dark shine text-sm transition-all duration-300"
        placeholder="Enter text to generate an AI voice (max 100 characters)"
        value={text}
        onChange={handleTextChange}
        maxLength={100}
      />
      <div className="mb-8">
        <h3 className="font-medium mb-2 text-neutral-200 text-xs flex items-center">
          Select Voice
        </h3>
        <div className="flex flex-wrap gap-2">
          {predefinedVoices.map((voice) => (
            <button
              key={voice.voice_id}
              onClick={() => handleVoiceButton(voice)}
              className={`px-3 py-1.5 shine text-xs rounded-lg text-white flex items-center space-x-2 dark ${
                selectedVoice === voice.voice_id
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-neutral-700/50 hover:bg-neutral-600"
              } ${playingVoice === voice.name ? "animate-pulse" : ""}`}
            >
              <span>{voice.name}</span>
              {playingVoice === voice.name ? (
                <CircleSlash size={14} className="text-white/50 animate-spin" />
              ) : (
                <CirclePlay size={14} className="text-white/50" />
              )}
            </button>
          ))}
        </div>
        {(hasGenerated || isLimitReached) && (
          <>
            <hr className="border-0 h-[1px] bg-gradient-to-r from-white/10 to-white/0 mb-2 mt-4" />
            <div className="mt-4 text-xs text-neutral-400 flex items-start">
              <Info size={14} className="mr-1 mt-0.5" />
              <span>
                {isLimitReached ? (
                  <>
                    You've reached the 10-second limit for voice generation.
                    <br />
                    <a
                      href="/pricing"
                      className="text-indigo-400 hover:underline"
                    >
                      Upgrade to Pro
                    </a>{" "}
                    for up to 7,200 seconds (120 mins) per month.
                  </>
                ) : (
                  <>
                    Generated: {generatedSeconds}s (Total:{" "}
                    {totalGeneratedSeconds}s out of 10s limit).
                    <br />
                    <a
                      href="/pricing"
                      className="text-indigo-400 hover:underline"
                    >
                      Pro users
                    </a>{" "}
                    get up to 7,200 seconds, or 120 mins per month.
                  </>
                )}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className={`bg-indigo-500 shine shadow-lg hover:bg-indigo-600 text-white p-2 rounded-lg flex items-center text-xs ${
            isGenerating || isLimitReached || text.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleGenerateVoice}
          disabled={isGenerating || isLimitReached || text.length === 0}
        >
          {isGenerating ? (
            <>
              <Loader size={16} className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate AI Voice"
          )}
        </button>
        {generatedAudioUrl && (
          <button
            className="bg-indigo-700 shine shadow-lg hover:bg-indigo-600 text-white p-2 rounded-lg flex items-center text-xs"
            onClick={playGeneratedAudio}
          >
            {playingVoice === "Generated" ? (
              <CircleSlash
                size={14}
                className="text-white/50 animate-spin mr-2"
              />
            ) : (
              <CirclePlay size={14} className="text-white/50 mr-2" />
            )}
            Play Generated Voice
          </button>
        )}
      </div>
    </div>
  );
};

export default TextToSpeechModalPreview;
```

</aside>

<aside>

# Usage

## **NextJS Setup**

1. Install [Node.js](https://nodejs.org/en).
2. Create a new [Next.js](https://nextjs.org/docs/getting-started/installation) project:
    
    `npx create-next-app@latest my-app`
    
3. Select Yes for Typescript and Tailwind CSS.
    
    `Would you like to use TypeScript? Yes
    Would you like to use Tailwind CSS? Yes`
    
4. Go to project folder and install required dependencies:
    
    `cd my-app
    npm install lucide-react axios`
    

## **Tailwind CSS Configuration**

Update your `tailwind.config.js` file:

```purescript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "scale-pulse": "scale-pulse 3s ease-in-out infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      animationDelay: {
        500: "500ms",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const animationDelays = theme("animationDelay");
      const newUtilities = Object.entries(animationDelays).map(
        ([key, value]) => {
          return {
            [`.animation-delay-${key}`]: { animationDelay: value },
          };
        }
      );
      addUtilities(newUtilities);
    },
  ],
};
```

## **Global CSS**

Update your `app/globals.css` file:

```css
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

.font-space-grotesk {
  font-family: "Space Grotesk", sans-serif;
}

body {
  background: #fff;

  @media (prefers-color-scheme: dark) {
    background: #171717;
  }
}

@layer base {
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

a,
input,
button {
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

a:focus,
input:focus[type="text"],
input:focus[type="number"],
textarea:focus,
button:focus,
select:focus {
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.03),
    0px 0px 2px 0px rgba(0, 0, 0, 0.1), 0px 5px 5px 0px rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.5);
  outline: 1px solid rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  a:focus,
  input:focus[type="text"],
  input:focus[type="number"],
  textarea:focus,
  button:focus,
  select:focus {
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.5),
      0px 0px 10px 0px rgba(255, 255, 255, 0.3),
      0px 0px 10px 0px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5) !important;
    outline: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.dark:focus {
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.5),
    0px 0px 10px 0px rgba(255, 255, 255, 0.3),
    0px 0px 10px 0px rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5) !important;
  outline: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-strong:focus {
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.8),
    0px 0px 10px 0px rgba(255, 255, 255, 0.3),
    0px 0px 10px 0px rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.8) !important;
  outline: 1px solid rgba(255, 255, 255, 0.3);
}

input:focus[type="range"],
.nofocus:focus {
  box-shadow: none !important;
  border: none !important;
  outline: none !important;
}

.glow {
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
}

.text-glow {
  text-shadow: 0px 0px 30px rgba(255, 255, 255, 0.2);
}

@keyframes blurUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
    filter: blur(0px);
  }
}

@keyframes blurDown {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
    filter: blur(0px);
  }
}

@keyframes blurDownInfinite {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
    filter: blur(10px);
  }
  20% {
    opacity: 1;
    transform: translateY(0px) scale(1);
    filter: blur(0px);
  }
  80% {
    opacity: 1;
    transform: translateY(0px) scale(1);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
    filter: blur(10px);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.95) translateY(20px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0px);
  }
}

.noselect {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer */
  user-select: none;
}

.track {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: 0.3s ease-out;
}

.track:hover {
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
}

@media (prefers-color-scheme: dark) {
  .track {
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 0 10px rgba(255, 255, 255, 0.1);
    transition: 0.3s ease-out;
  }

  .track:hover {
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5),
      inset 0 0 10px rgba(255, 255, 255, 0.1);
    outline: none;
  }
}
.track.dark {
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.1);
  transition: 0.3s ease-out;
}

.track.dark:hover {
  border: 1px solid rgba(255, 255, 255, 1);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5),
    inset 0 0 10px rgba(255, 255, 255, 0.1);
  outline: none;
}

.selected {
  background: white;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 2px rgba(0, 0, 0, 0.1),
    0px 5px 10px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.5);
  outline: 1px solid rgba(0, 0, 0, 0.03);
}

@media (prefers-color-scheme: dark) {
  .selected {
    box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.1),
      inset 0px 0px 5px 0px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5) !important;
    outline: 0.5px solid rgba(255, 255, 255, 0.3);
  }
}

.shine {
  border-top: 0.5px solid rgba(255, 255, 255, 0.2);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0)
  );
}

.shine-large {
  border-top: 0.5px solid rgba(255, 255, 255, 0.3);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
}

.no-scroll {
  overflow: hidden;
}

.markdown-content {
  line-height: 1.6;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 0.5em;
  margin-bottom: 1em;
  font-weight: bold;
}

.markdown-content h1 {
  font-size: 1.5em;
}
.markdown-content h2 {
  font-size: 1.2em;
}
.markdown-content h3 {
  font-size: 1.1em;
}
.markdown-content h4 {
  font-size: 1em;
}
.markdown-content h5 {
  font-size: 0.83em;
}
.markdown-content h6 {
  font-size: 0.67em;
}

.markdown-content hr {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  height: 1px;
  margin: 1.5em 0;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.05);
  }
}

.markdown-content p {
  margin-bottom: 2em;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 2em;
  padding-left: 1.5em;
}

.markdown-content ul {
  list-style-type: disc;
}

.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content ul ul,
.markdown-content ol ul {
  list-style-type: circle;
}

.markdown-content ul ul ul,
.markdown-content ol ul ul,
.markdown-content ol ol ul {
  list-style-type: square;
}

.markdown-content li {
  margin-bottom: 0.5em;
}

.markdown-content li > p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.markdown-content li > ul,
.markdown-content li > ol {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.markdown-content a {
  color: #3b82f6;
  text-decoration: underline;
}

.markdown-content blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
}

.markdown-content code {
  font-size: 0.9em;
}

.markdown-chat p:last-child,
.markdown-chat ul:last-child,
.markdown-chat ol:last-child {
  margin-bottom: 0em;
}

.shadow {
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
    0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

.shadow-subtle {
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.03),
    0px 0px 2px 0px rgba(0, 0, 0, 0.1), 0px 5px 5px 0px rgba(0, 0, 0, 0.03);
}

.shadow-strong {
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
    0px 4px 4px 0px rgba(0, 0, 0, 0.1), 0px 10px 10px 0px rgba(0, 0, 0, 0.15),
    inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
}

.shadow-large {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05),
    0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 20px 40px 0px rgba(0, 0, 0, 0.25),
    inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
}

.shadow-large-strong {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2),
    0px 15px 30px 0px rgba(0, 0, 0, 0.3), 0px 20px 40px 0px rgba(0, 0, 0, 0.5),
    inset 0px -1px 0px 0px rgba(0, 0, 0, 0.2);
}

.draggable {
  -webkit-app-region: drag;
}

.non-draggable {
  -webkit-app-region: no-drag;
}

/* Add this to your existing CSS */
.selectable-text {
  user-select: text !important;
  -webkit-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
  cursor: text;
}

/* Ensure child elements are also selectable */
.selectable-text * {
  user-select: text !important;
  -webkit-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
}

/* Override any conflicting styles */
.selectable-text p,
.selectable-text span,
.selectable-text div {
  user-select: text !important;
  -webkit-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
}

/* Safari dropdown styling */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("../src/assets/dropdown-arrow.svg");
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%;
  background-size: 1em auto;
  padding-right: 2em;
  padding-left: 0.7em;
}

select::-ms-expand {
  display: none;
}

@media (prefers-color-scheme: dark) {
  select {
    background-image: url("../src/assets/dropdown-arrow-dark.svg");
  }
}

select.dark {
  background-image: url("../src/assets/dropdown-arrow-dark.svg");
}

/* Custom slider styling for Safari and other browsers */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05),
    0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05),
    0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  margin-top: -8px;
  cursor: pointer;
  transition: 0.3s ease-out;
}

input[type="range"]::-moz-range-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05),
    0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05),
    0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.3s ease-out;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: #e5e5ea;
  border-radius: 2px;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  background: #e5e5ea;
  border-radius: 2px;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-thumb {
  background: #6057e8;
  box-shadow: 0px 1px 0px 0px rgba(96, 87, 232, 0.05),
    0px 4px 4px 0px rgba(96, 87, 232, 0.1),
    0px 10px 10px 0px rgba(96, 87, 232, 0.2);
}

input[type="range"]:focus::-moz-range-thumb {
  box-shadow: 0px 1px 0px 0px rgba(96, 87, 232, 0.05),
    0px 4px 4px 0px rgba(96, 87, 232, 0.1),
    0px 10px 10px 0px rgba(96, 87, 232, 0.2);
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-thumb {
    background: #636366;
  }

  input[type="range"]::-moz-range-thumb {
    background: #636366;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    background: #3a3a3c;
  }

  input[type="range"]::-moz-range-track {
    background: #3a3a3c;
  }

  input[type="range"]:focus::-webkit-slider-thumb {
    background: #fff;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
      0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  }

  input[type="range"]:focus::-moz-range-thumb {
    background: #fff;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
      0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  }
}

input.dark[type="range"]::-webkit-slider-thumb {
  background: #636366;
}

input.dark[type="range"]::-moz-range-thumb {
  background: #636366;
}

input.dark[type="range"]::-webkit-slider-runnable-track {
  background: #3a3a3c;
}

input.dark[type="range"]::-moz-range-track {
  background: #3a3a3c;
}

input.dark[type="range"]:focus::-webkit-slider-thumb {
  background: #fff;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
    0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

input.dark[type="range"]:focus::-moz-range-thumb {
  background: #fff;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05),
    0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

/* Add these styles at the end of your index.css file */

/* Toggle switch container */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
}

/* Hide default HTML checkbox */
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e5ea;
  transition: 0.4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05),
    0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05),
    0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

input:checked + .toggle-slider {
  background-color: #6057e8;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

/* Focus styles */
input:focus + .toggle-slider {
  box-shadow: 0 0 1px #6057e8;
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .toggle-slider {
    background-color: #3a3a3c;
  }

  .toggle-slider:before {
    background-color: #636366;
  }

  input:checked + .toggle-slider {
    background-color: #6057e8;
  }

  input:checked + .toggle-slider:before {
    background-color: #ffffff;
  }
}

.dark .toggle-slider {
  background-color: #3a3a3c;
}

.dark .toggle-slider:before {
  background-color: #636366;
}

.dark input:checked + .toggle-slider {
  background-color: #6057e8;
}

.dark input:checked + .toggle-slider:before {
  background-color: #ffffff;
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.latest-image-mask {
  -webkit-mask-image: -webkit-gradient(
    linear,
    left,
    right,
    color-stop(0%, rgba(0, 0, 0, 0)),
    color-stop(6%, rgba(0, 0, 0, 0)),
    color-stop(12%, rgba(0, 0, 0, 1)),
    color-stop(96%, rgba(0, 0, 0, 1)),
    color-stop(100%, rgba(0, 0, 0, 0))
  );
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 6%,
    rgba(0, 0, 0, 1) 12%,
    rgba(0, 0, 0, 1) 96%,
    rgba(0, 0, 0, 0) 100%
  );
}

@keyframes strikethrough {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-medium {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-fast {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 100s linear infinite;
}
.animate-spin-medium {
  animation: spin-medium 60s linear infinite;
}
.animate-spin-fast {
  animation: spin-fast 20s linear infinite;
}

.react-syntax-highlighter-line-number {
  color: #444 !important;
}

@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-ticker {
  animation: ticker 30s linear infinite;
}

```

## **Usage**

<aside>

1. Save this component to `components/TextToSpeechModalPreview.tsx`.
2. Create a new page, e.g., `app/page.tsx`.
3. Import the necessary libraries and component.

Example:

`import { TextToSpeechModalPreview } from "@/components/TextToSpeechModalPreview";

export default function Home() {
  return <TextToSpeechModalPreview />;
}`

Now you can use `TextToSpeechModalPreview` in your pages or other components.

</aside>

</aside>