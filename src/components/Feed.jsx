import axios from "axios"
import React, { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addFeed, removeFeed } from "../reducers/feedSlice"
import FeedCard from "./FeedCard"
const Feed = () => {

    const dispatch = useDispatch()
    const feeds = useSelector((store) => store.feed)
    const [usersData, setUsersData] = useState([])

    const fetchFeed = async () => {
        try {
            if (!feeds || feeds.length === 0) {

                const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })

                setUsersData(res.data.data)

                dispatch(addFeed(res?.data?.data || []))
            }

        } catch (err) {
            console.log(err)
            dispatch(removeFeed())
        }
    }

    useEffect(() => {

        fetchFeed()


    }, [])


   return (
    <div>
        {usersData.length > 0 && (
            <div className="flex justify-center my-15">
                <FeedCard feeds={usersData[0]} />
            </div>
        )}
    </div>
)

}

export default Feed