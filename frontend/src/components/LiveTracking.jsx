import React from 'react';

const LiveTracking = () => {
  return (
    <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
      <iframe
        title="Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8398390134!2d77.06889999999999!3d28.527280000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3a0a4d9e7b9%3A0x4b8b8b8b8b8b8b8b!2sDelhi%2C%20India!5e0!3m2!1sen!2sin!4v1696600000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default LiveTracking;
