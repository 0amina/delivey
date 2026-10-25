import React, { useState } from "react";
import './contact.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9006/api/contact/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                // Handle successful submission, e.g., show a success message
                console.log("Message sent successfully!");
                window.location.reload();
            } else {
                // Handle error case, e.g., show an error message
                console.log("Failed to send message.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="elementor-container elementor-column-gap-default">
            <div className="main">
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Get In Touch</h2>
                                <form onSubmit={handleSubmit} className="register-form" id="register-form">
                                    <div className="form-group">
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <textarea
                                            id="form-field-message"
                                            name="message"
                                            required="required"
                                            placeholder="Message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="form-group form-button">
                                        <input
                                            type="submit"
                                            name="signup"
                                            id="signup"
                                            className="form-submit"
                                            value="Send Message"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image">
                        <div>
                       <figure class="contact">  <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-81886b0" data-id="81886b0" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-5a885f7 elementor-widget elementor-widget-elementskit-lottie" data-id="5a885f7" data-element_type="widget" data-widget_type="elementskit-lottie.default">
                        <div className="elementor-widget-container">
                            <div className="ekit-wid-con" >
                                <div id="ekit_lottie_5a885f7" className="ekit_lottie" data-autoplay="true" data-on-scroll="" data-speed="1" data-direction="" data-action="" data-renderer="svg" data-path="https://assets5.lottiefiles.com/packages/lf20_0bcj2nvw.json" data-loop="true"></div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div></figure>
                        </div><br/><br/>
                    </div>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Form;
