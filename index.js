const express = require("express");
const ProductFunctions = require("./MyClass");

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.on("error", error => {
    console.log(`Server failed:${error}`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = "products.txt";
const products = new ProductFunctions();

app.get("/api/products/listar", (req, res) => {
    products.read(path)
        .then(value => res.send({ List: value }))
        .catch(error => res.status(400).send({ Error: error.message }))
})

app.get("/api/products/listar/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
        res.send({ Error: "The id must be only a number" })
    } else {
        products.search(id, path)
            .then(value => res.send({ Product: value }))
            .catch(error => res.status(400).send({ Error: error.message }))
    }
})

app.post("/api/productos/guardar", (req, res) => {
    const newProduct = req.body;
    products.save(path,newProduct)
    .then((value) => res.send(value))
    .catch(error => res.status(400).send({ Error: error.message }))
})
