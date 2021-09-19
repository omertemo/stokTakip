import Swal from "sweetalert2";
// import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesUnits.onCreated(function () {
  this.state = new ReactiveDict(null, {
    units: [],
  });
});

Template.publicPagesUnits.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("units"); //Refresh işleminde yeniden koşulacak

    Meteor.call("units.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log(result.units);

        self.state.set("units", result.units);
      }
    });
  });
});
Template.publicPagesUnits.events({
  "click .brd-delete": function (event, template) {
    const unit = this;

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
          "units.delete",
          { _id: unit._id },
          function (error, result) {
            if (error) {
              console.log("error", error);
            }

            AppUtil.refreshTokens.set("units", Random.id());
          }
        );
      }
    });
  },
});
