const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => {
      displayClean();
      displayItems(data.data, "1000");
    });
};

const loadMusic = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1001")
    .then((res) => res.json())
    .then((data) => {
      displayClean();
      displayItems(data.data, "1001");
    });
};

const loadComedy = () => {
  const itemContainer = document.getElementById("item_container");
  fetch("https://openapi.programming-hero.com/api/videos/category/1003")
    .then((res) => res.json())
    .then((data) => {
      displayClean();
      displayItems(data.data, "1003");
    });
};
const loadDrawing = () => {
  displayClean();
  const itemContainer = document.getElementById("item_container");
  fetch("https://openapi.programming-hero.com/api/videos/category/1005")
    .then((res) => res.json())
    .then((data) => {
      if (data.status == false) {
        const noItem = document.createElement("div");
        noItem.classList.add("no_content");
        noItem.innerHTML = `
            <img src="./Icon.png" alt="...">
            <h1>Opps !! There is no</h1>
            <h1>content here</h1>
            `;
        itemContainer.appendChild(noItem);
      } else {
        displayClean();
        displayItems(data.data, "1005");
      }
    });
};

const displayItems = (items, id) => {
  console.log(items);
  const itemContainer = document.getElementById("item_container");
  const setId = document.getElementById("category_id");
  setId.innerHTML = id;

  items.forEach((item) => {
    console.log(item);
    let uploadTime = "";
    if (item.others.posted_date != "") {
      uploadTime = displayTime(item.others.posted_date);
    }

    console.log(uploadTime);
    const card = document.createElement("div");
    card.classList.add("itemCard");
    card.innerHTML = `
        <div class="card m-3" style="width: 18rem; height: 22rem ">
            <div class = "thumb_pic">
                <img class="tube_thumb" src=${
                  item.thumbnail
                } class="card-img" alt="...">
                <div class="time_text">
                    <p class="card-text"><small class="text-body-secondary">${uploadTime}</small></p>
                </div>
            </div>
            <div class="card-body">
                <div class="d-flex">
                    <div style = "width:100px">
                        <img src=${
                          item.authors[0].profile_picture
                        } class="card_pro_img" alt="...">
                    </div>
                    <div>
                        <div>
                            <p class="card-title">${item.title}</p>
                        </div>
                        <div class = "d-flex gap-2">
                            <div>
                            <p class="card-text">${
                              item.authors[0].profile_name
                            }</p>
                            </div>

                            <div>
                            ${
                              item.authors[0].verified
                                ? ` <img src="./Group 3.png" class="verify" style="width:15px; height:15px;" alt="...">`
                                : ""
                            }
                            </div>
                        </div>
                        <div>
                            <p class="card-text"><small class="text-body-secondary"> Views: ${
                              item.others.views
                            }</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    itemContainer.appendChild(card);
  });
};

const sort = () => {
  const id = document.getElementById("category_id").innerHTML;

  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const sortData = data.data.sort(function (first, second) {
        return parseInt(second.others.views) - parseInt(first.others.views);
      });
      displayClean();
      displayItems(sortData);
    });
};

const displayClean = () => {
  const itemContainer = document.getElementById("item_container");
  itemContainer.innerHTML = "";
};

const displayTime = (second) => {
  var second = parseInt(second);
  var hour = Math.floor(second / (3600 * 24));
  second -= hour * 3600 * 24;

  var minute = Math.floor(second / 3600);
  second -= minute * 3600;

  return hour + " hr " + minute + " min ";
};
loadData();
