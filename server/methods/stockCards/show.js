import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockCards.show",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();

    const stockCard = StockCards.findOne({ _id: data._id });

    stockCard.product = Products.findOne({ _id: stockCard.productId });
    stockCard.unit = Units.findOne({ _id: stockCard.unitId });
    stockCard.stockType = StockTypes.findOne({ _id: stockCard.stockTypeId });

    return stockCard;
  },
});
