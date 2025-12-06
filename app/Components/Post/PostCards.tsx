"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

interface Post {
    id: number;
    title: string;
}

const posts_per_page = 20;

export default function PostCards(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadPosts(currentPage);
    }, [currentPage]);

    const loadPosts = async (page : number) => {
        setIsLoading(true);
        try {    
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${posts_per_page}`);
                
            if(!response.ok) throw new Error('Error in fetch posts');

            const data = await response.json();

            setPosts(data);
        } catch (error) {
            console.error(`Error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const loadNextPage = () => {
        if(isLoading) return;
        setCurrentPage(prev => prev + 1);
    };

    const loadPreviousPage = () => {
        if (isLoading || currentPage <= 1) return;
        setCurrentPage(prev => prev - 1);
    };

    const viewPost = (id: number) => {
        router.push(`/post/${id}`);
    }

    return (
        <>  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" draggable={false}>
            {posts.map(item => (
                <div 
                    key={item.id} 
                    onClick={()=> viewPost(item.id)}
                    className="select-none cursor-pointer hover:shadow-lg hover:bg-[#252525] hover:text-white transition  relative p-4 w-auto h-[150px] md:w-[300px] md:h-[150px] bg-white text-[#252525] rounded-lg"
                >
                    <p className="font-bold text-lg">Title:</p>
                    <p className="font-light text-md">{item.title}</p>
                    <div className="absolute bottom-2 right-4">
                        <p className="text-end font-bold">Id: {item.id}</p>
                    </div>
                </div>
            ))}
            </div>
            <div className="select-none flex gap-4 justify-center w-full mt-4">
                <button 
                    type="button" 
                    className="bg-[#252525] text-white p-2 rounded-md"
                    onClick={loadPreviousPage}
                    disabled={currentPage === 1 || isLoading}
                >
                    Previous
                </button>

                <button 
                    type="button" 
                    className="bg-[#252525] text-white p-2 rounded-md"
                    onClick={loadNextPage}
                    disabled={currentPage === 5}
                >
                    Next
                </button>
            </div>
        </>
    )
}