'use strict';

const { createBackgroudJob } = require('./createJob');
const logger = require('../logger');

//Json file path that store tasks
const jobList = require('../job/jobs');

/**
  * @desc This will log the information that task is complete on each iteration
*/
let onComplete = function (taskName, info) {
    console.log(`${taskName} completed`);
}

/**
  * @desc Read list of jobs from jobList file and add those as Backgroud Job
*/
module.exports.StartJob = function () {
    try {
        //Check if jobList exists 
        if (jobList) {
            //Here we are adding the tasks one by one mentioned in jobList file
            jobList.forEach(task => {
                if (!task.Disabled) {
                    createBackgroudJob(`${task.Name} - Task`, task.Interval, task.Options, task.Action, onComplete);
                }
            });
        }
    }
    catch (ex) {
        logger.log({
            level: 'info',
            message: ex
        });
    }
}