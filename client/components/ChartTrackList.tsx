import React, {useEffect, useState} from 'react';
import TracksList from "./TracksList";
import surl from "./surl";
import axios from 'axios';

const ChartTrackList = () => {
    let [tracks, setTracks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(surl + "tracks/GetMostPopularTracks?count=5")
                .then(g => setTracks(g.data))
        }

        fetchData().then(r => r);
    }, [])

    return (
        <>
            <TracksList tracks={tracks}/>
        </>
    );
};

export default ChartTrackList;