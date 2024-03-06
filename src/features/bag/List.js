import { useState, useEffect } from 'react';
import { getBags, getNumOfAllPages } from './bagApi.js';
import { ListItem } from './ListItem.js';
import { Link, Outlet } from 'react-router-dom';
import classes from "./style/list.module.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export const List = () => {

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(12);
  const [bags, setBags] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const pageCount = await getNumOfAllPages();
      setCount(pageCount);
    }
    fetchData();
  }, [page]);

  useEffect(() => {
    async function addSomeBags() {
      try {
        let res = await getBags(page, 12);
        setBags(res.data);
      } catch (err) {
        console.log(err)
      }
    }

    addSomeBags();

  }, [page, count, deleted]);

  const handleChange = (event, value) => {

    setPage(value);
  };

  return (
    <>
      <Outlet />

      <ul>
        {bags.map((item) => (<li key={item._id}>
          <Link to={"" + item._id} state={item} className={classes["link"]} >
            <ListItem one={item} setDeleted={setDeleted} deleted={deleted} />
          </Link>
        </li>))}
      </ul>

      <Stack spacing={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Pagination
          count={count.data}
          page={page}
          onChange={handleChange}
          size='large'
        />
      </Stack >
    </>
  );
}