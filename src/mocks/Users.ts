import { IUser } from '../interfaces/IUser';
import { faker } from '@faker-js/faker';

const USERNAME_CHARACTER_LIMIT = 14;

export const generateUser = (): IUser => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName().slice(0, USERNAME_CHARACTER_LIMIT),
    pictureUrl: faker.image.avatar(),
    coverImageUrl: faker.image.image(undefined, undefined, true),
    joinedAt: faker.date.past(10).toISOString(),
    followers: faker.lorem.sentence().split(' '),
    following: faker.lorem.sentence().split(' '),
  };
};
