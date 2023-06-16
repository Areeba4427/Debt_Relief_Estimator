var slider1 = document.getElementById("range1");
var slider2 = document.getElementById("range2");

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

function pmt(rate, nper, pv, fv, type) {
  if (!fv) fv = 0;
  if (!type) type = 0;
  rate /= 12 * 100;
  if (rate == 0) return -(fv + pv) / nper;
  var pvif = Math.pow(1 + rate, nper);
  var pmt = -((rate * (fv + pvif * pv)) / (-1 + pvif));
  if (type == 1) pmt /= 1 + rate;
  return pmt;
}

function setValue(elementId, value) {
  var element = document.getElementById(elementId);
  if (element) element.innerHTML = value;
};

function calculateCon() {

  var debt = slider1.value;
  var int = slider2.value;
  var mon = document.getElementById("monthsSelect").value;
  var monthlyPayment = pmt(int, mon, -1 * debt);
  var totalCost = (mon * monthlyPayment);

  setValue("interest_rate2", (slider2.value + "%"));
  setValue("total_int", formatter.format(totalCost - debt));
  setValue("monthly_payment2", (formatter.format(Math.round(monthlyPayment))));
  setValue("total_cost2", formatter.format(Math.round(totalCost)));
  setValue("pay", formatter.format(Math.round(totalCost)));
}

function calculateNot()
{
  var months = 36;
  var totalCost = (slider1.value * 0.64);

  setValue("monthly_payment1", formatter.format(Math.round(totalCost / months)));
  setValue("total_cost", formatter.format(totalCost));
  setValue("saving", formatter.format(Math.round(slider1.value - totalCost)));

}

slider1.addEventListener("input", function () {


  var value = (slider1.value - slider1.min) / (slider1.max - slider1.min) * 100
  slider1.style.background = 'linear-gradient(to right, #85DE4E 0%, #85DE4E ' + value + '%, #ccc ' + value + '%, #ccc 100%)'

  document.getElementById("debt_slider_val").textContent = formatter.format(slider1.value);
  calculateNot()
  calculateCon();
});




slider2.addEventListener("input", function () {
  var value = (slider2.value - slider2.min) / (slider2.max - slider2.min) * 100
  slider2.style.background = 'linear-gradient(to right, #85DE4E 0%, #85DE4E ' + value + '%, #ccc ' + value + '%, #ccc 100%)'

  document.getElementById("rate_slider_value").textContent = slider2.value + "%";

  calculateCon();
});
document.getElementById("monthsSelect").addEventListener("change" , function(){
  calculateCon();
});


window.onload = function () {
  var value = (slider1.value - slider1.min) / (slider1.max - slider1.min) * 100
  slider1.style.background = 'linear-gradient(to right, #85DE4E 0%, #85DE4E ' + value + '%, #ccc ' + value + '%, #ccc 100%)'

  var value = (slider2.value - slider2.min) / (slider2.max - slider2.min) * 100
  slider2.style.background = 'linear-gradient(to right, #85DE4E 0%, #85DE4E ' + value + '%, #ccc ' + value + '%, #ccc 100%)'
}

