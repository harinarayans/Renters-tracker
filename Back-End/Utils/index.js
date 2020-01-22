const mongoose = require('mongoose');
const fs = require('fs-extra')
const logger = require('../Services/logger');

module.exports = {
    publicUrl: ["/login", "/logout", "/register", "/verification", "/resetPassword", "/verificationLink", "/authenticate"],
    notificationTypes: {
        nodeErrors: 1,
        JSErrors: 2,
        newRegistration: 3
    },
    getModel: (key) => {
        return new Promise(function (resolve, reject) {
            resolve(mongoose.model(key));
        });
    },
    async  createRequiredDirectories(directory) {
        try {
            await fs.ensureDir(directory)
        } catch (err) {
            logger.log({
                level: 'info',
                message: err
            });
        }
    },

    addFilters: function (filter, find, field) {
        let filterValue = Number(filter.value)
            ? Number(filter.value)
            : filter.value;
        switch (filter.type) {
            case "string":
                find[field].push({
                    [filter.property]: filter.operator ? { $regex: String(filterValue), $options: '$i' } : filterValue
                });
                break;
            case "object":
                find[field].push({ [filter.property]: filterValue.toObjectId() });
                break;
            case "numeric":
                find[field].push({ [filter.property]: filterValue });
                break;
            case "date":
                if (filterValue) {
                    let calculatedTime = moment.utc(filterValue, util.dateFormat.dateFormat).utcOffset(+filter.timezoneOffset, true);
                    if (filter.operator == "gte" || filter.operator == "lte") {
                        find[field].push({
                            [filter.property]: { [filter.operator]: calculatedTime.toISOString() }
                        });
                    } else {
                        find[field].push({
                            [filter.property]: {
                                $gte: calculatedTime.startOf("day").toISOString(),
                                $lte: calculatedTime.endOf("day").toISOString()
                            }
                        });
                    }
                }
                break;
        }
    },

    applyFilters: function (scope, filters, isSearch) {
        var find = { $and: [], $or: [] };
        if (!filters) {
            return find;
        }
        filters = JSON.parse(filters);
        if (Array.isArray(filters)) {
            filters.forEach(function (filter) {
                scope.addFilters(filter, find, isSearch ? "$or" : "$and");
            });
        }
        return find;
    },
}
