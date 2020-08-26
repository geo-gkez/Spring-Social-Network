import React from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";

let results = ["Test DATA 001"];

export const ResultsContext = React.createContext({});

export const ResultsProvider = (props) => {
    return (
        <ResultsContext.Provider value={results}>
            {props.children}
            {/* this indicates that the global store is accessible to all the child tags with MyProvider as Parent */}
        </ResultsContext.Provider>
    );
};

const style = {
    objectFit: 'cover',
    borderRadius: '50%',
    width: '40px',
    height: '40px'
};

// function fetchUsers(evt) {
//     evt.preventDefault();

//     let searchBar = document.getElementById("searchBar");
//     let formData = new FormData();
//     formData.append("name", searchBar.nodeValue);

//     console.log(evt.target.search.value);


//     fetch("/searchUsers",
//         {
//             method: 'GET',
//             credentials: "include",
//             headers: {
//                 'input': evt.target.search.value
//             },
//         })
//         .then(response => response.json())
//         .then(data => console.log(data));

//         console.log(props);
//     //this.props.history.push("/results");


// }

function logout(evt) {
    evt.preventDefault();

    fetch("/logout",
        {
            method: 'GET',
            credentials: "include"
        }).then(response => {
        window.location.href = "http://localhost:8080/";
    });

    console.log("You have been logged out.");
}

function Navbar() {

    const history = useHistory();
    function fetchUsers(evt) {

        evt.preventDefault();

        let searchBar = document.getElementById("searchBar");
        let formData = new FormData();
        formData.append("name", searchBar.nodeValue);

        console.log(evt.target.search.value);


        fetch("/searchUsers",
            {
                method: 'GET',
                credentials: "include",
                headers: {
                    'input': evt.target.search.value
                },
            })
            .then(response => response.json())
            .then(data => {
                results = ["Test DATA"];
                console.log(data);
                console.log("Testing changes");
            });

        history.push("/results");

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img src="http://placehold.it/150x50?text=Logo" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                    Connector
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0" onSubmit={fetchUsers}>
                        <input id="searchBar" className="form-control mr-sm-2" name="search" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Feed</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Messages</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Conections</a>
                        </li>
                        <li>
                            <img style={style} src="https://cdn.vox-cdn.com/thumbor/G8A4RF-QWQl7jItQw93r402os_0=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/10816041/rick_and_morty_s02_still.jpg"
                                 className="avatar rounded-circle ml-3"
                                 alt="Cinque Terre" />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Alexandros Korovesis</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/logout">Logout</a>
                        </li>
                        {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                            </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li> */}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default withRouter(Navbar);