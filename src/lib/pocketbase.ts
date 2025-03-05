import PocketBase from "pocketbase";

export async function initPocketBase(token?: string) {
    const pb = new PocketBase(process.env.SERVICE_FQDN_POCKETBASE);

    if (token) {
        pb.authStore.save(token);
    }

    return pb;
}