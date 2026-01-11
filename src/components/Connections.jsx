import React, { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../reducers/connectionsSlice"
import axios from "axios"

const Connections = () => {

    const dispatch = useDispatch()

    const connections = useSelector((store) => store.connections)

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
            dispatch(addConnection(res.data.data))
        } catch (err) {
            console.log(err?.response?.data?.error || 'Something went wrong')
        }
    }

    useEffect(() => {
        if (!connections || connections.length === 0) {
            fetchConnections()
        }
    }, [connections])

    if (connections.length <= 0) {
        return <h1 className="flex justify-center font-bold my-10 ">No Connection Found</h1>
    }

    return (
        <div className="text-center my-10">
            <h1 className="font-bold my-10 text-3xl">Connections</h1>
            {connections.map((el) => {
                return <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto" key={el._id}>
                    <figure >

                        <img
                            className="w-30 h-30 rounded-full"
                            src={el.photoUrl}
                            alt="user" />

                    </figure>
                    <div className="card-body text-left mx-10">
                        <h2 className="card-title">{el.firstName + " " + el.lastName}</h2>
                        {el.age && el.gender && <p>{el.age + " " + el.gender}</p>}
                        {el.about && <p>{el.about}</p>}
                    </div>
                </div>
            })}
        </div>
    )

}

export default Connections