function delay(mililiseconds) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve('abacaxi');
    }, mililiseconds);
  });
}

console.log(`Delaying...${new Date().getSeconds()}s`);
delay(1000).then((newDate) => {
  console.log(`Done ${newDate}s`);
});


// const teste = new Date();

// console.log("teste", teste)