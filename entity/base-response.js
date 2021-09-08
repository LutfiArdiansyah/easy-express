class BaseResponse {
  constructor(
    data = null,
    message = null,
    status = 200,
    success = true,
    datas = { count: 0, rows: [] },
    page = { offset: 0, limit: 5 }
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.status = status;
    this.total = datas.count;
    this.count = datas.rows.length;
    this.pages = Math.ceil(datas.count / page.limit);
    this.page =
      this.pages + 1 - Math.ceil((datas.count - page.offset) / page.limit);
  }
}

module.exports = BaseResponse;
