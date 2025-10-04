const ContactMe = () => (
  <div className="flex space-x-4">
    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/in/amith-lakshmisha/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted hover:text-primary transition-all duration-300 hover:scale-110 transform"
      aria-label="LinkedIn Profile"
    >
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
      </svg>
    </a>

    {/* GitHub */}
    <a
      href="https://github.com/amithlakshmisha"
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted hover:text-primary transition-all duration-300 hover:scale-110 transform"
      aria-label="GitHub Profile"
    >
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2a10 10 0 00-3.162 19.475c.5.1.685-.216.685-.48 0-.237-.008-.866-.013-1.7-2.782.604-3.37-1.338-3.37-1.338-.454-1.152-1.11-1.457-1.11-1.457-.908-.62.069-.607.069-.607 1.003.07 1.532 1.03 1.532 1.03.893 1.53 2.344 1.088 2.916.83.09-.646.35-1.087.637-1.337-2.22-.25-4.554-1.11-4.554-4.936 0-1.09.39-1.984 1.032-2.68-.103-.25-.448-1.267.098-2.635 0 0 .837-.267 2.75 1.02a9.61 9.61 0 012.51-.34 9.58 9.58 0 012.51.34c1.913-1.287 2.748-1.02 2.748-1.02.547 1.368.202 2.385.1 2.635.643.696 1.03 1.59 1.03 2.68 0 3.835-2.338 4.684-4.567 4.928.36.31.68.92.68 1.856 0 1.34-.012 2.425-.012 2.755 0 .267.18.583.69.48A10.006 10.006 0 0012 2z"
          clipRule="evenodd"
        />
      </svg>
    </a>

    {/* Email */}
    <a
      href="mailto:amithlakshmisha@gmail.com"
      className="text-muted hover:text-primary transition-all duration-300 hover:scale-110 transform"
      aria-label="Send Email"
    >
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    </a>
  </div>
);

export default ContactMe;
