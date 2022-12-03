import React, {useEffect, useState} from 'react';
import Image from "next/image";

import shuffle from '../public/shuffle.svg';
import play from '../public/whiteplay.svg';
import pause from '../public/whitepause.svg';
import repeat from '../public/repeat.svg';

const Footer = () => {
    const [pauseTrack, setPauseTrack] = useState(true);
    let audio: any = document.querySelector(".player");
    if (audio) audio.setAttribute('src','http://127.0.0.1:8887/mp3.mp3');
    if (audio) audio.setAttribute('loop','');

    return (
        <>
            <div className="footer_empty"></div>
            <div className="footer">
                <div className="footer_track_info">
                    <div className="track_info_picture">
                        <img src={"https://t2.genius.com/unsafe/1249x0/https%3A%2F%2Fimages.genius.com%2Fd986090010533e5cff801f630ec6c25a.800x800x1.jpg"} alt="" className="track_image_footer"/>
                    </div>
                    <div className="track_info_data">
                        <p className="track_title">плачь</p>
                        <p className="track_authors_footer">sqwore, rizza</p>
                    </div>
                </div>
                <div className="footer_player">
                    <div className="player_buttons">
                        <div className="shufflebtn player_btn">
                            <Image src={shuffle} alt="" width={27} height={27}/>
                        </div>
                        <div className="repeatbtn player_btn">
                            <Image src={repeat} alt="" width={27} height={27}/>
                        </div>
                    </div>






                </div>
                <div className="footer_other">
                    <audio className="player" src="" controls></audio>
                </div>

            </div>
        </>
    );
};

export default Footer;