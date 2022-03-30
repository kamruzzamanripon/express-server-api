const ProductRepositorie = require("../repositories/ProductRepositorie");


module.exports = class ProductController {

  //product all without pagination
  static withOutPaginationAllProduct = async (req, res) => {
    try {
      const item = await ProductRepositorie.allProductWithOutPagination();
      if (item) {
        return res.status(200).json({
          code: 200,
          message: "All Product Show With-out Pagination",
          data: item,
        });
      }
    } catch (error) {
      return res.status(400).json({ status: "fail", data: error });
    }
  };

  //product all with pagination
  static withPaginationAllProduct = async (req, res) => {
    try {
      const item = await ProductRepositorie.allProductWithPagination();
      if (item) {
        return res.status(200).json({
          code: 200,
          message: "All Product Show With Pagination",
          data: item,
        });
      }
    } catch (error) {
      return res.status(400).json({ status: "fail", data: error });
    }
  };

  //product create
  static createProduct = async (req, res) => {
    let reqBody = req.body;

    try {
      const item = await ProductRepositorie.productCreate(reqBody);
      if (item) {
        return res.status(200).json({
          code: 200,
          message: "Product Create Successfully",
          data: item,
        });
      }
    } catch (error) {
      return res.status(400).json({ status: "fail", data: error });
    }
  };

  //product update by product Id
  static updateProduct = async (req, res) => {
    const id = req.params.id;
    let reqBody = req.body;
    const payload = { id, reqBody };

    try {
      const item = await ProductRepositorie.productUpdate(payload);
      if (item) {
        return res.status(200).json({
          code: 200,
          message: "Product Update Successfully",
          data: item,
        });
      }
    } catch (error) {
      return res.status(400).json({ status: "fail", data: error });
    }
  };

  //product show by product Id
  static singleProduct = async (req, res) => {
    const id = req.params.id;
    try {
      const item = await ProductRepositorie.productSingle(id);
      if (item) {
        return res.status(200).json({
          code: 200,
          message: "Singel Product Show",
          data: item,
        });
      }
    } catch (error) {
      return res.status(400).json({ status: "fail", data: error });
    }
  };

  //product Delete by product Id
  static deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
      const item = await ProductRepositorie.productDelete(id);
      if (item) {
        return res.status(200).json({
          code: 200,
          message: "Product Delete Successfully",
          data: item,
        });
      }
    } catch (error) {
      return res.status(400).json({ status: "fail", data: error });
    }
  };
};
