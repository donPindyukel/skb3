import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const RAMSchema = new Schema({
  vendor: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  pins: {
    type: Number,
    required: true
  },
  pc: {
    type: Schema.Types.ObjectId,
    ref: 'PC',
    required: true
  },
}, { timestamps: true,

});

RAMSchema.methods.toJSON = function () {
  return _.pick(this, ['vendor', 'volume', 'pins']);
};


export default mongoose.model('RAM', RAMSchema);
