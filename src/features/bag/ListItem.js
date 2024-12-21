import "primereact/resources/themes/lara-light-cyan/theme.css";
import classes from "./style/listItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { increase } from "../order/orderSlice";
import { Button } from "primereact/button";
import { SmallBasket } from "../order/SmallBasket";
import { useRef, useState } from "react";
import { delBag } from "./bagApi";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

export const ListItem = ({ one, setDeleted, deleted }) => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [showSmallBasket, setShowSmallBasket] = useState(false);
    let userRole = useSelector(state => state.thisUser.currentUser)?.data.role;
    let userToken = useSelector(state => state.thisUser.currentUser)?.data.token;
    let [existInBasket, setExistInBasket] = useState(false);

    const addOne = (event) => {
        event.preventDefault();
        let item = { ...one, count: 1 }
        dispatch(increase(item));
        setExistInBasket(true);
        setShowSmallBasket(true);
        setTimeout(() => {
            setShowSmallBasket(false);
        }, 3000);
    }

    const toast = useRef(null);

    const accept = () => {
        navigate("/login");
    }

    const confirm = (position) => {
        confirmDialog({
            message: 'עליך להתחבר שוב על מנת לבצע פעולה זו',
            header: 'התחברות מחדש',
            icon: 'pi pi-info-circle',
            position,
            accept,
            acceptLabel: "התחבר",
            rejectLabel: "לא עכשיו"
        });
    };

    const deleteAdmin = async (event) => {

        try {
            // event.preventDefault();
            let deletedBag = await delBag(one._id, userToken);
            setDeleted(!deleted);
            navigate('/');
        }
        catch (err) {
            confirm('top-left');
        }
    }
    const deleteMessage = () => {
        deleteAdmin();
        toast.current.show({ severity: 'success', summary: 'מחיקה', detail: 'המוצר נמחק', life: 3000 });
    };

    const confirm2 = (event) => {
        event.preventDefault();
        confirmPopup({
            target: event.currentTarget,
            message: '?האם ברצונך למחוק פריט זה',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: deleteMessage,
            acceptLabel: "כן",
            rejectLabel: "לא"
        });
    };

    return (<>
        <div style={{ textAlign: "right" }}>
            <Toast ref={toast} />
        </div>
        <div style={{ direction: "rtl" }}>
            {showSmallBasket && <SmallBasket />}
            <ConfirmPopup />
            <div className={classes["container_card"]}>
                <div class="image-container" style={{ height: "300px", backgroundImage: `url(https://r-server-s5x2.onrender.com/${one.imgUrl})`, backgroundSize: 'cover', backgroundPosition: "center", backgroundPosition: "center 310px" }}></div>

                <div class="mb-4" className={classes["des_price"]}>
                    <div className={classes["description"]}>
                        <span>{one.company}</span>
                    </div>
                    <div className={classes["price"]}>
                        <span>₪{one.price}</span>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>

                    {userRole == "ADMIN" &&
                        <Link to={"/updateBag/" + one._id} state={one} style={{ width: "49%", paddingTop: "2px", marginLeft: "2px" }}>
                            <Button label="עריכה" outlined style={{ margin: "1%" }} >
                                <span class="p-button-icon p-c p-button-icon-left pi pi-pencil" data-pc-section="icon"></span>
                            </Button>
                        </Link>
                    }

                    {userRole == "ADMIN" && <Button label="מחיקה" severity="danger" outlined onClick={confirm2} style={{ margin: "1%", width: "49%", marginRight: "2px" }} >
                        <span class="p-button-icon p-c p-button-icon-left pi pi-trash" data-pc-section="icon"></span>
                    </Button>}
                </div>
                {/* {existInBasket&&style={{ba}}} */}
                {(!userRole || userRole == "USER") && <Button class="p-button p-button-outlined" style={{ height: "40px" }}>
                    <span class="p-button-label p-c" data-pc-section="label" style={{ height: "30px", marginTop: "10px", textAlign: "center" }} onClick={addOne}>הוספה לסל</span>
                    <span class="p-button-icon p-c p-button-icon-left pi pi-shopping-cart" data-pc-section="icon"></span>
                </Button>}

                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmDialog />
                </div>

            </div>
        </div>
    </>
    );
}