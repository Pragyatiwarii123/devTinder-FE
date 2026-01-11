import axios from "axios"
import React, { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addFeed, removeUserFromFeed } from "../reducers/feedSlice"
import FeedCard from "./FeedCard"
const Feed = () => {

    const dispatch = useDispatch()
    const feeds = useSelector((store) => store.feed)

    const fetchFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
            dispatch(addFeed(res?.data?.data || []))
        } catch (err) {
            console.log(err?.response?.data?.error || 'Something went wrong')
            dispatch(removeUserFromFeed())
        }
    }

    useEffect(() => {
        // If redux already has data, don't call API
        if (feeds.length === 0) {
            fetchFeed();
        }
    }, []);

    if (feeds.length <= 0) {
        return <div className=" flex justify-center my-10">No More Users Found!!</div>
    }


    return (
        <div>
            {feeds.length > 0 && (
                <div className="flex justify-center my-15">
                    <FeedCard feeds={feeds[0]} />
                </div>
            )}
        </div>
    )

}

export default Feed