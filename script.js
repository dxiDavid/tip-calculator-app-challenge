/*
	1. Take a bill as a float to two decimal places
		make sure there is a value in the field
		make sure the value is not 0
		make sure the value is not negative
		***Done***

	2. Grab percentage from one button at any given time
		make sure only one is selected at a time
		**Done**

	3. Optionally take a custom value
		the value cannnt be 0 or less
		the value cannot be more than 50%
		the value cannot be blank if it is in focus
		the value cannot be more than 2 decimal places
		**Done**

	4. Take the number of people
		the number of people cannot be 0 0r less
		the number of people cannot have or be a decimal
		**Done**

	5. Calculate the tip and bill per person
		take the bill with an accuracy of two decimal places
		take number of people as a whole number
		take percentage from either the buttons or custom input
			divide the total bill from the input by the number of people,
			multiply the result by the percentage got from the input or button
			add both results
			display tip per person and total bill person
		**Done**

	6. Display output
		Should show 0 if the inputs are incorrect
		should show output to two decimal places **Done**

	7. Remove all warnings and clear output when the reset button is clicked 
		**Done**

		##Find out why the output section shows me NaN when I click on a percentage button without any other parameters.
*/

let selectedPercentage = undefined;
const active =  document.querySelector(".selected");

const tipPerPerson = document.querySelector(".tip-amount-value");
const totalBillPerPerson = document.querySelector(".total-amount-value");


const billInput = document.getElementById("total-bill");
const warningBill = document.querySelector(".warning-bill");


billInput.addEventListener("input", () => {
	value = Number(billInput.value.toString())
	billInput.style.outline = "2px solid hsl(172, 67%, 45%)";
	if(value === 0){
		warning(warningBill, billInput);
	} else if(value < 0){
		redOutline(billInput)
	} else if(value === ""){
		warning(warningBill, billInput);
	}
	else{
		allClear(warningBill, billInput);
	}
	validateDecimalPlaces(billInput);
})

const percentages = document.querySelectorAll(".percentage-btn");

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
		 calculate(selectedPercentage)
	})
})


const customInput = document.getElementById("custom-percentage");

customInput.addEventListener("input", () => {
	value = Number(customInput.value.toString())
	customInput.style.outline = "2px solid hsl(172, 67%, 45%)";
	if(value === 0){
		redOutline(customInput)
	} else if(value < 0){
		redOutline(customInput)
	} else if(value > 50){
		redOutline(customInput)
	}
	else{
		defaultOutline(customInput)
	}
	validateDecimalPlaces(customInput);
})

customInput.addEventListener("keydown", (event) => {
	if(event.key === "Enter"){
		//validateCustomPercentageOnEnter()
		value = Number(customInput.value.toString())
		roundedValue = parseFloat(value.toFixed(2));
		if(value === 0){
			redOutline(customInput)
		} else if(value === ""){
			redOutline(customInput)
		} else if(value > 70){
			redOutline(customInput)
		} 
		else{
			defaultOutline(customInput)
			calculate(roundedValue * 0.01)
		}
	}
})	


const peopleInput = document.getElementById("number-of-people");
const warningPeople = document.querySelector(".warning-people");

peopleInput.addEventListener("input", (input) => {
	value = Number(peopleInput.value.toString());
	peopleInput.style.outline = "2px solid hsl(172, 67%, 45%)";
		if(value === 0){
			warning(warningPeople, peopleInput);
		} else if(value === ""){
			warning(warningPeople, peopleInput);
		} else if(input.target.value.includes(".")){
			redOutline(peopleInput);
		} else if(value < 0){
			redOutline(peopleInput);
		}
		else{
			allClear(warningPeople, peopleInput);
		}
})




const reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
	totalBillPerPerson.textContent = "0.00";
	tipPerPerson.textContent = "0.00";
	billInput.value = "";
	peopleInput.value = "";
	customInput.value = "";
	warningBill.style.opacity = "0";
	warningPeople.style.opacity = "0";
	billInput.style.border = "0"
	billInput.style.outline = "0"
	customInput.style.outline = "0"
	customInput.style.border = "0"
	if (!e.target.matches(".selected")) {
		percentages.forEach((e) => e.classList.remove("selected"));
	  }
	billInput.style.border = "0"
	customInput.value = "";
	customInput.style.border = "0"
	peopleInput.style.border = "0"
	selectedNumber = undefined;
})

document.addEventListener("click", function (e) {
	if (!e.target.matches(".selected")) {
	  percentages.forEach((e) => e.classList.remove("selected"));
	}
	customInput.style.border = "0";
	peopleInput.style.border = "0"
	selectedNumber = undefined;
});


//Main Functions

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

//Utility functions

function validateDecimalPlaces(element){
	const inputValue = element.value;
	const decimalIndex = inputValue.indexOf('.');
	const decimals = inputValue.substring(decimalIndex + 1);
	if(inputValue.includes(".") && decimals.length > 2){
		redOutline(element)
	}
}

function warning(warning, element){
	warning.style.opacity = "1";
	redOutline(element)
}

function allClear(warning, element){
	warning.style.opacity = "0";
	defaultOutline(element)
}

function display0(){
	totalBillPerPerson.textContent = "0";
	tipPerPerson.textContent = "0"
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