(() => {
	const hourInput = document.querySelector<HTMLInputElement>("#hours");
	const minuteInput = document.querySelector<HTMLInputElement>("#minutes");
	const secondInput = document.querySelector<HTMLInputElement>("#seconds");
	const startStopTimerBtn =
		document.querySelector<HTMLButtonElement>("#start");
	const resetButton = document.querySelector<HTMLButtonElement>("#reset");

	let isRunning = false;
	let timerReference: number | undefined;

	const startStopTimer = () => {
		if (!hourInput || !minuteInput || !secondInput || !startStopTimerBtn)
			return;

		const hours = parseInt(hourInput.value, 10) || 0;
		const minutes = parseInt(minuteInput.value, 10) || 0;
		const seconds = parseInt(secondInput.value, 10) || 0;
		let totalSeconds = hours * 3600 + minutes * 60 + seconds;

		if (isRunning) {
			clearInterval(timerReference);
			isRunning = false;
			startStopTimerBtn.textContent = "Start";
			return;
		}

		if (!totalSeconds) return;

		timerReference = setInterval(() => {
			if (totalSeconds > 0) {
				totalSeconds = totalSeconds - 1;
				updateTime(totalSeconds);
			} else {
				clearInterval(timerReference);
				alert("Time's up!");
				startStopTimerBtn.textContent = "Start";
				isRunning = false;
				resetInputs();
			}
		}, 1000);

		isRunning = true;
		startStopTimerBtn.textContent = "Stop";
	};

	const updateTime = (totalSeconds: number) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		if (!hourInput || !minuteInput || !secondInput) return;

		if (hours > 0 || hourInput.value)
			hourInput.value = String(hours).padStart(2, "0");
		if (minutes > 0 || minuteInput.value)
			minuteInput.value = String(minutes).padStart(2, "0");
		if (seconds > 0 || secondInput.value)
			secondInput.value = String(seconds).padStart(2, "0");
	};

	const resetInputs = () => {
		if (!hourInput || !minuteInput || !secondInput || !startStopTimerBtn)
			return;
		clearInterval(timerReference);
		isRunning = false;
		startStopTimerBtn.textContent = "Start";
		hourInput.value = "";
		minuteInput.value = "";
		secondInput.value = "";
	};

	if (startStopTimerBtn) {
		startStopTimerBtn.addEventListener("click", startStopTimer);
	}
	if (resetButton) {
		resetButton.addEventListener("click", resetInputs);
	}
})();
