"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
	title: string;
	content: string;
	contentType: string;
	image: File | null;
}

const PostForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		title: "",
		content: "",
		contentType: "",
		image: null,
	});

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const image = event.target.files[0];
			setFormData({ ...formData, image });
		}
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const postData = new FormData();
		postData.append("title", formData.title);
		postData.append("content", formData.content);
		postData.append("content_type", formData.contentType);
		if (formData.image) {
			postData.append("image_name", formData.image);
		}

		try {
			await axios.post("http://localhost:8000/api/posts/create", postData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			// Reset the form after successful submission
			setFormData({
				title: "",
				content: "",
				contentType: "",
				image: null,
			});
		} catch (error) {
			console.error("Error posting data:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-screen-sm mx-auto bg-blue-100 p-10 rounded-lg mt-20 space-y-3"
		>
			<div className="flex flex-col md:flex-row ">
				<label className="flex-1">Title:</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleInputChange}
					className="w-full md:w-3/4"
				/>
			</div>
			<div className="flex flex-col md:flex-row ">
				<label className="flex-1">Content:</label>
				<textarea
					name="content"
					value={formData.content}
					onChange={handleInputChange}
					className="w-full md:w-3/4"
				/>
			</div>
			<div className="flex flex-col md:flex-row ">
				<label className="flex-1">Content Type:</label>
				<input
					type="text"
					name="contentType"
					value={formData.contentType}
					onChange={handleInputChange}
					className="w-full md:w-3/4"
				/>
			</div>
			<div className="flex flex-col md:flex-row ">
				<label className="flex-1">Image:</label>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="w-full md:w-3/4"
				/>
			</div>
			<div className="flex items-center justify-end gap-3">
				<button type="submit" className="bg-green-400 px-4 py-2 rounded-md">
					Submit
				</button>
			</div>
		</form>
	);
};

export default PostForm;
