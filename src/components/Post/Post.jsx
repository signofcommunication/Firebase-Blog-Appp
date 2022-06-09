import { useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { onSnapshot, doc } from "firebase/firestore";
import { useAuth } from "../../utilities/FirebaseProvider";
import { useNavigate } from "react-router-dom";
import * as firebase from "../../utilities/firebase";
import Navbar from "./Navbar/Navbar";
import styles from "./style.module.css";

function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addNewBlog, addSubContent, name } = useAuth();
  const navigate = useNavigate();

  async function upload() {
    try {
      if (title && description) {
        addNewBlog();
        addSubContent(title, description);
        onSnapshot(doc(firebase.db, `users/${name}`), doc => {
          console.log(doc.data());
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <Row align="middle" justify="center" className={styles.row}>
        <Col className={styles.col} span={12}>
          <Form layout="vertical">
            <Form.Item
              label="Title"
              required
              tooltip="This is a required field"
            >
              <Input
                placeholder="input title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea
                placeholder="input description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={upload}>
                Upload
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Post;
