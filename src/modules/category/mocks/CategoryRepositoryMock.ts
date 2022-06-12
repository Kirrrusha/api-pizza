export const CategoryRepositoryMock = () => ({
  getAll: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  getOneByTitle: jest.fn()
})
