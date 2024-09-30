import { useEffect, useRef } from "react";
import LeftSideBar from "../sideBar/leftSideBar/LeftSideBar";
import RightSideBar from "../sideBar/rightSideBar/RightSideBar";
import { useSidebar } from "../context/SidebarContext";
import AppBar from "../appBar/AppBar";

export const Layout = ({ children }) => {
	const {
		leftSide1,
		leftSide2,
		setLeftSide2,
		toggleLeftSide2,
		toggleLeftSide1,
	} = useSidebar();
	const slideRef = useRef(null); // Create a reference to the Slide component

	useEffect(() => {
		// Function to handle click outside the Slide component
		const handleClickOutside = (event) => {
			if (slideRef.current && !slideRef.current.contains(event.target)) {
				setLeftSide2(false); // Toggle off leftSide2 if the click is outside
			}
		};

		// Add the event listener when the component mounts
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup the event listener when the component unmounts
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setLeftSide2]);

	return (
		<>
			<div className="main_layout">
				<AppBar
					toggleLeftSide1={toggleLeftSide1}
					toggleLeftSide2={toggleLeftSide2}
				/>

				<div className="main__container">
					<LeftSideBar
						leftSide1={leftSide1}
						leftSide2={leftSide2}
						setLeftSide2={setLeftSide2}
						slideRef={slideRef}
					/>
					<div className="middle__container">
						<div
							className={`${
								leftSide2
									? "tablet:hidden laptop:hidden fixed h-screen left-0 right-0 w-full top-0 bg-black bg-opacity-50 z-[100]"
									: ""
							}`}
						/>
						{children}
					</div>
					<RightSideBar />
				</div>
			</div>
		</>
	);
};
