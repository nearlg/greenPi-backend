import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as pumpHistorialValidator from "../../validation/pump-historial";
import { IPumpHistorial } from "../../models/interface/pump-historial";
import { IPump } from "../../models/interface/pump";

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Pump historial validation', () => {
    describe('Date validation', () => {
        it('Date must be a valid Date object', () => {
            return expect(pumpHistorialValidator.validateDate(new Date()))
            .to.be.fulfilled;
        });

        it('Date can not be an invalid object', () => {
            let val: any = 'random';
            return expect(pumpHistorialValidator.validateDate(val))
            .to.be.rejected;
        });

        it('Date can not be undefined', () => {
            return expect(pumpHistorialValidator.validateDate(undefined))
            .to.be.rejected;
        });

        it('Date can not be null', () => {
            return expect(pumpHistorialValidator.validateDate(null))
            .to.be.rejected;
        });
    });

    describe('Pump validation', () => {
        it('Pump can be an object', () => {
            return expect(pumpHistorialValidator.validatePump(<IPump>{}))
            .to.be.fulfilled;
        });

        it('Pump can be an string id', () => {
            return expect(pumpHistorialValidator.validatePump('asdasdasds'))
            .to.be.fulfilled;
        });

        it('Pump can not be an empty string', () => {
            return expect(pumpHistorialValidator.validatePump(''))
            .to.be.rejected;
        });

        it('Pump can not be undefined', () => {
            return expect(pumpHistorialValidator.validatePump(undefined))
            .to.be.rejected;
        });

        it('Pump can not be null', () => {
            return expect(pumpHistorialValidator.validatePump(null))
            .to.be.rejected;
        });
    });

    describe('State validation', () => {
        it('State must be a valid number', () => {
            let val: any = 'random';
            return expect(pumpHistorialValidator.validateState(val))
            .to.be.rejected;
        });

        it('State can be a positive number', () => {
            return expect(pumpHistorialValidator.validateState(+3))
            .to.be.fulfilled;
        });

        it('State can be a negative number', () => {
            return expect(pumpHistorialValidator.validateState(-3))
            .to.be.fulfilled;
        });

        it('State can not be undefined', () => {
            return expect(pumpHistorialValidator.validateState(undefined))
            .to.be.rejected;
        });

        it('State can not be null', () => {
            return expect(pumpHistorialValidator.validateState(null))
            .to.be.rejected;
        });
    });
});