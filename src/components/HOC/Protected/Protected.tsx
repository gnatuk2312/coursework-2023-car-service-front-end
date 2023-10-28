import { redirect } from "next/navigation";

import { useAuthContext } from "@/common/context/AuthContext";

const Protected = (Component: any) => {
  return function IsProtected(props: any) {
    const { state } = useAuthContext();

    if (!state.isAuthenticated) redirect("/login");

    return <Component {...props} />;
  };
};

export default Protected;
