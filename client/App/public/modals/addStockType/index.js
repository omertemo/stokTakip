import bootstrap from "bootstrap";

Template.publicModalsAddStockType.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById(
    "brdPublicModalsAddStockTypeModal"
  );
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("form#brdPublicModalsAddStockTypeForm").trigger("reset");
  });
});

Template.publicModalsAddStockType.events({
  "submit form#brdPublicModalsAddStockTypeForm": function (event, template) {
    event.preventDefault();

    const name = event.target.name.value;
    const description = event.target.description.value;

    const obj = {
      stockType: {
        name: name,
        description: description,
      },
    };

    Meteor.call("stockTypes.create", obj, function (error, result) {
      //1. Parametre: atıcağım method'un adı
      //2. Parametre: göndereceğim veriler
      //3. Parametre: callback fonksiyonu -> dönecel verinin içeriği
      if (error) {
        //hata dönecekse hatanın içeriğini bu şekilde
        console.log("error", error);
      }

      console.log(result); //hata gelmeyecekse istediğimiz sonucu bu şekilde görebiliriz
      AppUtil.refreshTokens.set("stockTypes", Random.id()); //içerisnde birden fazla reaktif değişken buluna bir obje
      event.target.reset(); // işlem bittikten sonra formu temizler
      template.modal.hide(); //
    });
  },
});
