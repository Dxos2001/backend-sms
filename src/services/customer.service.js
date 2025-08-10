const getDataSource = require('../data-source').getDataSource;

async function createCustomer(data) {
  const dataSource = await getDataSource();
  const customer = dataSource.getRepository('customers').create(data);
  return dataSource.getRepository('customers').save(customer);
}

async function getCustomerById(id) {
  const dataSource = await getDataSource();
  return dataSource.getRepository('customers').findOneBy({ id });
}


async function listCustomers() {
  const dataSource = await getDataSource();
  return dataSource.getRepository('customers').find();
}


module.exports = {
  createCustomer,
  getCustomerById,
  listCustomers
};