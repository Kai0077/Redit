import Menubar from "../layouts/Menubar";
import PublicPostList from "../components/posts/PublicPostList.tsx";

export default function HomePage() {
    return (
        <div>
            <Menubar />
            <main className="flex-1 flex justify-center px-4 py-6">
                <div className="w-full max-w-2xl">
                    <PublicPostList />
                </div>
            </main>
        </div>
    );
}
