import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../utilities/FirebaseProvider";

function Navbar() {
  const { name, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Menu
      mode="horizontal"
      style={{
        justifyContent: "space-between",
      }}
    >
      <Menu.Item>Medium</Menu.Item>
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 101, 2, 3, 4,
        5, 6,
      ].map(() => (
        <Menu.Item />
      ))}
      <Menu.SubMenu key="SubMenu" icon={<UserOutlined />}>
        <Menu.Item>
          🖐Hi, <b>{name}</b>
        </Menu.Item>
        <Menu.Item>
          <Link to="/post" style={{ textDecoration: "none" }}>
            Add New Post
          </Link>
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}

export default Navbar;
