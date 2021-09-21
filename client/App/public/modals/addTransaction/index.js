import bootstrap from "bootstrap";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicModalsAddTransaction.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockCards: [],
  });
});

Template.publicModalsAddTransaction.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById(
    "brdPublicModalsAddTransactionModal"
  );
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdPublicModalsAddTransactionForm").trigger("reset");
  });
});

Template.publicModalsAddTransaction.events({
  "submit form#brdPublicModalsAddTransactionForm": function (event, template) {
    event.preventDefault();

    const stockCardId = FlowRouter.getParam("stockCardId");
    const productQuantity = event.target.productQuantity.value;
    const transactionType = event.target.transactionType.value;
    const price = event.target.price.value;

    const obj = {
      stockTransaction: {
        stockCardId: stockCardId,
        productQuantity: parseInt(productQuantity),
        transactionType: transactionType,
        price: parseInt(price),
      },
    };
    console.log(obj);
    Meteor.call("stockTransactions.create", obj, function (error, result) {
      if (error) {
        console.log("error", error);
      }

      console.log(result); //hata gelmeyecekse istediğimiz sonucu bu şekilde görebiliriz
      AppUtil.refreshTokens.set("stockTransactions", Random.id()); //içerisnde birden fazla reaktif değişken buluna bir obje
      event.target.reset(); // işlem bittikten sonra formu temizler
      template.modal.hide(); //
    });
  },
});
