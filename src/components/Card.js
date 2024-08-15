import React, { useEffect, useRef, useState } from 'react';
import card1 from '../images/card1.jpg';
import { useDispatchCart,useCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart()
    const priceRef =useRef();
    const { foodItem } = props; // Destructure foodItem from props
    const options = foodItem.options[0]; // Adjust based on how options are structured
    const priceOptions = options ? Object.keys(options) : [];
    const [qty,setQty] =useState(1);
    const [size,setSize] = useState("")
    const handleAddtoCart =async()=>{
        let food =[]
        for(const item of data){
            if(item.id===props.foodItem._id){
                food=item;
                break;
            }
        }
        if (food.length > 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalprice, qty: qty });
                return;
            }
        
        
        else if(food.size!==size){
            await dispatch({type :"ADD",id:props.foodItem._id,name : props.foodItem.name,price:finalprice,qty:qty,size:size})
            return;
        }
        return;}
        
        await dispatch({type :"ADD",id:props.foodItem._id,name : props.foodItem.name,price:finalprice,qty:qty,size:size})
    }
    let finalprice=qty*parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div className="card m-3" style={{ width: "18rem", maxHeight: "360px", display: "flex", flexDirection: "column" }}>
                <img 
                    className="card-img-top" 
                    src={foodItem.img || card1} 
                    alt="Card image cap" 
                    style={{ objectFit: "cover", height: "150px", width: "100%" }} 
                />
                <div className="card-body d-flex flex-column" style={{ flex: "1 1 auto" }}>
                    <h5 className="card-title">{foodItem.name}</h5>
                    <p className="card-text">imp</p>
                    <div className="container w-100 mb-2">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className="d-inline h-100 fs-5">
                            Rs.{finalprice}/-
                        </div>
                    </div>
                    <button className="btn btn-success mt-2 align-self-end" style={{ marginTop: "auto" }} onClick={handleAddtoCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
