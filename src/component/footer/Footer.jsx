import React from 'react';
import './footer.css';
import { signInWithGooglePopup } from '../../firebase/config';
import AttributionIcon from '@mui/icons-material/Attribution';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuthState, useRedirect, useRefresh } from 'react-admin';

const Footer = () => {
  return (
    <>
      <div className='text-[#ededed] bg-[#171717] px-[1rem] py-[2rem] rounded-t-md drop-shadow-lg '>

        <div>Footer</div>

      </div>
    </>
  )
}

export default Footer

export const SignIn = () => {
  const { authenticated } = useAuthState();
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

  return (
    <div className='fixed top-0 ml-3 px-[8px] py-[8px]'>
      {authenticated ?
        (
          <SignOut />
        )
        :
        (
          <button onClick={handleSignIn}>
            <AttributionIcon />
          </button>
        )
      }



    </div>
  );
};

const SignOut = () => {
  const auth = getAuth();
  const redirect = useRedirect();


  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.reload();
      toast.success("Signed out");
      redirect("/");
    }).catch((error) => {
      toast.error("Sign out failed: " + error.message);
    });
  };
  return (
    <>
      <button onClick={handleSignOut}>
        <ExitToAppIcon />
      </button>
    </>
  )
};