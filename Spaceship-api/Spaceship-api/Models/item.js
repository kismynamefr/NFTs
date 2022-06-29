const mongoose = require("mongoose")

const itemSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    price: {
        type: String
    },
    owner: {
        type: String
    },
    url: {
        type: String
    },
    quantity: {
        type: String
    },
}, {
    collection: "itemNFT"
})

module.exports = mongoose.model("itemNFT", itemSchema);