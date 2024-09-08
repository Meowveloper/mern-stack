const nodemailer = require("nodemailer");
const ejs = require("ejs");
export interface IParams {
    viewFile : string;
    data : object;
    from : string, 
    to : string | string[], 
    subject : string
}
export default async function sendEmail({viewFile,data, from, to, subject} : IParams) {
    try {
        var transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,

            port: process.env.MAIL_PORT,

            auth: {
                user: process.env.MAIL_USER,

                pass: process.env.MAIL_PASSWORD,
            },
        });

        const dataString = await ejs.renderFile(__dirname + "/../../views/" + viewFile + ".ejs", data);
        const info = await transport.sendMail({
            from,
            to,
            subject,
            html: dataString,
        });
    } catch (e) {
        console.log('email error', e);
        throw new Error('error sending email');
    }
}
