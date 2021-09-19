import SimpleSchema from "simpl-schema";

StockTypes = new Mongo.Collection("stockTypes");

StockTypeSchema = new SimpleSchema({
  name: String,

  description: {
    type: String,
    optional: true,
  },
});

StockTypes.attachSchema(StockTypeSchema);
