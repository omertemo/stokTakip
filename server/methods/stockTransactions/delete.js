import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockTransactions.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    StockTransactions.remove({ _id: data._id });
  },
});
