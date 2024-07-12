import React from 'react'
import './admin.css';
import { ContentCreation, Layout } from '../../component'
import { useAuthState, useRedirect } from 'react-admin';

const AdminPage = () => {

    const { isLoading, authenticated } = useAuthState();
    const redirect = useRedirect();

    if (authenticated) {
        return (
            <Layout>

                <div className='admin_container'>
                    <div className='admin_text'>
                        <h2>Showcase Your Masterpiece: Upload a Project to Elevate Your Portfolio</h2>
                    </div>
                    <ContentCreation />

                </div>

            </Layout>
        )
    }
    return redirect('/');
};

export default AdminPage