const {getDataSource} = require('../loaders/database');

async function createMessage(data) {
  const dataSource = await getDataSource();
  const message = dataSource.getRepository('messages').create(data);
  return dataSource.getRepository('messages').save(message);
}