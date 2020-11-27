const mongoose = require("mongoose")
const { Schema } = mongoose

const imageSchema = new Schema({
    imageName: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)


const Image = mongoose.model("images", imageSchema)

module.exports = Image