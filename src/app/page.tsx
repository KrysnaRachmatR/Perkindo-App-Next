import Image from "next/image";
import Navbar from "@/components/organisms/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-4x1 font-bold">Welcome to My Website</h1>
        <p className="mt-4">This is the home page.</p>
      </main>
    </div>
  );
};
