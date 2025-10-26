import Product from "../Models/product.js";

export async function createProduct(req, res) {
    const productData = new Product(req.body);
    
    try {
        const response= await productData.save();
        
    }catch (error) {
        console.error("Error creating product:", error);
		return res.status(500).json({ message: "Failed to create product" });
        
    }
}