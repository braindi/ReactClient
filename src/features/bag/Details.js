import React, { useState } from 'react';
import { classNames } from 'primereact/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import classes from "./style/details.module.css";
import { increase } from '../order/orderSlice';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { Accordion, AccordionTab } from 'primereact/accordion';


export const Details = () => {

    let location = useLocation();
    let [count, setCount] = useState(1);
    let dispatch = useDispatch();
    let navigate = useNavigate();


    const goBack = () => {
        navigate("/");
    }

    const goToBasket = () => {
        navigate("/fullBasket");
    }

    const inc = () => {
        setCount(count + 1);
    }

    const dec = () => {
        setCount(count - 1);
    }

    const addToCart = () => {
        let item = { ...location.state, count };
        dispatch(increase(item));
        goToBasket();
    }


    return (
        <div style={{direction:"rtl"}}>
            <div className={classes["div-details"]}>
                <div className="col-8" key={location.state._id} style={{ marginRight: "220px" }}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')}>
                        <div className='ml-8'>
                            <img className="w-9 sm:w-16rem xl:w-25rem shadow-2 block xl:block mx-auto border-round" src={`https://b-server-kzzf.onrender.com/${location.state.imgUrl}`} alt={location.state.description} style={{ height: "540px", width: "700px" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: 'column', gap: "50px", marginRight: "40px" }}>
                            <div className="sm:align-items-start">
                                <div className="flex flex-column align-items-center gap-3">
                                    <span className="text-2xl font-bold text-900">{location.state.company}</span>
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag"></i>
                                        <span className="text-2xl font-semibold">מחיר ₪{location.state.price}</span>
                                    </span>
                                    <span>צבע {location.state.color}</span>
                                    <span>
                                        <Button icon="pi pi-plus" className="p-button-rounded" onClick={inc}></Button>
                                        <Button className="justify-content-center align-items-center p-button-rounded p-button-outlined w-3rem text-xl mx-1" text>
                                            {count}
                                        </Button>
                                        <Button icon="pi pi-minus" className={`p-button-rounded ${count <= 1 ? classes.disabled : ''}`} onClick={count > 1 ? dec : null}  ></Button>
                                    </span>
                                    <span className="flex flex-column align-items-center ">
                                        <Button class="p-button" style={{ height: "40px" }}>
                                            <span class="p-button-label p-c w-10rem" data-pc-section="label" style={{ height: "30px", marginTop: "10px", textAlign: "center" }} onClick={addToCart}>הוספה לסל</span>
                                            <span class="p-button-icon p-c p-button-icon-left pi pi-shopping-cart" data-pc-section="icon"></span>
                                        </Button>
                                        <hr style={{ width: "300px", marginTop: "20px", marginBottom: "0px" }} />
                                    </span>

                                    <div className="card w-full">
                                        <Accordion>
                                            <AccordionTab header="מידע נוסף">
                                                <div style={{ marginRight: "30px" }}>
                                                    {/* <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon p-angle-left" aria-hidden="true" data-pc-section="headericon"><path d="M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z" fill="currentColor"></path></svg> */}
                                                    {/* <h3 style={{ marginTop: "0px", paddingTop: "0px" }}>מידע נוסף:</h3> */}
                                                    <span className="font-semibold">סוג: {location.state.description}</span>
                                                    <h4 className="font-semibold">גודל: {location.state.size}</h4>
                                                    <h4 className="font-semibold">גובה: {location.state.height}</h4>
                                                    <h4 className="font-semibold mb-0">רוחב: {location.state.width}</h4>
                                                </div>
                                            </AccordionTab>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card">
                            <Accordion>
                                <AccordionTab header="מידע נוסף">
                                    <div style={{ marginRight: "30px" }}> */}
                            {/* <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon p-angle-left" aria-hidden="true" data-pc-section="headericon"><path d="M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z" fill="currentColor"></path></svg> */}
                            {/* <h3 style={{ marginTop: "0px", paddingTop: "0px" }}>מידע נוסף:</h3> */}
                            {/* <span className="font-semibold">סוג: {location.state.description}</span>
                                        <h4 className="font-semibold">גודל: {location.state.size}</h4>
                                        <h4 className="font-semibold">גובה: {location.state.height}</h4>
                                        <h4 className="font-semibold mb-0">רוחב: {location.state.width}</h4>
                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div> */}
                            {/* <div style={{ marginRight: "30px" }}>
                            <h3 style={{ marginTop: "0px", paddingTop: "0px" }}>מידע נוסף:</h3>
                            <span className="font-semibold">סוג: {location.state.description}</span>
                            <h4 className="font-semibold">גודל: {location.state.size}</h4>
                            <h4 className="font-semibold">גובה: {location.state.height}</h4>
                            <h4 className="font-semibold mb-0">רוחב: {location.state.width}</h4>
                        </div> */}
                            {/* <Button label="המשך לקנות" text onClick={goBack} style={{ width: "140px", padding: "0px" }} /> */}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};
