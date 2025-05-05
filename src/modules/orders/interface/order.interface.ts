export interface IOrder {
    id?: number;
    userId: number;
    orderDate?: Date;
    totalPrice: number;
    status?: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  }