import Swal from "sweetalert2";
// import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesStockTransactions.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockTransactions: [], //yeni bir dizi oluşturuyorum
    // productQuantity: 0, //aynı zamanda yeni bir değişken oluşturuyorum(Yanlışını gör. Böyle bişey yok)
    stockCards: [], //Bunu niye oluşturduğumu anladığımda açıklamayı değiştirecem
  });
});

Template.publicPagesStockTransactions.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("stockTransactions"); //Refresh işleminde yeniden koşulacak
    AppUtil.refreshTokens.get("productQuantity");

    Meteor.call("stockTransactions.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log(result.stockTransactions);

        self.state.set("stockTransactions", result.stockTransactions);
      }
    });
  });
});
Template.publicPagesStockTransactions.events({
  "click .brd-delete": function (event, template) {
    const stockTransactions = this;

    Swal.fire({
      title: "Silmek istiyor musunuz?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--bs-danger)",
      cancelButtonColor: "var(--bs-dark)",
      cancelButtonText: "Hayır",
      confirmButtonText: "Evet",
    }).then((result) => {
      if (result.value) {
        Meteor.call(
          "stockTransactions.delete",
          { _id: stockTransactions._id },
          function (error, result) {
            if (error) {
              console.log("error", error);
            }

            AppUtil.refreshTokens.set("stockTransactions", Random.id());
          }
        );
      }
    });
  },
});
