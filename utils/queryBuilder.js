class QueryBuilder {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields", "keyword"];
    excludeFields.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|in|nin)\b/g,
      (match) => `$${match}`
    );
    const filterObj = JSON.parse(queryStr);

    this.mongooseQuery = this.mongooseQuery.find(filterObj);
    return this;
  }

  search(fields) {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;
      const searchQueries = fields.map((field) => ({
        [field]: { $regex: keyword, $options: "i" },
      }));
      this.mongooseQuery = this.mongooseQuery.find({ $or: searchQueries });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.pagination = { page, limit };
    return this;
  }
}

module.exports = QueryBuilder;
