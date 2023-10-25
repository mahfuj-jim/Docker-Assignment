/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import React from 'react';
import { Fragment, useEffect, useState } from "react";
import useTransactionHook from "../../hooks/transaction/useTransactionHook";
import SideBar from "../sideBar/sideBar";
import Loader from "../loader/loader";
import "./transactions.style.scss";

const Transactions = () => {
  const [loader, setLoader] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { getAllUsersTransactions } = useTransactionHook();

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const result = await getAllUsersTransactions();
    if (result) {
      setTransactions(result);
      setLoader(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  return (
    <Fragment>
      <div className="sidebar-and-content-container">
        <SideBar></SideBar>
        <div className="book-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Books</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            {loader ? (
              <Loader></Loader>
            ) : (
              <tbody>
                {transactions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.user.name}</td>
                    <td>
                      <ul>
                        {item.orderList.map((book, bookIndex) => (
                          <li key={bookIndex}>{book.book.title}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{item.totalPrice}</td>
                    <td>{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Transactions;
