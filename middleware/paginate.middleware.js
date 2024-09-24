
export const paginate = (req, res, next) => {
  const page = +(req.query.pageIndex || 0)+1;
  const pageSize = +(req.query.pageSize || 10);
  req.pagination = { skip: pageSize * (page - 1), limit: pageSize === 0 ? 300 : pageSize, page, pageSize };
  next();
};


