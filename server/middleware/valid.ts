import { Request, Response, NextFunction } from "express";

export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = [];
  const { lName, account, password } = req.body;
  if (!lName) {
    errors.push("Add your lName");
  } else if (lName.length > 20) {
    errors.push("your nmae is up to 20 chars long  ");
  }
  if (!account) {
    errors.push("add your mail or your phone number   ");
  } else if (!validPhone(account) && !validateEmail(account)) {
    errors.push("your mail or your phone number is incorrect   ");
  }

  if (password.length < 8) {
    errors.push("your password must be at least 8 characters ");
  }
  if (errors.length > 0) return res.status(400).json({ msg: errors });

  next();
};

export function validPhone(phone: string) {
  const re = /^[+]/g;
  return re.test(phone);
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
