const loadPhones = async (searchText = "iphone") => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    if (!phones.length) {
      document.getElementById("phones").classList.add("hidden");
      document.getElementById("not-available").classList.remove("hidden");
      return;
    }
    displayPhones(phones);
    // return phones;
  } catch (e) {
    console.error(e.message);
  }
};

// const phones = loadPhones();
// console.log(phones);

function displayPhones(phones) {
  //   console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  // console.log(phonesContainer.innerHTML);
  document.getElementById("not-available").classList.add("hidden");
  document.getElementById("phones").classList.remove("hidden");
  phonesContainer.innerHTML = phonesContainer.innerHTML && "";
  //   console.log(phonesContainer);
  phones.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.classList = `card bg-base-100 border border-[#0d6efd0d] shadow p-5 rounded-lg`;
    div.innerHTML = `
    <figure class=" bg-secondary py-10 lg:py-12">
        <img src="${phone.image}" alt="${phone.phone_name}" class="rounded-lg h-[250px] object-cover bg-transparent" draggable="false"/>
    </figure>
    <div class="text-center space-y-2">
        <h3 class="text-2xl font-bold my-5">${phone.phone_name}</h3>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <h4 class="text-2xl font-bold">$999</h4>
        <button class="btn-primary py-2.5 px-4 font-semibold">Show Details</button>
    </div>
    `;
    phonesContainer.appendChild(div);
  });
}

// Functionallity for search phones!
const searchInput = document.getElementById("search-input");
document.getElementById("search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const searchText = searchInput.value;
  // console.log(searchText);
  searchInput.value = "";
  if (!searchText) {
    alert("Search Filed is empty!");
    return;
  }
  loadPhones(searchText);
});

loadPhones();
