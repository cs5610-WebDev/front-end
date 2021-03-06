import React from 'react';
import {Link} from "react-router-dom";
import AnimeRow from "./anime-row";
import "./display-list.css"

const DisplayList = ({animeList, user, updateUser, deleteAnime}) => {

    return(
        <div className="wbdv-table-wrapper">
            <table
                className="table table-borderless responsive">

                <thead className="wbdv-thead">
                <tr>
                    <th>Anime</th>
                    <th className="d-none d-md-table-cell">Created</th>
                    <th >Status</th>
                    <th >
                        Actions
                    </th>
                </tr>
                </thead>

                <tbody>
                {animeList &&
                animeList.map((anime, index) =>
                    <AnimeRow
                        key={index}
                        user={user}
                        index={index}
                        anime={anime}
                        updateUser={updateUser}
                        deleteAnime={deleteAnime}
                    />)}

                </tbody>
            </table>
        </div>

    )
}

export default DisplayList