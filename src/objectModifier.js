import _ from 'lodash';



export function getRam(data) {
  return _.pick(data, ['ram']);
}

export function getProp(data, prop) {

  if (!data) {
    return '404';
  }
  if (data.length > 1 && prop[0] === 'length') {
    return '404';
  }

  if (data.hasOwnProperty(prop)) {
    return data[prop];
  } else {
    return '404';
  }
  return '404';
}

export function getHdd(data) {
  const hddData = _.pick(data, ['hdd']).hdd;
  let volumes = {};
  hddData.forEach((hdd) => {
    if (volumes[hdd.volume]) {
      volumes[hdd.volume] += hdd.size;
    } else {
      volumes[hdd.volume] = hdd.size;
    }
  });
  for (let i in volumes) {
    volumes[i] += 'B';
  }
  return volumes;
}
