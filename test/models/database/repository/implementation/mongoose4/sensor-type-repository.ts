import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import { ObjectID } from "mongodb";
import mongoose = require('mongoose');
import { Mockgoose } from 'mockgoose';
import * as Config from "../../../../../../config/config";
import { ISensorType } from "../../../../../../models/interface/sensor-type";
import { IUnit } from "../../../../../../models/interface/unit";
import { sensorTypeRepository } from "../../../../../../models/database/repository/implementation/mongoose4/sensor-type-repository";

chai.use(chaiAsPromised);
let expect = chai.expect;
let mockgoose: Mockgoose;

describe('Sensor type repository validation', () => {

    let sensorType: ISensorType;
    let unit: IUnit;

    mongoose.Promise = Promise;
        const options    = {promiseLibrary: Promise};
        mockgoose = new Mockgoose(mongoose);
    mockgoose.prepareStorage().then(() => {
            mongoose.connect(Config.Database.URI_TEST);
            mongoose.connection.on('connected', () => {  
            console.log('db connection is now open');
            }); 
        });

    /*before(() => {
        mongoose.Promise = Promise;
        const options    = {promiseLibrary: Promise};
        mockgoose = new Mockgoose(mongoose);
        //return mockgoose.prepareStorage();
       /* return oo.prepareStorage()
            .then(() => mongoose.connect('mongodb://example.com/TestingDB', options));
            /*.then(() =>
            {
                return mongoose.connect(Config.Database.URI_TEST, options)
                .then(() => mongoose.connection.on('connected', () => {
                    console.log('connection open');
                }));
            });*/

        /*return mockgoose.prepareStorage().then(() => {
            mongoose.connect(Config.Database.URI_TEST);
            mongoose.connection.on('connected', () => {  
            console.log('db connection is now open');
            });
        })
        .catch(err => console.log(err));
    });*/

    /*after(() => {
        return mongoose.disconnect();
    });*/

    /*beforeEach((done) => {

        unit = {
            name: 'ºC',
            description: 'Temperature'
        }
        sensorType = {
            id: '',
            name: 'DHT22',
            description: 'Temperature sensor',
            unit: unit
        }

        return mockgoose.helper.reset().then(() => done());
    });*/

    /*describe('#create', () => {
        it('DB test', () => {
            return expect(4).to.be.equal(4);
        });

        it('should resolve when creating valid sensorType', () => {
            return expect(sensorTypeRepository.create(sensorType)).to.eventually.be.ok;
        });

        it('should not return array', () => {
            return sensorTypeRepository.create(sensorType)
                .then(sensorType => expect(sensorType).to.not.be.instanceOf(Array));
        });

        it('should rename _id to id', () => {
            return sensorTypeRepository.create(sensorType)
                .then((sensorType: ISensorType) => {
                    expect(sensorType).to.have.property('id');
                    return expect(sensorType).to.not.have.property('_id');
                });
        });

    });*/
});