import React, { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../reducers/connectionsSlice"
import axios from "axios"
import { addRequests } from "../reducers/requestSlice"

const Connections = () => {

    const dispatch = useDispatch()

    const requests = useSelector((store) => store.requests)

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
            dispatch(addRequests(res.data.data))
        } catch (err) {
            console.log(err?.response?.data?.error || 'Something went wrong')
        }

    }

    useEffect(() => {
        if (!requests || requests.length === 0) {
            fetchRequests()
        }
    }, [requests])


    const handleReviewRequest = async (status, connectionId) => {
        const res = await axios.post(
            BASE_URL + `/request/review/${status}/${connectionId}`,
            {},
            { withCredentials: true }
        );

        if (!res.error) {
            dispatch(
                addRequests(
                    requests.map((r) =>
                        r._id === connectionId
                            ? { ...r, reviewed: true, status }
                            : r
                    )
                )
            );
        }
    };

    return (
        <div className="text-center my-10">
            {requests.length == 0 ?
                <div>No Request Found</div>
                :
                <>
                    <h1 className="font-bold my-10 text-3xl">Connections Requests</h1>

                    {requests.map((el) => {
                        return <div key={el._id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                            <figure >

                                <img
                                    className="w-30 h-30 rounded-full"
                                    src={el.fromUserId.photoUrl}
                                    alt="user" />

                            </figure>
                            <div className="card-body text-left mx-10">
                                <h2 className="card-title">{el.fromUserId.firstName + " " + el.fromUserId.lastName}</h2>
                                {el.fromUserId.age && el.fromUserId.gender && <p>{el.fromUserId.age + " " + el.fromUserId.gender}</p>}
                                {el.fromUserId.about && <p className="w-100">{el.fromUserId.about}</p>}
                            </div>
                            <div className="card-actions justify-end">
                                {!el.reviewed ? (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleReviewRequest("accepted", el._id)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleReviewRequest("rejected", el._id)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : el.status === "accepted" ? (
                                    <button className="btn btn-success">Accepted</button>
                                ) : (
                                    <button className="btn btn-soft">Rejected</button>
                                )}
                            </div>


                        </div>
                    })}
                </>
            }
        </div>
    )

}

export default Connections