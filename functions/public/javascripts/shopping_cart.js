function quantity(price, id) {
  console.log("price:", price, " ", id);
  let quant = document.getElementById("quan" + id).value;
  console.log(quant);
  let total = price * quant;
  document.getElementById("quant_total" + id).innerHTML = total;
}
