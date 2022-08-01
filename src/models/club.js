import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  clubKoreanName: { type: String},
  clubEnglishName: { type: String},
  members: [{type: Object}],
  sysop: [{type: Object}],
  mmr: { type: Number, default: 1000},
});


const Club = mongoose.model("Club", clubSchema);
export default Club;