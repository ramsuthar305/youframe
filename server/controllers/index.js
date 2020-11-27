const Image = require('../models/Image')
const { checkValidType } = require('../utils/helper')
module.exports = {
    uploadImage: async (req, res, next) => {
        try {
            console.log("called " + `images/uploads/${req.file.filename}`)
            if (req.file) {
                const { filename } = req.file
                if (!checkValidType(filename))
                    return res.send(406)
                else {
                    const result = await Image.create({ imageName: filename })
                    const { _id, imageName, createdAt } = result
                    const newImage = { _id, imageName, createdAt, imageUrl: `images/uploads/${filename}` }
                    if (result)
                        return res.json({ newImage });
                    else
                        return res.status(500).json({ message: "something went wrong" })
                }
            }
            else
                return res.status("409").json("No Files to Upload.")
        } catch (error) {
            next(error)
        }
    },
    getImages: async (req, res, next) => {
        try {
            console.log("called")
            const images = await Image.find().sort({ createdAt: -1 })
            const arr = images.map(({ _id, imageName, createdAt }) => {
                return {
                    _id,
                    imageName,
                    createdAt,
                    imageUrl: `images/uploads/${imageName}`
                }
            });
            return res.json({ arr })
        } catch (error) {
            next(error)
        }
    }
}


// app.get('/getImages', (req, res) => {
//     const images = ["1606414120514-Teal and Peach Leaves Garden Wedding Invitation.png"]
//     const arr = images.map(image => `images/uploads/${image}`)
//     res.json({ arr })
// })