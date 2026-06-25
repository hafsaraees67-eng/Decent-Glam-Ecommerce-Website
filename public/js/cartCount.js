fetch("/api/cart-count")
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById("cart-count");
    if (el) el.innerText = data.count;
  });
