import { Brand } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    try {
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      next(ApiError.internal(error));
    }
  }

  async getAll(req, res, next) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 100;
    let offset = page * limit - limit;
    let brands;
    try {
      brands = await Brand.findAndCountAll({ limit, offset });
      return res.json(brands);
    } catch (error) {
      console.log(error);
      next(ApiError.internal(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const brandId = req.params.id;
      if (!brandId) {
        next(ApiError.badRequest('forbidden id'));
      }
      const brands = await Brand.findOne({ where: { id: brandId } }).then(
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
      const brandId = req.params.id;
      if (!brandId) {
        next(ApiError.badRequest('forbidden id'));
      }
      await Brand.findOne({ where: { id: brandId } }).then(async (doc) => {
        if (!doc) {
          next(ApiError.badRequest('doc not found'));
        }
        await Brand.destroy({ where: { id: brandId } });
        return res.status(200).json({ message: 'deleting success' });
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async edit(req, res, next) {
    try {
      const brandId = req.params.id;
      if (!brandId) {
        next(ApiError.badRequest('forbidden id'));
      }
      await Brand.findOne({ where: { id: brandId } }).then(async (doc) => {
        if (!doc) {
          next(ApiError.badRequest('doc not found'));
        }
        await Brand.update({ name: req.body.name }, { where: { id: brandId } })
          .then((result) => console.log(result))
          .catch((err) => next(ApiError.badRequest(err)));
        return res.status(200).json({ name: req.body.name, id: brandId });
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new BrandController();
