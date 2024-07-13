const validate = (schema) => {
    return (req, res,next) => {
      const data = { ...req.body, ...req.params, ...req.query };
      let {error}= schema.validate(data);
      if (error) {
        let errors = error.details.map(
          (error) => error.message
        );
        return next(new Error(errors.join(', ')));
      }
      return next();
    };
  };
module.exports = {validate};
