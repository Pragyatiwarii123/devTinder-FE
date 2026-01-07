import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const NavBar = () => {
    //subscribing to user store
    const user = useSelector((store) => store.user)
    console.log("User in NavBar:", user);
    return (
        <div className="navbar bg-base-content shadow-sm">
            <div className="flex-1">
                <Link to={"/"}>
                    <a className="btn text-xl">👩‍💻 DevTinder</a>
                </Link>
            </div>
            {user && <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <p className="text-black mr-8">Welcome {user.firstName}</p>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Photo"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to={'/profile'}>
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default NavBar