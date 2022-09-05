export interface DashboardSummaryResponse {
  numberOfOrders: number;
  completedOrders: number;
  paidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoInventory: number;
  lowInventory: number;
  notPaidOrders: number;
  userOrders: number;
}
