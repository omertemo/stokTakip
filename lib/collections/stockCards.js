import SimpleSchema from "simpl-schema";

StockCards = new Mongo.Collection("stockCards");

StockCardSchema = new SimpleSchema({
  productId: SimpleSchema.RegEx.Id,
  stockTypeId: SimpleSchema.RegEx.Id,
  unitId: SimpleSchema.RegEx.Id,
  productQuantity: {
    //toplamları tutacağımız quantity
    type: SimpleSchema.Integer,
    autoValue: function () {
      return 0;
    },
  },
});

StockCards.attachSchema(StockCardSchema);
