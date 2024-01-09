import React from "react";

type Props = { children: React.ReactElement };

const Layout = ({ children }: Props) => {
  return <div role="">{children}</div>;
};

export default Layout;
