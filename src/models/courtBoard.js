
import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
  clubKoreanName: { type: String},
  clubID: { type: Object},
  players: [{type: Object }],
});


const Court = mongoose.model("Court", courtSchema);
export default Court;