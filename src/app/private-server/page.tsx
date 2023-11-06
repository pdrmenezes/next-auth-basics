import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function PrivateClientPage() {
  const session = await getServerSession(options);

  if (!session) redirect("api/auth/signin?callbackUrl=/private-server");

  return (
    <>
      <h1>Private Client Session</h1>
      <p>{session.user?.email}</p>
      <p>{session.user?.role}</p>
    </>
  );
}
