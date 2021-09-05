import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Cover from "../components/cover";
import { Link} from "react-router-dom";
import Footer from "../components/footer";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    }
    fetchData();
  }, []);

  let recentPost = [];

  for (let i = 0; i < posts.length; i++) {
    recentPost.push(posts[i]);
  }

  return (
    <div>
      <Cover />
      <section className="blog-listing gray-bg">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 m-15px-tb">
              <div className="row">
                {posts.reverse().map((p) => (
                  <div className="col-sm-6" key={p._id}>
                    <div className="blog-grid">
                      <div className="blog-img">
                        <div className="date">
                          <span>{moment(p.createdAt).format("DD")}</span>
                          <label>{moment(p.createdAt).format("MMM")}</label>
                        </div>
                        <Link to={`/posts/${p._id}`}>
                          <img
                            src="https://bit.ly/2Vb3CW1"
                            title=""
                            alt="default_image"
                          />
                        </Link>
                      </div>
                      <div className="blog-info">
                        <h5>
                          <Link to={`/posts/${p._id}`}>{p.title}</Link>
                        </h5>
                        <p>{p.description}</p>
                        <div className="btn-bar">
                          <Link to={`/posts/${p._id}`} className="px-btn-arrow">
                            <span>Read More</span>
                            <i className="arrow"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
      </section>
      <Footer />
    </div>
  );
}
