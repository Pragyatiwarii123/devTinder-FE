import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { addUser } from "../reducers/userSlice";

const EditProfile = ({ user }) => {

    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState(user.about)
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)


    const handleSaveProfile = async () => {
        try {
            let res = await axios.patch(
                `${BASE_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about
                }, { withCredentials: true }
            )
            setError('')
            dispatch(addUser(res.data.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        } catch (err) {
            const errorMessage = err?.response?.data?.error || "Something went wrong"
            setError(errorMessage)
        }
    }
    return (
        <>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
            <div className="flex justify-center px-10">
                <div className='flex justify-center my-10 mx-10'>
                    <div className="card bg-base-content w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-black justify-center">Edit Profile</h2>
                            <div>
                                <label><span className="text-black">First Name</span></label>
                                <input
                                    type="text"
                                    className="input"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label><span className="text-black">Last Name</span></label>
                                <input
                                    type="text"
                                    className="input"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label><span className="text-black">Photo Url</span></label>
                                <input
                                    type="text"
                                    className="input"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </div>
                            <div>
                                <label><span className="text-black">Age</span></label>
                                <input
                                    type="text"
                                    className="input"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div>
                                <label><span className="text-black">Gender</span></label>
                                <input
                                    type="text"
                                    className="input"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                            <div>
                                <label><span className="text-black">About</span></label>
                                <input
                                    type="text"
                                    className="input"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </div>
                            <p className='text-red-500'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={handleSaveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card bg-base-200 w-110 shadow-sm mt-10">
                    <figure>
                        <img
                            src={photoUrl}
                            alt="user photo" />
                    </figure>
                    <div className="card-body items-center">
                        <h2 className="card-title">{firstName + " " + lastName}</h2>
                        {age && gender && <p>{age + " , " + gender}</p>}
                        {about && <p>{about}</p>}
                    </div>
                </div>

            </div>
        </>

    )

}

export default EditProfile