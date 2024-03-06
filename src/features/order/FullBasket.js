import { useSelector } from "react-redux";
import { FullBasketItem } from "./FullBasketItem.js";
import { DataView } from 'primereact/dataview';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Controller } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { addOrder } from "./orderApi.js";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";


export const FullBasket = () => {

    let arr = useSelector(state => state.cartOrders.arr);
    let [totalSum, setTotalSum] = useState(0);
    let [totalCount, setTotalCount] = useState(0);
    let [valueAddress, setValueAddress] = useState("");

    const navigate = useNavigate();

    let myUser = useSelector(state => state.thisUser.currentUser)
    let userToken = useSelector(state => state.thisUser.currentUser)?.data.token;
    let basket = useSelector(state => state.cartOrders.arr);

    const accept = () => {
        navigate("/login");
    }

    const confirm = (position) => {
        confirmDialog({
            message: 'עליך להתחבר על מנת לבצע פעולה זו',
            header: 'התחברות',
            icon: 'pi pi-info-circle',
            position,
            accept,
            acceptLabel: "התחבר",
            rejectLabel: "לא עכשיו"
        });
    };
    const toast = useRef(null);

    const message = () => {
        toast.current.show({ severity: 'success', detail: 'ההזמנה שלך הושלמה', life: 2000 });
    }
    const orderExist = () => {
        toast.current.show({ severity: 'error', detail: 'ההזמנה כבר קיימת ', life: 2000 });
    }


    const forPayment = async () => {
        if (!myUser)
            return confirm('top-left');
        valueAddress = valueAddress || "aaa";
        const orderData = {
            "dateOrder": new Date().toISOString(),
            "forDate": new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
            "address": valueAddress,
            "_id": myUser.data._id,
            arrProducts: basket.map((item) => ({
                company: item.company,
                color: item.color,
                price: item.price,
                count: item.count,
                size: item.size

            })),
            onTheWay: false,
        };

        try {
            const response = await addOrder(orderData, userToken);
            message();

        } catch (err) {
            if (err.response && err.response.status === 409)
                orderExist();
            else {
                confirm('top-left');
            }
        }
    }

    useEffect(() => {
        let sum = arr.reduce((acc, item) => acc + item.count * item.price, 0);
        let count = arr.reduce((acc, item) => acc + item.count, 0);

        setTotalSum(sum);
        setTotalCount(count);
    }, [arr]);

    const goBack = () => {
        navigate("/");
    }

    const listTemplate = (arr) => {
        if (!arr || arr.length === 0) return <div style={{ marginTop: "30px", fontSize: "20px" }}>סל הקניות שלך ריק</div>;

        let list = arr.map((item) => {
            return <FullBasketItem product={item} />
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <>
            <div style={{ direction: "rtl" }}>
                <div style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "30px",
                    width: "200px",
                    height: "240px",
                    // textAlign: "center",
                    margin: "10px",
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed"
                }}>
                    <div className="card flex justify-content-center">
                        <Button className="text-lg" label="המשך לקנות" text onClick={goBack} />
                    </div>
                    <div class="mb-2">
                        <span>סכום כולל: ₪{totalSum}</span>
                    </div>
                    <div class="mb-2 ">
                        <span>מס' פריטים: {totalCount}</span>
                    </div>

                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="address">כתובת</label>
                            <InputText id="address" className="p-inputtext-sm" value={valueAddress} onChange={(e) => setValueAddress(e.target.value)} aria-describedby="username-help" style={{ width: "150px" }} />
                        </div>
                    </div>

                    <Button label="לתשלום" severity="danger" rounded onClick={forPayment} style={{ height: "40px", width: "160px", margin: "16px", marginBottom: "0px" }} />
                </div>
            </div >

            <div style={{ direction: "rtl" }}>
                <div className="card flex justify-content-center align-items-center w-7 m-auto">
                    <DataView value={arr} listTemplate={listTemplate} />
                </div>
            </div>
            {/* <div className="card" style={{ alignItems: "center", justifyItems: "center", direction:"rtl"}}> */}

            <div className="card">
                <ConfirmDialog />
            </div>

            <div style={{ textAlign: "right" }}>
                <Toast ref={toast} />
            </div>
        </>
    );
}
