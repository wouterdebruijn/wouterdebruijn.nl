"use server";

import { initPocketBase } from "@/lib/pocketbase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientResponseError } from "pocketbase";

async function authenticate(username: string, password: string) {
    try {
        const pb = await initPocketBase();
        const cookieStore = await cookies();
        await pb.collection("users").authWithPassword(username, password);
        cookieStore.set("pb_auth", pb.authStore.token);
    } catch (e) {
        if (e instanceof ClientResponseError) {
            return [false, e.response.message];
        }

        return [false, "An unknown error occurred"];
    }

    return [true, ""];
}

export async function signIn(prevState: unknown, formData: FormData) {
    "use server";

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
        return { error: "Please fill in all fields" };
    }

    const [success, error] = await authenticate(username, password);

    if (!success) {
        return { error };
    }

    redirect("/");
}

export async function signOut() {
    "use server";

    const pb = await initPocketBase();
    pb.authStore.clear();
    const cookieStore = await cookies();
    cookieStore.delete("pb_auth");

    redirect("/auth/logout");
}