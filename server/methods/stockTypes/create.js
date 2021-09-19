import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockTypes.create",
  validate: new SimpleSchema({
    stockType: StockTypeSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    StockTypes.insert(data.stockType);
  },
});
