import React, { Component } from 'react';
import axios from 'axios';

const { Provider: AuthContextProvider, Consumer: AuthContext } = React.createContext();

class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
            signIn: this.signIn,
            signOut: this.signOut
        };
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        if(token) {
            axios.get('/api/me', {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            .then(res => {
                const { user } = res.data;
                this.setState({ user });
            })
            .catch(err => {
                console.error(err);
                localStorage.removeItem('token');
            });
        }
    }

    signIn = ({ username, password }) => {
        axios.post('/auth/login', { username, password })
            .then(response => {
                const { user, token } = response.data;
                window.localStorage.setItem('token', token);
                this.setState({ user });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error: 'Invalid email or password' });
            })
    }

    signOut() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    render() {
        const { children } = this.props;

        // value = all values given to children
        return (
            <AuthContextProvider value={this.state}>
                {children}
            </AuthContextProvider>
        );
    }
}

export { AuthContext };
export default AuthProvider;