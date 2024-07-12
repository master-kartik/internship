import { getUserData } from "@/actions/get-user-data";
import Image from "next/image";
import PickupLineGenerator from "../components/PickupLineGenerator";
import Link from "next/link";
export default async function Home() {
  const bgImage = "/assets/background.png";
  const userData = await getUserData();

  if (!userData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 no-global-styles bg-[url('/assets/background.png')] bg-cover  bg-center">
        <div className="absolute text-[38px] top-28 lg:top-6 text-center text-white -ml-6">
          Pickup line <br /> Generator
        </div>
        <Link href={"/auth"}>
          <button className="bg-[#FF2157] px-6 py-4 mt-12 w-[80vw] lg:w-[20vw] rounded-full text-[22px] text-white">
            &#9829; Generate Pickup Lines &#9829;
          </button>
        </Link>
      </main>
    );
  }
  return (
    <main className="bg-[url('/assets/background.png')] bg-cover bg-center ">
      <PickupLineGenerator />
    </main>
  );
}
