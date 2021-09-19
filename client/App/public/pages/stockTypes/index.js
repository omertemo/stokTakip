import Swal from "sweetalert2";
// import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesStockTypes.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockTypes: [],
  });
});

Template.publicPagesStockTypes.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("stockTypes"); //Refresh işleminde yeniden koşulacak

    Meteor.call("stockTypes.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log(result.stockTypes);

        self.state.set("stockTypes", result.stockTypes);
      }
    });
  });
});
Template.publicPagesStockTypes.events({
  "click .brd-delete": function (event, template) {
    const stockType = this;

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
          "stockTypes.delete",
          { _id: stockType._id },
          function (error, result) {
            if (error) {
              console.log("error", error);
            }

            AppUtil.refreshTokens.set("stockTypes", Random.id());
          }
        );
      }
    });
  },
});
