import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const BoardSchema = new Schema({
  vendor: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  pc: {
    type: Schema.Types.ObjectId,
    ref: 'PC',
    required: true
  }
}, {
  timestamps: true
});

BoardSchema.methods.toJSON = function () {
  return _.pick(this, ['vendor', 'model', 'image', 'video']);
};

export default mongoose.model('Board', BoardSchema);
