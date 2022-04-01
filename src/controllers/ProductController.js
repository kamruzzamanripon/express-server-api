const ProductRepository = require("../repositories/ProductRepository");


module.exports = class ProductController {

  //product all without pagination
  static withOutPaginationAllProduct = async (req, res) => {
    try {
      const item = await ProductRepository.allProductWithOutPagination();
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
      const item = await ProductRepository.allProductWithPagination();
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
    let payload = req.body;
    //return console.log(req.files)
   
    //Image Check, if had then all images push into array
    var imgUrl = [];
    var images =req.files
    if(images){
      for( var i=0; images.length > i; i++){
        let file = `storage/images/products/${images[i].filename}`;
        imgUrl.push(file)
      }
    }
    payload.images = imgUrl;


    try {
      const item = await ProductRepository.productCreate(payload);
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
    
    //return console.log(payload)
    //Image Check, if had then all images push into array
    var imgUrl = [];
    var images =req.files
    if(images){
      for( var i=0; images.length > i; i++){
        let file = `storage/images/products/${images[i].filename}`;
        imgUrl.push(file)
      }
    }
    reqBody.images = imgUrl;
    //return console.log(payload)

    //All data include into payload
    const payload = { id, reqBody };

    //return console.log(payload)

    try {
      const item = await ProductRepository.productUpdate(payload);
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
      const item = await ProductRepository.productSingle(id);
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
      const item = await ProductRepository.productDelete(id);
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
