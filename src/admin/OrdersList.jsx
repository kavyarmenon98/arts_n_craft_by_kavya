import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeOrderStatusAPI,
  getAdminOrderListAPI,
} from "../services/service";
import { useState } from "react";

export default function OrdersList() {
  const queryClient = useQueryClient();
  const [activeOrder, setActiveOrder] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAdminOrderListAPI,
  });

  const changeOrderStatusMutation = useMutation({
    mutationFn: changeOrderStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleStatusChange = async (orderId, status) => {
    await changeOrderStatusMutation.mutateAsync({
      id: orderId,
      status,
    });
    setActiveOrder(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-gray-300">
        Loading orders...
      </div>
    );
  }

  if (!data?.orders?.length) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-gray-400">
        No orders found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Order List</h1>
        <p className="text-gray-400 mt-1">
          View and manage customer orders
        </p>
      </div>

      <div className="space-y-8">
        {data.orders.map((order) => (
          <div
            key={order._id}
            className="relative rounded-xl p-6 shadow-lg border border-gray-700 bg-[#0b1220]"
          >
            {/* STATUS + ACTION */}
            <div className="absolute top-4 right-4 flex items-center gap-3">
              {/* STATUS BADGE */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    order.status === "Processing"
                      ? "bg-blue-500/20 text-blue-400"
                      : order.status === "Shipped"
                      ? "bg-indigo-500/20 text-indigo-400"
                      : order.status === "In Transit"
                      ? "bg-amber-500/20 text-amber-400"
                      : order.status === "Delivered"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-500/20 text-gray-400"
                  }
                `}
              >
                {order.status}
              </span>

              {/* ACTION BUTTON */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveOrder(
                      activeOrder === order._id ? null : order._id
                    )
                  }
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition"
                  title="Update status"
                >
                  ⚙️
                </button>

                {activeOrder === order._id && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#0f172a] border border-gray-700 rounded-lg shadow-xl z-10 overflow-hidden">
                    {[
                      "Processing",
                      "Shipped",
                      "In Transit",
                      "Delivered",
                    ].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleStatusChange(order._id, status)
                        }
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ORDER HEADER */}
            <div className="border-b border-gray-700 pb-4">
              <span className="bg-gray-800 px-4 py-1 rounded-full text-sm text-gray-300">
                Order{" "}
                <span className="text-blue-400">
                  #{order.orderId}
                </span>
              </span>
              <p className="text-sm text-gray-400 mt-2">
                Order Placed:{" "}
                {new Date(order.createdAt).toDateString()}
              </p>
            </div>

            {/* ORDER ITEMS */}
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-6 border-b border-gray-700 last:border-b-0"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-20 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-lg">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Qty: {item.quantity} &nbsp;|&nbsp;
                      <span className="text-gray-200 font-semibold">
                        ₹{item.price}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-400">Item Total</p>
                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

            {/* FOOTER */}
            <div className="flex justify-between items-center pt-4">
              <p className="text-sm text-gray-400">
                Payment ID: {order.paymentId}
              </p>
              <p className="text-xl font-semibold text-gray-100">
                Total: ₹{order.totalAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
