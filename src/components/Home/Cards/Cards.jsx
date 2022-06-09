import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function Cards({ title, desc, pathTo }) {
  return (
    <>
      <Link to={pathTo}>
        <div className={styles.container}>
          <Row gutter={16}>
            <Col span={8} className={styles.card}>
              <Card title={title} bordered={false} className={styles.content}>
                {desc}
              </Card>
            </Col>
          </Row>
        </div>
      </Link>
    </>
  );
}
