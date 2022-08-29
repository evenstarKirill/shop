import bcrypt from 'bcrypt';

import ApiError from '../error/ApiError.js';
import { loginSchema } from '../validations/schemas/loginSchema.js';
import { registrationSchema } from '../validations/schemas/registrationSchema.js';
import { User, Basket } from './../models/models.js';
import Validator from './../validations/validator.js';
import { generateGWT } from '../services/generateGWT.js';

class UserController {
  async registration(req, res, next) {
    const validation = Validator(registrationSchema);
    const { error, value } = validation(req.body);

    if (error) {
      next(ApiError.badRequest(error.details));
    }

    if (value) {
      const { email, role, password } = value;
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        next(ApiError.badRequest(`user with email ${email} is already exist`));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = User.create({ email, role, password: hashPassword });
      const basket = Basket.create({ userId: user.id });
      const token = generateGWT(user.id, email, role);
      return res.json(token);
    }
  }

  async login(req, res, next) {
    const validation = Validator(loginSchema);
    const { error, value } = validation(req.body);

    if (error) {
      next(ApiError.badRequest(error.details));
    }

    if (value) {
      const { email, password } = value;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        next(ApiError.internal(`user not found`));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        next(ApiError.internal(`user not found`));
      }
      const token = generateGWT(user.email, user.password, user.role);
      return res.json(token);
    }
  }

  async check(req, res, next) {
    const token = generateGWT(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

export default new UserController();
