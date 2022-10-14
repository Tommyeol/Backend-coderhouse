process.on("message", (msg) => {
  const { quantity, obj } = msg;
  const result = randomNum(quantity, obj);
  process.send(result);
});

const randomNum = (quantity, obj) => {
  for (let i = 0; i < quantity; i++) {
    const random = Math.floor(Math.random() * 10);
    if (obj[random]) {
      obj[random]++;
      continue;
    }
    obj[random] = 1;
  }
  return obj;
};
