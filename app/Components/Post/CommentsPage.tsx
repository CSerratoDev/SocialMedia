import { notFound } from "next/navigation";

interface Comments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

async function getComment(id: string) : Promise<Comments[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

    if(!response.ok) return [];

    return response.json();
}

export default async function CommentsSide({id}: {id : string}){
    const comments = await getComment(id);
    if(!comments) return notFound();

    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            {comments.map((c) => (
                <div key={c.id} className="p-3 bg-gray-100 h-auto rounded-md">
                    <div className="grid grid-cols-2 text-start">
                        <p className="font-bold text-md">{c.name}</p>
                        <p className="text-end font-extralight text-sm">Id: {c.id}</p>
                    </div>
                    <p className="text-sm font-semibold mb-4">{c.email}</p>
                    <div className="p-2 text-start bg-zinc-200">
                        <p className="mt-2 font-light">{c.body}</p>    
                    </div>
                </div>
            ))}
        </div>
    )
}