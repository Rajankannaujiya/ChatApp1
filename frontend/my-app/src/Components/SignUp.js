import React, { useState } from 'react';
import './LoginSignUp.css';
import googleLogo from './google.png';
import githubLogo from './github.png';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

    const [users, setUsers] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    let name, value;


    function handleInputs(event) {
        name = event.target.name;
        value = event.target.value
        setUsers({ ...users, [name]: value })

    }

    const postData = async (event) => {
        event.preventDefault();
    
        const { username, email, password, confirmPassword } = users;
    
        try {
            const response = await Axios.post('http://localhost:5000/register', {
                username,
                email,
                password,
                confirmPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log(response.data);
            navigate("/app/welcome");
        } catch (error) {
            console.error("Error:", error);
            console.log("Response data:", error.response ? error.response.data : undefined);
            console.log("Response status:", error.response ? error.response.status : undefined);
        }
    };
    

    return (
        <div className='SignUp'>

            <div className='form-container'>
                <form action="/signUp" method="POST" >
                    <div className="form">
                        <label htmlFor="name">Your Name</label>
                        <input type="name" className="form-input" name="username" placeholder='Enter Your Name'
                            autoComplete='off'
                            value={users.username}
                            onChange={handleInputs} />
                    </div>
                    <div className="form">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-input" name="email" placeholder='Enter the Email'
                            autoComplete='off'
                            value={users.email}
                            onChange={handleInputs} />
                    </div>
                    <div class="form">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-input" name="password" placeholder="Enter the password"
                            autoComplete='off'
                            value={users.password}
                            onChange={handleInputs} />
                    </div>
                    <div class="form">
                        <label htmlFor="password">Conform Password</label>
                        <input type="password" className="form-input" name="confirmPassword" placeholder='Please Conform Your Password'
                            autoComplete='off'
                            value={users.confirmPassword}
                            onChange={handleInputs} />
                    </div>
                    <button type="submit" className="button" onClick={postData}>SignUp</button>
                </form>

                <div className="Authentication">
                    <a className="google" href="/auth/google" role="button">
                        <img src={googleLogo} alt='google logo' className='logo' /> Sign Up with Google
                    </a>

                    <a className="github" href="/auth/github" role="button">
                        <img src={githubLogo} alt='github logo' className='logo' /> Sign Up with Github
                    </a>
                </div>
            </div>
            <div>
                <div className='Question'>
                    Already an user?
                </div>
                <button className="button"><a href='/Login'>Login</a></button>
            </div>

        </div>
    )
}

export default SignUp;