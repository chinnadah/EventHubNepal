const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        streetAddress: {
            type: String,
            required: true,
        },
        Venue: {
            type: String,
            required: true,
        },
        Genre: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: Number,
            required: true
        },
        NormalTicket: {
            type: Number,
            required: true,
        },
        VipTicket: {
            type: Number,
            required: true,
        },
        SpecialPackage: {
            type: Number,
            required: true,
        },
        listingPhotoPaths: [{ type: String }], // Store photo URLs
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
)

const Listing = mongoose.model("Listing", ListingSchema)
module.exports = Listing