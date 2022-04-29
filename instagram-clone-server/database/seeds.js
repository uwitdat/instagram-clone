import faker from '@faker-js/faker';


export const users = [...Array(20)].map((user) => (
    {
        name: faker.name.findName(),
        userName: faker.internet.userName(),
        password: faker.internet.password(8),
        avatar: faker.image.image(),
        bio: faker.random.words(4)
    }
))

function generateRandom(min = 1, max = 40) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor(rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}


export const posts = [...Array(20)].map((post) => (
    {
        postContent: faker.image.image(),
        postDescription: faker.random.words(5),
        userId: generateRandom()
    }
));