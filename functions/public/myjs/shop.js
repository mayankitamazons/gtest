let products = [];
let categories = [];
let category_filter = [];

let filter_object = {
  category_filter: JSON.stringify(category_filter),
  min_price: 0,
  max_price: 0,
  search_pattern: ""
};

async function doSearch() {
  let products = await $.post("/product/all_rest", filter_object);
  makeProductList(products);
}

function makeProductList(products) {
  $("#products").html("<h1>Loading...</h1>");
  let innerHtml = ``;
  let b = -1;
  for (let i = 0; i < products.length; i++) {
    let a = ((products[i].msp - products[i].sp) * 100) / products[i].msp;
    a = a.toFixed(2);
    let c = parseInt(products[i].product_id);
    if (b != c) {
      innerHtml += `<div class="col-lg-4 col-sm-6 col-6 col-xs-6">
        <div class="product-item">
            <div class="pi-pic">
                <img height = '300' width = '200' src="/images/${products[i].image}" alt="">
                <div class="sale pp-sale">${a}% OFF</div>
                <div class="icon">
                    <i class="icon_heart_alt"></i>
                </div>
                <ul>
                    <li class="w-icon active"><a href="#"><i class="icon_bag_alt"></i></a></li>
                    <li class="quick-view"><a href="/product/showforuser/${products[i].product_id}/${products[i].unit}">+ Details</a></li>
                    <li class="w-icon"><a href="#"><i class="fa fa-random"></i></a></li>
                </ul>
            </div>
            <div class="pi-text">
                <div class="catagory-name">${products[i].categoryName}</div>
                <a href="#">
                    <h5>${products[i].name}</h5>
                </a>
                <br />
                <div class="product-price">
                <h6 style="text-decoration: line-through";>Rs ${products[i].msp}</h6>
                 Rs ${products[i].sp}
                 <h5><b>Unit : ${products[i].unit}</b></h5>
                </div>
                
            </div>
        </div>
        </div>`;
    }
    b = c;
  }
  $("#products").html(innerHtml);
}

// function makeCategoryList(categories) {
//   $("#categories").html("<h5>Loading</h5>");
//   let innerHtml = ``;
//   for (let i = 0; i < categories.length; i++) {
//     innerHtml += `<li><div class="bc-item">
//       <label>
//             ${categories[i].name}
//           <input type="checkbox" class = 'category' cid="${categories[i].id}">
//           <span class="checkmark"></span>
//       </label>
//   </div></li>`;
//   }
//   $("#categories").html(innerHtml);
// }

function makeCategoryList(categories) {
  $("#categories").html("<h5>Loading</h5>");
  let innerHtml = ``;
  for (let i = 0; i < categories.length / 4; i++) {
    if (i === 0) {
      innerHtml += `<div class="carousel-item active">`;
    } else {
      innerHtml += `<div class="carousel-item">`;
    }
    for (let j = 4 * i; j < 4 * (i + 1) && j < categories.length; j++) {
      innerHtml += `<li><div class="bc-item">
      <img width="50px" height="50px" src="/images/${categories[j].image}">
      <label>
            ${categories[j].name}
          <input type="checkbox" class =  'category' cid="${categories[j].id}">
          <span class="checkmark"></span>
      </label></img>
  </div></li>`;
    }
    innerHtml += `</div>`;
  }
  $("#categories").html(innerHtml);
}

async function loadProducts() {
  products = await $.getJSON("/product/all_rest_citywise");
  makeProductList(products);
}

async function loadCategories() {
  categories = await $.getJSON("/category/all_rest");
  makeCategoryList(categories);
}

$(document).ready(function() {
  loadProducts();
  loadCategories();
});

$("#minamount").keyup(function() {
  let minamount = $("#minamount").val();
  filter_object = { ...filter_object, min_price: minamount };
  doSearch();
});

$("#maxamount").keyup(function() {
  let maxamount = $("#maxamount").val();
  filter_object = { ...filter_object, max_price: maxamount };
  doSearch();
});

$("#search_pattern").keyup(() => {
  let text = $("#search_pattern").val();
  filter_object = { ...filter_object, search_pattern: text };
});

$("#search_button").click(() => {
  doSearch();
});

$("#categories").on("change", ".category", e => {
  let c_id = e.target.attributes.cid.value;
  if (category_filter.indexOf(c_id) === -1) {
    category_filter = [...category_filter, c_id];
  } else {
    category_filter.splice(category_filter.indexOf(c_id), 1);
  }

  filter_object = {
    ...filter_object,
    category_filter: JSON.stringify(category_filter)
  };
  console.log(filter_object);
  doSearch();
});

// $("#category").click(() => {
//   loadCategories();
// });

// for(i=0;i<(a/4);i++){
//   for(j=4*i;j<4*(i+1) && j<a;j++){console.log(j)}
// }
