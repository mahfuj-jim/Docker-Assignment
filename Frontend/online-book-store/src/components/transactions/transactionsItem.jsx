/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useTransactionHook from "../../hooks/transaction/useTransactionHook";
import "./transactionsItem.style.scss";
import Loader from "../loader/loader";

const TransactionsItem = () => {
  const [loader, setLoader] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { getOneUsersTransactions } = useTransactionHook();

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const result = await getOneUsersTransactions();
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
  );
};

export default TransactionsItem;
