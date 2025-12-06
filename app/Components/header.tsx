import Link from "next/link"

export default function Header() {
    return (
        <>
            <header className="select-none bg-[#252525] p-4 flex justify-center">
                <Link href="/" className="hover:text-green-200 font-bold text-2xl text-white" draggable={false}>Posts</Link>
            </header>        
        </>
    )
}