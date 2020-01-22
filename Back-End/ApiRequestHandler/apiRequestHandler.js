const util = require('../Utils/index');
const logger = require('../Services/logger');

module.exports = function () {
    let handler = {
        modelId: undefined,
        setModal: (modalId) => {
            this.modalId = modalId;
        },

        checkModalStatus: (res) => {
            let response = {};
            if (!this.modalId) {
                response.success = false;
                response.message = 'Collection name is not specified.';
                res.status(200).send(response);
                return false;
            }
            return true;
        },

        getRecord: async (res, filter, callback) => {
            try {
                let response = {},
                    newFilter = null;
                if (filter) {
                    newFilter = await util.applyFilters(this, filter, false);
                }
                if (!this.checkModalStatus(res)) return;
                await util.getModal(this.modalId).then(async (modal) => {
                    await modal.findOne(newFilter, (err, data) => {
                        if (err) {
                            response.success = false;
                            response.message = err;
                        } else {
                            response.success = true;
                            response.data = data;
                        }
                        callback ? callback(response) : res.status(200).send(response);
                    });
                })
            } catch (error) {
                logger.log({
                    level: 'info',
                    message: error
                });
            }
        },

        getList: async (res, filter, sort) => {
            try {
                let response = {},
                    newFilter = null;
                //Filter
                newFilter = filter ? await util.applyFilters(this, filter, false) : {}
                // Sorting
                sortingOn = !sort ? { createdAt: -1 } : sort;
                if (!this.checkModalStatus(res)) return;
                await util.getModal(this.modalId).then(async (modal) => {
                    await modal.find({ newFilter }, (err, data) => {
                        if (err) {
                            response.success = false;
                            response.message = err;
                        } else {
                            response.success = true;
                            response.data = data;
                        }
                        callback ? callback(response) : res.status(200).send(response);
                    }).sort(sortingOn).limit(50);
                })
            } catch (error) {
                logger.log({
                    level: 'info',
                    message: error
                });
            }
        },

        saveRecord: async (res, newObject, callback) => {
            try {
                let response = {};
                await newObject.save(function (err, doc) {
                    if (err) {
                        response.success = false;
                        response.message = err;
                    } else {
                        response.success = true;
                        response.data = doc;
                        response.message = "Record Saved.";
                    }
                    callback ? callback(response) : res.status(200).send(response);
                });
            } catch (error) {
                logger.log({
                    level: 'info',
                    message: error
                });
            }
        },

        updateRecord: async (res, updateFields, filter, callback) => {
            try {
                if (!this.checkModalStatus(res)) return;
                let response = {},
                    newFilter = null;
                //Filter
                newFilter = filter ? await util.applyFilters(this, filter, false) : {};
                await util.getModal(this.modalId).then(async (modal) => {
                    await modal.findOneAndUpdate({ newFilter },
                        { $set: updateFields },
                        { new: true }, (err, updatedoc) => {
                            if (err) {
                                response.success = false;
                                response.message = err;
                            } else {
                                response.success = true;
                                response.data = updatedoc;
                                response.message = "Record updated.";
                            }
                            callback ? callback(response) : res.status(200).send(response);
                        });
                });
            } catch (error) {
                logger.log({
                    level: 'info',
                    message: error
                });
            }
        },

        deleteRecord: async (res, filter, hardDelete, callback) => {
            try {
                if (!this.checkModalStatus(res)) return;
                let response = {},
                    newFilter = null;
                //Filter
                newFilter = filter ? await util.applyFilters(this, filter, false) : {};
                await util.getModal(this.modalId).then(async (modal) => {
                    if (hardDelete) {
                        await modal.remove({ newFilter }, (err, removedDoc) => {
                            if (err) {
                                response.success = false;
                                response.message = err;
                            } else {
                                response.success = true;
                                response.data = removedDoc;
                                response.message = "Record deleted.";
                            }
                        })
                    } else {
                        await modal.findOneAndUpdate({ newFilter },
                            { $set: { isDeleted: true } },
                            { new: true }, (err, updatedoc) => {
                                if (err) {
                                    response.success = false;
                                    response.message = err;
                                } else {
                                    response.success = true;
                                    response.data = updatedoc;
                                    response.message = "Record deleted.";
                                }
                            });
                    }
                    callback ? callback(response) : res.status(200).send(response);
                });
            } catch (error) {
                logger.log({
                    level: 'info',
                    message: error
                });
            }
        }
    }
    return handler;
}