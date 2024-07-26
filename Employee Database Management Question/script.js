"use strict";

(async function () {
	const response = await fetch("./data.json");
	const data = await response.json();

	let selectedEmployee;
	let selectedEmployeeId;

	// Selectors related to modal
	const modalCloseBtn = document.querySelector(".btn-close");
	const submitForm = document.querySelector(".btn-submit");
	// const form = document.querySelector(".form");
	const addEmployeeBtn = document.querySelector(".add-employee");

	// addEmployeeBtn.draggable = true;
	const formsubmit = document.querySelector(".form-sbmt");

	function handleSubmitForm(event) {
		event.preventDefault();
		const formData = new FormData(formsubmit);

		for (const iterator of formData.entries()) {
			console.log(iterator);
		}
		console.log(formData.entries());
	}

	formsubmit.addEventListener("submit", handleSubmitForm);

	// add a shadow behind modal
	function handleAddEmployee() {
		document.querySelector(".layer").classList.remove("hidden");
		document.querySelector(".modal").classList.remove("hidden");
	}

	// close modal functionality
	function handleModalCloseBtn() {
		document.querySelector(".layer").classList.add("hidden");
		document.querySelector(".modal").classList.add("hidden");
	}

	// form submit
	// function handleSubmitForm(event) {
	// 	event.preventDefault();
	// 	const name = document.querySelector(".employeeName").value;
	// 	const emailAddress = document.querySelector(".employeeEmail").value;
	// 	const mobileNumber = document.querySelector(".employeeNumber").value;
	// 	const age = document.querySelector(".employeeAge").value;
	// 	const profileImage = document.querySelector(".employeeProfile").value;

	// 	const formData = {
	// 		name,
	// 		emailAddress,
	// 		mobileNumber,
	// 		age,
	// 		profileImage,
	// 	};

	// 	data.push(formData);
	// 	addEmployees();
	// 	employeeInfo.innerHTML = "";
	// 	form.reset();
	// 	handleModalCloseBtn();
	// }

	// Events listeners
	addEmployeeBtn.addEventListener("click", handleAddEmployee);
	modalCloseBtn.addEventListener("click", handleModalCloseBtn);
	// submitForm.addEventListener("click", handleSubmitForm);

	// employees list selector
	const employeeList = document.querySelector(".secondary-navigation");

	function addEmployees() {
		employeeList.innerHTML = "";
		data.forEach((element) => {
			const liELement = document.createElement("li");
			liELement.classList.add("nav-items");

			if (element.id === Number(selectedEmployeeId)) {
				liELement.classList.add("active");
				selectedEmployee = element;
			}

			liELement.setAttribute("id", element.id);

			const aTag = document.createElement("a");
			aTag.setAttribute("href", "#");
			aTag.textContent = `${element.firstName} ${element.lastName}`;
			aTag.setAttribute("id", element.id);

			const closeButton = document.createElement("button");
			closeButton.classList.add("btn");
			closeButton.classList.add("btn-small");
			closeButton.textContent = "Close";

			liELement.appendChild(aTag);
			liELement.appendChild(closeButton);
			employeeList.appendChild(liELement);
		});
	}

	addEmployees();

	const employeeInfo = document.querySelector(".employee-details");
	function showSingleEmpoyeeInfo() {
		console.log(selectedEmployee);
		employeeInfo.innerHTML = `
			<div class="card">
			<div>
			<img src=${selectedEmployee.imageUrl}>
			</div>
		   <div class="employee__info">
			<span>${selectedEmployee.firstName} ${selectedEmployee.lastName}</span>
			<span>${selectedEmployee.email}</span>
			<span>${selectedEmployee.age}</span>
			<span>${selectedEmployee.contactNumber}</span>
		</div>
			</div>
			`;
	}

	function removeEmployee(event) {
		const employeeId = event.target.parentNode.id;
		console.log(employeeId);

		const objectToRemove = data.find((obj) => obj.id === Number(employeeId));
		const indexToRemove = data.indexOf(objectToRemove);

		if (indexToRemove !== -1) {
			data.splice(indexToRemove, 1);
		}

		addEmployees();
		employeeInfo.innerHTML = "";
	}

	// handle employee selection
	function handleUserClick() {
		if (event.target.tagName === "BUTTON") {
			removeEmployee(event);
		} else {
			if (event.target.id !== selectedEmployeeId) {
				selectedEmployeeId = event.target.id;
				addEmployees();
				showSingleEmpoyeeInfo();
			}
		}
	}
	employeeList.addEventListener("click", handleUserClick);
})();
