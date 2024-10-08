import Jwt from "jsonwebtoken";



export const auth = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decode = Jwt.verify(token, process.env.SECRET);

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    
    res.status(401).send({ message: "access denied" });
  }
};
