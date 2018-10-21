$(() => {
  const cookies = document.cookie.split('; ');
  const cookieArr = [];

  for (let cookie of cookies) {
    cookieArr.push(cookie.split('='));
  }

  for (let cookie of cookies) {
    document.cookie = `${cookie[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
});

