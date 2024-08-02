const router = require("express").Router();
const Booking = require("../models/Booking");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, totalPrice } = req.body;

    // Prevent the creator from booking their own listing
    if (customerId === hostId) {
      return res.status(400).json({ message: "You cannot book your own listing." });
    }

    // Create a new booking without checking for existing bookings
    const newBooking = new Booking({ customerId, hostId, listingId, totalPrice });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create a new Booking!", error: err.message });
  }
});

/* CHECK IF LISTING IS BOOKED */
router.get("/status/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const existingBookings = await Booking.find({ listingId });
    res.status(200).json({ isBooked: existingBookings.length > 0 });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to check booking status", error: err.message });
  }
});

module.exports = router;
