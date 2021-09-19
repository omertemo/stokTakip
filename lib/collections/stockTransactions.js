import SimpleSchema from "simpl-schema";

StockTransactions = new Mongo.Collection("stockTransactions");

StockTransactionSchema = new SimpleSchema({
  productQuantity: SimpleSchema.Integer, //her girdiğimizin quantity'sini belirtir
  price: SimpleSchema.Integer,
  stockCardId: SimpleSchema.RegEx.Id,
  transactionType: String,
});

StockTransactions.attachSchema(StockTransactionSchema);
