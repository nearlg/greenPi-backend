import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as measureValidator from "../../validation/measure";
import { IMeasure } from "../../models/interface/measure";
import { ISensor } from "../../models/interface/sensor";

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Measure validation', () => {
    describe('Date validation', () => {
        it('Date must be a valid Date object', () => {
            return expect(measureValidator.validateDate(new Date()))
            .to.be.fulfilled;
        });

        it('Date can not be an invalid object', () => {
            let val: any = 'random';
            return expect(measureValidator.validateDate(val))
            .to.be.rejected;
        });

        it('Date can not be undefined', () => {
            return expect(measureValidator.validateDate(undefined))
            .to.be.rejected;
        });

        it('Date can not be null', () => {
            return expect(measureValidator.validateDate(null))
            .to.be.rejected;
        });
    });

    describe('Sensor validation', () => {
        it('Sensor can be an object', () => {
            return expect(measureValidator.validateSensor(<ISensor>{}))
            .to.be.fulfilled;
        });

        it('Sensor can be an string id', () => {
            return expect(measureValidator.validateSensor('asdasdasds'))
            .to.be.fulfilled;
        });

        it('Sensor can not be an empty string', () => {
            return expect(measureValidator.validateSensor(''))
            .to.be.rejected;
        });

        it('Sensor can not be undefined', () => {
            return expect(measureValidator.validateSensor(undefined))
            .to.be.rejected;
        });

        it('Sensor can not be null', () => {
            return expect(measureValidator.validateSensor(null))
            .to.be.rejected;
        });
    });

    describe('Value validation', () => {
        it('Value must be a valid number', () => {
            let val: any = 'random';
            return expect(measureValidator.validateValue(val))
            .to.be.rejected;
        });

        it('Value can not be undefined', () => {
            return expect(measureValidator.validateValue(undefined))
            .to.be.rejected;
        });

        it('Value can not be null', () => {
            return expect(measureValidator.validateValue(null))
            .to.be.rejected;
        });
    });
});