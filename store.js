const TOO_LONG_LOAD_SECS = 10;

function load(params) {
  const queryMatch = window.location.href.match(/\?(.*)/);
  let deploymentId = DEPLOYMENT_ID;  // from deployment.js

  // Propagate a few parameters.

  if (queryMatch) {
    queryMatch[1].split('&').forEach(nameValue => {
      const nameMatch = nameValue.match(/([^=]+)/);
      const valueMatch = nameValue.match(/=(.*)/);

      if (nameMatch && valueMatch && valueMatch[1] && valueMatch[1].length < 100) {
        const name = nameMatch[1];
        const value = valueMatch[1];
        switch (name) {
          case 'action':
          case 'sale':
          case 'order':
          case 'student':
          case 'day':
            params[name] = value;
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
  const url =
      `https://script.google.com/a/macros/fairviewbands.org/s/${deploymentId}/exec?${query}`;

  const iframe = document.createElement('iframe');
  let wasLoaded = false;
  iframe.src = url;
  iframe.onload = function() {
    document.getElementById('loading').outerHTML = '';
    wasLoaded = true;
  };
  window.setTimeout(() => {
    if (!wasLoaded) {
      document.getElementById('loading-message').innerHTML = '';
      document.getElementById('direct-link').href = url;
      document.getElementById('too-long').style.display = 'block';
    }
  }, TOO_LONG_LOAD_SECS * 1000);
  document.body.appendChild(iframe);
  iframe.focus();
}
