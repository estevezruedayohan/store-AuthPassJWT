const products = [];

const elem1 = {
  id: 1,
  name: 'YOHAN',
  edad: 25,
  isBlock: false,
};

const elem2 = {
  id: 2,
  name: 'manuel',
  edad: 45,
  isBlock: true,
};

products.push(elem1);
products.push(elem2);

const id = 2;

const rta = products.find((elem) => elem.id === id);

console.log(rta);
