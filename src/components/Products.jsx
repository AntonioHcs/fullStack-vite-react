import { useState, useEffect } from "react"

export function Products() {

    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: 0 });
    useEffect(() => {
        fetch('https://fullstack-vercel-node-productos.vercel.app/productos')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                console.log(data)
            });
    }, []);

    const guardarDatos = (event) => {
        event.preventDefault();
        fetch ('https://fullstack-vercel-node-productos.vercel.app/productos',
        {method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newProduct)})
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

    }

    const contenidoNewProduct = (event) => {
        const {name,value} = event.target;
        setNewProduct({...newProduct, [name]: value}); //sprit operator
    }

    return (
        <div>
            Lista de productos
            {products.map(product => (
                <div key={product.id}>
                    {product.name}
                </div>
            ))}
            <br />
            Nuevo Producto
            <form onSubmit={guardarDatos}>
                Nombre: <input type="text" name="name" id="name" onChange={contenidoNewProduct} /><br />
                Precio: <input type="text" name="price" id="precio" onChange={contenidoNewProduct} /><br />
                <button type="summit">Guardar</button>
            </form>
        </div>
    )
}