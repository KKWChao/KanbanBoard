import { loginApi } from "@/api/auth";
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const Login = () => {
  const { setToken } = useAuth();

  const [formEmail, setFormEmail] = useState<string>("");
  const [formPassword, setFormPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const inputStyle = `px-4 py-2 text-lg rounded-sm without-ring`;

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response: AxiosResponse | undefined = await loginApi({
        email: formEmail,
        password: formPassword,
      });

      const tempToken = response?.data?.token;

      if (tempToken) {
        setToken(tempToken);
        localStorage.setItem("token", tempToken);
        navigate("/");
      }

      if (tempToken == undefined) {
        console.log("incorrect login");
      }
    } catch (err) {
      console.error(`Error with handle form function ${err}`);
    }
  }

  return (
    <section className="h-[30rem] flex justify-center items-center">
      <form
        action=""
        className="flex flex-col gap-4 text-slate-900 container"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl text-rose-500 text-center">Login</h3>
        <input
          type="text"
          className={inputStyle}
          placeholder="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        {}
        <input
          type="password"
          className={inputStyle}
          placeholder="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        {}
        <div className="w-full flex justify-center">
          <button
            className="py-2 px-8 text-white bg-slate-700 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
