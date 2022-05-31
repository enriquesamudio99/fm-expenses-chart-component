const spendingLabels = document.getElementById('spendingLabels');
const spendingChart = document.getElementById('spendingChart');

const currentDay = new Date().getDay();

document.addEventListener("DOMContentLoaded", () => {
    getData();
});

async function getData() {

    try {
        
        const response = await fetch("./data.json");
        const dataArr = await response.json();

        setData(dataArr);

    } catch (error) {
        
        console.log(error);

    }

}


function setData(dataArr) {

    const dayArr = dataArr.map((data) => data.day);
    const maxAmount = Math.max(...dataArr.map((data) => data.amount));

    dataArr.forEach(({day, amount}) => {
        
        // Spending bar container
        const spendingBarContainer = document.createElement("div");
        spendingBarContainer.classList.add("spending__bar-container");

        // Set the height
        if (maxAmount === amount) {
            setTimeout(() => {
                spendingBarContainer.style.height = "100%";
            }, 50);
        } else {
            setTimeout(() => {
                const spendingBarHeight = ((amount * 100) / maxAmount).toFixed(2);
                spendingBarContainer.style.height = `${spendingBarHeight}%`;
            }, 50);
        }

        const spendingBar = document.createElement("div");
        spendingBar.classList.add("spending__bar");
        if (dayArr[currentDay] === day) spendingBar.classList.add("spending__bar--current");

        const spendingBarLabel = document.createElement("span");
        spendingBarLabel.classList.add("spending__bar-label");
        spendingBarLabel.textContent = `$${amount}`;

        spendingBarContainer.appendChild(spendingBar);
        spendingBarContainer.appendChild(spendingBarLabel);

        spendingChart.appendChild(spendingBarContainer);

        // Spending Label
        const spendingLabel =  document.createElement("span");
        spendingLabel.classList.add("spending__label");
        spendingLabel.textContent = day;

        spendingLabels.appendChild(spendingLabel);

    });

}