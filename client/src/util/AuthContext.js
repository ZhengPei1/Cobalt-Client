import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { getData } from "./DBOperations";

export const AuthContext = createContext();

// provides user object to all pages
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
              console.log("DNE")
            }
          }).catch(error => {
            console.log(error);;
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
  const defaultPanel1 = {
    "ticker": "AAPL",
    "start": "2024-04-01",
    "end": "2024-05-01",
    "interval": "1d"
  };

  const defaultPanel2 = {
    "ticker": "MSFT",
    "start": "2000-01-01",
    "end": "2020-01-01",
    "interval": "3mo"
}

  const validatedInfo = {
    panel1: info.panel1 != undefined ? info.panel1 : defaultPanel1,
    panel2: info.panel2 != undefined ? info.panel2 : defaultPanel2,
    balance: info.balance != undefined? info.balance : 10000,
    commission: info.commission != undefined? info.commission : 1,
  }

  return validatedInfo;
}