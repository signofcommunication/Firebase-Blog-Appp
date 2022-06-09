import {
  LeftOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useAuth } from "../../../utilities/FirebaseProvider";

function Navbar() {
  const { deleteData } = useAuth();
  const { blog } = useParams();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      await deleteData(blog);
      alert("Successfully Deleted");
      navigate(-1);
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
      <Menu.Item>
        <Link to="/">
          <LeftOutlined />
        </Link>
      </Menu.Item>
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 101, 2, 3, 4,
        5, 6,
      ].map(() => (
        <Menu.Item />
      ))}
      <Menu.SubMenu key="SubMenu" icon={<PlusOutlined />}>
        <Menu.Item onClick={handleDelete}>
          <DeleteOutlined /> Delete
        </Menu.Item>
        <Menu.Item>
          <Link style={{ textDecoration: "none" }} to={`update`}>
            <EditOutlined /> Edit
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}

export default Navbar;
