import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

const ViewBlog = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // Get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://blog-app-2-u2io.onrender.com/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        // setBlog(data?.blog);
        setBlog({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  //   // Form submit
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const { data } = await axios.put(
  //         `https://blog-app-2-u2io.onrender.com/api/v1/blog/update-blog/${id}`,
  //         {
  //           title: inputs.title,
  //           description: inputs.description,
  //           image: inputs.image,
  //           user: id,
  //         }
  //       );
  //       if (data?.success) {
  //         toast.success("Blog Updated");
  //         navigate("/my-blogs");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm mb-4" key={blog._id}>
        <Card.Img
          variant="top"
          src={blog.image}
          alt={blog.title}
          style={{ width: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>
            <strong>Title: </strong>
            {blog.title}
          </Card.Title>
          <Card.Text>{blog.description}</Card.Text>
          <Card.Footer style={{ marginTop: "4rem" }}>
            <i>Last Updated at:</i> {blog.updatedAt}
          </Card.Footer>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewBlog;
