/**
 * Returns a task which can be executed with a delay for specified network speed and task size
 * @param size
 * @param initialSpeed
 * @param callback
 * @returns {{setSpeed: (function(*))}}
 */
export const createTask = (size, initialSpeed, callback, timeOffset = 0) => {

    let currentSpeed = initialSpeed;
    let loadedSize = 0; // size when speed changed
    let loadedTime = new Date().getTime(); // time when speed changed
    let timeout = null;

    const calculateTimeout = () => (size - loadedSize) / currentSpeed * 1000 - timeOffset; // speed per sec
    const updateTimeout = () => {
        if (currentSpeed === null) {
            callback();
        } else if (currentSpeed > 0) {
            console.log('wait for data', calculateTimeout());
            timeout = setTimeout(callback, calculateTimeout());
        } else {
            timeout = null;
            // we don't want to call callback, someone needs to set new speed
            console.warn('throttle-scheuler speed set to 0, callback won\'t be processed.');
        }
    };

    timeout = updateTimeout();

    return {
        setSpeed(newSpeed) {
            const newTime = new Date().getTime();
            const timeElapsed = newTime - loadedTime;

            clearTimeout(timeout);
            currentSpeed = newSpeed;

            loadedSize += timeElapsed * currentSpeed / 1000;
            loadedTime = newTime;

            updateTimeout();
        }
    };
};

export default (initialSpeed = null) => {

    let speed = initialSpeed;
    let tasks = [];

    return {
        setSpeed(newSpeed = null) {
            speed = newSpeed;
            for (const task of tasks) {
                task.setSpeed(speed);
            }
        },
        addTask(size, callback, timeOffset = 0) {
            if (speed === null) {
                callback();
            } else {

                const newTask = createTask(size, speed, () => {
                    tasks = tasks.filter(t => t !== newTask);
                    callback();
                }, timeOffset);

                tasks.push(newTask);
            }
        }
    };
};