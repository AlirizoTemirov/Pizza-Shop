import axios from "axios";
import OrdersTable from "./OrdersTable";

export default async function page() {
  const res = await fetch(
    "https://serve.faux-api.com/f92ae21abaa048e1a243f392/orders"
  );

  const data = await res.json();

  return (
    <div>
      <OrdersTable orders={data.result} />
    </div>
  );
}
