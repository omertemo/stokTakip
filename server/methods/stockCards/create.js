import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockCards.create",
  validate: new SimpleSchema({
    stockCard: StockCardSchema.omit("productQuantity"),
  }).validator(),
  run: function (data) {
    this.unblock();

    StockCards.insert(data.stockCard);
  },
});
