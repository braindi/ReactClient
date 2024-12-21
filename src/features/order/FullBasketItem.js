import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataViewLayoutOptions } from 'primereact/dataview';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import classes from "./style/fullBasketItem.module.css";
import { useDispatch } from 'react-redux';
import { decrease, deleteBag, increase } from './orderSlice';
import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';


export const FullBasketItem = ({ product }) => {

    let [sumProduct, setSumProduct] = useState(product.price * product.count);
    let [count, setCount] = useState(product.count);
    let dispatch = useDispatch();

    const toast = useRef(null);


    useEffect(() => {
        setSumProduct(product.price * count)
    }, [count]);


    const inc = () => {
        setCount(count + 1);
        let item = { ...product, count: count + 1 };
        dispatch(increase(item));
    }

    const dec = () => {
        setCount(count - 1);
        let item = { ...product, count }
        dispatch(decrease(item));
    }
    const del = () => {
        dispatch(deleteBag(product));
    }
    // delete קודם
    // const accept = () => {
    //     //////////////////
    //     del();
    //     toast.current.show({ severity: 'success', summary: 'מחיקה', detail: 'הפריט נמחק מסל הקניות', life: 3000 });
    // }

    // const deleteMessage = () => {
    //     confirmDialog({
    //         message: 'האם אתה בטוח שברצונך למחוק פריט זה?',
    //         header: 'מחיקת פריט',
    //         icon: 'pi pi-times',
    //         defaultFocus: 'reject',
    //         acceptClassName: 'p-button-danger',
    //         accept
    //         // reject
    //     });
    // };


    const accept = () => {
        del();
        toast.current.show({ severity: 'info', summary: 'מחיקה', detail: 'המוצר נמחק מסל הקניות', life: 3000 });
    };



    const confirm2 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: '?האם ברצונך למחוק פריט זה',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            acceptLabel: "כן",
            rejectLabel: "לא"

        });
    };

    return (<>
        <div style={{ textAlign: "right" }}>
            <Toast ref={toast} />
        </div>
        <div style={{ direction: "rtl" }}>
            <ConfirmPopup />

            {/* <ConfirmDialog /> */}
            {/* <div className="card flex flex-wrap gap-2 justify-content-center">
            <Button onClick={deleteMessage} icon="pi pi-times" label="Delete"></Button>
        </div> */}


            <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 h-18rem flex-wrap justify-content-center w-full')}>
                <img className="sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round  h-full" src={"https://r-server-s5x2.onrender.com/" + product.imgUrl} alt={product.company} />
                <div className="flex flex-column align-items-center sm:align-items-start gap-3 h-20rem" style={{ width: "150px" }}>
                    <div className="text-2xl font-bold text-900">{product.company}</div>
                    <div className="flex align-items-center gap-3">
                        <span className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.description}</span>
                        </span>
                    </div>
                    <span className="text-2xl font-semibold">₪{product.price}</span>
                </div>
                <div>
                    <div style={{ width: "200px", marginTop: "20px" }}>
                        {/* <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" onClick={deleteMessage} /> */}
                        <div className="card flex flex-wrap justify-content-center gap-3">
                            {/* הקודם      <Button label="delete" icon="pi pi-times" severity="danger" raised onClick={deleteMessage} style={{ direction: "ltr" }} /> */}
                            <div className="card flex flex-wrap gap-2 justify-content-center">
                                <Button onClick={confirm2} icon="pi pi-times" label="מחיקה" className="p-button-danger"></Button>
                            </div>
                        </div>
                        <div className="text-xl" style={{ textAlign: "center", margin: "20px" }}>סכום ביניים</div>
                        <div className="card flex flex-wrap justify-content-center gap-3 text-lg">
                            ₪{sumProduct}
                        </div>
                    </div>
                    <div className="m-3" style={{ width: "200px" }}>
                        <div className="flex sm:flex-row align-items-center sm:align-items-end gap-3 sm:gap-2 mb-0">
                            <Button icon="pi pi-plus" className="p-button-rounded" onClick={inc}></Button>
                            <Button className="flex justify-content-center align-items-center p-button-rounded p-button-outlined w-3rem">
                                {count}
                            </Button>
                            <Button icon="pi pi-minus" className={`p-button-rounded ${count <= 1 ? classes.disabled : ''}`} onClick={count > 1 ? dec : null}  ></Button>
                        </div>
                    </div>
                </div>
                {/* <hr style={{width: "100px"}}/> */}

            </div>

            {/* <hr style={{width: "450px"}}/> */}
        </div>
    </>
    );
};