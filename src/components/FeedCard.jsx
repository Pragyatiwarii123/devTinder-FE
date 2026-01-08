import React from "react"
const FeedCard = ({ feeds }) => {

    const { firstName, lastName, photoUrl, gender, age, about } = feeds

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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )

}

export default FeedCard