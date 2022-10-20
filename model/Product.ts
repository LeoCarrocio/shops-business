import mongoose,{ Schema, model, Model} from "mongoose";
import {IProduct} from '../interfaces';

const productschema = new Schema({
  description:{type:String, required: true},
  images: [{type: String}],
  inStock: {type: Number, required: true, default: 0},
  price: {type: Number, required: true, default: 0},
  sizes: [{
      type: String, required: true,
      enum:{
        value:['XS','S','M','L','XL','XXL','XXXL']
      },
      message:'{value} no es valor valido',
  }],
  slug: {type: String, required: true, unique: true},
  tags: [{type: String}],
  title: {type: String, required: true},
  type: {
    type: String, required: true,
      enum:{
        value:['shirts','pants','hoodies','hats']
      },
      message:'{value} no es tipo valido valido',
  },
  gender:{
    type: String, required: true,
      enum:{
        value:['men','women','kid','unisex']
      },
      message:'{value} no es genero valido valido',
  }

}, {
  timestamps:true
})

// crear un indice de mongo 

const Product:Model<IProduct> = mongoose.models.Product || model('Product',productschema );

export default Product;