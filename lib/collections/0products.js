import SimpleSchema from "simpl-schema";

Products = new Mongo.Collection("products");

ProductSchema = new SimpleSchema({
  name: String,

  description: {
    type: String,
    optional: true,
  },
});

Products.attachSchema(ProductSchema);
