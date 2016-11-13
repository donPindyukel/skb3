import PC from './models/PC';
import CPU from './models/Cpu';
import HDD from './models/Hdd';
import RAM from './models/Ram';
import Board from './models/Board';


export default async function saveDataInDb(data) {
  try {
    const pcObj = {
      os: data.os,
      floppy: data.floppy,
      monitor: data.monitor
    };
    const pc = new PC(pcObj);
    await pc.save();

    const boardObj = Object.assign({
      vendor: data.board.vendor,
      model: data.board.model,
      image: data.board.image,
      video: data.board.video
    }, {
      pc: pc._id
    });
    const board = new Board(boardObj);
    await board.save();

    const cpuObj = Object.assign({
      model: data.board.cpu.model,
      hz: data.board.cpu.hz
    }, {
      board: board._id
    });
    const cpu = new CPU(cpuObj);
    await cpu.save();

    const ramObj = Object.assign({
      vendor: data.ram.vendor,
      volume: data.ram.volume,
      pins: data.ram.pins
    }, {
      pc: pc._id
    });
    const ram = new RAM(ramObj);
    await ram.save();

    const promisesHdd = data.hdd.map((hdd) => {
      const hddData = Object.assign({}, hdd, {
        pc: pc._id
      });
      return (new HDD(hddData)).save();
    });
    console.log('success');
    return {
      pc,
      board,
      cpu,
      ram,
      hdds: await Promise.all(promisesHdd)
    };
  } catch (err) {
    console.log('error', err);
    throw err;
  }
}

