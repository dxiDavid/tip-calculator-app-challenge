const billInput = document.getElementById("total-bill");
const percentages = document.querySelectorAll(".percentage-btn");
const customInput = document.getElementById("custom-percentage");
const peopleInput = document.getElementById("number-of-people");
const tipPerPerson = document.querySelector(".tip-amount-value");
const totalBillPerPerson = document.querySelector(".total-amount-value");
const reset = document.querySelector(".reset");
const warning = document.querySelector(".warning");
const active =  document.querySelector(".selected");
let selectedPercentage = undefined;


percentages.forEach((percentage) => {
	percentage.addEventListener("click", (e) => {
		selectedPercentage = e.target.getAttribute("percentage");
		
		if(!e.target.classList.contains("selected")){
			e.target.classList.toggle("selected");
		}

		if (e.target.classList.contains("selected")) {
			percentages.forEach((e) => e.classList.remove("selected"));
			percentage.classList.add("selected");
		  }
		  calculate(selectedPercentage);

	})
})

customInput.addEventListener("keydown", (event) => {

	if(event.keyCode === 13){
		validateValue()
	}

})	

billInput.addEventListener("keypress", () => {
	value = Number(billInput.value.toString())
	if(value === 0){
		warning.style.opacity = "1"
	}
	else if(value === ""){
		warning.style.opacity = "1"
	}
})

function validateValue(){
	value = Number(customInput.value.toString())
	if(value === 0){
		warning.style.opacity = "1"
	}
	else if(value === ""){
		warning.style.opacity = "0"
	}
	else{
		calculate(value * 0.01)
	}
}

function calculate(percentage){
	billValue = billInput.value.trim();
	peopleValue = peopleInput.value.trim();
	
	//calc tip
	personalBill = (billValue / peopleValue);
	personalTip = personalBill * percentage;
	personalBillAndTip = personalBill + personalTip;
	//show results
	totalBillPerPerson.textContent = personalBillAndTip;
	tipPerPerson.textContent = personalTip;
}

function valueReset(){
	totalBillPerPerson.textContent = "0";
	tipPerPerson.textContent = "0";
	billInput.value = "";
	peopleInput.value = "";
	customInput.value = "";
	warning.style.opacity = "0"
}

reset.addEventListener("click", () => {
	valueReset()
})

document.addEventListener("click", function (e) {
	if (!e.target.matches(".selected")) {
	  percentages.forEach((e) => e.classList.remove("selected"));
	  customInput.value = "";
	  selectedNumber = undefined;
	}
});