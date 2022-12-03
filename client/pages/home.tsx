import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import LikedAuthorDie from "../components/LikedAuthorDie";
import TracksList from "../components/TracksList";
import ChartTrackList from "../components/ChartTrackList";
import {cookies} from "next/headers";
import {removejwt} from "../components/getjwt";
import Footer from "../components/Footer";

const Home = () => {
    let [hello, setHello] = useState('');
    useEffect(() => {
        var now = new Date();
        var hours = now.getHours();
        switch (true) {
            case (6 < hours && hours < 11): setHello("Доброе утро"); break;
            case (11 <= hours && hours < 18): setHello("Добрый день"); break;
            case (18 <= hours && hours <= 23): setHello("Добрый вечер"); break;
            case (23 <= hours && hours <= 6): setHello("Спокойной ночи"); break;
            default: setHello("Доброе утро"); break;
        }
    }, [])

    return (
        <div className="b">
            <Header selected="home"/>
            <div className="cont">
                <div className="home_main">
                    <h1>{hello}</h1>

                    <div className="home_main_sects">
                        <div className="rem_sects">
                            <LikedAuthorDie/>
                            <LikedAuthorDie/>
                        </div>

                        <div className="chart_sect">
                            <h2>Чарт</h2>
                            <ChartTrackList/>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Home;