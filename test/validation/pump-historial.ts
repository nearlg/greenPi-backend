import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as pumpHistoricalValidator from '../../validation/pump-historical';
import { IPumpHistorical } from '../../models/interface/pump-historical';
import { IPump } from '../../models/interface/pump';

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Pump historical validation', () => {
    describe('Date validation', () => {
        it('Date must be a valid Date object', () => {
            return expect(pumpHistoricalValidator.validateDate(new Date()))
            .to.be.fulfilled;
        });

        it('Date can not be an invalid object', () => {
            let val: any = 'random';
            return expect(pumpHistoricalValidator.validateDate(val))
            .to.be.rejected;
        });

        it('Date can not be undefined', () => {
            return expect(pumpHistoricalValidator.validateDate(undefined))
            .to.be.rejected;
        });

        it('Date can not be null', () => {
            return expect(pumpHistoricalValidator.validateDate(null))
            .to.be.rejected;
        });
    });

    describe('Pump validation', () => {
        it('Pump can be an object', () => {
            return expect(pumpHistoricalValidator.validatePump(<IPump>{}))
            .to.be.fulfilled;
        });

        it('Pump can be an string id', () => {
            return expect(pumpHistoricalValidator.validatePump('asdasdasds'))
            .to.be.fulfilled;
        });

        it('Pump can not be an empty string', () => {
            return expect(pumpHistoricalValidator.validatePump(''))
            .to.be.rejected;
        });

        it('Pump can not be undefined', () => {
            return expect(pumpHistoricalValidator.validatePump(undefined))
            .to.be.rejected;
        });

        it('Pump can not be null', () => {
            return expect(pumpHistoricalValidator.validatePump(null))
            .to.be.rejected;
        });
    });

    describe('State validation', () => {
        it('State must be a number', () => {
            const val: any = 'random';
            return expect(pumpHistoricalValidator.validateState(val))
            .to.be.rejected;
        });

        it('State can be zero (0)', () => {
            return expect(pumpHistoricalValidator.validateState(0))
            .to.be.fulfilled;
        });

        it('State can be one (1)', () => {
            return expect(pumpHistoricalValidator.validateState(1))
            .to.be.fulfilled;
        });

        it('State can NOT be a positive zero (+0)', () => {
            const val: any = '+0';
            return expect(pumpHistoricalValidator.validateState(val))
            .to.be.rejected;
        });

        it('State can NOT be a negative zero (-0)', () => {
            const val: any = '-0';
            return expect(pumpHistoricalValidator.validateState(val))
            .to.be.rejected;
        });

        it('State can be a positive one (+1)', () => {
            const val: any = '+1';
            return expect(pumpHistoricalValidator.validateState(val))
            .to.be.fulfilled;
        });

        it('State can be a negative one (-1)', () => {
            const val: any = '-1';
            return expect(pumpHistoricalValidator.validateState(val))
            .to.be.fulfilled;
        });

        it('State can not be undefined', () => {
            return expect(pumpHistoricalValidator.validateState(undefined))
            .to.be.rejected;
        });

        it('State can not be null', () => {
            return expect(pumpHistoricalValidator.validateState(null))
            .to.be.rejected;
        });
    });
});
