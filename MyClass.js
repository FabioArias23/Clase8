const fs = require("fs").promises;

class ProductFunctions {

    read = async (path) => {
        try {
            const fileStats = await fs.stat(path)
            if (fileStats.size === 0) {
                return "Empty file";
            } else {
                const dataFile = await fs.readFile(path, "utf-8");
                const dataObj = JSON.parse(dataFile);
                return dataObj;
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    search = async (id, path) => {
        try {
            const fileStats = await fs.stat(path, "utf-8")
            if (fileStats.size === 0) return "Empty file";

            const dataFile = await fs.readFile(path, "utf-8");
            const dataObj = JSON.parse(dataFile);

            if (dataObj[id -1 ]) {
                return dataObj[id -1];
            } else {
                return "Product not found";
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    save = async (path, product) => {
        try {
            const fileStats = await fs.stat(path)
            if (fileStats.size === 0) {
                await fs.writeFile(path, JSON.stringify(product, null, '\t'));
                return `Produt added successfully: ${JSON.stringify({id:id, ...product})}`
            } else {
                const dataFile = await fs.readFile(path, "utf8");
                const dataObj = JSON.parse(dataFile)
                const data = Object.values(dataObj)
                const id = data.length + 1;
                data.push({id:id, ...product})
                await fs.writeFile(path, JSON.stringify(data, null, '\t'));
                return `Produt added successfully: ${JSON.stringify({id:id, ...product})}`
            }
        } catch (error) {
            throw new Error("[]")
        }
    }
}

module.exports = ProductFunctions;