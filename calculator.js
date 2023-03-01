/*
	Take a bill with two decimal places
	Take number of people as a whole number
	Take custom percentage to two decimal places
*/

const billInput = document.getElementById("total-bill");
const percentages = document.querySelectorAll(".percentage-btn");
const customInput = document.getElementById("custom-percentage");
const peopleInput = document.getElementById("number-of-people");
const tipPerPerson = document.querySelector(".tip-amount-value");
const totalBillPerPerson = document.querySelector(".total-amount-value");
const reset = document.querySelector(".reset");
const warningBill = document.querySelector(".warning-bill");
const warningPeople = document.querySelector(".warning-people");
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

billInput.addEventListener("input", () => {
	value = Number(billInput.value.toString())
	billInput.style.outline = "2px solid hsl(172, 67%, 45%)";
	if(value === 0){
		warning(warningBill, billInput);
	}
	else if(value === ""){
		warning(warningBill, billInput);
	}
	else{
		allClear(warningBill, billInput);
	}
	validatePrice(billInput)
})


//validate custom input when typing
customInput.addEventListener("input", () => {
	value = Number(customInput.value.toString())
	customInput.style.outline = "2px solid hsl(172, 67%, 45%)";
	if(value === 0){
		redOutline(customInput)
	}
	else if(value < 0){
		redOutline(customInput)
	}
	else if(value > 50){
		redOutline(customInput)
	}
	else{
		defaultOutline(customInput)
	}
	
})

//calculate tip from the custom field when the enter key is pressed
customInput.addEventListener("keydown", (event) => {
	if(event.keyCode === 13){
		validateCustomPercentageOnEnter()
	}
})	

peopleInput.addEventListener("input", (e) => {
	value = Number(peopleInput.value.toString());
	peopleInput.style.outline = "2px solid hsl(172, 67%, 45%)";
		if(value === 0){
			warning(warningPeople, peopleInput);
		}
		else if(value === ""){
			warning(warningPeople, peopleInput);
		}
		else if(e.target.value.includes(".")){
			redOutline(peopleInput);
		}
		else if(value < 0){
			redOutline(peopleInput);
		}
		else{
			allClear(warningPeople, peopleInput);
		}
})

//remove styles on clicking anywhere
document.addEventListener("click", function (e) {
	if (!e.target.matches(".selected")) {
	  percentages.forEach((e) => e.classList.remove("selected"));
	  customInput.value = "";
	  customInput.style.border = "0"
	  peopleInput.style.border = "0"
	  selectedNumber = undefined;
	}
});

reset.addEventListener("click", () => {
	valueReset()
})

//Main Functions

function validatePrice(element){
	const inputValue = element.value;
	const decimalIndex = inputValue.indexOf('.');
	const decimals = inputValue.substring(decimalIndex + 1);
	if(inputValue.includes(".") && decimals.length > 2){
		redOutline(element)
	}
}

function calculate(percentage){
	billValue = parseFloat(billInput.value.trim());
	truncatedBillValue = Number(billValue.toFixed(2)); 
	peopleValue = Number(peopleInput.value);
	//calc tip
	personalBill = billValue / Math.trunc(peopleValue);
	personalTip = personalBill * percentage;
	personalBillAndTip = personalBill + personalTip;

	//show results
	if(billValue === undefined && peopleValue === undefined ){
		totalBillPerPerson.textContent = "0.00";
		tipPerPerson.textContent = "0.00";
	}
	else{
		totalBillPerPerson.textContent = personalBillAndTip.toFixed(2);
		tipPerPerson.textContent = personalTip.toFixed(2);
	}
}

function validateCustomPercentageOnEnter(){
	value = Number(customInput.value.toString())
	truncatedValue = parseFloat(value.toFixed(2));
	if(value === 0){
		redOutline(customInput)
	}
	else if(value === ""){
		redOutline(customInput)
	}
	else{
		defaultOutline(customInput)
		calculate(truncatedValue * 0.01)
	}
}

function valueReset(){
	totalBillPerPerson.textContent = "0";
	tipPerPerson.textContent = "0";
	billInput.value = "";
	peopleInput.value = "";
	customInput.value = "";
	warningBill.style.opacity = "0";
	warningperson.style.opacity = "0";
	billInput.style.border = "0"
	billInput.style.outline = "0"
	customInput.style.outline = "0"
	customInput.style.border = "0"
}

//utility functions

function warning(warning, element){
	warning.style.opacity = "1";
	redOutline(element)
}

function allClear(warning, element){
	warning.style.opacity = "0";
	defaultOutline(element)
}

function validateInput(value, warningElement){
	if(value === 0){
		redOutline(warningElement)
	}
	else if(value === ""){
		redOutline(warningElement)
	}
	else{
		defaultOutline(warningElement)
	}
}

function redOutline(element){
	element.style.border = "2px solid red";
	element.style.outline = "0";
}

function defaultOutline(element){
	element.style.border = "2px solid hsl(172, 67%, 45%)";
	element.style.outline = "0";
}

//Add a check to make sure that the number of people is not a decimal --done
//Add a check to make sure that the number of people is not negative 
//add a check to make sure that custom value is not negative
//Add a check to make sure that there is no calculation done if there are empty fields and display math error on output
//Make sure the reset button works properly
