/**
 * @Author: chenjie.lu
 * @Date:   2018-02-15T21:50:54+08:00
 * @Email:  chenjie.lu@husor.com
 * @Last modified by:   chenjie.lu
 * @Last modified time: 2018-02-18T16:28:31+08:00
*/
const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('../config');

function generateId() {
    return uuid.v4().toString(16).slice(0, 12);
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect || 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});

const ID_TYPE = Sequelize.STRING(32);

function defineModel(name, attributes) {
    const attrs = {};
    Object.keys(attributes).forEach((key) => {
        const value = attributes[key];
        if (typeof value === 'object' && value.type) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false,
            };
        }
    });
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true,
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false,
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: Date.now(),
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false,
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate(obj) {
                const now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = now;
                    obj.version++;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'FLOAT', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

const exp = {
    defineModel,
    sync: () => {
        if (process.env.NODE_ENV !== 'production') {
            return sequelize.sync({ force: true });
        }
        throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    },
};

TYPES.forEach((type) => {
    exp[type] = Sequelize[type];
});

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
