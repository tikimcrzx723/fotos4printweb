export interface Square {
  payment: Payment;
}

export interface Payment {
  id: string;
  created_at: Date;
  updated_at: Date;
  amount_money: Money;
  status: string;
  delay_duration: string;
  source_type: string;
  card_details: CardDetails;
  location_id: string;
  order_id: string;
  processing_fee: ProcessingFee[];
  note: string;
  total_money: Money;
  approved_money: Money;
  employee_id: string;
  receipt_number: string;
  receipt_url: string;
  delay_action: string;
  delayed_until: Date;
  team_member_id: string;
  application_details: ApplicationDetails;
  version_token: string;
}

export interface Money {
  amount: number;
  currency: string;
}

export interface ApplicationDetails {
  square_product: string;
  application_id: string;
}

export interface CardDetails {
  status: string;
  card: Card;
  entry_method: string;
  cvv_status: string;
  avs_status: string;
  auth_result_code: string;
  statement_description: string;
  card_payment_timeline: CardPaymentTimeline;
}

export interface Card {
  card_brand: string;
  last_4: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  card_type: string;
  prepaid_type: string;
  bin: string;
}

export interface CardPaymentTimeline {
  authorized_at: Date;
  captured_at: Date;
}

export interface ProcessingFee {
  effective_at: Date;
  type: string;
  amount_money: Money;
}
