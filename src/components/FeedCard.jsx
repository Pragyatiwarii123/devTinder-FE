import React from "react"
import { BASE_URL } from '../utils/constant'
import { useDispatch } from "react-redux"
import axios from "axios"
import { removeUserFromFeed } from "../reducers/feedSlice"

const FeedCard = ({ feeds }) => {

    const dispatch = useDispatch()

    const { _id, firstName, lastName, photoUrl, gender, age, about } = feeds

    const handleSendRequest = async (status, userId) => {
        console.log(status, userId)
        try {
            const res = await axios.post(BASE_URL + `/request/send/${status}/${userId}`, {}, { withCredentials: true })

            if (!res.error) {
                dispatch(removeUserFromFeed(userId))
            }


        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="user photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " + gender}</p>}
                {about && <p>{about}</p>}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => handleSendRequest('ignored', _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleSendRequest('interested', _id)}>Interested</button>
                </div>
            </div>
        </div>
    )

}

export default FeedCard