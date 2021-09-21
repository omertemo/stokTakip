import Swal from "sweetalert2";
// import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.publicPagesProducts.onCreated(function () {
  this.state = new ReactiveDict(null, {
    products: [],
  });
});

Template.publicPagesProducts.onRendered(function () {
  const self = this; //this' e sonradan ulaşamayacağımız için self' e setliyoruz

  this.autorun(function () {
    AppUtil.refreshTokens.get("products"); //Refresh işleminde yeniden koşulacak

    Meteor.call("products.list", {}, function (error, result) {
      //1. Çağrılacak metodun adı
      //2. gönderilern obje(Burda bişey göndermiyoru)
      //3. Callback fonksiyonu
      if (error) {
        //hata varsa hatayı bastır
        console.log("error", error);
      }
      if (result) {
        //Hata yok ve sonuç varsa sonucu bastır
        console.log(result.products);

        self.state.set("products", result);
      }
    });
  });
});
Template.publicPagesProducts.events({
  "click .brd-delete": function (event, template) {
    //.brd-delete butonuna bir click event' i veriyoruz
    const product = this; //self misali, this'i product'a setliyoruz

    Swal.fire({
      //Swal kütüphanesini kullanarak güzel bir ekranın gelmesini sağlıyoruz
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
          "products.delete", // delete metodunu çağırıyoruz
          { _id: product._id }, // silinecek olan id atamasını yapıyoruz heralde
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
