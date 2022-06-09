import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";

function Navbar() {
  return (
    <Menu
      mode="horizontal"
      style={{
        justifyContent: "space-between",
      }}
    >
      <Menu.Item>
        <Link to={-1}>
          <LeftOutlined />
        </Link>
      </Menu.Item>
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 101, 2, 3, 4,
        5, 6,
      ].map(() => (
        <Menu.Item />
      ))}
    </Menu>
  );
}

export default Navbar;
