import { useState, useEffect } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState()
  const [newOrder, setNewOrder] = useState()
  
  useEffect(() => {
    getOrders()
    .then(data => {
      setOrders(data)
    })
    .catch((err) => console.error("Error fetching:", err));
  }, [newOrder]);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm setNewOrder={setNewOrder}/>
      </header>

      {orders && <Orders orders={orders} />}
    </main>
  );
}

export default App;
