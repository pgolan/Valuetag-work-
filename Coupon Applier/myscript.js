var coupon = "COUPON";
function applyCode() {
	document.getElementById('promoCode').value=coupon;
	console.log('The Coupon to be applied is '+ coupon);
	document.getElementById('updatePromoCode').click();
}
var btn = document.createElement("BUTTON");
console.log('Button Created!');
btn.onclick = applyCode;
btn.innerHTML = "Apply Coupons Automatically";
document.getElementsByClassName('shopCartPromoSec')[0].appendChild(btn);