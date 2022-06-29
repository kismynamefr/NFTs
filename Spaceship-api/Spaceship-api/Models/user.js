const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    address: {
        type: String
    },
    item: [
        {
            name: String,
        }
    ]
}, {
    collection: "ownerNFT"
})

module.exports = mongoose.model("ownerNFT", userSchema);