import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { getData, writeData } from "./DBOperations";
import { DEFAULT_USER_STOCK_PANEL1, DEFAULT_USER_STOCK_PANEL2, DEFAULT_USER_WATCHLIST, DEFAULT_COMMISSION, DEFAULT_USER_BALANCE } from "@/constant";

export const AuthContext = createContext();

/*
Initializes user info and send to all the child components through useContext
also contains default values for initialization
*/
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userinfo, setUserinfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && userinfo) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user, userinfo])

  useEffect(() => {
    // observe change
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // set user and load data to initialize user
        setUser(currentUser);

        getData("users/" + currentUser.uid)
          .then(snapshot => {
            if (snapshot.exists()) {
              setUserinfo(validateUserInfo(snapshot.val()));
            } else {
              // if user doesn't exist then create the user entry
              console.log(snapshot.val())

              writeData("users/" + currentUser.uid, { email: currentUser.email });
              setUserinfo(validateUserInfo({}));
            }
          }).catch(error => {
            console.log(error);
          });

      } else {
        setUser(null);
        setUserinfo(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={[user, userinfo, loading, setLoading]}>
      {children}
    </AuthContext.Provider>
  );
};


/*
If a property of user info is null (will happen to new users)
Then fill it with default value
*/
function validateUserInfo(info) {
  const validatedInfo = {
    panel1: info.panel1 != undefined ? info.panel1 : DEFAULT_USER_STOCK_PANEL1,
    panel2: info.panel2 != undefined ? info.panel2 : DEFAULT_USER_STOCK_PANEL2,
    balance: info.balance != undefined ? info.balance : DEFAULT_USER_BALANCE,
    commission: info.commission != undefined ? info.commission : DEFAULT_COMMISSION,
    watchlist: info.watchlist != undefined ? info.watchlist : DEFAULT_USER_WATCHLIST,
  }

  return validatedInfo;
}