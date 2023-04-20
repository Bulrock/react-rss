import UuidGenerator from '../../models/UuidGenerator';

describe('Local Storage Like Repository', () => {
  it('creates uniqe UUID numbers', () => {
    const uuidGenerator = new UuidGenerator();
    const uuidSet = new Set();

    for (let i = 0; i < 100; i++) {
      uuidSet.add(uuidGenerator.generateUuid());
    }

    expect(uuidSet.size).toBe(100);
  });
});
