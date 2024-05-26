import { db } from "./Firebase";
import { onDisconnect, ref, set, get } from "firebase/database";

// write data to db
// info should be a js object or string
export async function writeData(path, info){
    await set(ref(db, path), info);
}

// retrieve data from db
export async function getData(path){
    const snapshot = await get(ref(db, path));
    return snapshot;
}

/*
store info in database at given path when the user disconnect
a reference is pushed onDisconnect Ref
return a reference to the onDisconnect for cancellation
*/
export async function onDisconnectWrite(path, info){
    const onDisconnectRef = onDisconnect(ref(db, path));

    await onDisconnectRef.set(info);
    return onDisconnectRef;
}
