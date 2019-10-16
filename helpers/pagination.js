'use strict';
exports.Offset = function(page, limit) {
  const offset = (page > 1 ? (limit * page) - limit : 0 )
  return offset;
}
exports.Numb = function(page, limit) {
  const no = (page > 1 ? (limit * page) - limit + 1 : 1 )
  return no;
}