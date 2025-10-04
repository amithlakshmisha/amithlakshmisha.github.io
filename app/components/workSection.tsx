// app/components/work-section.js
import Section from "./section";
import Badge from "./badge";

const WorkSection = () => (
  <Section id="work" title="Work Experience">
    <div className="space-y-8">

      {/* Fidelity Investments */}
      <div>
        <h3 className="text-xl lg:text-2xl font-bold">
          Fidelity Investments - Senior Full Stack Developer
        </h3>
        <p className="text-gray-700">Apr 2024 – Present</p>
        <div className="py-4">
          <Badge text="Angular" />
          <Badge text="Python FastAPI" />
          <Badge text="Neo4j" />
          <Badge text="Graph Databases" />
          <Badge text="REST APIs" />
          <Badge text="Generative AI" />
          <Badge text="AWS" />
        </div>
        <ul className="list-disc pl-6 space-y-1">
          <li>Developed and maintained a scalable chatbot application using Angular and Python FastAPI.</li>
          <li>Designed and implemented a Neo4j graph database for efficient data storage and relationship mapping.</li>
          <li>Leveraged Generative AI to automate decision-making, improving response accuracy and user experience.</li>
          <li>Applied best practices in RESTful API development and graph data modeling to improve scalability and performance.</li>
        </ul>
      </div>

      {/* Flipt LLC */}
      <div>
        <h3 className="text-xl lg:text-2xl font-bold">
          Flipt LLC - Senior Full Stack Developer
        </h3>
        <p className="text-gray-700">Nov 2021 – Mar 2024</p>
        <div className="py-4">
          <Badge text="React" />
          <Badge text="Streamlit" />
          <Badge text="Couchbase" />
          <Badge text="N1QL" />
          <Badge text="REST APIs" />
          <Badge text="JSON Rules Engine" />
          <Badge text="CircleCI" />
          <Badge text="Airflow" />
          <Badge text="Python" />
        </div>
        <ul className="list-disc pl-6 space-y-1">
          <li>Built a self-service adjudication tool for large pharmaceutical corporations.</li>
          <li>Developed React SPA screens reducing concierge response times by 50%.</li>
          <li>Architected an AI-powered Q&A portal using OpenAI’s API and Streamlit.</li>
          <li>Implemented RBAC with React for multiple users, roles, and organizations.</li>
          <li>Built REST APIs for approval processes using JSON rules and chaining for multi-level approvals.</li>
          <li>Engineered CI/CD pipelines with CircleCI to automate testing, builds, and deployments.</li>
          <li>Created Airflow jobs in Python to automate drug list generation for each organization.</li>
        </ul>
      </div>

      {/* United Nations */}
      <div>
        <h3 className="text-xl lg:text-2xl font-bold">
          United Nations - Full Stack Developer
        </h3>
        <p className="text-gray-700">May 2019 – Oct 2021</p>
        <div className="py-4">
          <Badge text="Node.js" />
          <Badge text="Angular" />
          <Badge text="MongoDB" />
          <Badge text="AWS" />
          <Badge text="GitLab CI/CD" />
          <Badge text="Python" />
        </div>
        <ul className="list-disc pl-6 space-y-1">
          <li>Migrated Lotus Notes applications to web-based service catalog using MEAN stack.</li>
          <li>Parsed PDFs/XMLs into MongoDB with Node.js, reducing manual effort by 80%.</li>
          <li>Developed Angular SPA with role-based data export and management.</li>
          <li>Implemented CI/CD pipelines with AWS CodePipeline, ECS, and GitLab reducing build/test time by 50%.</li>
          <li>Created Python scripts for data migration and unit testing with Karma/Jasmine.</li>
        </ul>
      </div>

      {/* MCG LLC */}
      <div>
        <h3 className="text-xl lg:text-2xl font-bold">
          MCG LLC (VMware) - Software & Automation Engineer
        </h3>
        <p className="text-gray-700">Aug 2018 – Apr 2019</p>
        <div className="py-4">
          <Badge text="ServiceNow" />
          <Badge text="vRA" />
          <Badge text="VMware" />
          <Badge text="Random Forest" />
          <Badge text="Python" />
          <Badge text="NGINX" />
        </div>
        <ul className="list-disc pl-6 space-y-1">
          <li>Built AI-backed console to integrate ServiceNow with VMware vRealize for VM provisioning/monitoring.</li>
          <li>Created Random Forest regression model to predict VM type/size with 82% accuracy.</li>
          <li>Automated NGINX server installation via ServiceNow MID server, reducing build times by 10%.</li>
          <li>Designed monitoring dashboard with auto-scaling alerts for cost optimization.</li>
        </ul>
      </div>

      {/* ServiceNow */}
      <div>
        <h3 className="text-xl lg:text-2xl font-bold">
          ServiceNow - Technical Engineer Intern
        </h3>
        <p className="text-gray-700">May 2017 – Jun 2018</p>
        <div className="py-4">
          <Badge text="JavaScript" />
          <Badge text="ServiceNow" />
          <Badge text="Event Logs" />
        </div>
        <ul className="list-disc pl-6 space-y-1">
          <li>Built application to monitor live instances and push auto-update email notifications.</li>
          <li>Improved quarterly patch program efficiency by 20% through automated log parsing and triggers.</li>
          <li>Resolved multiple bugs in client monitoring/logging applications working with cross-functional teams.</li>
        </ul>
      </div>

    </div>
  </Section>
);

export default WorkSection;
