import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { useEffect } from "react";
import { useAuth } from "../../utilities/FirebaseProvider";
import { GoogleCircleFilled } from "@ant-design/icons";

function Login() {
  const navigate = useNavigate();
  const { googleLogin, setName, setEmail } = useAuth();

  async function login() {
    try {
      const res = await googleLogin();
      alert("Login Success");
      setName(res.user.displayName);
      setEmail(res.user.email);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <Button block onClick={login}>
          <GoogleCircleFilled />
          Login with Google
        </Button>
      </Col>
    </Row>
  );
}

export default Login;
