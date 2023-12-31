import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Submit = ({ children, className }: Props) => {
  return (
    <button
      className={`bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 active:text-rose-500 py-2 px-8 rounded ${className}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Submit;
