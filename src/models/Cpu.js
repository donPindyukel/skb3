import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const CPUSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  hz: {
    type: Number,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  }
}, {
  timestamps: true
});

CPUSchema.methods.toJSON = function () {
  return _.pick(this, ['model', 'hz']);
};


export default mongoose.model('CPU', CPUSchema);
