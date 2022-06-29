const mongoose = require("mongoose")

const collectionSchema = mongoose.Schema({
    id: {
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
    }
}, {
    collection: "collectionNFTBSC"
})

module.exports = mongoose.model("collectionNFTBSC", collectionSchema);