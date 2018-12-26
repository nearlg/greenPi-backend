import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sensorTypeValidator from '../../validation/sensor-type';
import { Unit } from '../../models/interface/unit';

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Sensor type validation', () => {
    describe('Name validation', () => {
        it('Name with invalid characters', () => {
            return expect(sensorTypeValidator.validateName('++4 4'))
            .to.be.rejected;
        });

        it('Name with invalid characters', () => {
            return chai.assert.isRejected(sensorTypeValidator.validateName('C º'));
        });

        it('Name with valid characters', () => {
            return chai.assert.isFulfilled(sensorTypeValidator.validateName('C_.,[]'));
        });

        it('Name can not be undefined', () => {
            return chai.assert.isRejected(sensorTypeValidator.validateName(undefined));
        });

        it('Name can not be null', () => {
            return chai.assert.isRejected(sensorTypeValidator.validateName(null));
        });
    });

    describe('Description validation', () => {
        it('Description with some characters', () => {
            return expect(sensorTypeValidator.validateDescription('++4 4'))
            .to.be.fulfilled;
        });

        it('Description can be an empty string', () => {
            return expect(sensorTypeValidator.validateDescription(''))
            .to.be.fulfilled;
        });

        it('Description can be null', () => {
            return expect(sensorTypeValidator.validateDescription(null))
            .to.be.fulfilled;
        });

        it('Description can be undefined', () => {
            return expect(sensorTypeValidator.validateDescription(undefined))
            .to.be.fulfilled;
        });
    });

    describe('Unit validation', () => {
        let u: Unit = <Unit>{};
        it('Unit without name and description', () => {
            return expect(sensorTypeValidator.validateUnit(u))
            .to.be.rejected;
        });

        it('Unit name can not be an empty string', () => {
            u.name = '';
            return expect(sensorTypeValidator.validateUnit(u))
            .to.be.rejected;
        });

        it('Unit with a name', () => {
            u.name = 'unit name cº';
            return expect(sensorTypeValidator.validateUnit(u))
            .to.be.fulfilled;
        });

        it('Unit with a name', () => {
            u.name = 'Fº';
            return expect(sensorTypeValidator.validateUnit(u))
            .to.be.fulfilled;
        });

        it('Unit with name and description', () => {
            u.name = 'unitName';
            u.description = 'unit description';
            return expect(sensorTypeValidator.validateUnit(u))
            .to.be.fulfilled;
        });

        it('Unit can not be undefined', () => {
            return expect(sensorTypeValidator.validateUnit(undefined))
            .to.be.rejected;
        });

        it('Unit can not be null', () => {
            return expect(sensorTypeValidator.validateUnit(null))
            .to.be.rejected;
        });
    });
});
