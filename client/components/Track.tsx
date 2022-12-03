import React, {useEffect, useState} from 'react';
import Image from "next/image";
import unheart from '../public/unheart.svg'
import heart from '../public/heart.svg'
import play from '../public/play.svg'
import {getjwt} from "./getjwt";
import axios from "axios";
import surl from "./surl";
import {useRouter} from "next/router";

const Track = ({sid, id, title, authors, time, imagesrc, source}: any) => {
    let router = useRouter();
    let [enterState, setEnterState] = useState(false);
    let [isFavourite, setIsFavourite] = useState(false);

    const onMouseEnter = () => {
        setEnterState(true);

        if (getjwt() != null) {
            axios.get(surl + 'favtracks/IsFavourite?trackId=' + id, {
                headers: { Authorization: `Bearer ${getjwt()}` }
            })
                .then(d => setIsFavourite(d.data == 1));
        }
    }

    const onMouseLeave = () => {
        setEnterState(false);
    }

    const addToFav = () => {
        if (getjwt() != null) {
            if (isFavourite == false) {
                axios.get(surl + 'favtracks/AddToFavourite?trackId=' + id, {
                    headers: { Authorization: `Bearer ${getjwt()}` }
                })
                    .then(d => setIsFavourite(true));
            } else {
                axios.get(surl + 'favtracks/RemoveFromFavourites?trackId=' + id, {
                    headers: { Authorization: `Bearer ${getjwt()}` }
                })
                    .then(d => setIsFavourite(false));
            }

        } else router.push("/account")
    }

    const playTrack = () => {
        let audio: any = document.querySelector(".player");
        if (audio) audio.setAttribute('src', source);
    }

    return (
        <div className="track" onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}>
            <div className="track_id_block">
                {
                    enterState ?
                        <div className="play_buttons" onClick={() => playTrack()}>
                            <Image src={play} alt="" width={17} height={17}/>
                        </div>
                        : <p className="track_id">{sid}</p>
                }

            </div>
            <div className="track_image_block">
                <img src={imagesrc} alt="" className="track_image"/>
            </div>
            <div className="track_title_block">
                <p className="track_title">{title}</p>
                <p className="e">E</p>
            </div>
            <div className="track_authors_block">
                <p className="track_authors">{authors}</p>
            </div>
            <div className="div_track_time_block">
                {
                    enterState ?
                        <div className="track_buttons favouritebtn" onClick={() => addToFav()}>
                            {
                                isFavourite ?
                                    <Image src={heart} alt="" width={17} height={17}/> :
                                    <Image src={unheart} alt="" width={17} height={17}/>
                            }
                        </div>
                        : <p className="track_time">{time}</p>
                }
            </div>
        </div>
    );
};

export default Track;