export interface Credit {
  title: string;
  author: string;
  license: { name: string; url: string };
  source: { name: string; url: string };
}

const CC_BY_3 = { name: 'CC-BY 3.0', url: 'https://creativecommons.org/licenses/by/3.0/' };
const POLY_PIZZA = 'Poly Pizza';

/** Third-party 3D models used in the open world (shown on /open-world/credits). */
export const MODEL_CREDITS: Credit[] = [
  {
    title: 'Santa Claus',
    author: 'J-Toastie',
    license: CC_BY_3,
    source: { name: POLY_PIZZA, url: 'https://poly.pizza/m/WQP3xjYjPy' },
  },
  {
    title: 'Tree Long',
    author: 'J-Toastie',
    license: CC_BY_3,
    source: { name: POLY_PIZZA, url: 'https://poly.pizza/m/jRrIzWtLRm' },
  },
  {
    title: 'Snowman',
    author: 'J-Toastie',
    license: CC_BY_3,
    source: { name: POLY_PIZZA, url: 'https://poly.pizza/m/k5AsbzhXmj' },
  },
  {
    title: 'Chalet',
    author: 'Poly by Google',
    license: CC_BY_3,
    source: { name: POLY_PIZZA, url: 'https://poly.pizza/m/8QBUPls_J9b' },
  },
  {
    title: 'Pine Tree with Snow',
    author: 'Chris Lee',
    license: CC_BY_3,
    source: { name: POLY_PIZZA, url: 'https://poly.pizza/m/3pWKPFASEn-' },
  },
  {
    title: 'Mountain with Snow',
    author: 'Matthew Creighton',
    license: CC_BY_3,
    source: { name: POLY_PIZZA, url: 'https://poly.pizza/m/0VBAQNbpNcl' },
  },
];
