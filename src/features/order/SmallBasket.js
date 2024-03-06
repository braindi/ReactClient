import { Sidebar } from 'primereact/sidebar';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useSelector } from 'react-redux';

export const SmallBasket = () => {
    const [visible, setVisible] = useState(true);
    let [totalSum, setTotalSum] = useState(0);

    let arr = useSelector(state => state.cartOrders.arr);

    const [products, setProducts] = useState(arr);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const isMounted = useRef(false);


    useEffect(() => {
        isMounted.current = true;
        setProducts(arr);

        let sum = arr.reduce((acc, item) => acc + item.count * item.price, 0);
        setTotalSum(sum);
    }, [arr]);


    const imageBody = (rowData) => {
        return <img src={`https://b-server-kzzf.onrender.com/${rowData.imgUrl}`} alt={rowData.description} className="w-4rem shadow-1" style={{ height: "70px" }} />
    };

    const priceBody = (rowData) => {
        return '₪' + rowData.price;
    };

    const nameBody = (rowData) => {
        return rowData.company;
    }

    const countBody = (rowData) => {
        return rowData.count;

    }
    const sumOfCountBody = (rowData) => {
        return rowData.count * rowData.price;
    }

    return (<>
        <div className="card flex justify-content-center">
            <Sidebar visible={visible}  position="left" style={{ width: "460px" ,direction: "rtl" }} onHide={() => setVisible(false)}>
                <h3 style={{ margin: "0px" }}>סך הכל לתשלום:{totalSum}</h3>

                <DataTable value={products} selectionMode="single" rows={5} selection={selectedProduct}>
                    <Column field="name" header="שם" body={nameBody} style={{ minWidth: '5rem' }} />
                    <Column header="תמונה" body={imageBody} />
                    <Column field="price" header="מחיר" body={priceBody} style={{ minWidth: '5rem' }} />
                    <Column field="count" header="כמות" body={countBody} style={{ minWidth: '5rem' }} />
                    <Column field="priceOfCount" header="סכום ביניים" body={sumOfCountBody} style={{ minWidth: '5rem' }} />

                </DataTable>
            </Sidebar>
        </div>
    </>)
}
