let searchTextForShowAllBtn;
const handleShowSpinner = (isLoading) => {
  const spinnerContainer = document.getElementById("spinner-container");
  const phones = document.getElementById("phones");
  if (isLoading) {
    phones.classList.add("hidden");
    spinnerContainer.classList.remove("hidden");
    spinnerContainer.classList.add("flex");
  } else {
    phones.classList.remove("hidden");
    spinnerContainer.classList.remove("flex");
    spinnerContainer.classList.add("hidden");
  }
};
// Functionallity for search phones!
const searchInput = document.getElementById("search-input");
document.getElementById("search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  // handleShowSpinner(true);
  const searchText = searchInput.value;
  searchTextForShowAllBtn = searchText;
  // console.log(searchText);
  searchInput.value = "";
  if (!searchText) {
    alert("Search field is empty!");
    return;
  }
  loadPhones(searchText);
});
// function handleShowAll(searchText) {
//   loadPhones(searchText, true);
// }
document.getElementById("show-all").addEventListener("click", (e) => {
  console.log(searchTextForShowAllBtn);
  loadPhones(searchTextForShowAllBtn, true);
});
async function loadPhones(searchText = "iphone", isShowAll) {
  handleShowSpinner(true);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    let phones = data.data;
    // console.log(phones);
    if (!phones.length) {
      handleShowSpinner(false);
      document.getElementById("phones").classList.add("hidden");
      document.getElementById("not-available").classList.remove("hidden");
      // document.getElementById("spinner-container").classList.add("hidden");
      return;
    }
    const shortListOfPhones = phones.slice(0, 12);
    const showAllBtn = document.getElementById("show-all");
    if (phones.length > 12 && !isShowAll) {
      showAllBtn.classList.remove("hidden");
    } else {
      showAllBtn.classList.add("hidden");
    }
    if (!isShowAll) {
      phones = phones.slice(0, 12);
    }
    setTimeout(() => {
      displayPhones(phones);
    }, 2000);
    // displayPhones(phones);
    // return phones;
  } catch (e) {
    console.error(e.message);
  }
}

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
  // const showAllBtn = document.getElementById("show-all");
  // if (phones.length > 12 && !isShowAll) {
  //   showAllBtn.classList.remove("hidden");
  // } else {
  //   showAllBtn.classList.add("hidden");
  // }
  // if (!isShowAll) {
  //   phones = phones.slice(0, 12);
  // }

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
        <button
         onclick={handleShowDetails("${phone?.slug}")};
        class="btn-primary py-2.5 px-4 font-semibold">Show Details</button>
    </div>
    `;
    phonesContainer.appendChild(div);
  });
  handleShowSpinner(false);
  // const button = document.createElement("button");
  // button.innerText = "Show All";
  // button.classList = "my-8 btn-primary";
  // document.getElementById("phones").appendChild(button);
}
loadPhones();

// Function for show specific Phone details
async function handleShowDetails(phoneId) {
  // console.log(phoneId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${phoneId}`
  );
  const data = await res.json();
  const phoneDetailes = data.data;
  displayShowDetailesModal(phoneDetailes);
}
function displayShowDetailesModal(phoneDetailes) {
  console.log(phoneDetailes);
  const { name, image, brand, slug, others, releaseDate, mainFeatures } =
    phoneDetailes;
  const showPhoneDetailes = document.getElementById("show_phone_detailes");
  showPhoneDetailes.innerHTML = `
  <div class="p-5 rounded-md modal-box md:p-8">
  <div class="py-8 bg-secondary">
      <img src=${image} alt=${name} class="w-[265px] md:h-[380px] mx-auto"
          draggable="false">
  </div>
  <div class="mt-8">
      <div class="mb-4 space-y-5">
          <h3 class="text-3xl font-bold text-title">${name}</h3>
          <p>It is a long established fact that a reader will be distracted by the readable content of
              a page
              when
              looking at its layout.</p>
      </div>
      <div class="space-y-3">
          <p class="text-lg md:text-xl"><span class="font-semibold text-title">Storage </span>:
              ${mainFeatures?.storage || "N/A"}
              Storage, No card slot</p>
          <p class="text-lg md:text-xl"><span class="font-semibold text-title">Display Size </span>:
              ${mainFeatures?.displaySize || "N/A"}</p>
          <p class="text-lg md:text-xl"><span class="font-semibold text-title">Chipset </span>: ${
            mainFeatures?.chipSet || "N/A"
          }</p>
          <p class="text-lg md:text-xl"><span class="font-semibold text-title">Memory </span>: ${
            mainFeatures?.memory || "N/A"
          }</p>
          <p class="text-lg md:text-xl"><span class="font-semibold text-title">Slug </span> : ${
            slug || "N/A"
          }</p>
          <p class="text-lg md:text-xl"><span class="font-semibold text-title">Release data </span>:
              ${releaseDate || "N/A"}</p>
          <p class="text-lg md:text-xl"><span class="font-semibold text-title">Brand </span>: ${brand}
          </p>
          <p class="text-lg md:text-xl"><span class="font-semibold text-title">GPS </span>: ${
            others?.GPS || "N/A"
          }</p>
      </div>
  </div>
  <div class="modal-action">
      <form method="dialog">
          <button class="btn bg-[#DC3545] hover:bg-[#DC3545] text-white">Close</button>
      </form>
  </div>
</div>  
  `;
  show_phone_detailes.showModal();
}
