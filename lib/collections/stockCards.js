import SimpleSchema from "simpl-schema";

StockCards = new Mongo.Collection("stockCards");

StockCardSchema = new SimpleSchema({
  productId: SimpleSchema.RegEx.Id,
  stockTypeId: SimpleSchema.RegEx.Id,
  unitId: SimpleSchema.RegEx.Id,
  productQuantity: Number,

  payload: {
    type: Object,
    blackbox: true,
    optional: true,
  },
});

StockCards.attachSchema(StockCardSchema);
