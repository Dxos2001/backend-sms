const getDataSource = require('../data-source').getDataSource;

async function createUser(data) {
  const dataSource = await getDataSource();
  const user = dataSource.getRepository('users').create(data);
  return dataSource.getRepository('users').save(user);
}

async function getUserById(id) {
  const dataSource = await getDataSource();
  return dataSource.getRepository('users').findOneBy({ id });
}

async function listUsers() {
  const dataSource = await getDataSource();
  return dataSource.getRepository('users').find();
}

module.exports = {
  createUser,
    getUserById,
    listUsers
};