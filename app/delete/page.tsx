"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
	id: number;
	title: string;
}

const PostsList = () => {
	// const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [deleteId, setDeleteId] = useState<number | null>(null); // State for the user input id

	const fetchPosts = async () => {
		try {
			const response = await axios.get<Post[]>(
				"http://127.0.0.1:8000/api/posts"
			);
			// setPosts(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching posts:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleDelete = async () => {
		if (deleteId === null) {
			return;
		}

		try {
			const response = await axios.delete(
				`http://127.0.0.1:8000/api/posts/delete/${deleteId}`
			);
			// setPosts((prevPosts) =>
			// 	prevPosts.filter((post) => post.id !== deleteId)
			// );
			console.log(response.data);
			setDeleteId(null); // Clear the input field after successful deletion
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="max-w-screen-md mx-auto flex flex-col items-center gap-5 mt-20 bg-blue-200 p-20 rounded-lg">
			<h1 className="text-4xl font-bold">Delete Posts</h1>
			<input
				type="number"
				placeholder="Enter ID to delete"
				value={deleteId || ""}
				onChange={(e) =>
					setDeleteId(e.target.value ? parseInt(e.target.value, 10) : null)
				}
			/>
			<button
				onClick={handleDelete}
				className="bg-red-400 px-4 py-2 rounded-md"
			>
				Delete
			</button>
			<ul>
				{/* {posts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))} */}
			</ul>
		</div>
	);
};

export default PostsList;
