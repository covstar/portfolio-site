import React, { forwardRef } from "react";
import "./leftSide.css";
import { Slide, useMediaQuery, useTheme } from "@mui/material";
import { Menu, useGetIdentity } from "react-admin";
import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import WorkIcon from "@mui/icons-material/Work";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import PersonIcon from "@mui/icons-material/Person";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import SettingsIcon from "@mui/icons-material/Settings";

const LeftSideBar = forwardRef(
	({ leftSide1, leftSide2, slideRef, setLeftSide2 }, ref) => {
	
		const { data } = useGetIdentity();
		const userId = import.meta.env.VITE_USER_ID;

		function toggleOffMenu() {
			setLeftSide2(false);
		}
		return (
			<>
				<div
					className={
						leftSide1
							? "tablet:w-[60px] laptop:w-[60px] bg-[#EDEDED] min-h-screen pt-[5rem] overflow-hidden mobile:hidden relative"
							: "left__sideBar"
					}
				>
					<Menu.Item to="/" primaryText="Home" leftIcon={<HomeIcon />} />
					<Menu.Item
						to="/projects"
						primaryText="Projects"
						leftIcon={<WorkIcon />}
					/>
					<Menu.Item
						to="/services"
						primaryText="Services"
						leftIcon={<HandymanIcon />}
					/>
					<Menu.Item
						to="/agencies"
						primaryText="Agencies"
						leftIcon={<TypeSpecimenIcon />}
					/>
					<Menu.Item
						to="/about"
						primaryText="About"
						leftIcon={<PersonIcon />}
					/>
					<Menu.Item
						to="/contact"
						primaryText="Contact"
						leftIcon={<PermPhoneMsgIcon />}
					/>
					{userId === data?.id && (
						<Menu.Item
							to="/admin"
							primaryText="Admin"
							leftIcon={<SettingsIcon />}
						/>
					)}
				</div>

				<div ref={slideRef}>
					<Slide in={leftSide2} direction="right" timeout={500}>
						<div
							ref={ref}
							className={`${
								leftSide2
									? " tablet:hidden laptop:hidden left__sideBar_4_mobile"
									: "left__sideBar_4_mobile"
							} `}
						>
							<Menu.Item
								to="/"
								primaryText="Home"
								leftIcon={<HomeIcon />}
								onClick={toggleOffMenu}
							/>
							<Menu.Item
								to="/projects"
								primaryText="Projects"
								leftIcon={<WorkIcon />}
								onClick={toggleOffMenu}
							/>
							<Menu.Item
								to="/services"
								primaryText="Services"
								leftIcon={<HandymanIcon />}
								onClick={toggleOffMenu}
							/>
							<Menu.Item
								to="/agencies"
								primaryText="Agencies"
								leftIcon={<TypeSpecimenIcon />}
								onClick={toggleOffMenu}
							/>
							<Menu.Item
								to="/about"
								primaryText="About"
								leftIcon={<PersonIcon />}
								onClick={toggleOffMenu}
							/>
							<Menu.Item
								to="/contact"
								primaryText="Contact"
								leftIcon={<PermPhoneMsgIcon />}
								onClick={toggleOffMenu}
							/>
							{userId === data?.id && (
								<Menu.Item
									to="/admin"
									primaryText="Admin"
									leftIcon={<SettingsIcon />}
									onClick={toggleOffMenu}
								/>
							)}
						</div>
					</Slide>
				</div>
			</>
		);
	}
);

export default LeftSideBar;
