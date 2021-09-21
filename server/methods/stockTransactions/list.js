import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockTransactions.list",
  validate: function () {},
  run: function (data) {
    this.unblock();

    return StockTransactions.find({ stockCardId: data.stockCardId }).fetch();
  },
});
