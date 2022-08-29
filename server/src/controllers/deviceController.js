import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import { Device, DeviceInfo } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
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
        info,
        img: fileName,
      });

      if (info) {
        info - JSON.parse(info);
        info.forEach((i) =>
          Device.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

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
      if (!deviceId) {
        next(ApiError.badRequest('forbidden id'));
      }
      const device = await Device.findOne({ where: { id: deviceId } }).then(
        async (doc) => {
          if (!doc) {
            next(ApiError.badRequest('doc not found'));
          }

          await Device.update(req.body, { where: { id: deviceId } })
            .then((result) => console.log(result))
            .catch((err) => next(ApiError.badRequest(err)));
          return res.json({ message: 'editing success' });
        }
      );
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

export default new DeviceController();
