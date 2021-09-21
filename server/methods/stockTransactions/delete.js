import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockTransactions.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    const stockTransaction = StockTransactions.findOne({ _id: data._id });

    ActionStockCardUpdateQuantity(
      stockTransaction.stockCardId,
      stockTransaction.productQuantity,
      "delete"
    );
    StockTransactions.remove({ _id: data._id });
  },
});
