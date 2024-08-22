import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);

  const getAllUsers = async () => {
    const { data } = await axios.get(
      "https://blog-app-2-5s8y.onrender.com/api/v1/user/all-user"
    );
    if (data?.success) {
      console.log(data);
      setAllUser(data.users);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Container
        className="py-4"
        style={{
          borderRadius: "8px",
        }}
      >
        <Row>
          {allUser.length > 0 ? (
            allUser.map((user, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                {" "}
                <Link
                  to={`/user/${user.username}`}
                  className="text-decoration-none"
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  <div
                    className="d-flex align-items-center p-3"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <Image
                      src={user.image}
                      roundedCircle
                      width="50"
                      height="50"
                      style={{ objectFit: "cover", marginRight: "15px" }}
                    />

                    {user.username}
                  </div>
                </Link>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center text-muted">No users found</p>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AllUsers;
