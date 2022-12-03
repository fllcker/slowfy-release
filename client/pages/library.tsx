import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import axios from "axios";
import surl from "../components/surl";
import {getjwt} from "../components/getjwt";
import {useRouter} from "next/router";
import TracksList from "../components/TracksList";

const Library = () => {
    let router = useRouter();
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        if (getjwt() == null) {
            router.push('/account')
        } else {
            axios.get(surl + 'favtracks/GetMyFavorite', {
                headers: { Authorization: `Bearer ${getjwt()}` }
            })
                .then(d => setTracks(d.data));
        }
    }, [])

    return (
        <div>
            <Header selected="library"/>
            <div className="cont">
                <div className="main library_main">
                    <h1>Моя медиатека</h1>
                    {
                        tracks.length == 0 ?
                            <p>Ваша медиатека пуста</p> :
                            <TracksList tracks={tracks} showMore={false}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default Library;