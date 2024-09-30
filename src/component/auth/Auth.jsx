import React from "react";
import "./auth.css";
import { signInWithGooglePopup } from "../../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useAuthState, useRedirect } from "react-admin";

const Auth = ({ children }) => {
	const { authenticated } = useAuthState();
	const auth = getAuth();
	const redirect = useRedirect();

	const handleSignIn = () => {
		signInWithGooglePopup()
			.then((result) => {
				// User is signed in
				window.location.reload();
				toast.success("Signed in");
			})
			.catch((error) => {
				// Handle errors
				console.error(error);
			});
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				window.location.reload();
				toast.success("Signed out");
				redirect("/");
			})
			.catch((error) => {
				toast.error("Sign out failed: " + error.message);
			});
	};

	return (
		<div>
			{authenticated ? (
				<button onClick={handleSignOut}>{children}</button>
			) : (
				<button onClick={handleSignIn}>{children}</button>
			)}
		</div>
	);
};
export default Auth;
