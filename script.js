const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const productList = document.getElementById("product-list");
const darkModeToggle = document.getElementById("dark-mode-toggle");


let allProducts = []; // Глобальный массив всех товаров

// Функция загрузки товаров
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    allProducts = await response.json();
    displayProducts(allProducts);
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
  }
}

// Функция отображения товаров
function displayProducts(products) {
  productList.innerHTML = ""; // Очищаем список перед обновлением
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Цена: $${product.price}</p>
        `;
    productList.appendChild(productElement);
  });
}

// Функция сортировки товаров
function sortProducts(products) {
  const selectedSort = sortSelect.value;
  return products.slice().sort((a, b) => {
    if (selectedSort === "name-asc") {
      return a.title.localeCompare(b.title);
    } else if (selectedSort === "name-desc") {
      return b.title.localeCompare(a.title);
    } else if (selectedSort === "price-asc") {
      return a.price - b.price;
    } else if (selectedSort === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });
}

// Функция поиска товаров
function searchProducts() {
  const searchText = searchInput.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText)
  );
  displayProducts(sortProducts(filteredProducts));
}

// Обработчики событий для сортировки и поиска
sortSelect.addEventListener("change", searchProducts);
searchInput.addEventListener("input", searchProducts);

// Загружаем товары при старте
fetchProducts();

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Сохраняем состояние в localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});
