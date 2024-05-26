import { db } from "./Firebase";
import { onDisconnect, ref, set } from "firebase/database";

// info should be a js object or string
export async function writeData(path, info){
    await set(ref(db, path), info);
}

// retrieve data needed to initialize the web app
export function getInitialData(uid){

}

// store info in database when the user disconnect
// return a reference to the onDisconnectRef
export function onDisconnectWrite(path, info){
    const onDisconnectRef = onDisconnect(ref(db, path));
    onDisconnectRef.set(info);
    return onDisconnectRef;
}
