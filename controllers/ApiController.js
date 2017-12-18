const Models = require('../models/ItemsModel');

module.exports.main = (req, res) => {
  res.json({ status: 'ok' })
};

module.exports.pageNotFound = (req, res) => {
  res.json({ status: 'ok', message: 'Page not found.' })
};

module.exports.all = async (req, res, connection) => {

  let result = null;

  try {
    result = await Models.dbSelect(connection);
  } catch (e) {
    console.error(e.message);
  }

  defaultDataCheck(res, result);
};

module.exports.item = async (req, res, connection) => {
  const itemName = req.params.itemName;

  if (!itemName) {
    return res.json({ status: 'error', message: 'No item name was provided.' })
  }

  let result = null;

  try {
    result = await Models.dbSelect(connection, itemName);
  } catch (e) {
    console.error(e.message);
  }

  return defaultDataCheck(res, result);
};

const defaultDataCheck = (res, result) => {
  if (!result) {
    return res.json({ status: 'error' });
  }

  if (result.length === 0) {
    return res.json({ status: 'ok', message: 'No entries found.' })
  }

  return res.json({ status: 'ok', result });
};