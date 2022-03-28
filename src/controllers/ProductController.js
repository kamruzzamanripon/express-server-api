const ProductModel = require('../models/ProductModel');
const { productCreate, productUpdate, productSingle, productDelete, allProductWithOutPagination, allProductWithPagination } = require('../repositories/ProductRepositorie');


//product all without pagination
exports.withOutPaginationAllProduct = async(req, res)=>{
   
    try {
                      
        const item = await allProductWithOutPagination();
        if (item) {
            return  res.status(200).json({
            code: 200,
            message: 'All Product Show With-out Pagination',
            data:item
            });
        }
       
      } catch (error) {
        return  res.status(400).json({status:"fail", data:error})
      }
}


//product all with pagination
exports.withPaginationAllProduct = async(req, res)=>{
   
    try {
                      
        const item = await allProductWithPagination();
        if (item) {
            return  res.status(200).json({
            code: 200,
            message: 'All Product Show With Pagination',
            data:item
            });
        }
       
      } catch (error) {
        return  res.status(400).json({status:"fail", data:error})
      }
}


//product create
exports.createProduct = async(req, res)=>{
   
    try {
        let reqBody = req.body;
        const item = await productCreate(reqBody);
        if (item) {
            return  res.status(200).json({
            code: 200,
            message: 'Product Create Successfully',
            data:item
            });
        }
       
      } catch (error) {
        return  res.status(400).json({status:"fail", data:error})
      }
}

//product update by product Id
exports.updateProduct = async(req, res)=>{
   
    try {
        const id = req.params.id;
        let reqBody = req.body;
        const payload = {
            id,
            reqBody
        }
        
        const item = await productUpdate(payload);
        if (item) {
            return  res.status(200).json({
            code: 200,
            message: 'Product Update Successfully',
            data:item
            });
        }
       
      } catch (error) {
        return  res.status(400).json({status:"fail", data:error})
      }
}


//product show by product Id
exports.singleProduct = async(req, res)=>{
   
    try {
        const id = req.params.id;
              
        const item = await productSingle(id);
        if (item) {
            return  res.status(200).json({
            code: 200,
            message: 'Singel Product Show',
            data:item
            });
        }
       
      } catch (error) {
        return  res.status(400).json({status:"fail", data:error})
      }
}

//product Delete by product Id
exports.deleteProduct = async(req, res)=>{
   
    try {
        const id = req.params.id;
              
        const item = await productDelete(id);
        if (item) {
            return  res.status(200).json({
            code: 200,
            message: 'Product Delete Successfully',
            data:item
            });
          
        }
       
      } catch (error) {
        return  res.status(400).json({status:"fail", data:error})
      }
}