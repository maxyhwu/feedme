import React, { useEffect, useState } from 'react';
// import { Translate, TranslationServiceClient } from '@google-cloud/translate';


const GoogleTranslate = () => {
 
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (mounted) {
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);

            window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({ 
                pageLanguage: 'en', 
                autoDisplay: false,
                //layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                },'google_translate_element');
            };
        } else {
            setMounted(true)
        }
    }, [mounted]);

    return (
        <div id="google_translate_element"></div>
    );
}

export default GoogleTranslate;
