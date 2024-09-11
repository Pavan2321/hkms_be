const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger')


exports.logAction = (req, res) => {
    const { empId, action, details } = req.body;
    if (!empId || !action) {
        return res.status(400).json({ message: 'User ID and Action are required' });
    }
    logger.info({ empId, action, details });
    return res.status(200).json({ message: 'Action logged successfully' });
}
exports.logs = (req, res) => {
    const logDir = path.join(__dirname, '../logs');
    
    // Check if logs directory exists
    if (!fs.existsSync(logDir)) {
        return res.status(404).json({ message: 'No logs found' });
    }

    // Read all files in the logs directory
    fs.readdir(logDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading logs' });
        }

        // Filter out only log files and sort them by date
        const sortedLogs = files.filter(file => file.endsWith('.log')).sort().reverse();
        if (sortedLogs.length === 0) {
            return res.status(404).json({ message: 'No logs found' });
        }

        // Function to read and parse a single log file
        const readLogFile = (filePath) => {
            return new Promise((resolve, reject) => {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        const logEntries = data.trim().split('\n').filter(line => line.trim() !== '');
                        const logObjects = logEntries.map(log => JSON.parse(log));
                        resolve(logObjects);
                    } catch (parseError) {
                        reject(parseError);
                    }
                });
            });
        };

        // Read and parse all log files
        Promise.all(sortedLogs.map(file => readLogFile(path.join(logDir, file))))
            .then(logArrays => {
                // Flatten the array of arrays into a single array of logs
                const allLogs = logArrays.flat();
                return res.status(200).json({ logs: allLogs });
            })
            .catch(error => {
                return res.status(500).json({ message: 'Error processing log files', error: error.message });
            });
    });
};
