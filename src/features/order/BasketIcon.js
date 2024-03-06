import { useNavigate } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { height } from '@mui/system';



const BasketIcon = () => {

    let arrBasket = useSelector(state => state.cartOrders.arr);
    let [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        
        let count = arrBasket.reduce((acc, item) => acc + item.count, 0);

        setTotalCount(count);
    }, [arrBasket]);


    let navigate=useNavigate();
    return (<>
    <div >
        <i className="pi pi-shopping-cart p-overlay-badge" onClick={() => {
            navigate("/fullBasket")
        }}
         style={{ fontSize: '2rem' ,color:"black" }}>
            <Badge value={totalCount} severity="danger" style={{ textAlign: "center" }} ></Badge>
        </i>
        </div>
         </>);
}

export default BasketIcon;