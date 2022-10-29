const { Flights } = require("../models/Flight");
const { v4: uuid } = require("uuid");
const { rmSync } = require("fs");

// Add/Book flights
exports.createFlight = async (req, res) => {
  try {
    const { title, time, price, date } = await req.body;
    const newFlight = {
      id: uuid(),
      title,
      time,
      price,
      date,
    };

    Flights.push(newFlight);
    res.status(201).json({
      message: "New flight added",
      newFlight,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all flights
exports.getFlights = async (req, res) => {
  try {
    const flights = Flights;
    res.status(200).json({
      message: "All users",
      flights,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Get single flight
exports.getSingleFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    res.status(200).json({
      message: "Flight found",
      flight,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update/edit
exports.updateFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    const { title, time, price, date } = await req.body;
    flight.title = title;
    flight.time = time;
    flight.price = price;
    flight.date = date;
    res.status(200).json({
      message: "Flight info updated",
      flight: flight,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete flight
exports.deleteFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    Flights.splice(Flights.indexOf(flight), 1);
    res.status(200).json({
      message: "Flight deleted",
      flight,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
