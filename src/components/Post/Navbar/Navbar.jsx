import { Menu } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link to="/">
          <LeftOutlined />
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
