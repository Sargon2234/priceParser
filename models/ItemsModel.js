module.exports.dbSelect = (connection, itemName = null) => {
  let query = 'SELECT name, safe_price, safe_net_price FROM items';

  if (itemName) {
    query = `${query} WHERE name = ?`
  }

  return new Promise((resolve, reject) => {
    connection.query(query, itemName, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });

};