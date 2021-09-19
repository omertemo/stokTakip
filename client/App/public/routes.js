import { FlowRouter } from "meteor/ostrio:flow-router-extra";

FlowRouter.route("/", {
  name: "public.home",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesHome" });
  },
});
FlowRouter.route("/products", {
  name: "public.products",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesProducts" });
  },
});
FlowRouter.route("/stockCards", {
  name: "public.stockCards",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesStockCards" });
  },
});
FlowRouter.route("/stockTransActions/:stockCardId", {
  name: "public.stockTransActions",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", {
      page: "publicPagesStockTransactions",
    });
  },
});
FlowRouter.route("/stockTypes", {
  name: "public.stockTypes",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesStockTypes" });
  },
});
FlowRouter.route("/units", {
  name: "public.units",
  action: function (params, queryParams) {
    this.render("publicLayoutsDefault", { page: "publicPagesUnits" });
  },
});
