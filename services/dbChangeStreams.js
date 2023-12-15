const { MongoClient } = require('mongodb');

const connectToMongoDB = async (uri, dbName, collectionName, onChange) => {
  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const changeStream = collection.watch();

    changeStream.on('change', async (change) => {
      console.log('Change event:', change);
      // Call the provided onChange callback on change
      await onChange();
    });

    console.log('MongoDB change stream initialized');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
