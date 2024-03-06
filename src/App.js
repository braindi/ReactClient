import './App.css';
import { List } from "./features/bag/List.js";
import { Routes, Route } from "react-router-dom";
import { FullBasket } from './features/order/FullBasket.js';
import { Details } from './features/bag/Details.js';
import { NavBar } from './features/user/NavBar.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userIn } from './features/user/userSlice.js';
import { Sign } from './features/user/Sign.js';
import { Protected } from './features/user/Protected';
import { UpdateBag } from './features/bag/UpdateBag.js';
import { AddBag } from './features/bag/AddBag.js';

function App() {
  let dispatch = useDispatch();
  let myUserq = useSelector(state => state.thisUser.currentUser);

  useEffect(() => {
    let myUser = localStorage.getItem("thisUser");
    if (myUser) dispatch(userIn(JSON.parse(myUser)));
  }, []);

  const navbarHeight = 50;

  return (<>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <div style={{ flexGrow: 1, marginTop: navbarHeight }}>
        <Routes>
          <Route path='' element={<List />} >
            <Route path=':id' element={<Details />} />
          </Route>
          <Route path='/fullBasket' element={<FullBasket />} />
          <Route path='/login' element={<Sign />} />
          <Route path='/addBag' element={<Protected user={myUserq} >
            <AddBag />
          </Protected>} />
          <Route path='/updateBag/:id' element={<Protected user={myUserq} >
            <UpdateBag />
          </Protected>} />
        </Routes>
      </div>
    </div>
  </>
  );
}

export default App;
