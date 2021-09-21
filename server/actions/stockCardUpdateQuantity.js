ActionStockCardUpdateQuantity = (_id, productQuantity, type) => {
  let cond = type == "delete" ? -1 : 1;

  StockCards.update(
    { _id: _id },
    {
      $inc: {
        productQuantity: cond * productQuantity,
      },
    }
  );
};
