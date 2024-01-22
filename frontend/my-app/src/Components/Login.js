import React, { useEffect, useState } from 'react';
import './LoginSignUp.css';
import googleLogo from './google.png';
import githubLogo from './github.png';
// import { Route, redirect } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();
    const [islogin, setIslogin] = useState(false)

    const [user, setUser] = useState({
        username:"",
        email: "",
        password: ""
    })

    let name, value;
    function handleInputs(event) {
        name = event.target.name;
        value = event.target.value;
        setUser({ ...user, [name]: value })
    }

    var postLoginData = async (event) => {
        try {
            event.preventDefault();
            const {username, email, password } = user;
            await Axios.post('http://localhost:5000/login', {username, email, password }).then((response)=>{
                console.log(response.data); 
            navigate("/app/welcome");
            })
            
        } catch (error) {
            console.error("Error during login:", error);
        }
    };






    return (
        <div className='login'>

            <div className='form-container'>
                <form  method="POST">

                <div className="form">
                        <label htmlFor="name">Your Name</label>
                        <input type="name" className="form-input" name="username" placeholder='Enter Your Name'
                            autoComplete='off'
                            value={user.username}
                            onChange={handleInputs} />
                    </div>
                    <div className="form">
                        <label htmlFor='email'>Email</label>
                        <input type="email" className="form-input" name="email" placeholder='Enter the Email'
                            autoComplete='off'
                            value={user.email}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="form">
                        <label htmlFor='password'>Password</label>
                        <input type="password" className="form-input" name="password" placeholder="Enter the password"
                            autoComplete='off'
                            value={user.password}
                            onChange={handleInputs}
                        />
                    </div>
                    <button type="submit" className="button" onClick={(event) => postLoginData(event)}>Login</button>
                </form>

                <div className="Authentication">
                    <a className="button google" href="/auth/google" role="button">
                        <img src={googleLogo} alt='google logo' className='logo' /> Sign In with Google
                    </a>

                    <a className="button github" href="/auth/github" role="button">
                        <img src={githubLogo} alt='github logo' className='logo' /> Sign In with Github
                    </a>
                </div>
            </div>
            <div>
                <div className='Question'>
                    Are you a new user ?
                </div>
                <button className="button"><a href='/'>SignUp</a></button>
            </div>

        </div>
    )
}

export default Login;