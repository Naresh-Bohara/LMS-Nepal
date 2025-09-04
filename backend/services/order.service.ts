// services/order.service.ts
import OrderModel from "../models/order.Model";

interface OrderInput {
  courseId: string;
  userId: string;
  payment_info: object;
}

export const newOrder = async (data: OrderInput) => {
  return await OrderModel.create(data);
};

// services/order.service.ts
export const getAllOrdersService = async () => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  return orders;
};

