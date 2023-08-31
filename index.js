const loadData = async (searchText = "a", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;

  if (phones.length === 0) {
    document.getElementById("validation-container").innerText = "Not Found";
    loading(false);
  }

  displayData(phones, isShowAll);
};

const displayData = (phones, isShowAll) => {
  const cardContainer = document.getElementById("card-container");
  // cardContainer.innerHTML = "";

  const ShowAllBtnContainer = document.getElementById("show-all-btn-container");
  if (phones.length > 12 && !isShowAll) {
    ShowAllBtnContainer.classList.remove("hidden");
  } else {
    ShowAllBtnContainer.classList.add("hidden");
  }

  console.log(isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  } else {
    phones = phones;
  }

  console.log(phones);

  phones.forEach((phone) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure class="px-10 pt-10">
      <img
        src="${phone.image}"
        alt="Shoes"
        class="rounded-xl"
      />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>There are many variations of passages of available, but the majority have suffered</p>
      <div class="card-actions">
      <button onclick="loadphoneDetails('${phone.slug}')"
      class="btn btn-info capitalize btn-sm rounded bg-blue-400 text-white"
    >
    Show Details
    </button>
      </div>
    </div>
  </div>
    `;
    cardContainer.appendChild(card);
    loading(false);
  });
};

let value;

const handleSearchBtn = (isShowAll) => {
  const inputField = document.getElementById("input-field").value;
  const searchValue = inputField || value;
  value = searchValue;
  loadData(searchValue, isShowAll);
  document.getElementById("input-field").value = "";
  loading(true);
};

// Focus
const handleShowAllBtn = () => {
  handleSearchBtn(true);
};

const loading = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const loadphoneDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  displayPhoneDetails(phoneDetails);
};

const displayPhoneDetails = (phoneDetails) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `

  <form method="dialog" class="modal-box">
  <img
  src="${phoneDetails.image}"
  alt="Shoes"
  class="rounded-xl"
/>
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>

  `;
  details_btn_modal.showModal();
};

loadData();
