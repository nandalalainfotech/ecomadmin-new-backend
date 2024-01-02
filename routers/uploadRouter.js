import multer from "multer";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import upload from "../middleware/image.js";
import Image from "../Models/imagesModel.js";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import Product from "../Models/productModel.js";
import CatlogProduct from "../Models/catProductModule.js";
import Combinationchild from "../Models/CombinationchildModel.js";
import uploadImage from "../Models/uploadImageModel.js";
const uploadRouter = express.Router();

uploadRouter.get(
  "/showComb/:Id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.Id;
    const product = await CatlogProduct.findById({ _id: id });
    const images = await Image.find({ _id: product.imageId });

    var filename = images[0].filename;

    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);

uploadRouter.get(
  "/showNew/:fileId",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.fileId;
    const product = await Product.findById({ _id: id });
    const images = await Image.find({ _id: product.fileId });

    var filename = images[0].filename;

    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);

uploadRouter.get(
  "/showCatProd/:imageId",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.imageId;
    const product = await CatlogProduct.findById({ _id: id });

    const images = await Image.find({ _id: product.imageId });

    var filename = images[0].filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);



uploadRouter.get(
  "/showsubimglatest/:filename",
  expressAsyncHandler(async (req, res) => {
    
    let filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);

uploadRouter.get(
  "/editId/:imageId",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.imageId;

    const images = await Image.find({ _id: id });

    var filename = images[0].filename;

    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);

uploadRouter.get(
  "/showsubimgnew/:filename",
  expressAsyncHandler(async (req, res) => {
    let filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);

uploadRouter.get(
  "/cover/:filename",
  expressAsyncHandler(async (req, res) => {
    let filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);

uploadRouter.post(
  "/",
  isAuth,
  upload.fields([{ name: "images" }, { name: "image" }]),
  async (req, res) => {
  
    let subImage = [];
    for (let i = 0; i < req.files.images.length; i++) {
      if (
        req.files.images[i].originalname !== req.files.image[0].originalname
      ) {
        const image = new Image({
          fieldname: req.files.images[i].fieldname,
          originalname: req.files.images[i].originalname,
          filename: req.files.images[i].filename,
          status: req.body.status,
          productId: req.body.productData,
          // encoding : req.body.encoding,pse
        });
        subImage.push(image);
      }
    }
    const primaryImage = new Image({
      fieldname: req.files.image[0].fieldname,
      originalname: req.files.image[0].originalname,
      filename: req.files.image[0].filename,
      status: req.body.status,
      productId: req.body.productData,
      images: subImage,
      
    });
    
    const imageUploaded = await primaryImage.save();
    res.send({ message: "image Uploaded", image: imageUploaded });
  },
);

uploadRouter.put("/:id", isAuth, upload.single("image"), async (req, res) => {
  const imageId = req.params.id;
  const image = await Image.findById(imageId);
  if (image) {
    image.fieldname = req.file.fieldname;
    image.originalname = req.file.originalname;
    image.filename = req.file.filename;
    image.status = req.body.status;
    const updateImage = await image.save();
    res.send({ message: "image Updated", image: updateImage });
  } else {
    res.status(404).send({ message: "Image Not Found" });
  }
});

uploadRouter.post(
  "/postupdates",
  isAuth,
  upload.fields([{ name: "images" }, { name: "image" }]),
  async (req, res) => {
    req.files.image[0].status = "cover";
    let getImges = [];
    let responseImges = [];
    for (let i = 0; i < req.files.images.length; i++) {
      if (
        req.files.images[i].originalname !== req.files.image[0].originalname
      ) {
        req.files.images[i].status = null;
        getImges.push(req.files.images[i]);
      }
    }
    getImges = [...getImges, ...req.files.image];
    let subImage;
    for (let i = 0; i < getImges.length; i++) {
      const image = new uploadImage({
        fieldname: getImges[i].fieldname,
        originalname: getImges[i].originalname,
        filename: getImges[i].filename,
        status: getImges[i].status,
      });
      subImage = await image.save();
      responseImges.push(subImage);
    }
    res.send(responseImges);
  },
);

uploadRouter.put(
  "/updates/:id",
  isAuth,
  upload.fields([{ name: "newImages" }, { name: "images" }, { name: "image" }]),
  async (req, res) => {

    let subImage;
    let subImageArray = [];
    let FinalsubImageArray = [];
    let coverFilename = null;
    if (req?.body?.newImages) {
  
      if (req?.body?.newImages?.length !== 24) {
        for (let i = 0; i < req.body.newImages.length; i++) {
          subImage = await uploadImage.find({ _id: req.body.newImages[i] });
          subImageArray = [...subImageArray, ...subImage];
        }
      } else {
        subImage = await uploadImage.findById(req?.body?.newImages);
        subImageArray = [subImage];
      }
    }

    for (let i = 0; i < subImageArray.length; i++) {
      if (subImageArray[i].status == "cover") {
        coverFilename = subImageArray[i].filename;
        subImageArray[i].filename = req.body.image;
        FinalsubImageArray.push(subImageArray[i]);
      } else {
        FinalsubImageArray.push(subImageArray[i]);
      }
    }
  
    const imageId = req.params.id;
    const product = await CatlogProduct.findById({ _id: imageId });
    const image = await Image.findById(product.imageId);
    if (image) {
      image.filename = coverFilename ? coverFilename : req.body.image;
      for (let i = 0; i < image.images.length; i++) {
        image.images[i].filename = req.body.images[i];
      }
      image.images = [...image.images, ...FinalsubImageArray];
      const updateImage = await image.save();
      res.send({ message: "image Updated", image: updateImage });
    }
  },
);

uploadRouter.get(
  "/list",
  expressAsyncHandler(async (req, res) => {
    const images = await Image.find();
    res.send(images);
  }),
);

// uploadRouter.delete('/:id', isAuth, expressAsyncHandler(async(req, res) => {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     const image = await Image.findById(product.fileId);
//     if (image) {
//         const deleteImage = await image.remove();
//         res.send({ message: 'Image Deleted', image: deleteImage });
//     } else {
//         res.status(404).send({ message: 'Image Not Found' });
//     }
// }));

uploadRouter.get(
  "/show/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await CatlogProduct.findById({ _id: id });
    const images = await Image.find({ _id: product.imageId });
    var filename = images[0].filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);

uploadRouter.get(
  "/showsub/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await CatlogProduct.findById({ _id: id });
    const images = await Image.find({ _id: product.imageId });
    const newImage = images[0].images;
    res.send(newImage);
  }),
);

uploadRouter.get(
  "/sub/:CombinationId",
  expressAsyncHandler(async (req, res) => {
    const user = await Combinationchild.findOne({
      _id: req.params.CombinationId,
    });
    
    const product = await CatlogProduct.findById({ _id: user.CombinationId });
    const images = await Image.find({ _id: product.imageId });
    const newImage = images[0].images;
    res.send(newImage);
  }),
);

uploadRouter.get(
  "/productshow/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    const product = await CatlogProduct.findById({ _id: id });
    const images = await Image.find({ _id: product.imageId });
    var filename = images[0].filename;
    res.send(filename);
    // const conn = mongoose.connection;
    //   var gfs = Grid(conn.db, mongoose.mongo);
    //   gfs.collection("uploads");
    //   gfs.files.find({ filename: filename }).toArray((err, files) => {
    //     if (!files || files.length === 0) {
    //       return res.status(404).json({
    //         err: "no files exist",
    //       });
    //     }
    //     var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    //       bucketName: "uploads",
    //     });
    //     var readstream = bucket.openDownloadStreamByName(filename);
    //     return readstream.pipe(res);
    //   });
  }),
);

uploadRouter.get(
  "/proshowsub/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await CatlogProduct.findById({ _id: id });
    const images = await Image.find({ _id: product.imageId });
    const newImage = images[0].images;
    res.send(newImage);
  }),
);

uploadRouter.get(
  "/prodctnew/:filename",
  expressAsyncHandler(async (req, res) => {
    let filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  }),
);

uploadRouter.delete(
  "/deleteok/:id",
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await CatlogProduct.findById({ _id: productId });
    // const images = await Image.find({ _id: product.imageId });
    let result = await Image.findByIdAndUpdate(
      { _id: product.imageId },
      {
        $pull: {
          ["images"]: {
            _id: mongoose.Types.ObjectId(req.body._id),
          },
        },
      },
    );

    res.send({ message: "Image Deleted", image: result });
  }),
);

export default uploadRouter;
