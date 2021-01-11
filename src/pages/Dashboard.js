import React, {useState, useEffect} from 'react'
import axios from "axios"
import {useAuth} from "../context/AuthContext"
import UserDetails from "../components/UserDetails";
import PostPreview from "../components/PostPreview"
import {Redirect} from "react-router-dom"
// import jwtDecode from "jwt-decode"
export default function Dashboard() {
    const {token, isAuth} = useAuth()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = token;
        axios.get("http://localhost:4000/posts")
        .then(res => {
            setPosts(res.data.posts)
        })
        .catch(err => {
            setError(err)
        })
    }, [token])
    return isAuth ? (
        <div className="dashboard-wrapper">
            <button>Create a new blog post</button>
            <UserDetails />
            {posts.map(post => <PostPreview setPosts={setPosts} key={post._id} post={post}/>)}
            {error && <span>{error}</span>}
        </div>
    ) : <Redirect to="/login"/>
}
