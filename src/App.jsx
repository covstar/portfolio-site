import React, { useState } from "react";
import { authProvider, dataProvider } from "./firebase/config";
import { Admin, CustomRoutes, useAuthState } from "react-admin";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { About, AdminPage, Agencies, Contact, Home, Projects, Services } from "./pages";
import { ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Footer, SidebarProvider, theme } from "./component";

function App() {
  // Appbar toggle

 
  // Appbar toggle



  return (
    <>
      <SidebarProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
          transition={Zoom}
        />
        <BrowserRouter>
        
          <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            theme={theme}
          >

            <CustomRoutes noLayout>
              <Route path="/" element={<Home />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/services' element={<Services />} />
              <Route path='/agencies' element={<Agencies />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
             
              <Route path="/admin" element={<AdminPage />} />
              
              <Route path="*" element={<Navigate to="/" />} />

            </CustomRoutes>


          </Admin>
        </BrowserRouter>
      </SidebarProvider>
    </>
  );
};

export default App;
