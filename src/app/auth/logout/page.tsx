import Link from "next/link";

export default function Logout() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="font-roboto w-md text-center bg-white p-8 rounded shadow border-1 border-gray-600">
                You have been logged out. <Link className="text-primary" href="/auth/login">Log in again</Link>
            </div>
        </div>
    );
}
