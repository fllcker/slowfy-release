import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import axios from "axios";
import surl from "../components/surl";
import TracksList from "../components/TracksList";

const Search = () => {
    let [q, setQ] = useState('');
    let [tracks, setTracks] = useState([]);

    useEffect(() => {
        if (q == "") return;
        let res = axios.get(surl + "tracks/search?q=" + q + "&count=10")
            .then(g => setTracks(g.data))
    }, [q])

    return (
        <div>
            <Header selected="search"/>
            <div className="cont">
                <div className="search_main">
                    <h2>Что хочешь послушать?</h2>
                    <input type="text" className="search_input" placeholder="Sqwore"
                    value={q} onChange={(e) => setQ(e.target.value)}/>

                    <div className="search_tracks_block">
                        <TracksList tracks={tracks} showMore={false}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Search;