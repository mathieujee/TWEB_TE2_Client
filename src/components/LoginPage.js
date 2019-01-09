import React, { Component } from 'react';
import { AuthContext } from './AuthProvider';
import { Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBIcon, MDBBtn } from 'mdbreact';

export class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {

        const username = this.state.username;
        const password = this.state.password;

        return (
            <AuthContext>
                {({ error, user, signIn }) => {
                    if(user) {
                        return <Redirect to="/" />
                    }

                    const onSubmit = (e) => {
                        e.preventDefault();
                        signIn({ username, password });
                    };
                
                    return(
                        <MDBRow style={{ display: 'flex', justifyContent: 'center' }}>
                            <MDBCol md="4">
                                <MDBCard style={{ marginTop: '20%' }}>
                                    <MDBCardBody>
                                        <MDBCardHeader className="form-header deep-blue-gradient rounded">
                                            <h3 className="my-3">
                                                <MDBIcon icon="lock" /> Login:
                                            </h3>
                                        </MDBCardHeader>

                                        <form onSubmit={onSubmit}>
                                        <div className="grey-text" style={{ textAlign: 'left' }}>
                                            <MDBInput 
                                                label="Enter your username"
                                                icon="user"
                                                group
                                                type="text"
                                                validate
                                                autoFocus   
                                                value={this.state.username}
                                                onChange={this.handleUsernameChange} />
                                            <MDBInput
                                                label="Type your password"
                                                icon="lock"
                                                group
                                                type="password"
                                                validate
                                                value={this.state.password}
                                                onChange={this.handlePasswordChange} />
                                        </div>
                                        <div className="text-center mt-4">
                                            <MDBBtn
                                                color="light-blue"
                                                className="mb-3"
                                                type="submit">Login</MDBBtn>
                                        </div>
                                        </form>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    );
                }}
            </AuthContext>
        );
    }
}