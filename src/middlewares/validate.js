import { validationResult } from 'express-validator';

export function validate(view) {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render(view, {
        errors: errors.mapped(),
        old: req.body
      });
    }
    next();
  };
}