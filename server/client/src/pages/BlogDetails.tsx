import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

interface Blog {
  title: string;
  description: string;
  image: string;
  id: string | number;
}

interface BlogInputs {
  title: string;
  description: string;
  image: string;
}

const BlogDetails: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<BlogInputs>({
    title: "",
    description: "",
    image: "",
  });

  // Get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://blog-app-2-5s8y.onrender.com/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // Input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://blog-app-2-5s8y.onrender.com/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">Update A Post</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={inputs.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={inputs.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="warning" type="submit">
              UPDATE
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogDetails;
