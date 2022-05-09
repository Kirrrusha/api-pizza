export const productRepositoryMock = () => ({
  createProduct: jest.fn(),
  //   (() => ({
  //     id: 1,
  //     title: 'title1',
  //     image: 'image1',
  //     description: 'description1',
  //     price: 100,
  //   }));
  deleteProduct: jest.fn(),
  updateProduct: jest.fn(),
});
