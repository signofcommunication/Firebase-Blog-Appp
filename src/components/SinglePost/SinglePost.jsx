import { useParams } from "react-router-dom";
import { useAuth } from "../../utilities/FirebaseProvider";
import { useEffect } from "react";
import { Typography } from "antd";
import Navbar from "./Navbar/Navbar";

function SinglePost() {
  const { Title, Text } = Typography;
  const { getSpecificData, specificData } = useAuth();
  const { blog } = useParams();
  const { description, title } = specificData;

  useEffect(() => {
    return async () => {
      getSpecificData(blog);
    };
  }, [blog]);

  return (
    <>
      <Navbar />
      <Title>{title || "Error"}</Title>
      <Text>{description || "Error"}</Text>
    </>
  );
}

export default SinglePost;
