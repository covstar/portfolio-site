import React from 'react'
import './appBar.css';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton } from '@mui/material';
import { useSidebar } from '../context/SidebarContext';
import { useLocation } from 'react-router-dom';

const AppBar = () => {
    const { toggleLeftSide1, toggleLeftSide2 } = useSidebar();

    const location = useLocation();
    const Title = `${location.pathname.split("/")[1]}`

    return (
        <>
            <div className='appbar__container'>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >

                    <div className='mobile:hidden'>
                        <MenuIcon onClick={toggleLeftSide1} sx={{ color: '#fff', fontSize: '30px', cursor: 'pointer' }} />

                    </div>
                    <div className='tablet:hidden laptop:hidden'>
                        <MenuIcon onClick={toggleLeftSide2} sx={{ color: '#fff', fontSize: '30px', cursor: 'pointer' }} />

                    </div>
                </IconButton>

                <div className='capitalize font-[900] text-[18px] font-Antonio drop-shadow-md text-[#EDEDED] '>{Title}</div>


                <div>
                    <ul className='user__profile'>
                        <li>
                            <Avatar
                                sx={{
                                    width: '30px', height: '30px'
                                }}
                            >
                                <img src='https://lh3.googleusercontent.com/a/ACg8ocI5lIfwan-2-xwMkpQeiTxVdi3VU_o7g8VkssEOxwRbAEkuKA=s96-c' />
                            </Avatar>

                        </li>
                        {/* <li>User</li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AppBar