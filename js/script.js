// console.log("Hello js World!");

// Initial contacts data
let contacts = [
  {
    name: "Maxwell Wright",
    phone: "019171916495",
    email: "contact1@cctb.com",
  },

  {
    name: "Raja Villarreal",
    phone: "0863982895",
    email: "contact2@cctb.com",
  },
  {
    name: "Helen Richards",
    phone: "080031111",
    email: "contact3@cctb.edu",
  },
];

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  //   console.log(color);
  return color;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomColor();
  console.log("Contacts count:", contacts.length);
}

document.addEventListener("DOMContentLoaded", () => {
  changeBackgroundColor();
  setInterval(changeBackgroundColor, 5000);
});

function update_contact() {
  setTimeout(show_contact, 3000, getContactItemhtml); // call back function
}

function show_contact(get_contact_by_certain_html_style) {
  let htmlStr = "";
  for (let i = 0; i < contacts.length; i++) {
    htmlStr += get_contact_by_certain_html_style(contacts[i]); // call back functione
  }
  // document.getElementById("contactInfo").innerHTML = getContactItemhtml(
  //     contacts[0]
  //   );
  document.getElementById("contactInfo").innerHTML = htmlStr;
  let dd = new Date();

  document.getElementById("sys_msg").innerHTML =
    "Contacts updated at " + dd.toLocaleTimeString();
}

function add_new_contact() {
  let name = "";
  let phone = "";
  let email = "";
  do {
    name = prompt("Please enter the contact name: ");
  } while (is_empty(name));
  // {
  //   name = prompt("Input empty! Please re-enter the contact name: ");
  // }

  do {
    phone = prompt("Please enter the contact phone: ");
  } while (is_empty(phone));
  // {
  //   phone = prompt("Input empty! Please re-enter the contact phone: ");
  // }

  do {
    email = prompt("Please enter the contact email: ");
  } while (is_empty(email));
  // {
  //   email = prompt("Input empty! Please re-enter the contact email: ");
  // }

  let contact = {
    name: name,
    phone: phone,
    email: email,
  };
  contacts.push(contact);
}

function find_contact_by_name(name) {
  // get user input
  let nameAsk = "";
  do {
    nameAsk = prompt("Please enter the name, you want to search: ");
  } while (is_empty(nameAsk));
  // {
  //   nameAsk = prompt("Input empty! Please re-enter the searching name: ");
  // }

  // check exist result
  let hasContactResult = hasContact(nameAsk);

  // if not found
  if (hasContactResult == false) {
    document.getElementById("found_contacts").innerHTML = "";
    document.getElementById("find_msg").innerText = "Name not found";
    return;
  }

  // if found
  let indexList = getAllContactIndex(nameAsk);

  let htmlStr = "";
  indexList.forEach((index) => {
    htmlStr += getContactItemhtml(contacts[index]);
  }); // arrow function

  document.getElementById("find_msg").innerText = "found";
  document.getElementById("found_contacts").innerHTML = htmlStr;
}

function hasContact(name) {
  // console.log(name);

  let index = 0;
  return recursiveSearchContact(name, index);

  // for (let i = 0; i < contacts.length; i++) {
  //   if (String(contacts[i].name).toLowerCase() == String(name).toLowerCase())
  //     return true;
  // }
  // return false;
}

function recursiveSearchContact(name, index) {
  if (index >= contacts.length) return false;
  if (String(contacts[index].name).toLowerCase() == String(name).toLowerCase())
    return true;
  return recursiveSearchContact(name, index + 1);
}

function getAllContactIndex(name) {
  let indexList = [];
  contacts.forEach((item, index) => {
    if (item.name === name) {
      indexList.push(index);
    }
  });
  return indexList;
}

function is_empty(value) {
  // console.log(value);
  if (value == null || value == "") return true;
  return false;
}

function getContactItemhtml(contact) {
  return `<h3> Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email} <br> </h3>`;
}
