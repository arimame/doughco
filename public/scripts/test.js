$(() => {
    let eventSource = new EventSource('http://localhost:8080/sms');
    
    eventSource.addEventListener('received', (e) => {
        console.log('hi');
        console.log(e.data.welcomeMsg);
        // => Got a text back
    });
});


