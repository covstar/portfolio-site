import React, { createContext, useContext, useState } from 'react';
const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
    const [leftSide1, setLeftSide1] = useState(false);
    const [leftSide2, setLeftSide2] = useState(false);

    const toggleLeftSide1 = () => setLeftSide1(!leftSide1);
    const toggleLeftSide2 = () => setLeftSide2(prevState => !prevState);

    return (
        <SidebarContext.Provider value={{ leftSide1, leftSide2, toggleLeftSide1, toggleLeftSide2, setLeftSide2 }}>
            {children}
        </SidebarContext.Provider>
    );
};