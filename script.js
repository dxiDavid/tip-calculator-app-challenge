let selectedPercentage = undefined;
const active =  document.querySelector(".selected");

const tipPerPerson = document.querySelector(".tip-amount-value");
const totalBillPerPerson = document.querySelector(".total-amount-value");


const billInput = document.getElementById("total-bill");
const warningBill = document.querySelector(".warning-bill");

//Input for the bill

billInput.addEventListener("input", () => {
	value = Number(billInput.value.toString());
	reset.disabled = false;
	reset.classList.add("reset-active")
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


//Percentage buttons

const percentages = document.querySelectorAll(".percentage-btn");

percentages.forEach((percentage) => {
	percentage.addEventListener("click", (e) => {
		selectedPercentage = e.target.getAttribute("percentage");
		reset.disabled = false;
		reset.classList.add("reset-active")
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


//Input for a custom percentage

const customInput = document.getElementById("custom-percentage");


customInput.addEventListener("input", () => {
	value = Number(customInput.value.toString())
	reset.disabled = false;
	reset.classList.add("reset-active");
	if(value === 0){
		redOutline(customInput)
	} else if(value < 0){
		redOutline(customInput)
	} else if(value > 99){
		redOutline(customInput)
	}
	else{
		defaultOutline(customInput)
	}
	validateDecimalPlaces(customInput);
})

customInput.addEventListener("keydown", (event) => {
	reset.disabled = false;
	if(event.key === "Enter"){
		value = Number(customInput.value.toString())
		roundedValue = parseFloat(value.toFixed(2));
		if(value === 0){
			redOutline(customInput)
		} else if(value === ""){
			redOutline(customInput)
		} else if(value > 99){
			redOutline(customInput)
		} 
		else{
			defaultOutline(customInput)
			calculate(roundedValue * 0.01)
		}
	}
})	


//Input for the number of people

const peopleInput = document.getElementById("number-of-people");
const warningPeople = document.querySelector(".warning-people");


peopleInput.addEventListener("input", (input) => {
	value = Number(peopleInput.value.toString());
	reset.disabled = false;
	reset.classList.add("reset-active")
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

//Reset button

const reset = document.querySelector(".reset");
reset.disabled = true;

reset.addEventListener("click", () => {
	
	reset.classList.remove("reset-active")
	totalBillPerPerson.textContent = "0.00";
	tipPerPerson.textContent = "0.00";
	billInput.value = "";
	peopleInput.value = "";
	customInput.value = "";
	warningBill.style.opacity = "0";
	warningPeople.style.opacity = "0";
	removeStyles(billInput);
	removeStyles(customInput);
	removeStyles(peopleInput);
	selectedNumber = undefined;
	if (!e.target.matches(".selected")) {
		percentages.forEach((e) => e.classList.remove("selected"));
	}
})

//Remove active state on buttons when the user clicks anywhere on the page

document.addEventListener("click", function (e) {
	if (!e.target.matches(".selected")) {
	  percentages.forEach((e) => e.classList.remove("selected"));
	}
	removeStyles(customInput);
	selectedNumber = undefined;
});


//Calculate Function

function calculate(percentage){
	billValue = parseFloat(billInput.value.trim());
	truncatedBillValue = Number(billValue.toFixed(2)); 
	peopleValue = Number(peopleInput.value);

	//calc tip
	personalBill = billValue / Math.trunc(peopleValue);
	personalTip = personalBill * percentage;
	personalBillAndTip = personalBill + personalTip;

	//show results
	totalBillPerPerson.textContent = personalBillAndTip.toFixed(2);
	tipPerPerson.textContent = personalTip.toFixed(2);

	return(totalBillPerPerson, tipPerPerson)

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

function redOutline(element){
	element.classList.add("warning");
	element.classList.remove("default")
}

function defaultOutline(element){
	element.classList.add("default")
	element.classList.remove("warning")
}

function removeStyles(element){
	element.classList.remove("default");
	element.classList.remove("warning");
}