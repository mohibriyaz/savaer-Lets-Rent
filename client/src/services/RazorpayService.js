export function makePayment(
  order,
  onPaymentSuccess,
  onPaymentFailure,
  onDismiss
) {
  const { key, id, amount } = order.data;
  const options = {
    key: key,
    amount: amount,
    currency: "INR",
    order_id: id,
    modal: {
      ondismiss: onDismiss,
    },
    handler: (response) => onPaymentSuccess(response),
  };
  const rzr = new window.Razorpay(options);
  rzr.on("payment.failed", (errResponse) => onPaymentFailure(errResponse));
  rzr.open();
}
