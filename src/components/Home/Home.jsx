import { useEffect } from "react";
import { useAuth } from "../../utilities/FirebaseProvider";
import { Col, Row, Layout } from "antd";
import Navbar from "./Navbar/Navbar";
import Cards from "./Cards/Cards";
import "./style.module.css";

function Home() {
  const { datas, getAllData, name } = useAuth();

  useEffect(() => {
    document.title = "Home";
    getAllData();
  }, []);

  return (
    <>
      <Navbar />
      <Layout>
        {!datas ? (
          <h1>There is no blog</h1>
        ) : (
          <Row justify="space-around" align="middle">
            {datas?.map((v, i) => (
              <Col span={8} key={i}>
                <Cards
                  title={v.title}
                  desc={v.description}
                  pathTo={`posts/${name}/${v.id}`}
                />
              </Col>
            ))}
          </Row>
        )}
      </Layout>
    </>
  );
}

export default Home;
