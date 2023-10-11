document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.getElementById('articles');
    const userID = "25801";

    const updateSubtotal = () => {
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const precio = parseFloat(document.getElementById('costo').dataset.cost); // Usar el atributo de datos para obtener el costo
        const currency = document.getElementById('costo').dataset.currency; // Usar el atributo de datos para obtener la moneda

        const nuevoSubtotal = cantidad * precio;

        document.getElementById('subtotal').textContent = `${currency}${nuevoSubtotal.toFixed(2)}`;
    }

    fetch("https://japceibal.github.io/emercado-api/user_cart/" + userID + '.json')
        .then(response => response.json())
        .then(data => {
            const article = data.articles[0]; // Accedemos al primer artículo del array
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>
                    <div class="d-flex">
                        <img src="${article.image}" alt="Imagen del producto" class="img-carrito img-fluid mr-3">
                        <div>
                            <h5 class="mb-1">Producto</h5>
                            <p class="mb-0">${article.name}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <h5 class="mb-1">Precio</h5>
                    <p id="costo" data-cost="${article.unitCost}" data-currency="${article.currency}" class="mb-0">${article.currency}${article.unitCost}</p> <!-- Usar atributos de datos para almacenar el costo y la moneda -->
                </td>
                <td>
                    <h5>Cantidad</h5>
                    <input type="number" class="form-control" id="cantidad" value="1" min="1" style="max-width:80px;">
                </td>
                <td>
                    <h5 class="mb-1">Subtotal</h5>
                    <p id="subtotal" class="mb-0">${article.currency}${article.unitCost}</p> <!-- Aquí se corrigió el código -->
                </td>
            `;
            articlesContainer.appendChild(newRow);

            // Event listener para el cambio en la cantidad
            document.getElementById('cantidad').addEventListener('input', updateSubtotal);
        })
        .catch(error => console.error('Error:', error));
});

