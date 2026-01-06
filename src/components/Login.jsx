import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [emailId, setEmailId] = React.useState("pragya@gmail.com")
    const [password, setPassword] = React.useState("Pragya@123")
    const handleSubmit = async () => {
        try {
            let res = await axios.post(
                `${BASE_URL}/login`,
                {
                    emailId,
                    password
                }, { withCredentials: true }
            )
            console.log("Login Response:", res.data.data);
            dispatch(addUser(res.data.data))
           // alert("Login Successful");
            // redirect to feed page
            navigate('/')
        } catch (err) {
            console.error(err);
            alert("Login Failed");
        }
    }
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-content w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-black justify-center">Login</h2>
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
                            type="text"
                            placeholder="Enter Password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login