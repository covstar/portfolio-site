import React from "react";
import "./appBar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, IconButton } from "@mui/material";
import { useSidebar } from "../context/SidebarContext";
import { useLocation } from "react-router-dom";
import Auth from "../auth/Auth";
import { useAuthState, useGetIdentity } from "react-admin";

const AppBar = () => {
	const { toggleLeftSide1, toggleLeftSide2 } = useSidebar();
	const location = useLocation();
	const Title = `${location.pathname.split("/")[1]}`;
    const { authenticated } = useAuthState();
    
	return (
		<>
			<div className="appbar__container">
				<IconButton edge="start" color="inherit" aria-label="menu">
					<div className="mobile:hidden">
						<MenuIcon
							onClick={toggleLeftSide1}
							sx={{ color: "#fff", fontSize: "30px", cursor: "pointer" }}
						/>
					</div>
					<div className="tablet:hidden laptop:hidden">
						<MenuIcon
							onClick={toggleLeftSide2}
							sx={{ color: "#fff", fontSize: "30px", cursor: "pointer" }}
						/>
					</div>
				</IconButton>

				<div className="capitalize font-[900] text-[18px] font-Antonio drop-shadow-md text-[#EDEDED] ">
					{Title}
				</div>

				<div>
					<ul className="user__profile ">
						<li>
							<Auth>
								<Avatar
									sx={{
										width: "35px",
										height: "35px",
									}}
									className={`${authenticated ? "border-green-500" : ""} border-2 rounded-full`}
								>
									<img
										src="https://res.cloudinary.com/denegqmjp/image/upload/v1726137499/images/i5ndayhlx2gpibj1i8ds.jpg"
										alt="covstar"
									/>
								</Avatar>
							</Auth>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default AppBar;
