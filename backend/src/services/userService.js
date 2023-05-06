import {validate} from "deep-email-validator"
import nodemailer from'nodemailer'
import dotenv from "dotenv-defaults";
dotenv.config();

const isEmailValid = async (email) => {
    console.log("email: ", email);
    return validate(email);
}

const sendForgetPWEmail = async (email, token) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.gmail,
            pass: process.env.mailPw
        }
    });
    var options = {
        //寄件者
        from: process.env.gmail,
        //收件者
        to: email, 
        //副本
        cc: process.env.mygmail,
        //密件副本
        // bcc: 'account4@gmail.com',
        //主旨
        subject: 'Feed Me 驗證碼', // Subject line
        //純文字
        // text: 'Hello world2', // plaintext body
        //嵌入 html 的內文
        html: `<h2>${token}</h2><p>此驗證碼將於5分鐘後失效，請儘快完成驗證。</p>`,
        // html: `<h2>${token}</h2> <p>The <a href="http://en.wikipedia.org/wiki/Lorem_ipsum" title="Lorem ipsum - Wikipedia, the free encyclopedia">Lorem ipsum</a> text is typically composed of pseudo-Latin words. It is commonly used as placeholder text to examine or demonstrate the visual effects of various graphic design. Since the text itself is meaningless, the viewers are therefore able to focus on the overall layout without being attracted to the text.</p>`, 
        //附件檔案
    //     attachments: [ {
    //         filename: 'text01.txt',
    //         content: '聯候家上去工的調她者壓工，我笑它外有現，血有到同，民由快的重觀在保導然安作但。護見中城備長結現給都看面家銷先然非會生東一無中；內他的下來最書的從人聲觀說的用去生我，生節他活古視心放十壓心急我我們朋吃，毒素一要溫市歷很爾的房用聽調就層樹院少了紀苦客查標地主務所轉，職計急印形。團著先參那害沒造下至算活現興質美是為使！色社影；得良灣......克卻人過朋天點招？不族落過空出著樣家男，去細大如心發有出離問歡馬找事'
    //     }
    //     , {
    //         filename: 'unnamed.jpg',
    //         path: '/Users/Weiju/Pictures/unnamed.jpg'
    //     }
    // ]
    };
    try {
        const info = await transporter.sendMail(options);
        console.log('訊息發送: ' + info.response);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    isEmailValid,
    sendForgetPWEmail,
}