import { useState } from "react";
import UserContext from "./userContext.js"


const UserState = (props) => {
    const host = "http://localhost:5000";
    const [userName,setUserName]=useState("");
    const fetchuser = async () => {

        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
        }); 
        const json=await response.json();
        setUserName(json.name)
      }
      fetchuser();
    return (
        <UserContext.Provider value={{userName}}>
        {props.children}
        </UserContext.Provider>
    )
}

export default UserState