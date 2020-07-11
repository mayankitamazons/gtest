let products = [];

function makeProductList(products) {
  $("#products").html("<h1>Loading...</h1>");
  let innerHtml = ``;
  let a = 6;
  if (products.length < 6) {
    a = products.length;
  }

  for (let i = 0; i < a; i++) {
    let b = ((products[i].msp - products[i].sp) * 100) / products[i].msp;
    b = b.toFixed(2);
    innerHtml += `<div class="col-lg-4 col-sm-6 col-6 col-xs-6">
    <div class="product-item">
        <div class="pi-pic">
            <img height = '300' width = '200' src="/images/${products[i].image}" alt="">
            <div class="sale pp-sale">${b}% OFF</div>
                <div class="icon">
                    <i class="icon_heart_alt"></i>
                </div>
            <ul>
                <li class="w-icon active"><a href="#"><i class="icon_bag_alt"></i></a></li>
                <li class="quick-view"><a href="/product/showforuser/${products[i].product_id}">+ Details</a></li>
                <li class="w-icon"><a href="#"><i class="fa fa-random"></i></a></li>
            </ul>
        </div>
        <div class="pi-text">
            <div class="catagory-name">${products[i].categoryName}</div>
            <a href="#">
                <h5>${products[i].name}</h5>
            </a>
            <div class="product-price">
            ${products[i].sp}
            </div>
        </div>
    </div>
</div>`;
  }
  $("#products").html(innerHtml);
}

async function loadProducts() {
  products = await $.getJSON("/product/all_rest_citywise");
  makeProductList(products);
}

$(document).ready(function() {
  loadProducts();
  $(".pro").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      }
    ]
  });
});
