let shopItemsData = [
  {
    id: "jfhgbvnscs",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg",
  },
  {
    id: "ioytrhndcv",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
  {
    id: "wuefbncxbsn",
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg",
  },
  {
    id: "thyfhcbcv",
    name: "Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg",
  },
];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let cn = basket.map(x=>x.item).reduce((x,y)=>x+y);
let shop = document.getElementById("shop");
shop.innerHTML = shopItemsData
  .map((x) => {
    let {id} = x
    let search = basket.find((y) => y.id === id) || [];
    return `<div id="product-id-${id}" class="item">
    <img width="220px" src="${x.img}" alt="">
   <div class="details">
    <h2>${x.name}</h2>
    <p>${x.desc}</p>
   </div>
    <div class="price-btn">
        <div class="price">$ ${x.price}</div>
        <div class="btn">
            <i onclick=decrement(${x.id}) class="bi bi-dash-lg"></i>
            <div id="${x.id}" class="count">${ cn}</div>
            <i onclick=increment(${x.id}) class="bi bi-plus-lg"></i>
        </div>
    </div>
</div>`;
  })
  .join("");

let increment = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id)
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else search.item += 1;
  //  console.log(basket)
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // console.log(basket)
  localStorage.setItem("data", JSON.stringify(basket));

  update(selectedItem.id);
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //    console.log(search)
  document.getElementById(id).innerHTML = search.item;
  // console.log(basket)
  cartAmount();
};

let cartAmount = () => {
  let num = basket.map((x) => x.item).reduce((x, y) => x + y);
  document.getElementById("cartAmount").innerHTML = num;
  // console.log(num)
};
