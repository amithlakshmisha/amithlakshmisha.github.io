const ContactMe = () => (
  <div className="flex space-x-4">
    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/in/amith-lakshmisha/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-blue-500"
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
      className="text-gray-600 hover:text-blue-500"
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
      className="text-gray-600 hover:text-blue-500"
    >
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M22 4H2a2 2 0 00-2 2v12a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zM2 5.5a.5.5 0 01.5-.5h19a.5.5 0 01.5.5v11a.5.5 0 01-.5.5H2.5a.5.5 0 01-.5-.5v-11z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M12.707 13.207a.5.5 0 01-.707 0l-5.5-5a.5.5 0 11.707-.707L12 11.793l5.5-5a.5.5 0 01.707.707l-5.5 5z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M6.5 8.5l-1 1V16h13v-6l-1-1v7H6.5v-7z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  </div>
);

export default ContactMe;
