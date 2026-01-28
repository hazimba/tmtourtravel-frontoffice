import Image from "next/image";
import HomePage from "./(pages)/page";

export default async function Home() {
  return (
    <div className="">
      <main className="">
        <HomePage />
      </main>
    </div>
  );
}
