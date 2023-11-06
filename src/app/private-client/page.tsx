"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/private-client");
    },
  });
  return (
    <>
      <h1>Private Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </>
  );
}
