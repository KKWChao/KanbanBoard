import { loginApi } from "@/api/auth";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import Submit from "../Button/submit";

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

      if (response?.data.success) {
        const tempToken = response?.data?.token;
        setToken(tempToken);
        localStorage.setItem("token", tempToken);
        navigate("/");
      }

      if (response?.data.success === false) {
        console.log("incorrect login");
      }
    } catch (err) {
      console.error(`Error with handle form function ${err}`);
    }
  }

  return (
    <section className="h-[95dvh] px-4 flex justify-center items-center">
      <form
        action=""
        className="lg:w-1/3 flex flex-col gap-4 text-slate-900 container"
        onSubmit={handleSubmit}
      >
        <h3 className="text-5xl text-rose-500 text-center">Login</h3>
        <input
          type="text"
          className={inputStyle}
          placeholder="Email"
          value={formEmail}
          minLength={3}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        {loginError == "ERR_USERNAME" && <p>Error</p>}
        <input
          type="password"
          className={inputStyle}
          placeholder="Password"
          value={formPassword}
          minLength={8}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        {loginError == "ERR_PW" && <p>Error</p>}
        <div className="w-full flex justify-center">
          <Submit>Submit</Submit>
        </div>
      </form>
    </section>
  );
};

export default Login;
