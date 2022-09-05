import { IOrder } from '../../interfaces';

export default (io: any, socket: any) => {
  const createOrder = (orders: IOrder[]) => {
    socket.broadcast.emit('orders', orders);
  };

  socket.on('createdOrder', createOrder);
};
