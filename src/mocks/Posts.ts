import { faker } from '@faker-js/faker';
import { IPost, PostType } from '../interfaces/IPost';
import { IUser } from '../interfaces/IUser';

export const generatePost = (user: IUser): IPost => {
  return {
    id: faker.datatype.uuid(),
    userId: user.id,
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past(2).toISOString(),
    type: PostType.POST,
  };
};
