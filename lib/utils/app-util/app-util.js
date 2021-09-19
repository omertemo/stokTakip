AppUtil = {
  temp: new ReactiveDict(null, {}), // Bir değer değiştiğinde bunu get eden her yerin yeniden çalışmasına yarar(istediğimiz zaman erişebilmek için)
  // AppUtil ne kadar şişerse uygulamaya o kadar zarar verir.
  refreshTokens: new ReactiveDict(null, {}),
  //Bir şeyi yenilemek istiyorsak ona ye
  reset: function () {
    AppUtil.temp.clear();
    AppUtil.refreshTokens.clear();
  },
};

Template.registerHelper("appUtil", function () {
  return AppUtil;
});

//uygulamayı yöneten bir obje denebilir
// Bir objenin içerisinde başka bir değeri çağırabiliyır ve fonksiyon yazabiliyor olmamız js' nin en büyük avantajlarından dır.
//
