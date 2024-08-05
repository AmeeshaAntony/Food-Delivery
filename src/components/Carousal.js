import React from 'react'
import burger1 from '../images/burger1.jpg'
import burger2 from '../images/burger2.jpg';
import burger3 from '../images/burger3.jpg';

export default function Carousal() {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-item active">
                        <img src={burger1} className="d-block w-100" alt="First slide" />
                        <div className='carousel-caption d-flex justify-content-center align-items-end' style={{ zIndex: "10", bottom: "20px", position: "absolute", left: "0", right: "0" }}>
                            <form className="d-flex w-75">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={burger2} alt="Second slide" />
                        <div className='carousel-caption d-flex justify-content-center align-items-end' style={{ zIndex: "10", bottom: "20px", position: "absolute", left: "0", right: "0" }}>
                            <form className="d-flex w-75">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={burger3} alt="Third slide" />
                        <div className='carousel-caption d-flex justify-content-center align-items-end' style={{ zIndex: "10", bottom: "20px", position: "absolute", left: "0", right: "0" }}>
                            <form className="d-flex w-75">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}
