import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const [isLoginForm, setIsLoginForm] = useState(false)


    const handleLogin = async () => {
        try {
            let res = await axios.post(
                `${BASE_URL}/login`,
                {
                    emailId,
                    password
                }, { withCredentials: true }
            )
            dispatch(addUser(res.data.data))
            // redirect to feed page
            navigate('/')
        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Something went wrong"
            setError(errorMessage)
        }
    }

    const handleSignUp = async () => {
        try {
            let res = await axios.post(
                `${BASE_URL}/signup`,
                {
                    emailId,
                    password,
                    firstName,
                    lastName
                }, { withCredentials: true }
            )
            dispatch(addUser(res.data.data))
            // redirect to feed page
            return navigate('/profile')
        } catch (err) {
            console.log(err, "reereereeeeree")
            const errorMessage = err?.response?.data?.error || "Something went wrong"
            setError(errorMessage)
        }
    }

    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-content w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-black justify-center">{isLoginForm ? 'Login' : 'Sign In'}</h2>
                    {!isLoginForm &&
                        <>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    className="input"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className="input"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </>}
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="input"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? 'Login' : 'Sign In'}</button>
                    </div>
                    <p className='text-blue-500 mx-auto cursor-pointer' onClick={() => setIsLoginForm(!isLoginForm)}>
                        {isLoginForm ? 'New User? Sign In here' : 'Existing User? Login here'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login