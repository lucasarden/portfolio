import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col p-24">
        <h1 className="text-4xl font-bold">Welcome to my portfolio!</h1>
        <p className="mt-4 text-lg">
          This is a simple portfolio site built with Next.js.
        </p>
      </main>
    </>
  );
}
