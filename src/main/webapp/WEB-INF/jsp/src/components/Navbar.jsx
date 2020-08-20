import React from 'react';

const style = {
    objectFit: 'cover',
    borderRadius: '50%',
    width: '40px',
    height: '40px'
};

function fetchUsers(evt) {
    evt.preventDefault();

    fetch("/searchUser",
    {
        method: 'POST',
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => console.log(data));   
        
        
}

function Navbar() {
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
                        <input className="form-control mr-sm-2" name="search" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Feed</a>
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

export default Navbar;