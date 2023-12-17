import { loginApi } from "@/api/auth";
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import { useAuth } from "../context/authFunctions";

const Login = () => {
  const [formEmail, setFormEmail] = useState<string>("");
  const [formPassword, setFormPassword] = useState<string>("");
  const { setToken } = useAuth();
  const inputStyle = `px-4 py-2 text-lg rounded-sm without-ring`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response: AxiosResponse | undefined = await loginApi({
        email: formEmail,
        password: formPassword,
      });

      const tempToken = response?.data?.token;
      if (tempToken) {
        // Save the token to local storage
        localStorage.setItem("token", tempToken);
        setToken(tempToken);
      }

      console.log("Success");
    } catch (err) {
      console.error(`Error with handle form function ${err}`);
    }
  }

  return (
    <section className="h-[30rem] flex justify-center items-center">
      <form
        action=""
        className="flex flex-col w-1/4 gap-4 text-slate-900"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl text-rose-500">Login</h3>
        <input
          type="text"
          className={inputStyle}
          placeholder="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <input
          type="text"
          className={inputStyle}
          placeholder="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        <button
          className="py-2 px-1 w-1/5 text-white bg-slate-700 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Login;
