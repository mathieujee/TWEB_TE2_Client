import React from 'react';
import { MDBBtn } from 'mdbreact';

import { AuthContext } from './AuthProvider';

export const HomePage = () => {   
    return (
        <AuthContext>
            {({ signOut }) => {
                return (
                    <div>
                        <h4>Hello</h4>

                        <MDBBtn
                            color="light-blue"
                            className="mb-3"
                            onClick={signOut}>
                            Logout
                        </MDBBtn>
                    </div>
                );
            }}
        </AuthContext>
    );
}