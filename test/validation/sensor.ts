import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sensorValidator from '../../src/validation/sensor';
import { SensorType } from '../../src/models/interface/sensor-type';

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Sensor validation', () => {
    describe('Name validation', () => {
        it('Name with invalid characters', () => {
            return expect(sensorValidator.validateName('++4 4'))
            .to.be.rejected;
        });

        it('Name with invalid characters', () => {
            return chai.assert.isRejected(sensorValidator.validateName('C º'));
        });

        it('Name with valid characters', () => {
            return chai.assert.isFulfilled(sensorValidator.validateName('C_.,[]'));
        });

        it('Name can not be undefined', () => {
            return chai.assert.isRejected(sensorValidator.validateName(undefined));
        });

        it('Name can not be null', () => {
            return chai.assert.isRejected(sensorValidator.validateName(null));
        });
    });

    describe('Description validation', () => {
        it('Description with some characters', () => {
            return expect(sensorValidator.validateDescription('++4 4'))
            .to.be.fulfilled;
        });

        it('Description can be an empty string', () => {
            return expect(sensorValidator.validateDescription(''))
            .to.be.fulfilled;
        });

        it('Description can be null', () => {
            return expect(sensorValidator.validateDescription(null))
            .to.be.fulfilled;
        });

        it('Description can be undefined', () => {
            return expect(sensorValidator.validateDescription(undefined))
            .to.be.fulfilled;
        });
    });

    describe('Type validation', () => {
        it('Type can be an object', () => {
            return expect(sensorValidator.validateType(<SensorType>{}))
            .to.be.fulfilled;
        });

        it('Type can be an string', () => {
            return expect(sensorValidator.validateType('asdasdasds'))
            .to.be.fulfilled;
        });

        it('Type can not be an epmty string', () => {
            return expect(sensorValidator.validateType(''))
            .to.be.rejected;
        });

        it('Type can not be undefined', () => {
            return expect(sensorValidator.validateType(undefined))
            .to.be.rejected;
        });

        it('Type can not be null', () => {
            return expect(sensorValidator.validateType(null))
            .to.be.rejected;
        });
    });
});
