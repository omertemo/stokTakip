import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockTypes.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    StockTypes.remove({ _id: data._id });
  },
});
