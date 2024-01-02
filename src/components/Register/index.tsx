import { registerApi } from "@/api/auth";
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import Submit from "../Button/submit";

const Register = () => {
  const { setToken } = useAuth();

  const [formEmail, setFormEmail] = useState<string>("");
  const [formPassword, setFormPassword] = useState<string>("");
  const [formFirstName, setFormFirstName] = useState<string>("");
  const [formLastName, setFormLastName] = useState<string>("");
  const [registerError, setRegisterError] = useState<string | null>(null);

  const inputStyle = `w-full px-4 py-2 text-lg rounded-sm without-ring`;

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await registerApi({
        email: formEmail,
        first_name: formFirstName,
        last_name: formLastName,
        password: formPassword,
      });

      console.log(response);
      // TODO - add validation and error logic

      // TODO - add logic to auto sign in after registering

      // const tempToken = response?.data?.token;

      // if (tempToken) {
      //   setToken(tempToken);
      //   localStorage.setItem("token", tempToken);
      //   navigate("/");
      // }

      // if (tempToken == undefined) {
      //   console.log("incorrect login");
      // }\
      navigate("/");
    } catch (err) {
      console.error(`Error with handle form function ${err}`);
    }
  }

  return (
    <section className="h-[95dvh] px-4 flex justify-center items-center ">
      <form
        action=""
        className="lg:w-1/3 flex flex-col container gap-4 text-slate-900"
        onSubmit={handleSubmit}
      >
        <h3 className="text-5xl text-rose-500 text-center">Register</h3>
        <input
          type="text"
          className={inputStyle}
          placeholder="Email"
          value={formEmail}
          minLength={5}
          required
          onChange={(e) => setFormEmail(e.target.value)}
        />
        {registerError && <p></p>}
        <div className="flex flex-col md:flex-row w-full gap-4 ">
          <input
            type="text"
            className={inputStyle}
            placeholder="First Name"
            value={formFirstName}
            minLength={2}
            required
            onChange={(e) => setFormFirstName(e.target.value)}
          />
          {registerError && <p></p>}
          <input
            type="text"
            className={inputStyle}
            placeholder="Last Name"
            value={formLastName}
            minLength={2}
            required
            onChange={(e) => setFormLastName(e.target.value)}
          />
          {registerError && <p></p>}
        </div>

        <input
          type="password"
          className={inputStyle}
          placeholder="Password"
          value={formPassword}
          minLength={8}
          required
          onChange={(e) => setFormPassword(e.target.value)}
        />
        {registerError && <p></p>}
        <div className="w-full flex justify-center">
          <Submit>Submit</Submit>
        </div>
      </form>
    </section>
  );
};

export default Register;
