import React, { useState } from 'react'
import './AuthPage.css';

import loginImg from '../../assets/login.webp';

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true);

    const sighupForm = () => {
        setIsLogin(false);
    }
    const loginForm = () => {
        setIsLogin(true);
    };

    return (
        <div className='flex justify-between items-center
                        h-full'>
            <div className='hidden md:flex w-1/3 h-full justify-center items-center'>
                <img
                    src={loginImg}
                    alt="loginImg"
                    className='max-w-full max-h-full object-contain'
                />
            </div>
            <div className={`container ${isLogin ? '' : 'active'}`}>
                <div className='form-box login'>
                    <form action="#">
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Username' required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Password' required />
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div className='forget-link my-4 text-sm'>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type='submit' className='btn'>Login</button>
                        <div className='md:hidden mt-3 flex justify-center items-center gap-1.5'>
                            <p>Don't have an account?</p>
                            <p className='ml-4 cursor-pointer hover:text-green-500' onClick={sighupForm}>Sign up</p>
                        </div>
                    </form>
                </div>
                <div className='form-box register'>
                    <form action="#">
                        <h1>Registration</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Username' required />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className='input-box'>
                            <input type="email" placeholder='Email' required />
                            <i className='bx bxs-envelope'></i>
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Password' required />
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <button type='submit' className='btn'>Register</button>
                        <div className='md:hidden mt-3 flex justify-center items-center gap-1.5'>
                            <p>Alreay have an account?</p>
                            <p className='ml-4 cursor-pointer hover:text-green-500' onClick={loginForm}>Log in</p>
                        </div>
                    </form>
                </div>
                <div className='toggle-box'>
                    <div className='toggle-panel toggle-left'>
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button
                            onClick={sighupForm}
                            className='btn register-btn'>Register</button>
                    </div>

                    <div className='toggle-panel toggle-right'>
                        <h1>Welcome Back!</h1>
                        <p>Alreay have an account?</p>
                        <button onClick={loginForm}
                            className='btn login-btn'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage