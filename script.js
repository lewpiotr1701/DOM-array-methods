// @ts-nocheck
const main = document.querySelector("#main");

// Buttons
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");

let data = [];

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires)
sortBtn.addEventListener("click", sortUsers);
calculateWealthBtn.addEventListener("click", calculateWealth);


// Fetch random user and add money
async function getRandomUser() {

    // fetch("https://randomuser.me/api/")
    //     .then(response => response.json())
    //     .then(data => console.log(data));

    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Add new user to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    const fragment = document.createDocumentFragment();

    providedData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoneyStyle(item.money)}`;
        fragment.appendChild(element);
    })

    main.appendChild(fragment);
}

// Change money format style
function formatMoneyStyle(money) {
    const newFormat = Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD"
    }).format(money);

    return newFormat;
}

// Double everyones money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// Sort users in descending order based on their wealth
function sortUsers() {
    data.sort((a, b) => {
        return b.money - a.money;
    });

    updateDOM();
}

// Show only millionaires
function showMillionaires() {
    data = data.filter(user => {
        return user.money >= 1000000;
    });

    updateDOM();
}

// Calculate wealth of all users
function calculateWealth() {
    const totalWealth = data.reduce((accumulator, user) => {
        return accumulator + user.money
    }, 0);

    // Check if wealthEl already exists in DOM
    if (document.querySelector(".total")) {
        document.querySelector(".total").remove();
    }

    const wealthEl = document.createElement("div");
    wealthEl.classList.add("total");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoneyStyle(totalWealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
