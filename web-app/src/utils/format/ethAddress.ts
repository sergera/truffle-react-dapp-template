import createKeccakHash from 'keccak';

export const toCheckSum = (ethAdress: string) => {
  ethAdress = ethAdress.toLowerCase().replace('0x', '');
  let hash = createKeccakHash('keccak256').update(ethAdress).digest('hex');
	let formattedAddress = '';
  for (var i = 0; i < ethAdress.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      formattedAddress += ethAdress[i].toUpperCase();
    } else {
      formattedAddress += ethAdress[i];
    }
  }
  return `0x${formattedAddress}`;
};

export const minify = (ethAdress: string) => {
	let beggining = ethAdress.substring(0,6);
	let end = ethAdress.slice(-4);
	return beggining + "..." + end;
};
