import React, { useEffect } from "react"
import NavBar from "./NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../reducers/userSlice"

const Body = () => {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)
    const navigate = useNavigate()

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true })
            console.log(res, "rererrererererrere")
            dispatch(addUser(res.data.data))
        } catch (err) {
            if(err.status === 401){
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        if (!user) {
            fetchUserProfile()
        }
    }, [])
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body