const mongoose = require("mongoose")

const collectionSchema = mongoose.Schema({
    id: {
        type: String
    },
    serial: {
        type: String
    },
    uri: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    owner: {
        type: String
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    hasSelled: {
        type: Boolean
    }
}, {
    collection: "collectionNFT"
})

module.exports = mongoose.model("collectionNFT", collectionSchema);