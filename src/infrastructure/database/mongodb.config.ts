import { MongoClient, MongoClientOptions } from "mongodb";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

interface MyMongoClientOptions extends MongoClientOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const clientOptions: MyMongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri: string = process.env.MONGODB_URI;

export const connect = () => {
  MongoClient.connect(uri, clientOptions)
    .then((client) => {
      console.log("Mongodb: Conexão bem-sucedida");
    })
    .catch((error) => {
      console.log("Mongodb: Erro ao conectar: ", error);
    });
};

export const getDb = async () => {
  const client = await MongoClient.connect(uri, clientOptions);
  return client.db(process.env.MONGODB_DB_NAME);
};
