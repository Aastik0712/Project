import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./css/posts.css";

export default function Viewport() {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [errorType, setErrorType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) {
            navigate('/login');
        } else {
            (async () => {
                try {
                    const response = await axios.get("http://localhost:3001/posts", {
                        headers: {
                            authorization: "Bearer " + localStorage.getItem("jwtToken")
                        }
                    });
                    setApiData(response.data);
                    setLoading(false);
                } catch (error) {
                    setErrorType(error.message);
                    setApiError(true);
                }
            })();
        }
    }, []);

    const createPost = () => {
        navigate('/create_post');
    }

    const viewPost = (postId) => {
        navigate(`/posts/${postId}`);
    }

    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload(); // Reloading the page to ensure proper logout
    }

    if (apiError) {
        return (
            <div>
                <h1>{errorType}</h1>
            </div>
        );
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    const displayData = apiData.map((data) => (
        <div className="post" key={data.id} onClick={() => viewPost(data._id)}>
            <p>Title: {data.title}</p>
            <p>Posted By: {data.username}</p>
        </div>
    ));

    return (
        <section>
            <div className="form-box">
                <div className="post-container">
                    <h2 className="post-heading">Posts</h2>
                    <div className="empty_div"></div>
                    <div className="posts">{displayData}</div>
                    <div className="buttons">
                        <button className="create-post-button" onClick={createPost}>Create Post</button>&nbsp;
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
