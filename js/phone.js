const loadPhones = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
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
  console.log(phonesContainer);
  phones.forEach((phone) => {
    console.log(phone);
    const div = document.createElement("div");
    div.classList = `card bg-base-100 border border-[#0d6efd0d] shadow p-5 rounded-lg`;
    div.innerHTML = `
    <figure class=" bg-[#0d6efd0d] py-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-lg h-[250px]" />
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
loadPhones();
