export const Constants = {
  fileApi: process.env.NEXT_PUBLIC_API_URL + "/v1/client/file-service/",
};

export const OrderStatusMessages = {
  WAITING_PAYMENT: "Ödəniş gözlənilir",
  PENDING: "Təsdiq gözləyir",
  READY: "Tamamlanıb",
  PROCESSING: "İcra edilir",
};
