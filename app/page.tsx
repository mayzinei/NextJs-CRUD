import axios from "axios";
import Image from "next/image";

export default async function Home() {
	const { data: response } = await axios.get(
		"http://127.0.0.1:8000/api/posts"
	);

	return (
		<div className="p-10 flex flex-col items-center">
			<h1 className="text-4xl font-bold text-center mb-12">My Cards</h1>
			<div className="grid grid-col-1 md:grid-col-2 lg:grid-cols-3  gap-10">
				{response.data.map((card: any) => (
					<div key={card.id} className="card w-96 bg-base-100 shadow-xl">
						<figure>
							<img src={card.image_name} alt="" />
						</figure>
						<div className="card-body">
							<h2 className="card-title">{card.title}</h2>
							<p>{card.content}</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary">Buy Now</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
