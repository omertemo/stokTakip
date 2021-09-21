import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "stockCards.list",
  validate: new SimpleSchema({
    options: {
      type: QueryOptionsSchema,
      optional: true,
    },
  }).validator(),
  run: function (data) {
    this.unblock();

    const stockCards = StockCards.find({}).fetch(); //StockCards koleksiyonunu stockCards nesnesine fetch ediyoruz(?)
    stockCards.map((stockCard) => {
      //foreach gibi dönüp veriyi manipüle ediyoruz
      stockCard.product = Products.findOne({ _id: stockCard.productId });
      stockCard.unit = Units.findOne({ _id: stockCard.unitId });
      stockCard.stockType = StockTypes.findOne({ _id: stockCard.stockTypeId });
      return stockCard;
    });
    return stockCards;
  },
});
