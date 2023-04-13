import express from "express";
import { MongoClient, MongoClientOptions } from "mongodb";
import dotenv from "dotenv";

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

MongoClient.connect(uri, clientOptions)
  .then((client) => {
    console.log("Conexão bem-sucedida");
  })
  .catch((error) => {
    console.log("Erro ao conectar: ", error);
  });
