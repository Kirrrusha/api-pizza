export const productToOptionRepositoryMock = () => ({
  save: jest.fn(),
  getAllById: jest.fn(),
  saveMany: jest.fn(),
  removeById: jest.fn(),
  remove: jest.fn()
})
