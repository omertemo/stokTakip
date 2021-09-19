import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockTransactions.update",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    stockTransaction: StockTransactionSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    StockTransactions.update({ _id: data._id }, { set: data.stockTransaction });
  },
});
