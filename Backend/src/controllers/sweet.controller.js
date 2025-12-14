import Sweet from "../modules/sweet.models.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addSweets = asyncHandler(async (req, res) => {
    const { name, category, price, quantity } = req.body;
    console.log( name, category, price, quantity);
    const newSweet = await Sweet.create({ name, category, price, quantity });
    return res.status(201).json(
        new ApiResponse(200, newSweet, "Sweet added successfully")
    )
})

export const getSweets = asyncHandler(async (req, res) => {
    const sweets = await Sweet.find();
    return res.status(200).json(
        new ApiResponse(200, sweets, "Sweets retrieved successfully")
    )
})

export const searchSweets = asyncHandler(async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice)
        query.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };

    // const sweets = await Sweet.find(query);
    const sweets = await Sweet.find({ name: { $regex: name, $options: "i" } });
    return res.status(200).json(
        new ApiResponse(200, sweets, "Sweets retrieved successfully")
    )
})

export const deleteSweet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Sweet.findByIdAndDelete(id);
    return res.status(200).json(
        new ApiResponse(200, null, "Sweet deleted successfully")
    )
})

export const updateSweet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;
    const updatedSweet = await Sweet.findByIdAndUpdate(
        id,
        { name, category, price, quantity },
        { new: true }
    );
    return res.status(200).json(
        new ApiResponse(200, updatedSweet, "Sweet   updated successfully")
    )
})

export const purchaseSweet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const sweet = await Sweet.findById(id);
    if (!sweet) {
        throw new ApiError(404, "Sweet not found");
    }
    if (sweet.quantity < quantity) {
        throw new ApiError(400, "Insufficient sweet quantity");
    }
    sweet.quantity -= quantity;
    await sweet.save();
    return res.status(200).json(
        new ApiResponse(200, sweet, "Sweet purchased successfully")
    )
})

export const restockSweet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const sweet = await Sweet.findById(id);
    if (!sweet) {
        throw new ApiError(404, "Sweet not found");
    }
    sweet.quantity += quantity;
    await sweet.save();
    return res.status(200).json(
        new ApiResponse(200, sweet, "Sweet restocked successfully")
    )
})