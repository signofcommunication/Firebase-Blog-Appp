import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Form, Input, Button } from "antd";
import { useAuth } from "../../../utilities/FirebaseProvider";
import Navbar from "./Navbar/Navbar";
import styles from "./style.module.css";

function Update() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { getSpecificData, specificData, updateData } = useAuth();
  const { blog } = useParams();
  const navigate = useNavigate();
  const data = specificData;

  useEffect(() => {
    (async () => getSpecificData(blog))();
  }, [blog]);

  useEffect(() => {
    setDescription(data.description);
    setTitle(data.title);
  }, []);

  async function handleUpdate() {
    try {
      const data = {
        detail: blog,
        title,
        description,
      };
      await updateData(data);
      alert("Update Success");
      navigate(-1);
    } catch (e) {
      console.log(e);
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
              <Button type="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Update;
