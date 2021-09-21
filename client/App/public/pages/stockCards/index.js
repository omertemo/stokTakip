import Swal from "sweetalert2";

Template.publicPagesStockCards.onCreated(function () {
  this.state = new ReactiveDict(null, {
    stockCards: [], //Ekranda gösterilecek stokCardlar için bir dizi tanımlıyoruz(heralde)
    // productQuantity: 0, //burası sıkıntılı
  });
});

Template.publicPagesStockCards.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("stockCards"); //Refresh işleminde yeniden koşulacak

    Meteor.call("stockCards.list", {}, function (error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log(result);

        self.state.set("stockCards", result);
      }
    });
  });
});

Template.publicPagesStockCards.events({
  "click .brd-delete": function (event, template) {
    const stockCard = this;

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
          "stockCards.delete",
          { _id: stockCard._id },
          function (error, result) {
            if (error) {
              console.log("error", error);
            }

            AppUtil.refreshTokens.set("stockCards", Random.id());
          }
        );
      }
    });
  },
  "click .brd-transacions": function (event, template) {
    //boş olabilir
  },
});
