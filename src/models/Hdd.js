import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const HDDSchema = new Schema({
  vendor: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  volume: {
    type: String,
    enum: ['C:', 'D:', 'E:', 'F:'],
    requred: true
  },
  pc: {
    type: Schema.Types.ObjectId,
    ref: 'PC',
    requred: true
  },
}, { timestamps: true,

});

HDDSchema.methods.toJSON = function () {
  return _.pick(this, ['vendor', 'size', 'volume']);
};


export default mongoose.model('HDD', HDDSchema);
