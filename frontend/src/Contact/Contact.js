import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import Card from "../Components/card/Card";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";

const Contact = () => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const resetForm = () => {
        setSubject("");
        setMessage("");
    }
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
        .sendForm(
            'service_c2n84a8', 
            'template_f7es2lp', 
            form.current, 
            '1Y72IV_5TDe1Qay08'
        )
        .then((result) => {
            // console.log(result.text);
            toast.success("Message Send");
            resetForm();
        }, (error) => {
            // console.log(error.text);
            toast.error(error.message);
        });
        e.target.reset();
    };

    return (
        <div className="contact">
            <h3 className="--mt">Contact Us</h3>
            <div className="section">
                <form ref = {form} onSubmit = {sendEmail}>
                    <Card cardClass="card">
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <label>Message</label>
                        <textarea
                            cols="30"
                            rows="10"
                            name="message"
                            placeholder="Tell us something..."
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <button className="--btn --btn-primary">Send Message</button>
                    </Card>
                </form>

                <div className="details">
                    <Card cardClass={"card2"}>
                        <h3>Our Contact Information</h3>
                        <p>Fill the form or contact us via other channels listed below</p>

                        <div className="icons">
                            <span>
                                <FaPhoneAlt />
                                <p>0928468657</p>
                            </span>
                            <span>
                                <FaEnvelope />
                                <p>feedmeservertw@gmail.com</p>
                            </span>
                            <span>
                                <GoLocation />
                                <p>National Taiwan University</p>
                            </span>
                            <span>
                                <FaTwitter />
                                <p>@FeedMe</p>
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contact;
