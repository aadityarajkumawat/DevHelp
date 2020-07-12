import React, { useState, useEffect, Fragment } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
import { removeNav } from '../../actions/navAction';

// Assets import
import auth from '../../assets/auth.jpg';
import Alert from '../alerts/Alert';

const Login = ({
    auth: { isAuthenticated },
    login,
    alert,
    removeNav,
    history,
}) => {
    useEffect(() => {
        removeNav();

        // eslint-disable-next-line
    }, []);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const { email, password } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        login(user);
    };

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
            setLoading(false);
        }
        setLoading(false);

        // eslint-disable-next-line
    }, [isAuthenticated, history, alert.length]);

    return (
        <Fragment>
            <div className='d-flex flex-column align-items-center justify-content-start left'>
                <div className='top text-center'>
                    <h1>Welcome to DevHelp</h1>
                    <p>
                        DevHelp has a pool of highly experienced developers in
                        their respective tech stacks
                    </p>
                    <h2>Login</h2>
                </div>
                <Alert />
                <form
                    className='d-flex flex-column align-items-center justify-content-start sign-up-form'
                    onSubmit={onSubmit}>
                    <div className='d-flex flex-row name-inp'>
                        <span className='d-flex justify-content-center align-items-center user-cont'>
                            <i className='fas fa-envelope'></i>
                        </span>
                        <input
                            type='email'
                            className='name-inp-cls'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='d-flex flex-row name-inp'>
                        <span className='d-flex justify-content-center align-items-center user-cont'>
                            <i className='fas fa-lock'></i>
                        </span>
                        <input
                            type='password'
                            className='name-inp-cls'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <button className='btn btn-dark' type='submit'>
                        {loading && alert.length === 0 && (
                            <span
                                className='spinner-border spinner-border-sm'
                                aria-hidden='true'></span>
                        )}

                        <span>
                            {loading && alert.length === 0 ? '' : 'Login'}
                        </span>
                    </button>
                </form>
                <p className='wrong-pg'>
                    New user?{'  '}
                    <a href='/sign-up'>Sign Up</a>
                </p>
            </div>
            <div className='right'>
                <img src={auth} alt='' />
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        alert: state.alert,
    };
};

export default connect(mapStateToProps, { login, removeNav })(Login);
