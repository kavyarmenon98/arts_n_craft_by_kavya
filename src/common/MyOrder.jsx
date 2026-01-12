import { useQuery } from "@tanstack/react-query";
import { getMyOrderAPI } from "../services/service";

export default function MyOrdersDark() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrderAPI,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-gray-300 flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  if (!data?.orders?.length) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-gray-400 flex items-center justify-center">
        No orders found
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-500/20 text-blue-400";
      case "Shipped":
        return "bg-indigo-500/20 text-indigo-400";
      case "In Transit":
        return "bg-amber-500/20 text-amber-400";
      case "Delivered":
        return "bg-emerald-500/20 text-emerald-400";
      case "Cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          My Orders
        </h1>
        <p className="text-gray-400 mt-1">
          Track your purchases and order status
        </p>
      </div>

      <div className="space-y-10">
        {data.orders.map((order, index) => (
          <div
            key={order._id}
            className={`
              bg-[#0b1220]
              rounded-2xl
              p-6
              shadow-md
              border border-gray-700/60
              transition hover:shadow-xl
              ${
                index % 3 === 0
                  ? "ring-1 ring-blue-500/20"
                  : index % 3 === 1
                  ? "ring-1 ring-purple-500/20"
                  : "ring-1 ring-emerald-500/20"
              }
            `}
          >
            {/* Order Header */}
            <div className="flex justify-between items-start border-b border-gray-700 pb-4">
              <div>
                <span className="inline-flex items-center gap-2 bg-gray-800 px-4 py-1 rounded-full text-sm text-gray-300">
                  Order
                  <span className="text-blue-400 font-medium">
                    #{order.orderId}
                  </span>
                </span>

                <p className="text-sm text-gray-400 mt-2">
                  Placed on{" "}
                  {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-700">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-6"
                >
                  <div className="flex gap-5 items-center">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-20 h-24 rounded-xl object-cover border border-gray-700"
                    />

                    <div>
                      <h3 className="font-medium text-lg leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-300 mt-1 font-medium">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Item Total
                    </p>
                    <p className="text-lg font-semibold text-gray-100">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-5 mt-2">
              <p className="text-xs text-gray-400">
                Payment ID:{" "}
                <span className="text-gray-300">
                  {order.paymentId}
                </span>
              </p>

              <p className="text-xl font-semibold text-gray-100">
                Total ₹{order.totalAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
