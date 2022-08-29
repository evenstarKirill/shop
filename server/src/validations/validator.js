const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

export default validator;
