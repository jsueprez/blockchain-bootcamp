const SimpleStorage = artifacts.require("SimpleStorage");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SimpleStorage", function (accounts) {
  it("should assert true", async function () {
    await SimpleStorage.deployed();
    return assert.isTrue(true);
  });

  it("has an initial value of 0", async () => {
    // get the contract  tha's been deployed
    const ssInstance = await SimpleStorage.deployed();

    const storedData = await ssInstance.getStoredData.call();
    assert.equal(storedData, 0, 'Initial state should be 0');
  });

  describe("Functionality", () => {
    it("should store a new value 42", async () => {
      // grab the contract we need
      const ssInstance = await SimpleStorage.deployed();

      // Change the number!
      await ssInstance.setStorageData(32, { from: accounts[0] });

      const storedData = await ssInstance.getStoredData.call();

      assert.equal(storedData, 32, `${storedData} was not stored!`)
    })

    it("should not let someone else change the value", async () => {
      const [owner, badJoe] = accounts;
      const ssInstance = await SimpleStorage.new(42, { from: badJoe });

      try {
        await ssInstance.setStorageData(22, { from: owner })
      } catch (err) { }

      const ssCurrentStorageData = await ssInstance.getStoredData.call();

      assert.equal(42, ssCurrentStorageData, ` storedData was changed by someone else who is not the owner!`)
    })
  })
});
