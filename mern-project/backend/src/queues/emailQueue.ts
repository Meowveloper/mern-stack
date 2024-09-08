import sendEmail from "../helpers/sendEmail";
const Queue = require("bull");
const emailQueue = new Queue("emailQueue", { redis: { port: 6379, host: "127.0.0.1" } });
emailQueue.process(async (job: any) => {
    await sendEmail(job.data);
});

export default emailQueue;