import Link from "next/link";
import Button from "@/components/UI/Button";
import { auth } from "@/auth";

export default async function AuthHeader() {
  const session = await auth();

  const isAuthenticated = !!session;

  return (
    <div className="flex gap-2 absolute right-0 top-0 p-4">
      {isAuthenticated ? (
        <Link href="/api/auth/signout">
          <Button title="Logout" style="white" />
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <Button title="Login" style="white" />
        </Link>
      )}
    </div>
  );
}
