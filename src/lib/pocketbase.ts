import PocketBase from "pocketbase";
import { AuthRecord } from "pocketbase";

interface AuthStoreDump {
    token: string;
    record: AuthRecord;
}

export async function initPocketBase(authStore?: AuthStoreDump) {
    const pb = new PocketBase(process.env.POCKETBASE_URL);

    if (authStore) {
        pb.authStore.save(authStore?.token, authStore?.record);
    }

    return pb;
}