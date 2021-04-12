function runCode(param, cb) {
  if (window.barecancel && window.barecancel.created)
    // eslint-disable-next-line no-unused-expressions
    window.console && console.error && console.error('Barecancel snippet included twice.');
  else {
    window.barecancel = {
      created: !0,
    };
    const a = document.createElement('script');
    // eslint-disable-next-line no-unused-expressions,no-sequences
    (a.src = 'https://baremetrics-barecancel.baremetrics.com/js/application.js'), (a.async = !0);
    const b = document.getElementsByTagName('script')[0];
    // eslint-disable-next-line no-unused-expressions,no-sequences
    b.parentNode.insertBefore(a, b),
      (window.barecancel.params = {
        access_token_id: 'f3f1ef18-d0de-46c2-9038-31eb84adc7a4',
        // Your Cancellation API public key
        customer_oid: param,
        // The provider id of this customer. For example, the Stripe Customer ID
        callback_send(data) {
          console.log(data);
          if (cb) {
            cb();
          }
        },
        callback_error(error) {
          // You can also catch any errors that happen when sending the cancellation event to Baremetrics.
          // For example, if Baremetrics returns that the customer does not have an active subscription.
          console.error(error);
        },
      });
  }
}

export default runCode;
