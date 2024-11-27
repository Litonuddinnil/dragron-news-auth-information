import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
 //first of all create a context
 export const AuthContext = createContext();
 const auth = getAuth(app);

 const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    // console.log(location);
    // console.log(user);
    // first create a sing up
    const createNewUserData = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    };
    //third work
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    };
    //four work sing in

    const singInUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    };

    const updateUserProfile = (updateData)=>{
        return updateProfile(auth.currentUser,updateData);
    }
    const authInfo ={
        user,
        setUser,
        createNewUserData,
        logOut,
        singInUser,
        loading,
        updateUserProfile
    }
    //user haraiya jathe nh jai sei jonno .seconde work
    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>{
            unSubscribe();
        };
    },[])
    return (
         <AuthContext.Provider value={authInfo}>
            {children}
         </AuthContext.Provider>
    );
 };
 AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children is a valid React node
};
 export default AuthProvider;