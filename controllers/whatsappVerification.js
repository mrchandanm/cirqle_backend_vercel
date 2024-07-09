import twilio from 'twilio';

const accountSid = 'ACa01ffd833b6f5b39cfdd1d883357e8d2';
const authToken = '9d0d1ddab4b689dfb21b41e6eb266d52';
const client = twilio(accountSid, authToken);

let OTP;

export const sendWhatsappOtp=async(req,res)=>{
    try {
        const phone=req.query.phone;
         OTP = generateOTP();
        const message = await client.messages.create({
            body: OTP,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+91${phone}`,
        });
        res.status(200).send({
            message:"Successful"
        })
        console.log(message.sid);
    } catch (error) {
        res.status(400).send({
            message:"Failed"
        })
        console.error('Error:', error);
    }
}

export const verifyotp=async(req,res)=>{
    try {
        const otp=req.query.otp;
        if(otp==OTP){
            res.status(200).send({
                message:"verified"
            })
        }
        else{ res.status(200).send({
            message:"failed"
        })
        }
        
    } catch (error) {
        console.log(error)
    }
}

function generateOTP() {
    // Generate a random number between 100000 and 999999
    return Math.floor(100000 + Math.random() * 900000);
  }

