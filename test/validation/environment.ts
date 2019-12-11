import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as environmentValidator from '../../src/validation/environment';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Environment validation', () => {
  describe('Name validation', () => {
    it('Name with invalid characters', () => {
      return expect(environmentValidator.validateName('++4 4')).to.be.rejected;
    });

    it('Name with invalid characters', () => {
      return chai.assert.isRejected(environmentValidator.validateName('C º'));
    });

    it('Name with valid characters', () => {
      return chai.assert.isFulfilled(
        environmentValidator.validateName('C_.,[]')
      );
    });

    it('Name can not be undefined', () => {
      return chai.assert.isRejected(
        environmentValidator.validateName(undefined)
      );
    });

    it('Name can not be null', () => {
      return chai.assert.isRejected(environmentValidator.validateName(null));
    });
  });

  describe('Description validation', () => {
    it('Description with some characters', () => {
      return expect(environmentValidator.validateDescription('++4 4')).to.be
        .fulfilled;
    });

    it('Description can be an empty string', () => {
      return expect(environmentValidator.validateDescription('')).to.be
        .fulfilled;
    });

    it('Description can be null', () => {
      return expect(environmentValidator.validateDescription(null)).to.be
        .fulfilled;
    });

    it('Description can be undefined', () => {
      return expect(environmentValidator.validateDescription(undefined)).to.be
        .fulfilled;
    });
  });

  describe('Sensors validation', () => {
    it('Sensors can be an empty array', () => {
      return expect(environmentValidator.validateSensors([])).to.be.fulfilled;
    });

    it('Sensors can be an array of strings', () => {
      return expect(environmentValidator.validateSensors(['dfhf', 'fgh'])).to.be
        .fulfilled;
    });

    it('Sensor can be undefined', () => {
      return expect(environmentValidator.validateSensors(undefined)).to.be
        .fulfilled;
    });

    it('Sensor can be null', () => {
      return expect(environmentValidator.validateSensors(null)).to.be.fulfilled;
    });
  });

  describe('Pumps validation', () => {
    it('Pumps can be an empty array', () => {
      return expect(environmentValidator.validatePumps([])).to.be.fulfilled;
    });

    it('Pumps can be an array of strings', () => {
      return expect(environmentValidator.validatePumps(['dfhf', 'fgh'])).to.be
        .fulfilled;
    });

    it('Pumps can be undefined', () => {
      return expect(environmentValidator.validatePumps(undefined)).to.be
        .fulfilled;
    });

    it('Pumps can be null', () => {
      return expect(environmentValidator.validatePumps(null)).to.be.fulfilled;
    });
  });
});
