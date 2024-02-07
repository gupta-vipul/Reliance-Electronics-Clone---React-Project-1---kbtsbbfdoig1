import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);
  async function getOrderhistory() {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/ecommerce/order/",
      {
        headers: {
          projectID: "kbtsbbfdoig1",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const jsonData = await response.json();
    setOrderHistory(jsonData.data);
  }
  function handleEmptyOrderPageBtnClick() {
    navigate("/");
  }
  useEffect(() => {
    getOrderhistory();
  }, []);
  // console.log(orderHistory);
  return (
    <div className="order-history-page">
      {orderHistory && orderHistory.length == 0 ? (
        <div className="empty-order-page flex">
          <div className="empty-order-img-text-container flex">
            <img src="/no-item-found.png" alt="no orders found" />
            <p>No Orders Found</p>
          </div>
          <button
            className="empty-order-page-btn"
            onClick={handleEmptyOrderPageBtnClick}
          >
            continue shopping
          </button>
        </div>
      ) : (
        <div className="order-history">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Total Price</th>
                <th>Order created at/Placed at</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory &&
                Array.isArray(orderHistory) &&
                orderHistory.map(({ order, createdAt }) => {
                  return (
                    <tr key={order._id}>
                      <td>{order.items[0].product.name}</td>
                      <td style={{textAlign: "center", fontWeight: 'bold'}}>{order.totalPrice}</td>
                      <td style={{textAlign: "center", fontWeight: 'bold'}}>{new Date(createdAt).toLocaleString()}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
