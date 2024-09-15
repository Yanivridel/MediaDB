import {useState, useEffect, createContext} from 'react';
import './Songs.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Song, Song2 } from './Song';
import defaultImg from './assets/DefaultAlbumCover.png';
import {getSongs, searchSongs} from './../../dataCenter.js';
import Loading from './Loading.jsx';

export const searchContext = createContext();


function Songs(){
    const [songs, setSongs] = useState(null);
    useEffect(() => {
        async function fetchData(){
            const data = await searchSongs('artists.0.name','Bob Dylan',10);
            console.log(data);
            setSongs(data);
        }
        fetchData();
    },[]);

    async function onSearchClick(str, parameter){
        let data;

        if(parameter === 'Track'){
            data = await searchSongs('name', str,10);
        }
        else if(parameter === 'Album'){
            data = await searchSongs('album.name', str,10);
        }
        else if(parameter === 'Artist'){
            data = await searchSongs('artists.0.name', str,10);
        }
        console.log(data);
        setSongs(data);
    }

    
    if(!songs){
        return(
            <div>
                <Loading/>
            </div>
        )
    }
    else return(
        <div data-theme="light">
            <searchContext.Provider value={onSearchClick}>
                <Header />
            </searchContext.Provider>
            <div id="songsContainer">
                {songs.map((song, index)=>{
                    return(<Song2 data={song} key={index}/>);
                })}
            </div>
            <Footer />
        </div>
    );
}

export default Songs;