import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import Header from "./Header";

function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // console.log("user here", user);
  if (user.user.role[0] === "Admin") {
    return (
      <div>
        {/* <button onClick={handleLogout}>Logout</button> */}
        <Header />
        {/* <AdminPanel /> */}
      </div>
    );
  }
  return <div>User is logged</div>;
}

export default Home;
