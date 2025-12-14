const sweets = [
  { id: 1, name: "Gulab Jamun", category: "Indian Sweet", price: 20, quantity: 10 },
  { id: 2, name: "Rasgulla", category: "Bengali Sweet", price: 15, quantity: 12 },
  { id: 3, name: "Kaju Katli", category: "Dry Fruit Sweet", price: 50, quantity: 8 },
  { id: 4, name: "Motichoor Ladoo", category: "Ladoo", price: 25, quantity: 15 },
  { id: 5, name: "Jalebi", category: "Fried Sweet", price: 18, quantity: 20 },
  { id: 6, name: "Soan Papdi", category: "Flaky Sweet", price: 30, quantity: 9 },
  { id: 7, name: "Milk Cake", category: "Milk Sweet", price: 40, quantity: 6 },
  { id: 8, name: "Peda", category: "Milk Sweet", price: 22, quantity: 14 },
  { id: 9, name: "Rasmalai", category: "Milk Sweet", price: 45, quantity: 7 },
  { id: 10, name: "Cham Cham", category: "Bengali Sweet", price: 28, quantity: 11 },
  { id: 11, name: "Sandesh", category: "Bengali Sweet", price: 35, quantity: 10 },
  { id: 12, name: "Balushahi", category: "Fried Sweet", price: 32, quantity: 13 }
]
import mongoose from "mongoose";
import Sweet from "../modules/sweet.models.js";
import connectDB from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({});

const seedSweets = async () => {
    try {
        await connectDB();
        await Sweet.deleteMany({});
        await Sweet.insertMany(sweets);
        console.log("Sweets seeded successfully!");
        mongoose.connection.close();
    } catch (error) {   
        console.error("Error seeding sweets:", error);
        mongoose.connection.close();
    }
};
seedSweets();