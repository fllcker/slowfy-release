import React from 'react';
import Track from "./Track";

const TracksList = ({tracks, showMore = true}:any) => {
    return (
        <div className="tracks_list">
            {
                tracks.map((p: any, index: number) =>
                    <Track key={index} sid={index + 1} id={p.id} title={p.title} authors={p.author} time={p.duration} source={p.source} imagesrc={p.imageSource}/>)
            }
            <button className={showMore ? "show_more" : "show_more hidden"}>
                Show more
            </button>
        </div>
    );
};

export default TracksList;