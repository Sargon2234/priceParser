const fetch = require('node-fetch');

module.exports.request = async (url) => {
  try {
    const info = await fetch(url);

    if (info.status !== 200) {
      console.error("Request failed. URL:", url, 'Code:', info.status, 'Text:', info.statusText);
      return new Error("Can't get data from service.");
    }

    return await info.json();
  } catch (e) {
    console.error(e.message);
    return new Error('Request failed.');
  }
};