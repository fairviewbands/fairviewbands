const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzH-nbQOTy5n1KMkzCxv5M3inJLucGhRkLNVinPRi_4oy8RV1_ddKQ83OUspG6RjpP_WA/exec';
const DEFAULT_SALE = 'fruit2022test';

function load() {
  const params = {
    sale: DEFAULT_SALE,
    action: 'start',
  };

  const queryMatch = window.location.href.match(/\?(.*)/);

  if (queryMatch) {
    queryMatch[1].split('&').forEach(nameValue => {
      const nameMatch = nameValue.match(/([^=]+)/);
      const valueMatch = nameValue.match(/=(.*)/);

      if (nameMatch && valueMatch && valueMatch[1] && valueMatch[1].length < 20) {
        const name = nameMatch[1];
        switch (name) {
          case 'sale':
          case 'action':
          case 'order':
            params[name] = valueMatch[1];
        }
      }
    });
  }

  const query = Object.entries(params).map(kv => `${kv[0]}=${kv[1]}`).join('&');
  const url = `${WEBAPP_URL}?${query}`

  switch (params.action) {
    case 'start':
      document.title = `${document.title} - Create Order`;
      break;
    case 'status':
      document.title = `${document.title} - Order Status (${params.order})`;
      break;
  }

  const iframe = document.createElement('iframe');
  iframe.src = url;
  document.body.appendChild(iframe);
}
