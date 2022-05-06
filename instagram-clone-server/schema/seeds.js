import { faker } from '@faker-js/faker';



export const createDummyUsers = () => {
  const users = []
  for (let i = 20; i >= 0; i--) {

    const newUser = {
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      bio: faker.random.words(4),
      password: faker.internet.password(),
      avatar: faker.image.people(1234, 2345, true)
    }

    users.push(newUser)
  }

  return users;
}


function generateRandom(min = 4, max = 24) {

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

export const createDummyPosts = () => {
  const posts = []

  for (let i = 20; i >= 0; i--) {

    const newPost = {
      postContent: faker.image.abstract(1234, 2345, true),
      postDescription: faker.random.words(5),
      userId: generateRandom()
    }

    posts.push(newPost)
  }

  return posts;
}