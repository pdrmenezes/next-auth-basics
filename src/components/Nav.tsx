import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export async function Nav() {
  const session = await getServerSession(options);
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My Next Auth Website</div>
        <div className="flex gap-10">
          <Link href={"/"}>Home</Link>
          <Link href={"/create-user"}>Create User</Link>
          <Link href={"/private-client"}>Private Client-Rendered</Link>
          <Link href={"/private-server"}>Private Server-Rendered</Link>
          <Link href={"/public"}>Public Page</Link>
        </div>
      </nav>
    </header>
  );
}
