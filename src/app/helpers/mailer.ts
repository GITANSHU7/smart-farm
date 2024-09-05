 import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

const generateRandomString = (length: any) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    console.log(typeof emailType);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpire: Date.now() + 3600000, // 1 hour
        },
      });
    } else if (emailType === "RESET") {
    //   await User.findByIdAndUpdate(userId, {
    //     $set: {
    //       forgotPasswordToken: hashedToken,
    //       forgotPasswordTokenExpiry: Date.now() + 3600000,
    //     },
    //   });
    console.log("Updating user with reset token...");
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour,
          test: "test"
        },
      },
      { new: true }
    );

    console.log("Update result:", result);
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER, // Use environment variables for sensitive data
        pass: process.env.MAILTRAP_PASS,
        //TODO: add these credentials to .env file
      },
    });

    const mailOptions = {
      from: "dogeshlelu@gmail.com", // sender address
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// export const sendResetPasswordEmail = async ({ email }: any) => {
//   try {
//     // create a hased token
//     const randomString = generateRandomString(10);
//     const hashedToken = await bcryptjs.hash(randomString.toString(), 10);

//     const user = await User.findOneAndUpdate(
//       { email }, // Filter criteria
//       {
//         $set: {
//           forgotPasswordToken: hashedToken,
//           forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour from now
//         },
//       },
//       { new: true } // Option to return the modified document
//     );

//     await user.save();
//     console.log(user);

//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "4c61891f512697",
//         pass: "3ebc75f74b4cce",
//         //TODO: add these credentials to .env file
//       },
//     });

//     const mailOptions = {
//       from: "dogeshlelu@gmail.com", // sender address
//       to: email,
//       subject: "Reset your password",
//       html: `
//             <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to "reset your password"

//             or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/reset-password?token=${hashedToken}
//             </p>
//             `,
//     };

//     const mailresponse = await transport.sendMail(mailOptions);
//     return mailresponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// export const sendResetPasswordEmail = async (email: any) => {
//   try {
//     // Create a hashed token
//     const randomString = generateRandomString(10);
//     const hashedToken = await bcryptjs.hash(randomString, 10);

//     // Update the user document with the reset token and expiry
//     const user = await User.findOneAndUpdate(
//        email, // Ensure the filter criteria is correct
//       {
//         $set: {
//           forgotPasswordToken: hashedToken,
//           forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour from now
//         },
//       },
//       { new: true, useFindAndModify: false } // Options to return the modified document and avoid deprecation warning
//     );

//     if (!user) {
//       throw new Error("User not found");
//     }

//     console.log(user);

//     // Configure the email transport
//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: process.env.MAILTRAP_USER, // Use environment variables for sensitive data
//         pass: process.env.MAILTRAP_PASS,
//       },
//     });

//     // Define the email options
//     const mailOptions = {
//       from: "dogeshlelu@gmail.com", // Sender address
//       to: email,
//       subject: "Reset your password",
//       html: `
//         <p>Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}">here</a> to reset your password.</p>
//         <p>Or copy and paste the link below in your browser:</p>
//         <p>${process.env.DOMAIN}/reset-password?token=${hashedToken}</p>
//       `,
//     };

//     // Send the email
//     const mailResponse = await transport.sendMail(mailOptions);
//     return mailResponse;
//   } catch (error : any) {
//     throw new Error(error.message);
//   }
// };


// export const sendResetPasswordEmail = async (email: any) => {
//   try {
//     // Create a hashed token
//     const randomString = generateRandomString(10);
//     const hashedToken = await bcryptjs.hash(randomString, 10);

   
//     const user = await User.findOne(
//        email ,
//       {
//         $set: {
//           forgotPasswordToken: hashedToken,
//           forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour from now
//         },
//       },
//       { new: true, } // Options to return the modified document and avoid deprecation warning
//     );

//     if (!user) {
//       throw new Error("User not found");
//     }

//     console.log(user);

//     // Configure the email transport
//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: process.env.MAILTRAP_USER, // Use environment variables for sensitive data
//         pass: process.env.MAILTRAP_PASS,
//       },
//     });

//     // Define the email options
//     const mailOptions = {
//       from: "dogeshlelu@gmail.com", // Sender address
//       to: email,
//       subject: "Reset your password",
//       html: `
//         <p>Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}">here</a> to reset your password.</p>
//         <p>Or copy and paste the link below in your browser:</p>
//         <p>${process.env.DOMAIN}/reset-password?token=${hashedToken}</p>
//       `,
//     };

//     // Send the email
//     const mailResponse = await transport.sendMail(mailOptions);
//     return mailResponse;
//   } catch (error:any) {
//     throw new Error(error.message);
//   }
// };

export const sendResetPasswordEmail = async (email: string) => {
  try {
    // Create a hashed token
    const randomString = generateRandomString(10);
    const hashedToken = await bcryptjs.hash(randomString, 10);

    // Update the user document with the reset token and expiry
    const user = await User.findOneAndUpdate(
      { email: email }, // Ensure the filter criteria is correct
      {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour from now
        },
      },
      { new: true, useFindAndModify: false } // Options to return the modified document and avoid deprecation warning
    );

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = Date.now() + 3600000;
    await user.save();
    
    if (!user) {
      throw new Error("User not found");
    }

    console.log(user);

    // Configure the email transport
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER, // Use environment variables for sensitive data
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: "dogeshlelu@gmail.com", // Sender address
      to: email,
      subject: "Reset your password",
      html: `
        <p>Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}">here</a> to reset your password.</p>
        <p>Or copy and paste the link below in your browser:</p>
        <p>${process.env.DOMAIN}/reset-password?token=${hashedToken}</p>
      `,
    };

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};