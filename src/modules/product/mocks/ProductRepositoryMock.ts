export const productRepositoryMock = () => ({
  getAll: jest.fn(),
  save: jest.fn(),
  //   (() => ({
  //     id: 1,
  //     title: 'title1',
  //     image: 'image1',
  //     description: 'description1',
  //     price: 100,
  //   }));
  remove: jest.fn(),
  getOne: jest.fn(),
});
