import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import {getjwt, removejwt, setjwt} from "./getjwt";
import axios from "axios";
import surl from "./surl";

const Header = ({selected = "home"}: any) => {
    let [jwt, setTok] = useState('');
    let [username, setUsername] = useState('');
    let [userpicture, setUserpicture] = useState('');

    useEffect(() => {
        if (getjwt() != null) {
            // token exists
            setTok(getjwt() + '')

            axios.get(surl + 'users/GetProfilePhoto', {
                headers: { Authorization: `Bearer ${getjwt()}` }
            })
                .then(d => setUserpicture(d.data));

            axios.get(surl + 'users/GetProfileName', {
                headers: { Authorization: `Bearer ${getjwt()}` }
            })
                .then(d => setUsername(d.data));
        } else setTok('')
    }, [])

    return (
        <div className="header">
            <div className="header_left">
                <Link href="/home" legacyBehavior>
                    <a href="/" className={selected == "home" ? "selected_a" : ""}>Home</a>
                </Link>
                <Link href="/search" legacyBehavior>
                    <a href="/" className={selected == "search" ? "selected_a" : ""}>Search</a>
                </Link>
                <Link href="/library" legacyBehavior>
                    <a href="/" className={selected == "library" ? "selected_a" : ""}>Library</a>
                </Link>
            </div>
            <div className="header_right">
                {
                    jwt == '' ?
                        <div className="not_authed">
                            <Link href="/account/index" legacyBehavior>
                                <a href="/">Sign up</a>
                            </Link>
                        </div> :
                        <div className="authed">
                            <img src={userpicture} alt="s" className="user_picture"/>
                            <h5 className="user_name">{username}</h5>
                        </div>
                }
            </div>
        </div>
    );
};

export default Header;