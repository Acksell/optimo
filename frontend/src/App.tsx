import { useEffect, useState } from "react";
import { DefaultService } from "./rpcgen/services/DefaultService";
import { PurchaseOrder } from "./rpcgen/models/PurchaseOrder";

function App() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    DefaultService.getPurchaseOrders()
      .then((orders) => {
        setPurchaseOrders(orders)
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <div>Frontend running OK! :)</div>
      {error && <div>Error: {error}</div>}
      <ul>
        {purchaseOrders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id}, Supplier ID: {order.supplier_id}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
