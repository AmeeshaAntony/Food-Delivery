import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import burger1 from '../images/burger1.jpg';
import burger2 from '../images/burger2.jpg';
import burger3 from '../images/burger3.jpg';

export default function Home() {
    const [search, setsearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:3000/api/foodData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched data:', data); // Log data to verify

            setFoodItem(data[0]);
            setFoodCat(data[1]);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-item active">
                            <img src={burger1} className="d-block w-100" alt="First slide" style={{ objectFit: "cover", height: "100vh" }} />
                            <div className='carousel-caption d-flex justify-content-center align-items-end' style={{ zIndex: "10", bottom: "20px", left: "0", right: "0" }}>
                                <div className="d-flex w-75 justify-content-center">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: "400px", marginRight: "10px" }} value={search} onChange={(e) => { setsearch(e.target.value) }} />
                                    <button className="btn btn-outline-success text-white bg-success" type="submit" style={{ minWidth: "100px" }}>Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={burger2} alt="Second slide" style={{ objectFit: "cover", height: "100vh" }} />
                            <div className='carousel-caption d-flex justify-content-center align-items-end' style={{ zIndex: "10", bottom: "20px", left: "0", right: "0" }}>
                                <div className="d-flex w-75 justify-content-center">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: "400px", marginRight: "10px" }} value={search} onChange={(e) => { setsearch(e.target.value) }} />
                                    <button className="btn btn-outline-success text-white bg-success" type="submit" style={{ minWidth: "100px" }}>Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={burger3} alt="Third slide" style={{ objectFit: "cover", height: "100vh" }} />
                            <div className='carousel-caption d-flex justify-content-center align-items-end' style={{ zIndex: "10", bottom: "20px", left: "0", right: "0" }}>
                                <div className="d-flex w-75 justify-content-center">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: "400px", marginRight: "10px" }} value={search} onChange={(e) => { setsearch(e.target.value) }} />
                                    <button className="btn btn-outline-success text-white bg-success" type="submit" style={{ minWidth: "100px" }}>Search</button>
                                </div>
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
            <div className="d-flex w-175 justify-content-center p-3">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: "400px", marginRight: "10px" }} value={search} onChange={(e) => { setsearch(e.target.value) }} />
                <button className="btn btn-outline-success text-white bg-success" type="submit" style={{ minWidth: "100px" }}>Search</button>
            </div>
            <div className='m-3'>
                {
                    foodCat.length > 0 ? (
                        foodCat.map((data, index) => (
                            <div className='row mb-3' key={index}>
                                <div key={data._id} className='fs-3 m-3'> {data.CategoryName} </div>
                                <hr />
                                {
                                    foodItem.length > 0 ?
                                        foodItem.filter(item =>
                                            item.CategoryName === data.CategoryName &&
                                            item.name.toLowerCase().includes(search.toLowerCase())
                                        ).map(filteredItem => (
                                            <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                                                <Card
                                                    foodItem={filteredItem}
                                                    options={filteredItem.options}
                                                    Imgsrc={filteredItem.img}
                                                />
                                            </div>
                                        ))
                                        : <div>"no data"</div>
                                }
                            </div>
                        ))
                    ) : (
                        <div>"no data"</div>
                    )
                }
            </div>
            <div><Footer /></div>
        </div>
    );
}
