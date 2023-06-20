import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import AdminPanel from "../admin-panel";

function Home() {
  const { user } = useContext(AuthContext);

  if (user.user.role[0] === "Admin") {
    return <AdminPanel />;
  }
  return <div>User is logged</div>;
}

export default Home;
