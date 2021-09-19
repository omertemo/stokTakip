import SimpleSchema from "simpl-schema";

new ValidatedMethod({
  name: "products.create",
  validate: new SimpleSchema({
    product: ProductSchema,
  }).validator(),
  run: function (data) {
    this.unblock();

    Products.insert(data.product);
  },
});
