import { Basket } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class BasketController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
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
        return res.status(200).json({ message: 'editing success' });
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new BasketController();
