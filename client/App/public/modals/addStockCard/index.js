import bootstrap from "bootstrap";

Template.publicModalsAddStockCard.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockTypes: [],
    products: [],
    units: [],
  });
});

Template.publicModalsAddStockCard.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById(
    "brdPublicModalsAddStockCardModal"
  );
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdPublicModalsAddStockCardForm").trigger("reset");
  });

  this.autorun(function () {
    AppUtil.refreshTokens.get("StockTypes");
    AppUtil.refreshTokens.get("products");
    AppUtil.refreshTokens.get("units");

    Meteor.call("stockTypes.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        self.state.set("stockTypes", result.stockTypes);
      }
    });
    Meteor.call("products.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        self.state.set("products", result.products);
      }
    });
    Meteor.call("units.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        self.state.set("units", result.units);
      }
    });
  });
});

Template.publicModalsAddStockCard.events({
  "submit form#brdPublicModalsAddStockCardForm": function (event, template) {
    //stockCard Formuna event ataması yapıyoruz(submit)
    event.preventDefault(); //

    const stockTypeId = event.target.stockTypeId.value; //Collection ile eşlemek için değişkenler oluşturuyoruz
    const productId = event.target.productId.value;
    const unitId = event.target.unitId.value;

    const obj = {
      stockCard: {
        //stockCard objesinin oluşturup içeriğini dolduruyoruz
        stockTypeId: stockTypeId,
        productId: productId,
        unitId: unitId,
      },
    };
    console.log("obj");
    console.log(obj);
    console.log("obj-end");
    Meteor.call("stockCards.create", obj, function (error, result) {
      //1. Parametre: atıcağım method'un adı
      //2. Parametre: göndereceğim veriler
      //3. Parametre: callback fonksiyonu -> dönecel verinin içeriği
      if (error) {
        //hata dönecekse hatanın içeriğini bu şekilde
        console.log("error", error);
      }

      console.log(result); //hata gelmeyecekse istediğimiz sonucu bu şekilde görebiliriz
      AppUtil.refreshTokens.set("stockCards", Random.id()); //içerisnde birden fazla reaktif değişken buluna bir obje
      event.target.reset(); // işlem bittikten sonra formu temizler
      template.modal.hide(); //
    });
  },
});
