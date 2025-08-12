const Docker = require('dockerode');
const docker = new Docker({
  host: '127.0.0.1',
  port: 2375
});
const labFlags = {
    'xss-lab-1': 'FLAG{XSS_SUCCESS_e16c31f2}',
    'sql-injection-lab-1': 'FLAG{SQLI_CHALLENGE_f78a2d1b}',
    // Add more labs and their flags here
};

const checkFlag = (labId, submittedFlag) => {
    const correctFlag = labFlags[labId];
    if (!correctFlag) {
        throw new Error(`Flag not found for lab ID: ${labId}`);
    }
    return submittedFlag === correctFlag;
};
const startLab = async (labId) => {
    try {
        const containerName = `lab-${labId}-${Date.now()}`;
        let image;

        switch(labId) {
            case 'xss-lab-1':
                image = 'xss-lab:1.0';
                break;
            case 'sql-injection-lab-1':
                image = 'sqli-lab:1.0';
                break;
            default:
                throw new Error('Invalid labId provided.');
        }

        const container = await docker.createContainer({
            Image: image,
            name: containerName,
            Tty: true,
            ExposedPorts: { '80/tcp': {} },
            HostConfig: {
                // This tells Docker to find any free port on the host
                // and map it to the container's exposed port.
                PublishAllPorts: true
            }
        });

        await container.start();
        
        // Add a delay to give the container's internal web server time to start
        await new Promise(resolve => setTimeout(resolve, 3000));

        const data = await container.inspect();
        
        console.log('Container Inspection Data:', JSON.stringify(data.NetworkSettings.Ports, null, 2));

        const portBindings = data.NetworkSettings.Ports['80/tcp'];
        if (!portBindings || portBindings.length === 0) {
            throw new Error('Failed to get host port from container.');
        }

        const hostPort = portBindings[0].HostPort;

        return {
            containerId: container.id,
            containerName,
            hostPort,
            message: `Lab ${labId} started successfully on port ${hostPort}`
        };
    } catch (error) {
        console.error(`Error starting lab ${labId}:`, error);
        throw new Error('Failed to start the lab environment.');
    }
};

const stopLab = async (containerId) => {
  try {
    const container = docker.getContainer(containerId);
    await container.stop();
    await container.remove();
    return { message: `Container ${containerId} stopped and removed.` };
  } catch (error) {
    console.error(`Error stopping container ${containerId}:`, error);
    throw new Error('Failed to stop the lab environment.');
  }
};

module.exports = { startLab, stopLab ,checkFlag};