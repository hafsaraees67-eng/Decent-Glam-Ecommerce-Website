let currentProductId = null;


async function loadProducts(category) {
    const container = document.getElementById("products-container");
    container.innerHTML = "Loading products...";

    try {
        const res = await fetch(`/api/products/${category}`);
        const products = await res.json();

        container.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
            `;

            card.onclick = () => showProductDetail(product);
            container.appendChild(card);
        });

    } catch (err) {
        container.innerHTML = "Failed to load products";
        console.error(err);
    }
}


function showProductDetail(product) {

    document.getElementById("collection-section").style.display = "none";
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("product-detail").style.display = "flex";


    currentProductId = product._id;

    document.getElementById("detail-img").src = product.image;
    document.getElementById("detail-name").innerText = product.name;
    document.getElementById("detail-desc").innerText =
        product.description || "No description available";

    document.getElementById("detail-price").innerText = `$${product.price}`;
     const ul = document.getElementById("detail-features");
    ul.innerHTML = "";

    product.features.forEach(feature => {
        ul.innerHTML += `<li>${feature}</li>`;
    });
}

function closeModal() {
    document.getElementById("modal-overlay").style.display = "none";
    document.getElementById("product-detail").style.display = "none";
    document.getElementById("collection-section").style.display = "block";
}

async function updateCartCount() {
  const res = await fetch("/api/cart-count");
  const data = await res.json();
  const span = document.getElementById("cart-count");
  if (span) span.innerText = data.count;
}

document.getElementById("add-to-cart-btn").onclick = async () => {
  const res = await fetch("/api/add-to-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: currentProductId })
  });

  const msg = await res.text();
  alert(msg);

  updateCartCount();
};


loadProducts("jewelry");