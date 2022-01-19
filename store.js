const DEFAULT_SALE = 'fruit2022test';

function load() {
  const params = {
    sale: DEFAULT_SALE,
    action: 'start',
  };

  const queryMatch = window.location.href.match(/\?(.*)/);
  let deploymentId = DEPLOYMENT_ID;  // from deployment.js

  if (queryMatch) {
    queryMatch[1].split('&').forEach(nameValue => {
      const nameMatch = nameValue.match(/([^=]+)/);
      const valueMatch = nameValue.match(/=(.*)/);

      if (nameMatch && valueMatch && valueMatch[1] && valueMatch[1].length < 100) {
        const name = nameMatch[1];
        const value = valueMatch[1];
        switch (name) {
          case 'sale':
          case 'action':
          case 'order':
            params[name] = value;
            break;
          case 'deplid':
            deploymentId = value;
            break;
        }
      }
    });
  }

  const query = Object.entries(params).map(kv => `${kv[0]}=${kv[1]}`).join('&');

  if (!deploymentId.match(/^[A-Za-z0-9_-]+$/)) {
    console.error('Invalid deployment ID');
    return;
  }
  const url = `https://script.google.com/a/macros/fairviewbands.org/s/${deploymentId}/exec?${query}`;

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