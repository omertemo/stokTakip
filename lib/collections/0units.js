import SimpleSchema from "simpl-schema";

Units = new Mongo.Collection("units");

UnitSchema = new SimpleSchema({
  name: String,

  description: {
    type: String,
    optional: true,
  },
});

Units.attachSchema(UnitSchema);
