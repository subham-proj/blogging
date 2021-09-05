import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Context } from "../context/context";

import { Form, Button } from "react-bootstrap";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get( "/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    }
    fetchData();
  }, [path]);

  // console.log(post.username);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/posts");
      setTemp(res.data);
    }
    fetchData();
  }, []);

  let recentPost = [];
  for (let i = 0; i < temp.length && i < 5; i++) {
    recentPost.push(temp[i]);
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${path}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${path}`, {
        username: user.username,
        title: title,
        description: description,
      });
      window.location.reload();
    } catch (err) {}
  };
  // console.log(recentPost);
  return (
    <div>
      <div className="blog-single gray-bg">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 m-15px-tb">
              <article className="article">
                <div className="article-title">
                  {updateMode ? (
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        size="lg"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>
                  ) : (
                    <h2 style={{ textAlign: "center" }}>{post.title}</h2>
                  )}

                  <div className="media">
                    <div className="avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        title=""
                        alt=""
                      />
                    </div>
                    <div className="media-body">
                      <label>
                        <Link to={`/?user=${post.username}`}>
                          {" "}
                          {post.username}
                        </Link>
                      </label>
                    </div>
                    {user
                      ? post.username === user.username && (
                          <div className="media_icons">
                            <Link style={{ paddingRight: "10px" }}>
                              <FiEdit onClick={() => setUpdateMode(true)} />
                            </Link>
                            <Link style={{ paddingRight: "20px" }}>
                              <AiFillDelete onClick={handleDelete} />
                            </Link>
                          </div>
                        )
                      : ""}
                  </div>
                </div>
                <div className="article-content">
                  {updateMode ? (
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        as="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  ) : (
                    <p>{post.description}</p>
                  )}
                </div>
                {updateMode ? (
                  <Button
                    style={{ float: "right" }}
                    onClick={handleUpdate}
                    variant="primary"
                    size="md"
                  >
                    Save
                  </Button>
                ) : (
                  ""
                )}
              </article>
            </div>
            <div className="col-lg-4 m-15px-tb blog-aside">
              <div className="widget widget-latest-post">
                <div className="widget-title">
                  <h3>Recent Post</h3>
                </div>
                <div className="widget-body">
                  <div className="latest-post-aside media">
                    <div className="lpa-left media-body">
                      <div className="lpa-title">
                        {recentPost.reverse().map((r) => (
                          <h5 key={r._id} style={{ padding: "10px" }}>
                            <Link to={`/posts/${r._id}`}>{r.title}</Link>
                          </h5>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
