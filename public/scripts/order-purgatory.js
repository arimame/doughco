$(() => {
  let eventSource = new EventSource('http://localhost:8080/check-status');

  eventSource.addEventListener('received', (e) => {
      console.log('order received. redirecting...');
      window.location.href = "/order-confirmed/" + clientPhone;
  });
});
