import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as pumpValidator from '../../src/validation/pump';

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('Pump type validation', () => {
    describe('Name validation', () => {
        it('Name with invalid characters', () => {
            return expect(pumpValidator.validateName('++4 4'))
            .to.be.rejected;
        });

        it('Name with invalid characters', () => {
            return chai.assert.isRejected(pumpValidator.validateName('C º'));
        });

        it('Name with valid characters', () => {
            return chai.assert.isFulfilled(pumpValidator.validateName('C_.,[]'));
        });

        it('Name can not be undefined', () => {
            return chai.assert.isRejected(pumpValidator.validateName(undefined));
        });

        it('Name can not be null', () => {
            return chai.assert.isRejected(pumpValidator.validateName(null));
        });
    });

    describe('Description validation', () => {
        it('Description with some characters', () => {
            return expect(pumpValidator.validateDescription('++4 4'))
            .to.be.fulfilled;
        });

        it('Description can be an empty string', () => {
            return expect(pumpValidator.validateDescription(''))
            .to.be.fulfilled;
        });

        it('Description can be null', () => {
            return expect(pumpValidator.validateDescription(null))
            .to.be.fulfilled;
        });

        it('Description can be undefined', () => {
            return expect(pumpValidator.validateDescription(undefined))
            .to.be.fulfilled;
        });
    });

    describe('Connection ports validation', () => {
        it('Ports could be null', () => {
            return expect(pumpValidator.validatePorts(null))
            .to.be.fulfilled;
        });

        it('Ports could be undefined', () => {
            return expect(pumpValidator.validatePorts(undefined))
            .to.be.fulfilled;
        });

        it('Ports could be empty', () => {
            let ports: number[] = [];
            return expect(pumpValidator.validatePorts(ports))
            .to.be.fulfilled;
        });

        it('Ports can not be an array of characters', () => {
            let ports: any[] = ['a', 'd', 'f'];
            return expect(pumpValidator.validatePorts(ports))
            .to.be.rejected;
        });

        it('Ports as a number array', () => {
            let ports: number[] = [2, 3, 4];
            return expect(pumpValidator.validatePorts(ports))
            .to.be.fulfilled;
        });
    });
});
