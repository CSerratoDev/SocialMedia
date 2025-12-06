import CommentsSide from "@/app/Components/Post/CommentsPage";
import { notFound } from "next/navigation";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function getPost(id: string) : Promise<Post|null> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    
    if(!response.ok) return null;

    return response.json();
}

export default async function PostPage(props : {params: Promise<{id: string}>}){
    const {id} = await props.params;
    const post = await getPost(id);
    if(!post) return notFound();

    return (
        <div className="w-full h-full grid grid-cols-2">
            <div className="h-auto p-4 bg-zinc-100 m-4">
                <div className="flex gap-2 items-center pb-2">
                    <h1 className="font-bold text-3xl">Post</h1>
                    <p className="font-extralight text-2xl">Id: {post.id}</p>
                </div>
                    <h2 className="font-semibold text-xl">User: {post.userId}</h2>
                    <h3 className="font-semibold text-lg underline">Title: {post.title}</h3>
                    <p className="font-light text-md m-2 bg-zinc-200 p-4">{post.body}</p>
            </div>
            <div className="h-auto p-4 bg-zinc-400 text-[#252525]">
                <div className="flex gap-2 items-center pb-2">
                    <h1 className="font-bold text-3xl">Comments</h1>
                </div>
                <CommentsSide id={id}/>
            </div>
        </div>
    )
}