import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./css/create_post.css";

export default function CreatePost() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) {
            navigate('/login');
        }
    }, [])

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/posts", {
                title: title,
                content: content
            },
                {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("jwtToken")
                    }
                })

            if (res.status === 201) {
                navigate('/posts');
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const goBack = () => {
        navigate('/posts');
    }

    return (
        <section>

            <div className="form-box">
                <div className="create-post-container">
                    <button className="back-button" onClick={goBack}>Go Back</button>
                    <h1 className="create-post-heading">Create Post</h1>
                    <form onSubmit={handleForm}>
                        <h2>
                                <input
                                className="create-input"
                                type='text'
                                value={title}
                                onChange={handleTitle}
                                placeholder="Title"
                                required
                            /><br />
                        </h2>
                        <textarea
                            className="create-textarea"
                            rows="18"
                            cols="8"
                            value={content}
                            onChange={handleContent}
                            placeholder="Content"
                            required
                        ></textarea><br />
                        <button className="create-button" type="submit">Post</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
