import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockTransactions.create",
  validate: new SimpleSchema({
    stockTransaction: StockTransactionSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    StockTransactions.insert(data.stockTransaction);
  },
});
