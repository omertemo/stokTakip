import SimpleSchema from "simpl-schema";

StockTransactions = new Mongo.Collection("stockTransactions");

StockTransactionSchema = new SimpleSchema({
  stockCardId: SimpleSchema.RegEx.Id,
  productQuantity: Number,
  transactionType: String, // allowedValues
  price: Number,

  payload: {
    type: Object,
    blackbox: true,
    optional: true,
  },
});

StockTransactions.attachSchema(StockTransactionSchema);
