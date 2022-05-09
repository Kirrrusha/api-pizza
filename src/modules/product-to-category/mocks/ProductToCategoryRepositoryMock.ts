export const productToCategoryRepositoryMock = () => ({
  getRecords: jest.fn(),
  createRecord: jest.fn(),
  removeRecord: jest.fn(),
  removeAllRecordsByProductId: jest.fn(),
  removeRecordsByCategoryId: jest.fn(),
  getRecordsByCategoryId: jest.fn(),
  getRecord: jest.fn(),
  updateRecord: jest.fn(),
});
