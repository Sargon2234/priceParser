const request = require('./Request').request,
    config = require('../config');

class ParseModule {
  constructor(connection) {
    this.connection = connection;
  }

  async mainFlow() {
    const info = await this.dataReceiver();

    if (!info) {
      return false;
    }

    const preparedData = this.prepareDataToInsert(info);

    for (let prepared of preparedData) {
      const replaceQuery = 'REPLACE INTO items SET name = ?, safe_price = ?, safe_net_price = ?';
      try {
        await this.connection.query(replaceQuery, [prepared.name, prepared.safe_price, prepared.safe_net_price]);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async dataReceiver() {
    const requestUrl = `http://api.csgo.steamlytics.xyz/v2/pricelist?key=${config.apiKey}`;

    try {
      const data = await request(requestUrl);

      if (data.success) {
        return data.items;
      }

      return false;

    } catch (e) {
      return false;
    }
  }

  prepareDataToInsert(data) {
    let parsedData = [];

    const allKeys = Object.keys(data);

    for (let key of allKeys) {
      let item = data[key];

      let safe_price,
          safe_net_price;

      if (item.safe_price) {
        safe_price = item.safe_price * 100;
      }

      if (item.safe_net_price) {
        safe_net_price = item.safe_net_price * 100;
      }

      parsedData.push({
        name: item.name,
        safe_price,
        safe_net_price
      });
    }

    return parsedData;
  }

}

module.exports = ParseModule;