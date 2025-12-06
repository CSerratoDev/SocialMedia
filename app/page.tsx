import PostCards from "./Components/Post/PostCards";

export default function Home() {

  return (
    <div className="h-auto w-full p-4 bg-zinc-200">
      <h2 className="font-bold text-lg text-center">Christian Alexis Serrato Guerrero</h2>
      <div className="p-4 gap-2 w-full justify-items-center ">
        <PostCards/>
      </div>
    </div>
  );
}
