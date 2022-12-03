import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import {getjwt, removejwt} from "../../components/getjwt";
import {useRouter} from "next/router";
import axios from "axios";
import surl from "../../components/surl";

const Profile = () => {
    let router = useRouter();
    const [profName, setProfName] = useState('');

    useEffect(() => {
        if (getjwt() == null) {
            router.push('/account')
        } else {
            axios.get(surl + 'users/GetProfileName', {
                headers: { Authorization: `Bearer ${getjwt()}` }
            })
                .then(d => setProfName(d.data));
        }
    }, [])

    const exitFun = () => {
        removejwt()
        router.push("/home")
    }

    return (
        <div>
            <Header selected="profile"/>
            <div className="cont">
                <div className="main">
                    <h1>Аккаунт <span className="profname">{profName}</span></h1>

                    <a href="" className="simple_a" onClick={() => exitFun()}>Выйти</a>
                </div>
            </div>
        </div>
    );
};

export default Profile;