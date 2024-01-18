const Op = require("sequelize").Op;

class BaseRequest {
  pages = { offset: 0, limit: 5 };
  filters = [];
  where = {};
  searchs = [];
  fields = [];
  sorts = [];

  constructor(
    query = {
      offset: 0,
      limit: 5,
      filters: [],
      searchs: [],
      fields: [],
      sorts: [],
    }
  ) {
    this.pages.offset = query.offset || 0;
    this.pages.limit = query.limit || 5;
    this.setFilters(query);
    this.setSearchs(query);
    this.setSorts(query);
  }

  setSorts(query) {
    try {
      const sorts = JSON.parse(query.sorts);
      if (Array.isArray(sorts) && sorts.length > 0) {
        sorts.forEach((element) => {
          let sort = new Sort(element);
          if (sort && Object.keys(sort).length === 1) {
            this.sorts.push([sort.field, sort.dir]);
          }
        });
      }
    } catch (error) {
      this.sorts = [];
    }
  }

  setSearchs(query) {
    try {
      let or = [];
      const searchs = JSON.parse(query.searchs);
      const fields = JSON.parse(query.fields);

      if (
        Array.isArray(searchs) &&
        Array.isArray(fields) &&
        searchs.length > 0 &&
        fields.length > 0
      ) {
        searchs.forEach((search) => {
          fields.forEach((field) => {
            or.push(
              this.clause(
                new Filter({
                  field: field,
                  op: "%",
                  value: search,
                  valueIn: [],
                })
              )
            );
          });
        });
      }
      this.where = {
        ...this.where,
        [Op.or]: or,
      };
    } catch (error) {}
  }

  setFilters(query) {
    try {
      const filters = JSON.parse(query.filters);
      if (Array.isArray(filters)) {
        let and = [];
        filters.forEach((element) => {
          const filter = new Filter(element);
          if (filter && Object.keys(filter).length === 1) {
            this.filters.push(filter);
            and.push(this.clause(filter));
          }
        });
        this.where = {
          [Op.and]: and,
        };
      } else {
        this.filters = [];
      }
    } catch (error) {
      this.filters = [];
    }
  }

  get pages() {
    return this.pages;
  }

  get limit() {
    return this.pages.limit;
  }

  get offset() {
    return this.pages.offset;
  }

  get filters() {
    return this.filters;
  }

  get where() {
    return this.where;
  }

  get shorts() {
    return this.sorts;
  }

  clause(filter) {
    let clause = {};
    switch (filter.op) {
      case "=":
        clause[filter.field] = {
          [Op.eq]: filter.value,
        };
        break;
      case "!=":
        clause[filter.field] = {
          [Op.ne]: filter.value,
        };
        break;
      case "null":
        clause[filter.field] = {
          [Op.is]: filter.value,
        };
        break;
      case "!null":
        clause[filter.field] = {
          [Op.not]: filter.value,
        };
        break;
      case ">":
        clause[filter.field] = {
          [Op.gt]: filter.value,
        };
        break;
      case ">=":
        clause[filter.field] = {
          [Op.gte]: filter.value,
        };
        break;
      case "<":
        clause[filter.field] = {
          [Op.lt]: filter.value,
        };
        break;
      case "<=":
        clause[filter.field] = {
          [Op.lte]: filter.value,
        };
        break;
      case "between":
        clause[filter.field] = {
          [Op.between]: filter.valueIn,
        };
        break;
      case "!between":
        clause[filter.field] = {
          [Op.notBetween]: filter.valueIn,
        };
        break;
      case "%":
        clause[filter.field] = {
          [Op.like]: `%${filter.value}%`,
        };
        break;
      case "!%":
        clause[filter.field] = {
          [Op.notLike]: `%${filter.value}%`,
        };
        break;
      case "*%":
        clause[filter.field] = {
          [Op.startsWith]: filter.value,
        };
        break;
      case "%*":
        clause[filter.field] = {
          [Op.endsWith]: filter.value,
        };
        break;
      default:
        clause[filter.field] = {
          [Op.eq]: filter,
        };
        break;
    }
    return clause;
  }
}

class Filter {
  constructor(filter = { field: "", value: "", valueIn: [], op: "" }) {
    if (filter.field && filter.op && (filter.value || filter.valueIn)) {
      this.filter = {
        field: filter.field,
        value: filter.value.toLocaleLowerCase() || "",
        valueIn: filter.valueIn || [],
        op: filter.op,
      };
    }
  }

  get field() {
    return this.filter.field;
  }

  get op() {
    return this.filter.op;
  }

  get value() {
    return this.filter.value;
  }

  get valueIn() {
    return this.filter.valueIn;
  }
}

class Sort {
  constructor(sort = { field: "", dir: "'" }) {
    if (sort.field && sort.dir) {
      this.sort = { field: sort.field, dir: sort.dir };
    }
  }

  get field() {
    return this.sort.field;
  }

  get dir() {
    return this.sort.dir;
  }
}
module.exports = BaseRequest;
