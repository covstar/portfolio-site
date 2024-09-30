import React from "react";
import "./admin.css";
import { ContentCreation, Layout } from "../../component";
import { useAuthState, useRedirect } from "react-admin";

const AdminPage = () => {
	const { isLoading, authenticated } = useAuthState();
	const redirect = useRedirect();

	if (authenticated) {
		return (
			<Layout>
				<div className="admin_container">
					<ContentCreation />
				</div>
			</Layout>
		);
	}
	return redirect("/");
};

export default AdminPage;
