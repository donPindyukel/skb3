import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const PCSchema = new Schema({
  os: {
    type: String
  },
  floppy: {
    type: Number
  },
  monitor: {
    type: String
  }
}, {
  timestamps: true
});

PCSchema.methods.toJSON = function () {
  return _.pick(this, ['os', 'floppy', 'monitor']);
};

export default mongoose.model('PC', PCSchema);
