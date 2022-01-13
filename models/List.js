const mongoose = require('mongoose');
// tạo ra kiểu dữ liệu thông tin cho 1 list 

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model('List', ListSchema);
