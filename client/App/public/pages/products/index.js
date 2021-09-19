import Swal from "sweetalert2";
// import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesProducts.onCreated(function () {
  this.state = new ReactiveDict(null, {
    products: [],
  });
});

Template.publicPagesProducts.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("products"); //Refresh işleminde yeniden koşulacak

    Meteor.call("products.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log(result.products);

        self.state.set("products", result.products);
      }
    });
  });
});
Template.publicPagesProducts.events({
  "click .brd-delete": function (event, template) {
    const product = this;

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
          "products.delete",
          { _id: product._id },
          function (error, result) {
            if (error) {
              console.log("error", error);
            }

            AppUtil.refreshTokens.set("products", Random.id());
          }
        );
      }
    });
  },
});
