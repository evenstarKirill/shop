import { Type } from './../models/models.js';
import ApiError from '../error/ApiError.js';

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    try {
      const type = await Type.create({ name });
      return res.json(type);
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }

  async getAll(req, res, next) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 100;
    let offset = page * limit - limit;
    let types;
    try {
      types = await Type.findAndCountAll({ limit, offset });
      return res.json(types);
    } catch (error) {
      console.log(error);
      next(ApiError.internal(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const typeId = req.params.id;
      if (!typeId) {
        next(ApiError.badRequest('forbidden id'));
      }
      const type = await Type.findOne({ where: { id: typeId } }).then(
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
      const typeId = req.params.id;
      if (!typeId) {
        next(ApiError.badRequest('forbidden id'));
      }
      await Type.findOne({ where: { id: typeId } }).then(async (doc) => {
        if (!doc) {
          next(ApiError.badRequest('doc not found'));
        }
        await Type.destroy({ where: { id: typeId } });
        return res.json({ message: 'deleting success' });
      });
    } catch (error) {
      console.log(error);
      next(ApiError.internal(error.message));
    }
  }

  async edit(req, res, next) {
    try {
      const typeId = req.params.id;
      const newTypeName = req.body.name;
      if (!typeId) {
        next(ApiError.badRequest('forbidden id'));
      }
      await Type.findOne({ where: { id: typeId } }).then(async (doc) => {
        if (!doc) {
          next(ApiError.badRequest('doc not found'));
        }
        await Type.update({ name: newTypeName }, { where: { id: typeId } })
          .then((result) => console.log(result))
          .catch((err) => next(ApiError.badRequest(err)));
        return res.json({ name: newTypeName, id: typeId });
      });
    } catch (error) {
      console.log(error);
      next(ApiError.internal(error.message));
    }
  }
}

export default new TypeController();
