function delay(mililiseconds) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(new Date());
    }, mililiseconds);
  });
}

console.log(`Delaying...${new Date().getSeconds()}s`);
delay(1000).then((newDate) => {
  console.log(`Done ${newDate.getSeconds()}s`);
});
