import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import queryString from 'query-string';

import { Device } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId } = req.body;
      const { img } = req.files;
      let fileName = uuidv4() + '.jpg';
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }

  async getFiltered(req, res) {
    let { limit, page } = req.query;
    const filterIds = req.params.id;

    const parsedFilterIds = queryString.parse(filterIds, {
      skipNull: true,
      arrayFormat: 'comma',
    });

    const { brandId, typeId } = parsedFilterIds;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;

    if (!brandId && !typeId) {
      return;
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }

  async getOne(req, res, next) {
    try {
      const deviceId = req.params.id;
      if (!deviceId) {
        next(ApiError.badRequest('forbidden id'));
      }
      const device = await Device.findOne({ where: { id: deviceId } }).then(
        async (doc) => {
          if (!doc) {
            next(ApiError.badRequest('doc not found'));
          }
          return res.json(doc);
        }
      );
    } catch (error) {
      console.log(error);
      next(ApiError.internal(error.message));
    }
  }

  async remove(req, res, next) {
    try {
      const deviceId = req.params.id;
      if (!deviceId) {
        next(ApiError.badRequest('forbidden id'));
      }
      await Device.findOne({ where: { id: deviceId } }).then(async (doc) => {
        if (!doc) {
          next(ApiError.badRequest('doc not found'));
        }
        await Device.destroy({ where: { id: deviceId } });
        doc.dataValues.img &&
          (await fs.unlink(
            '/Users/apple/Documents/work/2022/fullstack-shop/server/src/static/' +
              doc.dataValues.img,
            (err) => {
              if (err) return console.log(err);
              console.log('file deleted successfully');
            }
          ));
        return res.json({ message: 'deleting success' });
      });
    } catch (error) {
      console.log(error);
      next(ApiError.internal(error.message));
    }
  }

  async edit(req, res, next) {
    try {
      const deviceId = req.params.id;
      let img;
      let docImg;
      let { name, price, brandId, typeId } = req.body;

      if (req.files) {
        img = req.files.img;
      }

      if (!deviceId) {
        next(ApiError.badRequest('forbidden id'));
      }
      const device = await Device.findOne({ where: { id: deviceId } }).then(
        async (doc) => {
          if (!doc) {
            next(ApiError.badRequest('doc not found'));
          }
          docImg = doc.dataValues.img;
          doc.dataValues.img &&
            img &&
            (await fs.unlink(
              '/Users/apple/Documents/work/2022/fullstack-shop/server/src/static/' +
                doc.dataValues.img,
              (err) => {
                if (err) return console.log(err);
                console.log('file deleted successfully');
              }
            ));
          let fileName;
          let __filename;
          let __dirname;
          if (img) {
            fileName = uuidv4() + '.jpg';
            __filename = fileURLToPath(import.meta.url);
            __dirname = dirname(__filename);
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
          }

          const [result, created] = await Device.upsert({
            name,
            price,
            brandId,
            typeId,
            img: img ? fileName : docImg,
            id: deviceId,
          });
          console.log('result', result.dataValues);
          return res.send(result.dataValues).status(201);
        }
      );
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

export default new DeviceController();
