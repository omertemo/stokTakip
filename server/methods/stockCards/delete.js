import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockCards.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    StockCards.remove({ _id: data._id });
  },
});
