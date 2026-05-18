import axios from "axios";
import OrdersTable from "./OrdersTable";

export default async function page() {
  const { data } = await axios.get(
    "https://serve.faux-api.com/f92ae21abaa048e1a243f392/orders"
  );

  return (
    <div>
      <OrdersTable orders={data.result} />
    </div>
  );
}
