import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "units.delete",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    Units.remove({ _id: data._id });
  },
});
